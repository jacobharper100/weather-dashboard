const mongoose = require('mongoose');
const Station = mongoose.model('Station');
const Service = mongoose.model('Service');
const pool = require('./pool');
const controller = {};

controller.stations = {};

/** Initialize the station pool. */
controller.init = function () {
    pool.clear();

    // Find and spawn all stations stored in the database
    Station.find({}, (err, stations) => {
        if (err) {
            console.error(err);
        } else {
            stations.forEach((station) => {
                spawnWorker(station);
            });
        }
    });
};

/** Adds a new station to the station pool with an assigned ID. */
controller.add = function (station) {
    return Station.create(station).then((err, station) => {
        if (err) {
            console.error(err);
        } else if (!spawnWorker(station)) {
            Station.findByIdAndDelete(station._id);
        }
    }).then(() => station);
};

/** Updates an existing station. */
controller.update = function (station) {
    if (!(station._id in controller.stations)) {
        return controller.add(station);
    } else {
        return Station.replaceOne({ id: station._id }, station).exec((err) => {
            if (err) {
                console.error(err);
            } else {
                controller.stations[station._id].station = station;
                sendUpdateMessage(station);
            }
        }).then(() => station);
    }
};

/** Removes a station from the pool AND storage. */
controller.remove = function (station) {
    return Station.findByIdAndDelete(station._id).exec(() => {
        delete controller.stations[station._id];
        pool.kill(station);
    }).then(() => station);
};

function spawnWorker(station) {
    const worker = pool.spawn(station);
    const success = worker !== null;

    if (success) {
        controller.stations[station._id] = {
            station: station,
            data: null
        };

        worker.once('spawn', () => {
            console.log('spawned worker .. PID:[%d], name:"%s", api:"%s", id:"%s"',
                worker.pid,
                station.station_name,
                station.station_api,
                station._id.toString()
            );

            sendUpdateMessage(station);
        });
    }

    return success;
}

function sendUpdateMessage(station) {
    Service.findOne({ domain: station.station_api }, (err, service) => {
        if (err) {
            console.error(err);
        } else if (service !== null) {
            pool.send(station, {
                station: station,
                service: service
            });
        } else {
            console.warn('service with domain "%s" is not registered!');

            // Force station offline
            pool.send(station, {
                station: { station_online: false },
                service: {}
            });
        }
    });
}

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
