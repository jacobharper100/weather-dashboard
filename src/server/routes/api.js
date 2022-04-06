const express = require('express');
const router = express.Router();
const controller = require('../stations/controller')
const mongoose = require('mongoose');
const Station = mongoose.model('Station');
const Service = mongoose.model('Service');

controller.init();


router.get('/stations', async (req, res) => {
    const stations = await Station.find({});

    try {
        res.send({ results: stations });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/stations', (req, res) => {
    controller.add(req, res);
});

router.put('/stations/:id', (req, res) => {
    controller.update(req, res);
});

router.delete('/stations/:id', (req, res) => {
    controller.remove(req, res);
});

module.exports = router;
