const express = require('express');
const router = express.Router();
const controller = require('../stations/controller')

controller.init();

router.route('/stations')
    .get((_req, res) => {

        const stationsList = Object.values(controller.stations)
            .map(value => value.station);

        res.status(200).send({ results: stationsList });
    })
    .post((req, res) => {
        // controller.add(req.body).then(json => {
        //     return res.status(200).json(json);
        // });
        res.status(200).send();
    })
    .put((_req, res) => {
        // controller.update(req.body).then(json => {
        //     return res.status(200).json(json);
        // });
        res.status(200).send();
    })
    .delete((_req, res) => {
        // controller.remove(req.body).then(json => {
        //     return res.status(200).json(json);
        // });
        res.status(200).send();
    })

module.exports = router;
