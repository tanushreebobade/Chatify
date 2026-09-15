import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

// Frontend (Vercel) and backend (Render) live on different origins in
// production, so the auth cookie must be cross-site: sameSite "none"
// requires secure "true" (browsers reject "none" over plain HTTP).
//
// This used to key off NODE_ENV === "production", but Render doesn't set
// NODE_ENV automatically — leaving it unset made the cookie fall back to
// sameSite "lax" + secure false in production. Browsers silently drop a
// "lax" cookie on cross-site fetch/XHR (it's only sent on top-level
// navigations), which is why /api/auth/check 401'd right after a
// successful login/signup. CLIENT_URL is a more reliable signal: it must
// already be set to the real https Vercel URL for CORS to work at all, so
// deriving cross-site cookie behavior from its protocol can't be forgotten
// the way a separate NODE_ENV flag can.
export const isCrossSiteDeployment = () => ENV.CLIENT_URL.startsWith('https://');

export const getAuthCookieOptions = () => {
    const crossSite = isCrossSiteDeployment();
    return {
        httpOnly: true,
        sameSite: crossSite ? 'none' : 'lax',
        secure: crossSite
    };
};

export const generateToken = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'7d'
    })

    res.cookie('token',token,{
        ...getAuthCookieOptions(),
        maxAge:7*24*60*60*1000
    })
    return token;
}