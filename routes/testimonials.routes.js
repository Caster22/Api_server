const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials.filter(item => item.id === parseInt(req.params.id)));
});

router.route('/testimonials/random').get((req, res) => {
    const randomEl = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
    res.json(db.testimonials.filter(item => item.id === parseInt(req.params.id)));
});

router.route('/testimonials').post((req, res) => {
    const endId = db.testimonials[db.testimonials.length - 1].id + 1;
    db.testimonials.push({
        id: endId,
        author: req.body.author,
        text: req.body.text,
    });
    res.json({ message: 'OK'});
});

router.route('/testimonials/:id').put((req, res) => {
    db.testimonials.filter(item => item.id === parseInt(req.params.id)).forEach(item => {
        item.author = req.body.author;
        item.text = req.body.text;
    });
    res.json({ message: 'OK'});
});

router.route('/testimonials/:id').delete((req, res) => {
    if(db.testimonials.indexOf(db.testimonials.filter(item => item.id === parseInt(req.params.id))[0]) > - 1)
        db.testimonials.splice(db.testimonials.indexOf(db.testimonials.filter(item => item.id === parseInt(req.params.id))[0]), 1);
    res.json({ message: 'OK'});
});

module.exports = router;