import { Express } from 'express';
import getParadeState from './getParadeState';
import getRemarksController from './getRemarks';

export default function controller(app: Express) {
    app.get('/', (req, res) => {
        res.send('Application is live!');
        res.status(201);
        res.end();
    });

    getParadeState(app);
    getRemarksController(app);
}