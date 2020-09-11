import { EmailModel } from "../models/email";
import { MailServer } from "../models/mail-server";
import { Request, Response } from 'express';
import { CommonResponse } from "../models/commonresponse";

export interface IEmailServer {
    mailSvr: MailServer;

    send(content: EmailModel): Promise<CommonResponse>;

    formatBody(content: EmailModel): any;

    getAllRecipients(content: EmailModel): any;

    // sendasync(): any;

    // checkStatus(): any;

    // validateEmail(): any;
}