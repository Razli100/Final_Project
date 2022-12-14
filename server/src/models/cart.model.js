import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {   
        ownerID: {
            type: mongoose.SchemaTypes.ObjectId,
            required: [true,'Owner ID is required'],
            ref:'User',
            
        },

        books: [
            {
                bookID: {
                    type:mongoose.SchemaTypes.ObjectId,
                    ref: 'Book',
                    required: [true,'bookId is required']
                },
            },
        ],
    }
)

cartSchema.methods.toJSON = function () {
    const cart = this;

    const cartObj = cart.toObject();
    delete cartObj.__v;

    return cartObj;
}


const Cart = mongoose.model('Cart',cartSchema);

export default Cart;