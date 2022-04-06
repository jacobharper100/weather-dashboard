const { CronJob, CronTime } = require('cron');
const job = new CronJob('0 * * * * *', onTick);

let station = {};
let service = {};

function onTick() {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${station.station_location}&limit=1&appid=${process.env.WEATHER_API_KEY}`)
        .then(res => res.json())
        .then(location => {
            // Use the top result for now
            const { lat, lon } = location[0];
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`)
                .then(res => res.json())
                .then(weather => {
                    console.log(weather);
                    // Call web service API and send data to parent via IPC
                    process.send(weather);
                });
        });
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
