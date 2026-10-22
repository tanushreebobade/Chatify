import jwt from 'jsonwebtoken';
import { ENV } from './env.js';


export const isCrossSiteDeployment = () => ENV.CLIENT_URL.startsWith('https://');

export const getAuthCookieOptions = () => {
    const crossSite = isCrossSiteDeployment();
    return {
        httpOnly: true,
        sameSite: crossSite ? 'none' : 'lax',
        secure: crossSite
    };
};

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    )

    res.cookie('token',
        token,
        {
            ...getAuthCookieOptions(),
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
    return token;
}