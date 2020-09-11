import { MailAuthentication } from "./mail-authentication";

export class MailServer {
    name!: string;
    sendingEmailSettings!: SendingEmailSettings;
}

export class SendingEmailSettings {
    url!: string;
    method!: string;
    authentication!: MailAuthentication;
    contentType!: string;
    apikey!: string;
}