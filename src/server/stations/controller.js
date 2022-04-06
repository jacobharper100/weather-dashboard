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
controller.add = async function (req, res) {
    const addedStation = new Station(req.body);
    
    try {
        await addedStation.save();

        controller.stations[addedStation._id.toString()] = addedStation;
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
        const updatedStation = await Station.findByIdAndUpdate(req.params.id, { 
            station_online: !req.body.station_online 
        });
        await updatedStation.save();

        controller.stations[updatedStation._id.toString()] = updatedStation;
        sendUpdateMessage(updatedStation);

        console.log('[!] Updated station (%s)', updatedStation.station_name);

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
            //console.warn('service with domain "%s" is not registered!', station.station_api);

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
    controller.stations[station._id.toString()].data = message;
});

pool.on('error', (station, err) => {
    // TODO: respond to an error in the station worker
});

pool.on('exit', (station, code, signal) => {
    // TODO: attempt to spawn another worker if the station still exists
});
