const booksModel = require('../models/books-model');

module.exports = {
    // GET /api/books
    getAllBooks: (req, res) => {
        const books = booksModel.getAllBooks();
        res.json(books);
    },
    // GET /api/books/:id
    getBookByID: (req, res) => {
        const { id } = req.params;
        const book = booksModel.getBookByID(id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    },
    //POST /api/books
    createBook: (req, res) => {
        const { title, author, quantityAvailable } = req.body;
        if (typeof title !== 'string' || typeof author !== 'string' || typeof quantityAvailable !== 'number') return res.status(400).json({ message: 'Invalid book data' });
        const ExistingBook = booksModel.getAllBooks().find(book => book.title === title);
        if (ExistingBook) return res.status(400).json({ message: 'Book already exists' });
        const newBook = booksModel.createBook(title, author, quantityAvailable);
        res.status(201).json(newBook);
    },
    //PUT /api/books/:id
    updateBook: (req, res) => {
        const { id } = req.params;
        const { title, author, quantityAvailable } = req.body;
       
        const fieldsToUpdate = {};
        if (title) fieldsToUpdate.title = title;
        if (author) fieldsToUpdate.author = author;
        if (quantityAvailable) fieldsToUpdate.quantityAvailable = quantityAvailable;

        const updatedBook = booksModel.updateBook(id, fieldsToUpdate);
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(updatedBook);
    },
    //DELETE /api/books/:id
    deleteBook: (req, res) => {
        const { id } = req.params;
        const deletedBook = booksModel.deleteBook(id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(deletedBook);
    }
}