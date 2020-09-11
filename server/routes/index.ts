import { router as emailRouter } from './email';
import express from 'express';
import { checkIfValidJson } from '../tools/validator';

export class Routes {
    public loadAll(app: express.Application): void {
        app.use('/api/email', checkIfValidJson, emailRouter);
    }
}