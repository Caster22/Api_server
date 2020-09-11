const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const testimonialsRoute = require('./routes/testimonials.routes');
const concertsRoute = require('./routes/concerts.routes');
const seatsRoute = require('./routes/seats.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '/client/build')))

app.use('/api', testimonialsRoute);
app.use('/api', concertsRoute);
app.use('/api', seatsRoute);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json({message: 'Error 404 Page not found...'})
});

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});