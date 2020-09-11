import { router as emailRouter } from './email';
import express from 'express';

export class Routes {
    public loadAll(app: express.Application): void {
        app.use('/api/email', emailRouter);
    }
}