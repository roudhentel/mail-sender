import express, { Request, Response } from 'express';
import { EmailController } from '../controllers/email';
import { validatorMW } from '../tools/validator';
import { EmailModel } from '../models/email';

export const router = express.Router({ strict: true });
const emailCtrl = new EmailController();

router.post('/send', validatorMW(EmailModel), (req: Request, res: Response) => {
    emailCtrl.send(req, res);
});