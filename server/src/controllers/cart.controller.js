import Cart from "../models/cart.model.js";

export const getCart = async (req,res) => {
    const user = req.user;

    try {
        const cart = await Cart.findOne({ownerID:user._id});
        console.log(cart)
        if (!cart) throw new Error();
        
            await cart.populate('books.bookID')

        res.send({
            status:200,
            statusText:'OK',
            data: {cart:cart},
            message:'Cart was found successfully',
        });
        
    } catch (error) {
        res.status(500).send({
            status:500,
            statusText:"Internal Server Error",
            message:'',
        })
    }
};

export const addNewBookToCart = async(req,res) => {
    const user = req.user;
    const bookID = req.body.bookID;

    try {

        const cart = await Cart.findOne({ownerID: user._id});
        if(!cart) {
            throw new Error('No cart was found');
        }

        const books = cart.books;
        
        if((books.find(bookDoc => bookDoc.bookID.toString() === bookID))){
            throw new Error("Double Book");
            
        };

        
        console.log(bookID)
        if (!books.find((bookDoc) => bookDoc.bookID === bookID)){

            books.push({bookID:bookID})
            await cart.save();
        }

        res.send({
            status:200,
            statusText:'OK',
            data:{cart : cart},
            message:'A book was added succssefully',
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status:500,
            statusText:"Internal Server Error",
            message:'', 
        })}
    };

    export const updateCart = async(req,res) => {
        const user = req.user;
        const bookID = req.body.bookID;


        try {
            const cart = await Cart.findOne({ownerID: user._id});
            if(!cart) {
                throw new Error('No cart was found');
            };

            cart.books = cart.books.filter((bookDoc) => bookDoc.bookID.toString() !== bookID);

            await cart.save();


            res.send({
                status:200,
                statusText:'OK',
                data: {cart:cart},
                message:'The cart was successfully updated'
            });
            
        } catch (error) {
            console.log(error)
            res.status(500).send({
                status:500,
                statusText:'Internal Server Error',
                message:'',
            })
        }
    };

    export const processCheckout = async (req,res) => {
        const user = req.user;
        
        try {
            if(!user) {
                throw new Error();
            };
            
                const cart = await Cart.findOne({ownerID:user._id})

                cart.books = [];
                await cart.save();

                console.log(cart.books)

                res.send({
                    status:200,
                    statusText: 'OK',
                    data:{cart:cart},
                    message: 'Checkouted successfully',

                });
            
        } catch (error) {
            res.status(500).send({
                status:500,
                statusText:'Internal Server Error',
                message:'',
            }) 
        }
    }