import { Router } from 'express';
import { getContacts } from '@gSheets';

export default function getContactsController(app: Router) {
    app.get('/contacts', async (req, res) => {
        const data = await getContacts();
        res.send(data);
        res.status(201);
        res.end();
    });
}