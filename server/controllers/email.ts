import { Request, Response } from 'express';
import { IEmailServer } from '../Interfaces/iemailserver';
import { mailservers } from '../mailservers';
import { SendGrid } from '../mailservers/sendgrid';
import { EmailModel } from '../models/email';
import { SedinBlue } from '../mailservers/sedinblue';
import { CommonResponse } from '../models/commonresponse';

export class EmailController {
    emailSvr!: IEmailServer;
    mailServerIdx: number = 0;

    constructor() {

    }

    public send(req: Request, res: Response, tryCtr: number = 0): void {
        this.emailSvr = this.getEmailServer();
        const body: EmailModel = req.body as EmailModel;
        this.emailSvr.send(body).then((resp: CommonResponse) => {
            res.status(resp.statusCode).json(resp);
        }, (err: CommonResponse) => {
            if (tryCtr < 4) { // try another 4 times can be set on environment variables
                this.send(req, res, ++tryCtr);
            } else {
                res.status(err.statusCode).json(err);
            }
        });
    }

    private getEmailServer() {
        // For this exercise, choosing of mail server is in incremental order
        // Once the first mail server fails it will try the next mail server
        // In production we need to push the request to a load balancer.
        // where the load balancer will choose which mail server is running & available.

        let mSvr: IEmailServer;
        switch (this.mailServerIdx) {
            case 0:
                mSvr = new SendGrid();
                break;
            case 1:
                mSvr = new SedinBlue();
                break;
            default:
                mSvr = new SendGrid();
                break;
        }

        this.mailServerIdx = (this.mailServerIdx + 1 < mailservers.length) ? this.mailServerIdx + 1 : 0;
        return mSvr;
    }
}