import 'reflect-metadata';
import 'es6-shim';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { Routes } from './routes';

const app: express.Application = express();
let port = process.env.PORT || 8080;

app.use(bodyParser.json({
    limit: '5mb'
}));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        res.status(400).json({
            success: false,
            errMsg: "Invalid request body",
            details: err.message
        });

        return;
    } else {
        next();
    }
});

// load all routes
new Routes().loadAll(app);

app.get('/', (req, res) => {
    res.send('Welcome to Free Mail Sender API');
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})