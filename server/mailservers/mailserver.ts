import { EmailModel } from "../models/email";

export class MailServerParent {
    getAllRecipients(content: EmailModel) {
        let recipients: Array<string> = [];

        content.to.forEach(e => {
            recipients.push(e);
        })

        if (content.cc) {
            content.cc.forEach(e => {
                recipients.push(e);
            });
        }

        if (content.bcc) {
            content.bcc.forEach(e => {
                recipients.push(e);
            });
        }

        return recipients.join();
    }
}