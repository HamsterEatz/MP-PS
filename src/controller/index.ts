import { Express } from 'express';
import getParadeState from './getParadeState';
import getRemarksController from './getRemarks';

export default function controller(app: Express) {
    getParadeState(app);
    getRemarksController(app);
}