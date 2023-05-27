import { Router } from 'express';
import getParadeState from './getParadeState';
import getRemarksController from './getRemarks';
import getContactsController from './getContacts';

export default function controller(app: Router) {
    getParadeState(app);
    getRemarksController(app);
    getContactsController(app);
}