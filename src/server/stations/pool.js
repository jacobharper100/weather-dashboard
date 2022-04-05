const { fork } = require('child_process');
const EventEmitter = require('events');
const pool = new EventEmitter();

pool.workers = {};

pool.spawn = function (station) {
    if (station.id in pool.workers) {
        console.error('failed to spawn station worker with duplicate id: %d', station.id);
        return null;
    }

    const worker = fork(`${__dirname}/worker.js`);

    worker.on('message', (message, handle) => {
        pool.emit('message', station, message, handle);
    });

    worker.on('error', (err) => {
        pool.emit('error', station, err);
    });

    worker.once('exit', (code, signal) => {
        delete pool.workers[station.id];
        pool.emit('exit', station, code, signal);
    });

    pool.workers[station.id] = worker;
    return worker;
};

pool.send = function (station, message) {
    return pool.workers[station.id].send(message);
};

pool.kill = function (station, ...args) {
    const worker = pool.workers[station.id];
    Reflect.apply(worker.kill, worker, args);
}

pool.clear = function () {
    for (const worker of Object.values(pool.workers)) {
        worker.kill();
    }
};

module.exports = pool;
