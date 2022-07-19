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

export default router;