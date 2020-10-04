const express = require('express');
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');
const mongoose = require('mongoose');

/* Import and use Endpoints */

const testimonialsRoute = require('./routes/testimonials.routes');
const concertsRoute = require('./routes/concerts.routes');
const seatsRoute = require('./routes/seats.routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '/client/build')))

app.use('/api', testimonialsRoute);
app.use('/api', concertsRoute);
app.use('/api', seatsRoute);

app.use((req, res, next) => {
   req.io = io;
   next();
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json({message: 'Error 404 Page not found...'})
});

/* Start DataBase */

mongoose.connect('mongodb+srv://' + process.env.Log + ':' + process.env.Pas + '@cluster0.hud0b.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => console.log('Error ' + err));

/* Start Server */

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

/* Create use of socket */

const io = socket(server);

io.on('connection', (socket) => {
    console.log(`New socket! ${socket.id}`);
});