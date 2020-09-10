const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.filter(item => item.id === parseInt(req.params.id)));
});

router.route('/seats').post((req, res) => {
    const endId = db.seats[db.seats.length - 1].id + 1;
    db.seats.push({
        id: endId,
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email,
    });
    res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
    if(db.seats.indexOf(db.seats.filter(item => item.id === parseInt(req.params.id))[0]) > - 1)
        db.seats.splice(db.seats.indexOf(db.seats.filter(item => item.id === parseInt(req.params.id))[0]), 1);
    res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
    db.seats.filter(item => item.id === parseInt(req.params.id)).forEach(item => {
        item.day = req.body.day;
        item.seat = req.body.seat;
        item.client = req.body.client;
        item.email = req.body.email;
    });

    res.json({ message: 'OK' });
});

module.exports = router;