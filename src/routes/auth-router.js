const express = require('express');
const authController = require('../controllers/auth-controller');
const authMiddleware = require('../middleware/auth-middleware');
const router = express.Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

router.get('/protected', authMiddleware.esureAuth, (req, res) =>  res.json({ message: 'ok'}));

module.exports = router;