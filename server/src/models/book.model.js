import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true,"Title is required"],
        trim: true
    },

    author: {
        type: String,
        trim: true,
        required: [true, 'Author is required']
    },

    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required']
    },

    format: {
        type: String,
        trim: true,
        required: [true, 'format is required']
    },

    language: {
        type: String,
        trim: true,
        required: [true, 'Language is required']
    },

    cover: {
        type: String,
        trim: true,
        required: [true, 'Book is required'],
    },

    rating: {
        type: String,
        trim: true,
        required: false,
    },

    pages: {
            type: Number,
            required: [true, 'Number of pages is required'],
            min: 0
        },
    
    price: {
        type: Number,            
        required: [true, 'Price is required'],
        min: 0
        },
});

bookSchema.methods.toJSON = function () {
    const book = this;

    const bookObj = book.toObject();
    delete bookObj.__v;

    return bookObj;
};

const Book = mongoose.model('Book', bookSchema);

export default Book;