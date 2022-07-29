import express from 'express';
import * as customerController from '../controllers/customerController.js';
import {adminAuth, userAuth} from './authRoute.js'
const router = express.Router();


//#region ------ ADMIN ROUTES ---------------------
router.get('/', adminAuth, customerController.getCustomers)
router.post('/', adminAuth, customerController.addCustomer)
router.patch('/:customerId', adminAuth, customerController.updateCustomer)
router.delete('/all', adminAuth, customerController.deleteAllCustomers)
router.get('/repopulate', adminAuth, customerController.repopulateCustomers)


router.post('/bills', adminAuth, customerController.addCustomerBill)
//#endregion

//#region ------ PAYMENT ROUTES ---------------------
//#endregion

export default router;