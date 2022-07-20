import express from 'express';
import * as essentialController from '../controllers/essentialController.js';
import auth from './authRoute.js'
const router = express.Router();

router.get('/', [auth], essentialController.getEssentials)

router.post('/genders', [auth], essentialController.addGender)
router.patch('/genders/:genderId',  auth, essentialController.updateGender)
router.delete('/genders/:genderId',  auth, essentialController.deleteGender)

router.post('/states',  auth, essentialController.addState)
router.patch('/states/:stateId',  auth, essentialController.updateState)
router.delete('/states/:stateId',  auth, essentialController.deleteState)

router.post('/statuses',  auth, essentialController.addStatus)
router.patch('/statuses/:statusId',  auth, essentialController.updateStatus)
router.delete('/statuses/:statusId',  auth, essentialController.deleteStatus)

router.post('/accountTypes',  auth, essentialController.addAccountType)
router.patch('/accountTypes/:typeId',  auth, essentialController.updateAccountType)
router.delete('/accountTypes/:typeId', auth, essentialController.deleteAccountType)

export default router;