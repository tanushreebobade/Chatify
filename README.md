# Chatify

Chatify is a real-time, one-to-one messaging application built on the MERN stack (MongoDB, Express, React and Node.js). It delivers messages and presence updates instantly over Socket.IO, secures sessions with HTTP-only JWT cookies, and presents a responsive interface designed to work equally well on desktop, tablet and mobile devices.

**Live application:** 

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

## Overview

The application is deployed as two independent services: a static React front end hosted on Vercel and an Express API with a Socket.IO server hosted on Render. Authentication, messaging, presence and media upload are handled end to end, and the codebase is organised so that presentation, state management and API integration remain clearly separated.

## Features

- **Authentication** — Account registration and sign-in with bcrypt-hashed passwords and JSON Web Tokens issued as HTTP-only, cross-site-safe cookies.
- **Real-time messaging** — Instant delivery of text and image messages via Socket.IO, with optimistic sending, delivery state and automatic reconnection handling.
- **Presence** — Live online/offline status for every contact, reflected in the conversation list, contact directory and conversation header.
- **Conversation management** — Conversations ordered by recency with last-message previews, timestamps, unread counts and search across chats and contacts.
- **Media sharing** — Image attachments and profile photos uploaded to Cloudinary, with in-app preview and full-size viewing.
- **Responsive interface** — A two-pane layout on larger screens and a dedicated single-pane navigation flow on mobile, with safe-area and on-screen-keyboard handling.
- **Accessibility** — Keyboard-navigable lists and controls, labelled icon buttons, visible focus states and support for reduced-motion preferences.
- **Notifications** — Optional audio cues for incoming messages and keystrokes.
- **Security and abuse protection** — CORS restricted to the deployed client origin, and bot detection, request shielding and rate limiting provided by Arcjet.
- **Transactional email** — Welcome emails dispatched through Resend upon registration.

## Technology Stack

### Front end
- **React 19** with **Vite** for development and production builds
- **Zustand** for application state
- **React Router** for client-side routing
- **Socket.IO Client** for real-time communication
- **Axios** for HTTP requests
- **Tailwind CSS** with a project-specific design token set
- **Lucide React** for iconography
- **React Hot Toast** for user notifications

### Back end
- **Node.js** and **Express 5**
- **MongoDB** with **Mongoose**
- **Socket.IO** for WebSocket transport
- **jsonwebtoken** and **bcryptjs** for authentication
- **Cloudinary** for image storage
- **Resend** for transactional email
- **Arcjet** for security middleware
- **cookie-parser** and **cors**

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/tanushreebobade/Chatify
cd chatify-
```

### 2. Install Dependencies

#### Backend Setup
```bash
cd backend
npm install
```

#### Frontend Setup
```bash
cd frontend
npm install
```

### 3. Environment Configuration

Create a `.env` file in the **backend** directory (a template is provided at `backend/.env.example`):

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGO_URL=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Resend Email Configuration (optional — signup works without it, the
# welcome email is just skipped if RESEND_API_KEY is unset)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_verified_email@domain.com
EMAIL_FROM_NAME=Chatify

# Arcjet Security (optional — requests just skip bot/rate-limit checks if unset)
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=production

# Client URL (for CORS) — the deployed frontend's origin
CLIENT_URL=http://localhost:5173
```

For local development you don't need a frontend `.env` — `frontend/src/lib/axios.js`
and `useAuthStore.js` already default to `http://localhost:3000` in dev mode.
For deployment (frontend on Vercel, backend on Render), set
`VITE_API_URL`/`VITE_SOCKET_URL` — see `frontend/.env.example` and Deployment
below.

### 4. Start the Application

#### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

#### Production Mode

