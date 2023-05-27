import { getParadeStateModel } from '@model';
import { Router } from 'express';
import moment from 'moment';

export default function getParadeState(app: Router) {
    app.get('/firstParadeState', async (req, res) => {
        const data = await getParadeStateModel(true, moment());
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