import Book from "../models/book.model.js";

export const getAllBooks = async (req,res) => {
    try {
        const books = await Book.find()

        res.send({
            status:200,
            statusText:'OK',
            data: { books:books },
            message: ''
        });

    } catch (error) {
        res.status(500).send({
            status:500,
            statusText:'Internal Server Error',
            message:''
        });
        
    }
}

export const getBook = async(req,res) => {
    const bookID = req.params.bookID;
    // console.log(req.params.bookID);
    if(!bookID){
        throw new Error('No book was found!')
    };

    try {
        const book = await Book.findById(bookID);

        res.send({
            status:200,
            statusText:'OK',
            data: {book:book},
            message:'Book was found successfully!',
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({        
            status:500,
            statusText:'Internal Server Error',
            message:'',
        })

}}














export  const creatNewBook = async (req,res) => {
    const bookInfo = req.body;
    const book = new Book(bookInfo);

    try {
        await book.save();

        res.status(201).send({
            status:201,
            statusText:'Created',
            data: { book:book},
            message:"Book Created Successfully",
        })
        
    } catch (error) {
        res.status(400).send({
            status:400,
            statusText:'Bad Request',
            message:"",
        });
    }
};

