const usersModel = require('../models/users-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const HttpsError = require('../errors/HttpsError');

module.exports = {

    //POST /auth/login
    login: (req, res) => {
        const { email, password } = req.body;
        if (typeof email !== 'string' || typeof password !== 'string') throw new HttpsError(400,'Email and password are required' );
        const userExisting = usersModel.getUserByEmail(email);
        if (!userExisting) return res.status(400).json({ message: 'Invalid email or password' });
        const isValidPassword = bcrypt.compareSync(password, userExisting.password);
        if (!isValidPassword) return res.status(401).json({ message: 'Invalid email or password' });

        const payload = { id: userExisting.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    },

    //POST /auth/register
    register: (req, res) => {
        const { name, email, password } = req.body;
        if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') return res.status(400).json({ message: 'Name, email and password are required' });
        
        const existingUser = usersModel.getUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });
        
        const newUser = usersModel.createUser(name, email, password);
        res.status(201).json( { ...newUser, password: undefined } );
    }
    


}