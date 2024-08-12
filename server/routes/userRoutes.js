import express, { Router } from 'express'
import { createAccount, getUserDetails, login, logout, requestPasswordReset, resetPassword } from '../controllers/userController.js'
import { upload } from '../middleware/multerMiddleware.js'
import { isLoggin } from '../middleware/AuthMiddleware.js'
const router =Router()




router.post('/register' , upload.single('Avatar'),  createAccount)
router.post('/login',login)
router.post('/logout', isLoggin, logout)
router.get('/getUser',isLoggin,getUserDetails)
router.post('/reset-password', requestPasswordReset);
router.post('/new-password/:token', resetPassword);



export default router