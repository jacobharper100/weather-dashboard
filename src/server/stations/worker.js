const { CronJob, CronTime } = require('cron');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const job = new CronJob('0 * * * * *', onTick);

let station = {};
let service = {};

function onTick() {
    

    // Call web service API and send data to parent via IPC
    // process.send(data);
}

process.on('message', (message) => {
    station = message.station;
    service = message.service;

    if (station.station_online === true) {
        job.setTime(new CronTime(service.cron_time));
        job.start();
    } else {
        job.stop();
    }
});
