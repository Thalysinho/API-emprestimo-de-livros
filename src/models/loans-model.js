const { v4: uuid } = require('uuid');
const HttpsError = require("../errors/HttpsError");
const booksModel = require("./books-model");

let loans = [
    {
        id: '1',
        userid: '1',
        bookid: '1',
        loanDate: new Date('2026-01-01'),
        returnDate: null,
        isReturned: false,
        isLate: true
    }
]

module.exports = {
    getAllLoans: () => loans,

    getLoanById: (id) => loans.find(loan => loan.id === id),

    createLoan: (user, book) => {
        if (book.quantityAvailable < 1) throw new HttpsError(400, 'Book not available for loan');

        // date manipulation to set return date 14 days from loan date
        const today = new Date();
        const returnDate = new Date();
        returnDate.setDate(today.getDate() + 14); 

        const newLoan = {
            id: uuid(),
            userid: user.id,
            bookid: book.id,
            loanDate: today,
            returnDate: returnDate,
            isReturned: false,
            isLate: false
        };

        loans.push(newLoan);
        booksModel.takeBook(book.id);
        return newLoan;
    },

    returnLoan: (id) => {
        const loanIndex = loans.findIndex(loan => loan.id === id);
        if (loanIndex === -1) throw new HttpsError(404, 'Loan not found');

        const loan = loans[loanIndex];
        if (loan.isReturned) return null;

        loan.isReturned = true;

        const today = new Date();
        const limitDate = new Date(loan.returnDate);
        loan.isLate= today > limitDate; // if the return date is past the limit date, the loan is late
        loan.returnDate = today;

        booksModel.returnBook(loan.bookid)
        return loan;
    }
}    