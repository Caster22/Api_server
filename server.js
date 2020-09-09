const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
    { id: 3, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 4, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
    { id: 5, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 6, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
    { id: 7, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 8, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
    { id: 9, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 10, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});