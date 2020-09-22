const express = require('express');
const router = express.Router();
const ConcertsController = require('../controllesrs/concerts.controller');

router.get('/concerts', ConcertsController.getAll);

router.get('/concerts/:id', ConcertsController.getById);

router.post('/concerts', ConcertsController.postNew);

router.delete('/concerts/:id', ConcertsController.removeById);

router.put('/concerts/:id', ConcertsController.updateById);

module.exports = router;