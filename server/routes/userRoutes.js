import express from 'express'
import * as userController from '../controllers/userController.js'
import auth from './authRoute.js'
const router = express.Router();

router.get('/', userController.getUsers)
router.post('/registerUser', userController.registerUser)
router.post('/loginUser', userController.loginUser)
router.delete('/deletenonadmins', auth, userController.deleteNonAdmin)
export default router;