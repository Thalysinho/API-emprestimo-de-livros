const { v4: uuid } = require('uuid');
const HttpsError = require('../errors/HttpsError');


let books = [
    { id: "1", title: 'One Piece', author: 'Eiichiro Oda', quantityAvailable: 10 },
    { id: "2", title: 'Naruto', author: 'Masashi Kishimoto', quantityAvailable: 5 },
    { id: "3", title: 'Dragon Ball', author: 'Akira Toriyama', quantityAvailable: 8 }
]

module.exports = {
    getAllBooks: () => books.map(book => ({ id: book.id, title: book.title})),

    getBookByID: (id) => books.find(book => book.id === id),

    createBook: (title, author, quantityAvailable) => {   
        const newBook = {
            id: uuid(),
            title,
            author,
            quantityAvailable
        }
        books.push(newBook);
        return newBook;
    },

    updateBook: (id, updatedBook) => {
        const bookIndex = books.findIndex(book => book.id === id);
        if (bookIndex === -1) throw new HttpsError(404, 'Book not found');
        books[bookIndex] = { ...books[bookIndex], ...updatedBook};
        return books[bookIndex];
    },

    deleteBook: (id) =>{
        const bookIndex = books.findIndex(book => book.id === id);
        if (bookIndex === -1) throw new HttpsError(404, 'Book not found');
        const deletedBook = books[bookIndex];
        books = books.filter(book => book.id !== id);
        return deletedBook;
    },
    takeBook: (id) => {
        const bookIndex = books.findIndex(book => book.id === id);
        if (bookIndex === -1) throw new HttpsError(404, 'Book not found');
        books[bookIndex].quantityAvailable -= 1;
    },
    returnBook: (id) => {
        const bookIndex = books.findIndex(book => book.id === id);
        if (bookIndex === -1) throw new HttpsError(404, 'Book not found');
        books[bookIndex].quantityAvailable += 1;
    }

}