See [Deployment](#deployment) below — the frontend deploys to Vercel and
the backend to Render as separate services. To sanity-check a production
build locally instead:

```bash
# Build frontend
cd frontend
npm run build
npm run preview   # serves dist/ at http://localhost:4173

# Start backend, pointing CLIENT_URL at the preview origin above
cd backend
NODE_ENV=production npm start
```

## Project Structure

```
chatify/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   │   ├── auth.controller.js
│   │   │   └── message.controller.js
│   │   ├── emails/           # Email templates and handlers
│   │   │   ├── emailHandlers.js
│   │   │   └── emailTemplates.js
│   │   ├── lib/              # Utility libraries
│   │   │   ├── db.js         # Database connection
│   │   │   ├── cloudinary.js # Image upload config
│   │   │   ├── socket.js     # Socket.IO setup
│   │   │   ├── resend.js     # Email service
│   │   │   └── arcjet.js     # Security config
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── arcjet.middleware.js
│   │   │   └── socket.auth.middleware.js
│   │   ├── models/           # Mongoose schemas
│   │   │   ├── User.js
│   │   │   └── Message.js
│   │   ├── routes/           # API routes
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   └── server.js         # Application entry point
│   └── package.json
│
├── frontend/
│   ├── public/               # Static assets
│   │   ├── sounds/           # Notification and keyboard sounds
│   │   └── chatify.svg       # Favicon
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── auth/         # AuthLayout, FormField
│   │   │   ├── ui/           # Avatar, BrandMark, EmptyState
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── ChatsList.jsx
│   │   │   ├── ContactList.jsx
│   │   │   ├── ConversationRow.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   └── ...
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── useKeyboardSound.js
│   │   ├── lib/              # Utilities
│   │   │   ├── axios.js      # API client
│   │   │   ├── errors.js     # User-facing error messages
│   │   │   └── format.js     # Date/time and name formatting
│   │   ├── pages/            # Page components
│   │   │   ├── ChatPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── store/            # Zustand state management
│   │   │   ├── useAuthStore.js
│   │   │   └── useChatStore.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check` - Check authentication status
- `PUT /api/auth/update-profile` - Update user profile

### Messages
- `GET /api/message/contacts` - Get all users available to chat with
- `GET /api/message/chats` - Get users you've already exchanged messages with
- `GET /api/message/:id` - Get messages with a specific user
- `POST /api/message/send/:id` - Send a message to a user

### Health
- `GET /api/health` - Liveness/readiness check for uptime monitors and hosting platforms

### WebSocket Events
- `connect` / `disconnect` - Socket lifecycle (authenticated via the `token` cookie)
- `newMessage` - Emitted to the recipient when a message is sent
- `getOnlineUsers` - Broadcast list of currently online user IDs

## Architecture Notes

### Real-time communication
Each authenticated client maintains a single Socket.IO connection. The server keeps a map of user IDs to socket IDs, broadcasts the set of online users whenever it changes, and emits `newMessage` directly to the recipient's socket when a message is stored. The client subscribes once per session, so messages for conversations that are not currently open still update the conversation list and unread counts.

### Authentication and sessions
Credentials are verified with bcrypt and a signed JWT is issued as an HTTP-only cookie. Because the front end and API are served from different origins, the cookie is set with `SameSite=None; Secure` whenever `CLIENT_URL` is an HTTPS origin, and with `SameSite=Lax` for local HTTP development. Protected routes and the Socket.IO handshake both validate the same cookie.

### Media
Image attachments and profile photos are received as data URLs, uploaded to Cloudinary, and stored by URL. The client validates file type and size before upload and shows an optimistic preview while the request is in flight.

### Security
- Password hashing with bcrypt
- HTTP-only, secure JWT cookies
- CORS restricted to the configured client origin
- Bot detection, request shielding and sliding-window rate limiting via Arcjet

## Deployment

The application is deployed as two independent services:

- **Front end** — Vite/React static build hosted on **Vercel**
- **Back end** — Express API and Socket.IO server hosted on **Render**

Cross-origin configuration is handled through `CLIENT_URL` on the back end and `VITE_API_URL` / `VITE_SOCKET_URL` on the front end. Step-by-step instructions are provided in `DEPLOYMENT.md`.

## Contributing

Contributions are welcome. To propose a change:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes with a descriptive message.
4. Push the branch and open a pull request describing the change and how it was tested.

## License

This project is licensed under the ISC License.

## Acknowledgements

Chatify is built on Socket.IO, MongoDB, Cloudinary, Resend and Arcjet.

## Contact

Tanushree Bobade — github.com/tanushreebobade

Repository: [github.com/tanushreebobade/Chatify](https://github.com/tanushreebobade/Chatify)
