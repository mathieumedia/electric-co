import express from 'express'
import * as userController from '../controllers/userController.js'

const router = express.Router();

router.get('/', userController.getUsers)
router.post('/registerUser', userController.registerUser)
router.post('/loginUser', userController.loginUser)

export default router;