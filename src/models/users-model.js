const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');

let users = [
    { id: '1', name: 'Thalys Cotta', email: 'thalysm.cotta@gmail.com', password: '123123'},
    { id: '2', name: 'John Doe', email: 'aaa@aaa.aaa', password: '123123' }
]


module.exports = {

    getAllUsers: () => users,

    getUserByID: (id) => users.find(user => user.id === id),

    getUserByEmail: (email) => users.find(user => user.email === email),

    createUser: (name, email, password) => {
        const newUser = {
            id: uuid(),
            name,
            email,
            password: bcrypt.hashSync(password, 10)
        };
        users.push(newUser);
        return newUser;
    }

}