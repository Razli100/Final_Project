import express from 'express';
import * as userController from '../controllers/user.controller.js' 
import userAuth from '../middlewares/user.auth.js';

const router = new express.Router();

router.post('/users/signup',userController.CreatNewUser);

router.post('/users/login',userController.userLogin);

router.post('/users/logout',userAuth,userController.userLogout);

export default router;

