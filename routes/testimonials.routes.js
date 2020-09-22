const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllesrs/testimonials.controller');

router.get('/testimonials', TestimonialController.getAll);

router.get('/testimonials/:id', TestimonialController.getById);

router.get('/testimonials/random', TestimonialController.getRandom);

router.post('/testimonials', TestimonialController.postNew);

router.put('/testimonials/:id', TestimonialController.updateById);

router.delete('/testimonials/:id', TestimonialController.removeById);

module.exports = router;