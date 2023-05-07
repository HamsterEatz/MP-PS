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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env?.port || 443;

app.listen(port, () => {
    console.log(`Backend initialised on port : ${port}`);
});

controller(app);