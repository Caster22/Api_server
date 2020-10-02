const express = require('express');
const router = express.Router();
const ConcertsController = require('../controllesrs/concerts.controller');

router.get('/concerts', ConcertsController.getAll);

router.get('/concerts/:id', ConcertsController.getById);

router.get('/concerts/performer/:performer', ConcertsController.getByPerformer);

router.get('/concerts/genre/:genre', ConcertsController.getByGenre);

router.get('/concerts/price/:price_min/:price_max', ConcertsController.getByPriceRange);

router.get('/concerts/price/day/:day', ConcertsController.getByDay);

router.post('/concerts', ConcertsController.postNew);

router.delete('/concerts/:id', ConcertsController.removeById);

router.put('/concerts/:id', ConcertsController.updateById);

module.exports = router;