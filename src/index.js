const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Blog = require('./models/blog');
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Home Page - Display all blogs
app.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.render('home', { blogs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mount auth routes
app.use(authRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
