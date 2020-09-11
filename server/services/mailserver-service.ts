import request from 'request';
import { MailServer } from '../models/mail-server';
import e from 'express';

export class MailServerService {
    sendRequest(mailSrv: MailServer, body: any): Promise<any> {
        var headers: any = {
            "Content-Type": mailSrv.sendingEmailSettings.contentType
        };

        switch (mailSrv.sendingEmailSettings.authentication.in.toLowerCase()) {
            case "headers":
                headers[mailSrv.sendingEmailSettings.authentication.key] = mailSrv.sendingEmailSettings.authentication.value
                    + mailSrv.sendingEmailSettings.apikey;
                break;
            case "body":
                body[mailSrv.sendingEmailSettings.authentication.key] = mailSrv.sendingEmailSettings.authentication.value;
        }


        return new Promise((resolve, reject) => {
            switch (mailSrv.sendingEmailSettings.method.toLowerCase()) {
                case "post":
                    request.post(mailSrv.sendingEmailSettings.url,
                        {
                            headers: headers,
                            body: JSON.stringify(body)
                        }, (err, resp: any, content) => {
                            if (err) {
                                reject({
                                    success: false,
                                    errMsg: err
                                });
                            }
                            else {
                                resolve({
                                    success: true,
                                    result: resp
                                });
                            }
                        });
                    break;
                // add additional method in future if needed
                default:
                    request.post(mailSrv.sendingEmailSettings.url,
                        {
                            headers: headers,
                            body: JSON.stringify(body)
                        }, (err, resp, content) => {
                            if (err) reject({
                                success: false,
                                errMsg: err
                            });
                            else resolve({
                                success: true,
                                result: resp
                            });
                        });
                    break;
            }
        });
    }
}