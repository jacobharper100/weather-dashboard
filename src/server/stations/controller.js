const mongoose = require('mongoose');
const Station = mongoose.model('Station');
const Service = mongoose.model('Service');
const pool = require('./pool');
const controller = {};

controller.stations = {};

controller.init = function () {
    pool.clear();

    // Find and spawn all stations stored in the database
    Station.find({}, (err, stations) => {
        if (err) {
            console.error(err);
            return;
        }

        stations.forEach((station) => {
            // HACK: ideally we'd use controller.add, but we don't want to attempt to create a database entry.
            //  Really, we should just extract the logic inside the create callback and call that directly.
            if (pool.spawn(station) !== null) {
                controller.stations[station._id] = {
                    station: station,
                    data: null
                };

                controller.update(station);
            }
        });
    });
};

controller.add = function (station) {
    Station.create(station, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        controller.stations[station._id] = {
            station: station,
            data: null
        };

        const worker = pool.spawn(station);

        worker.once('spawn', () => {
            Service.findOne({ domain: station.station_api }, (err, service) => {
                if (err) {
                    console.error(err);
                    return;
                }

                worker.send({
                    station: station,
                    service: service
                });
            });
        });
    });
};

controller.update = function (station) {
    if (!(station._id in controller.stations)) {
        controller.add(station);
    } else {
        Station.replaceOne({ _id: station._id }, station, (err) => {
            if (err) {
                console.error(err);
                return;
            }

            Service.findOne({ domain: station.station_api }, (err, service) => {
                if (err) {
                    console.error(err);
                    return;
                }

                pool.send(station, {
                    station: station,
                    service: service
                });

                controller.stations[station._id].station = station;
            });
        });
    }
};

controller.remove = function (station) {
    Station.findOneAndDelete({ _id: station._id }).exec();
    delete controller.stations[station._id];
    pool.kill(station);
};

module.exports = controller;

pool.on('message', (station, message) => {
    controller.stations[station._id].data = message;
});

pool.on('error', (station, err) => {
    // TODO: respond to an error in the station worker
});

pool.on('exit', (station, code, signal) => {
    // TODO: attempt to spawn another worker if the station still exists
});
