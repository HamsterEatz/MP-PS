import { getParadeStateModel } from '@model';
import { Express } from 'express';

export default function getParadeState(app: Express) {
    app.get('/firstParadeState', async (req, res) => {
        const data = await getParadeStateModel(true);
        res.send(data);
        res.status(201);
        res.end();
    });

    app.get('/lastParadeState', async (req, res) => {
        const data = await getParadeStateModel(false);
        res.send(data);
        res.status(201);
        res.end();
    });
}