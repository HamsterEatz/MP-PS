import { Router } from 'express';
import getParadeState from './getParadeState';
import getRemarksController from './getRemarks';

export default function controller(app: Router) {
    getParadeState(app);
    getRemarksController(app);
}