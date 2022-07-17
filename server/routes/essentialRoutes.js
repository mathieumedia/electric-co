import express from 'express';
import * as essentialController from '../controllers/essentialController.js';

const router = express.Router();

router.get('/', essentialController.getEssentials)
router.post('/genders', essentialController.addGender)
router.patch('/genders/:genderId', essentialController.updateGender)

export default router;