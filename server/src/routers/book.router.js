import express from 'express';
import * as bookController from '../controllers/book.controller.js';

const router = new express.Router();

router.post('/books/newbook', bookController.creatNewBook);

router.get('/books',bookController.getAllBooks);

router.get('/books/:bookID',bookController.getBook)


export default router;
