const HttpsError = require("../errors/HttpsError")
const booksModel = require("../models/books-model")
const loansModel = require("../models/loans-model")

module.exports = {
  // GET /api/loans
  index: (req, res) => {
    const loans = loansModel.getAllLoans();
    res.json(loans);
  },

  // GET /api/loans/:id
  show: (req, res) => {
    const { id } = req.params;
    const loan = loansModel.getLoanById(id);
    if (!loan) throw new HttpsError(404, 'Loan not found');
    res.json(loan);
  },

  // POST /api/loans
  save: (req, res) => {
    const user = req.user;
    const { bookid } = req.body;

    if (typeof bookid !== 'string') throw new HttpsError(400, 'ID de livro inválido!');

    const book = booksModel.getBookByID(bookid);
    if (!book) throw new HttpsError(404, 'Livro não encontrado!');
    
    const newLoan = loansModel.createLoan(user, book);
    res.status(201).json(newLoan);
  },

  // POST /api/loans/:id/return
  return: (req, res) => {
    const { id } = req.params;
    const loan = loansModel.returnLoan(id);
    res.json(loan);
  }
}