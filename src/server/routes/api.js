const express = require('express');
const router = express.Router();
const controller = require('../stations/controller')

controller.init();

router.get('dashboard', (req, res) => {
    // TODO: return a list of StationData objects
    // const stationData = Object.values(controller.stations);
});

router.get('stations', (req, res) => {
    // TODO: return a list of Station objects
    // const stations = Object.values(controller.stations).map(value => value.station);
});

router.post('stations', (req, res) => {
    // TODO: add a new station
    // controller.add(station);
});

router.put('stations', (req, res) => {
    // TODO: update an existing station
    // controller.update(station);
});

router.delete('stations', (req, res) => {
    // TODO: remove a station
    // controller.remove(station);
});

module.exports = router;
