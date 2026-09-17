import { Resend } from "resend";
import { resendClient,sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate, createPasswordResetTemplate } from "../emails/emailTemplates.js";

export const sendWelcomeEmail = async (email,name,clientURL) => {
    if(!resendClient){
        console.warn("RESEND_API_KEY not set — skipping welcome email.");
        return;
    }

    const {data,error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: 'Welcome to Chatify!',
        html: createWelcomeEmailTemplate(name,clientURL)
    });

    if(error){
        console.error("Error sending welcome email:", error);
        throw new Error("Failed to send welcome email");
    }

    console.log("Welcome email sent:", data);
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    if(!resendClient){
        console.warn("RESEND_API_KEY not set — skipping password reset email.");
        return;
    }

    const {data,error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: 'Reset Your Password - Chatify',
        html: createPasswordResetTemplate(resetURL)
    });

    if(error){
        console.error("Error sending password reset email:", error);
        throw new Error("Failed to send password reset email");
    }

    console.log("Password reset email sent:", data);
}