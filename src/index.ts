import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from "dotenv";
import moment from 'moment-timezone';
import controller from './controller';

moment().tz("Asia/Singapore").format();

dotenv.config();

const app = express();

app.use(express.static(__dirname + '/view'));

const port = process.env?.port || 443;
const origin_url = process.env?.origin_url || `http://localhost:${port}`;

app.use(cors({ origin: origin_url, credentials: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`Backend initialised on port : ${port}`);
});

controller(app);