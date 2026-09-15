import {Resend} from 'resend';
import {ENV} from './env.js';

// The Resend SDK throws synchronously if no key is passed, which would crash
// the whole server at startup. Email is an optional feature, so only
// instantiate a real client when a key is configured; otherwise leave it
// null and let callers skip sending (see emailHandlers.js).
export const resendClient = ENV.RESEND_API_KEY ? new Resend(ENV.RESEND_API_KEY) : null;

export const sender = {
    email: ENV.EMAIL_FROM,
    name: ENV.EMAIL_FROM_NAME || "Chatify"
};
