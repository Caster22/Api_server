const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db');

const app = express();

const testimonialRoute = require('./routes/testimonials.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/', testimonialRoute);

app.use((req, res) => {
    res.status(404).json({message: 'Error 404 Page not found...'})
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});