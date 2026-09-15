# Deploying Chatify (Vercel + Render)

Chatify deploys as two independent services:

- **Frontend** (React/Vite static build) → **Vercel**
- **Backend** (Express API + Socket.IO WebSocket) → **Render**

They run on different origins (`your-app.vercel.app` vs
`your-backend.onrender.com`), so the app is configured for cross-site
requests: CORS is locked to `CLIENT_URL`, and the auth cookie uses
`SameSite=None; Secure` in production so it's still sent on cross-origin
API calls.

## 1. Prerequisites

- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (free M0 tier is
  enough to start) and its connection string.
- A [Vercel](https://vercel.com) account and a [Render](https://render.com)
  account (both have free tiers).
- Cloudinary, Resend, and Arcjet accounts if you want those features live
  (all optional — see "Optional integrations" below).
- Push this repo to GitHub/GitLab/Bitbucket — both platforms deploy from a
  connected git repo.

## 2. Deploy the backend to Render

1. In the Render dashboard: **New +** → **Web Service** → connect this repo.
2. Configure:
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid, if you want to avoid spin-down)
3. Add environment variables (Render → your service → **Environment**):

   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `MONGO_URL` | your Atlas connection string |
   | `JWT_SECRET` | a long random string (`openssl rand -hex 32`) |
   | `CLIENT_URL` | your Vercel URL, e.g. `https://your-app.vercel.app` |

   Add `CLOUDINARY_*`, `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_FROM_NAME`,
   `ARCJET_KEY`, `ARCJET_ENV` too if you're using those (see backend/.env.example).

   `PORT` does **not** need to be set — Render injects it and the app already
   reads `process.env.PORT`.

4. Deploy. Render gives you a URL like `https://chatify-backend.onrender.com`.
   Confirm it's up:

   ```bash
   curl https://chatify-backend.onrender.com/api/health
   # {"status":"ok"}
   ```

## 3. Deploy the frontend to Vercel

1. In the Vercel dashboard: **Add New** → **Project** → import this repo.
2. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
3. Add environment variables (Vercel → your project → **Settings** →
   **Environment Variables**), pointing at the Render backend from step 2:

   | Key | Value |
   |---|---|
   | `VITE_API_URL` | `https://chatify-backend.onrender.com/api` |
   | `VITE_SOCKET_URL` | `https://chatify-backend.onrender.com` |

   These are build-time (Vite inlines them), so set them **before** deploying
   or redeploy after adding them.
4. Deploy. Vercel gives you a URL like `https://your-app.vercel.app`.
5. A `frontend/vercel.json` in this repo adds an SPA rewrite so client-side
   routes (React Router) work on refresh/direct navigation.

## 4. Wire the two together

Go back to Render and update `CLIENT_URL` to the **real** Vercel URL from
step 3 (if you used a placeholder before), then redeploy the backend so CORS
and the cookie/email links point at the right place.

## 5. Verify

1. Open the Vercel URL in a browser.
2. Sign up for an account — confirm no CORS errors in the browser console.
3. Open a second tab/incognito window, sign up as a different user, and
   confirm messages arrive in real time (Socket.IO over the cross-origin
   connection).
4. Log out and back in — confirms the cross-site cookie (`SameSite=None`) is
   being set and cleared correctly.

## 6. Optional integrations

These are all safe to leave unset — the app degrades gracefully rather than
crashing:

| Env var | If unset |
|---|---|
| `RESEND_API_KEY` / `EMAIL_FROM` | Signup still works; the welcome email is just skipped (logged as a warning). |
| `ARCJET_KEY` | Requests skip bot detection / rate limiting instead of being blocked. |
| `CLOUDINARY_*` | Image upload endpoints will fail (500) if a user tries to upload — required if you want image sharing / avatar upload to work. |

## Notes specific to this app

- **Cross-site cookies**: because the frontend and backend are on different
  origins, `backend/src/lib/utils.js` sets the auth cookie with
  `sameSite: "none"` and `secure: true` in production (required together —
  browsers reject `SameSite=None` without `Secure`). In development
  (`NODE_ENV !== "production"`) it falls back to `sameSite: "lax"`, which
  works for `localhost` regardless of port.
- **CORS**: `backend/src/server.js` and `backend/src/lib/socket.js` both lock
  `origin` to `CLIENT_URL` with `credentials: true`. Keep this pointed at
  the exact Vercel URL (including `https://`, no trailing slash) or requests
  will be rejected.
- **Render free tier spin-down**: a free Render web service spins down after
  ~15 minutes of inactivity; the next request (and the WebSocket handshake)
  will have a cold-start delay of a few seconds. Upgrade to a paid instance
  to avoid this for a production audience.
- **Database**: `connectDB()` calls `process.exit(1)` if it can't reach
  MongoDB on boot, which is intentional — Render will treat the service as
  failed to start and retry, which is the correct behavior for a hard
  dependency.
- **Preview deployments**: Vercel gives every PR/branch its own preview URL,
  which won't match `CLIENT_URL` on the backend, so signups/logins on preview
  URLs will fail CORS by default. For active PR previews, either add the
  preview origin to a small allowlist in `server.js`/`socket.js`, or just
  test against the production Vercel URL.
