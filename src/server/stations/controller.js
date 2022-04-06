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

/** Get a list of all stations */
controller.get = async function (req, res) {
    let stations = [];
    Object.values(controller.stations).forEach(record => {
        let station = {
            _id: record.station._id,
            station_name: record.station.station_name,
            station_api: record.station.station_api,
            station_location: record.station.station_location,
            station_online: record.station.station_online,
            station_weather: record.data?.station_weather,
            station_temp: record.data?.station_temp,
            station_pressure: record.data?.station_pressure,
            station_humidity: record.data?.station_humidity
        };
        stations.push(station);
    });

    res.send({ results: stations });
}

/** Adds a new station to the station pool with an assigned ID. */
controller.add = async function (req, res) {
    const addedStation = new Station(req.body);
    
    try {
        await addedStation.save();

        controller.stations[addedStation._id.toString()] = {
            station: addedStation,
            data: null
        };

        if (!spawnWorker(addedStation)) {
            await Station.findByIdAndDelete(addedStation._id);
        }

        console.log('[!] Created station (%s)', addedStation.station_name);

        res.status(200).send(addedStation);
    } catch (err) {
        res.status(500).send(err);
    }
};

/** Updates an existing station. */
controller.update = async function (req, res) {
    try {
        const updates = { station_online: req.body.station_online };
        const updatedStation = await Station.findByIdAndUpdate(req.params.id, updates, { new: true });

        controller.stations[updatedStation._id.toString()].station = updatedStation;
        if (!updatedStation.station_online) {
            controller.stations[updatedStation._id.toString()].data = null;
        }

        sendUpdateMessage(updatedStation);

        console.log('[!] Updated station (%s), online:(%s)', updatedStation.station_name, updatedStation.station_online);

        res.status(200).send(updatedStation);
    } catch (err) {
        res.status(500).send(err);
    }
};

/** Removes a station from the pool AND storage. */
controller.remove = async function (req, res) {
    try {
        const deletedStation = await Station.findByIdAndDelete(req.params.id);

        if (!deletedStation) {
            res.status(404).send("No station found");
        } else {
            
            delete controller.stations[deletedStation._id.toString()];
            pool.kill(deletedStation)

            console.log('[!] Deleted station (%s)', deletedStation.station_name);
            
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

function spawnWorker(station) {
    const worker = pool.spawn(station);
    const success = worker !== null;

    if (success) {
        controller.stations[station._id.toString()] = {
            station: station,
            data: null
        };
      
        worker.once('spawn', () => {
            console.log('[!] Spawned worker process PID:[%d], Name:(%s), api:(%s), id:(%s)',
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
    console.log('[!] Station (%s) queried API data', station.station_name);
    controller.stations[station._id.toString()].data = message;
});

pool.on('error', (station, err) => {
    // TODO: respond to an error in the station worker
});

pool.on('exit', (station, code, signal) => {
    // TODO: attempt to spawn another worker if the station still exists
});
