import { Express } from 'express';
import { getRemarks } from '@gSheets';

export default function getRemarksController(app: Express) {
    app.get('/remarks', async (req, res) => {
        const data = await getRemarks();
        res.send(data);
        res.status(201);
        res.end();
    });
}