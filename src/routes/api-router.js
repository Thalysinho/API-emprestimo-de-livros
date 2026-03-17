const express = require('express');
const booksController = require('../controllers/books-controller');
const loansController = require('../controllers/loans-controller');
const { esureAuth } = require('../middleware/auth-middleware');

const apiRouter = express.Router();

//Public routes
apiRouter.get('/api/books', booksController.getAllBooks);
apiRouter.get('/api/books/:id', booksController.getBookByID);
//Authentication routes...
apiRouter.post('/api/books', booksController.createBook);
apiRouter.put('/api/books/:id', booksController.updateBook);
apiRouter.delete('/api/books/:id', booksController.deleteBook);

apiRouter.get('/api/loans', loansController.index);
apiRouter.get('/api/loans/:id', loansController.show);
apiRouter.post('/api/loans', esureAuth ,loansController.save);
apiRouter.post('/api/loans/:id/return', esureAuth, loansController.return);

module.exports = apiRouter