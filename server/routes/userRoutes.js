import express from 'express'
import * as userController from '../controllers/userController.js'
import {userAuth, adminAuth} from './authRoute.js'
const router = express.Router();

router.get('/', adminAuth, userController.getUsers)
router.post('/registerUser', adminAuth, userController.registerUser)
router.post('/loginUser', userController.loginUser)
router.delete('/deletenonadmins', adminAuth, userController.deleteNonAdmin)
export default router;