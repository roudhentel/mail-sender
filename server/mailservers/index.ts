import { MailServer } from "../models/mail-server";

// new email server should be added here
export const mailservers: Array<MailServer> = [
    {
        name: "sendgrid",
        sendingEmailSettings: {
            url: "https://api.sendgrid.com/v3/mail/send",
            authentication: {
                in: "headers",
                key: "Authorization",
                value: "Bearer "
            },
            contentType: "application/json",
            apikey: process.env["sendgridapikey"] || "",
            method: "POST"
        }
    },
    {
        name: "sedinblue",
        sendingEmailSettings: {
            url: "https://api.sendinblue.com/v3/smtp/email",
            authentication: {
                in: "headers",
                key: "api-key",
                value: ""
            },
            contentType: "application/json",
            apikey: process.env["sedinblueapikey"] || "",
            method: "POST"
        }
    }
];