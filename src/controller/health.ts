import { Router } from 'express';

export default function health(app: Router) {
    app.get('/health', async (req, res) => {
        res.status(200);
        res.end();
    });
}