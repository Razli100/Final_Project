import express from "express";

import * as cartController from '../controllers/cart.controller.js'
import userAuth from '../middlewares/user.auth.js';

const router = new express.Router();

router.get('/cart',userAuth,cartController.getCart);

router.post('/cart',userAuth,cartController.updateCart);

router.post('/cart/add-to-cart',userAuth,cartController.addNewBookToCart)

router.post('/cart/checkout',userAuth,cartController.processCheckout);

export default router;