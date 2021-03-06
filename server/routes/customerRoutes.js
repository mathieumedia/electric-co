import express from 'express';
import * as customerController from '../controllers/customerController.js';
import auth from './authRoute.js'
const router = express.Router();

router.get('/', auth, customerController.getCustomers)
router.post('/', auth, customerController.addCustomer)
router.patch('/:customerId', auth, customerController.updateCustomer)

export default router;