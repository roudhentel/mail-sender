import { IEmailServer } from "../Interfaces/iemailserver";
import { EmailModel } from "../models/email";
import { MailServerService } from "../services/mailserver-service";
import { mailservers } from ".";
import { MailServer } from "../models/mail-server";
import { Request, Response } from 'express';
import { MailServerParent } from "./mailserver";
import bodyParser from "body-parser";
import { CommonResponse } from "../models/commonresponse";

export class SedinBlue extends MailServerParent implements IEmailServer {
    mailSvr!: MailServer;
    emailSvc!: MailServerService;

    constructor() {
        super();
        this.mailSvr = mailservers[1];

        this.emailSvc = new MailServerService();
    }

    send(content: EmailModel): Promise<CommonResponse> {
        return new Promise((resolve, reject) => {
            try {
                this.emailSvc.sendRequest(this.mailSvr, this.formatBody(content))
                    .then(resp => {
                        if (resp.result.statusCode === 201) {
                            resolve({
                                success: true,
                                statusCode: 200,
                                details: "Successfully sent to " + this.getAllRecipients(content)
                            });
                        } else {
                            reject({
                                success: false,
                                statusCode: resp.result.statusCode,
                                errMsg: JSON.parse(resp.result.body)
                            });
                        }
                    }, err => {
                        reject({
                            success: false,
                            statusCode: 400,
                            errMsg: err.message
                        });
                    });
            } catch (err) {
                reject({
                    success: false,
                    statusCode: 500,
                    errMsg: err.message
                });
            }

        });
    }

    formatBody(content: EmailModel) {
        let tos: Array<any> = [];
        let ccs: Array<any> = [];
        let bccs: Array<any> = [];

        content.to.forEach(e => {
            tos.push({ email: e });
        })

        if (content.cc) {
            content.cc.forEach(function (e) {
                ccs.push({ email: e });
            });
        }

        if (content.bcc) {
            content.bcc.forEach(function (e) {
                bccs.push({ email: e });
            });
        }

        let reqBody: any = {
            from: {
                "email": content.from,
                "name": content.from
            },
            subject: content.subject,
            textContent: content.body,
            sender: {
                "email": content.from,
                "name": content.from
            },
            to: tos
        };

        if (ccs.length > 0) reqBody["cc"] = ccs;
        if (bccs.length > 0) reqBody["bcc"] = bccs;

        return reqBody;
    }

}