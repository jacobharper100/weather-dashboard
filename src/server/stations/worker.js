const { CronJob, CronTime } = require('cron');
const job = new CronJob('0 * * * * *', onTick);
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

let station = {};
let service = {};

function onTick() {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${station.station_location}&limit=1&appid=${service.access_key}`)
        .then(res => res.json())
        .then(location => {
            // Use the top result for now
            const { lat, lon } = location[0];
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${service.access_key}`)
                .then(res => res.json())
                .then(weather => {
                    
                    // Process the data
                    let weather_data = {
                        station_weather: weather.weather[0].main,
                        station_temp: (Math.round((weather.main.temp - 273.15) * 100) / 100) + 'C',
                        station_pressure: weather.main.pressure,
                        station_humidity: weather.main.humidity + '%'
                    };

                    // Call web service API and send data to parent via IPC
                    process.send(weather_data);
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
