import express from 'express';
import * as essentialController from '../controllers/essentialController.js';

const router = express.Router();

router.get('/', essentialController.getEssentials)

router.post('/genders', essentialController.addGender)
router.patch('/genders/:genderId', essentialController.updateGender)
router.delete('/genders/:genderId', essentialController.deleteGender)

router.post('/states', essentialController.addState)
router.patch('/states/:stateId', essentialController.updateState)
router.delete('/states/:stateId', essentialController.deleteState)

router.post('/statuses', essentialController.addStatus)
router.patch('/statuses/:statusId', essentialController.updateStatus)
router.delete('/statuses/:statusId', essentialController.deleteStatus)

router.post('/accountTypes', essentialController.addAccountType)
router.patch('/accountTypes/:typeId', essentialController.updateAccountType)
router.delete('/accountTypes/:typeId', essentialController.deleteAccountType)

export default router;