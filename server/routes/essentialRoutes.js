import express from 'express';
import * as essentialController from '../controllers/essentialController.js';
import {userAuth, adminAuth} from './authRoute.js'
const router = express.Router();

router.get('/', userAuth, essentialController.getEssentials)

router.post('/genders', adminAuth, essentialController.addGender)
router.patch('/genders/:genderId',  adminAuth, essentialController.updateGender)
router.delete('/genders/:genderId',  adminAuth, essentialController.deleteGender)

router.post('/states',  adminAuth, essentialController.addState)
router.patch('/states/:stateId',  adminAuth, essentialController.updateState)
router.delete('/states/:stateId',  adminAuth, essentialController.deleteState)

router.post('/statuses',  adminAuth, essentialController.addStatus)
router.patch('/statuses/:statusId',  adminAuth, essentialController.updateStatus)
router.delete('/statuses/:statusId',  adminAuth, essentialController.deleteStatus)

router.post('/accountTypes',  adminAuth, essentialController.addAccountType)
router.patch('/accountTypes/:typeId',  adminAuth, essentialController.updateAccountType)
router.delete('/accountTypes/:typeId', adminAuth, essentialController.deleteAccountType)

export default router;