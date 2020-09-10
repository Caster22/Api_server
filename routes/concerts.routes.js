const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.filter(item => item.id === parseInt(req.params.id)));
});

router.route('/concerts').post((req, res) => {
    const endId = db.concerts[db.concerts.length - 1].id + 1;
    db.concerts.push({
        id: endId,
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image,
    });
    res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
    if(db.concerts.indexOf(db.concerts.filter(item => item.id === parseInt(req.params.id))[0]) > - 1)
        db.concerts.splice(db.concerts.indexOf(db.concerts.filter(item => item.id === parseInt(req.params.id))[0]), 1);
    res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
    db.concerts.filter(item => item.id === parseInt(req.params.id)).forEach(item => {
        item.performer = req.body.performer;
        item.genre = req.body.genre;
        item.price = req.body.price;
        item.day = req.body.day;
        item.image = req.body.image;
    });

    res.json({ message: 'OK' });
});

module.exports = router;