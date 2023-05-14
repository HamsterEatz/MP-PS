import { Router } from 'express';
import { getRemarks } from '@gSheets';

export default function getRemarksController(app: Router) {
    app.get('/remarks', async (req, res) => {
        const data = await getRemarks();
        res.send(data);
        res.status(201);
        res.end();
    });
}