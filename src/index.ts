import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3001;

app.listen(port, () => {
    console.log(`Backend initialised on port : ${port}`);
});

app.get('/', (req, res) => {
    res.send('Application is live!');
    res.status(201);
    res.end();
});