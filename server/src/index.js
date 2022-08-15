import express from 'express';
import environments from '../config/environments.js';
import connectToMongoDB from '../src/databases/mongoose.db.js'
import dotenv from 'dotenv';
import cors from 'cors';
import bookRouter from './routers/book.router.js';
import userRouter from './routers/user.router.js';
import cartRouter from './routers/cart.router.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use(bookRouter);
app.use(cartRouter);
app.use(userRouter);


const PORT = environments.PORT;

app.listen(PORT, async () => {
    console.log(`Server is running on port: ${PORT}. You are good to go!`);

    await connectToMongoDB()
});

