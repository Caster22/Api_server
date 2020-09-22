const express = require('express');
const router = express.Router();
const SeatsController = require('../controllesrs/seats.controller');

router.get('/seats', SeatsController.getAll);

router.get('/seats/:id', SeatsController.getById);

router.post('/seats', SeatsController.postNew);

router.delete('/seats/:id', SeatsController.removeById);

router.put('/seats/:id', SeatsController.updateById);

module.exports = router;