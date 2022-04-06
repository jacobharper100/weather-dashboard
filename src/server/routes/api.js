const express = require('express');
const router = express.Router();
const controller = require('../stations/controller')
const mongoose = require('mongoose');
const Station = mongoose.model('Station');
require('dotenv').config();

controller.init();

router.get('/stations', async (req, res) => {
    controller.get(req, res);
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
