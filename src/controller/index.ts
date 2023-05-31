import { Router } from 'express';
import getParadeState from './getParadeState';
import getRemarksController from './getRemarks';
import getContactsController from './getContacts';
import health from './health';

export default function controller(app: Router) {
    getParadeState(app);
    getRemarksController(app);
    getContactsController(app);
    health(app);
}