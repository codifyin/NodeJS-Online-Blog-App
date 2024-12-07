const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../config');

const router = express.Router();

// Signup Page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Signup Handler
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error signing up');
    }
});

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Login Handler
router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.redirect('/');
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

module.exports = router;
