import { Resend } from "resend";
import { resendClient,sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";

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