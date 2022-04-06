const { Schema } = require('mongoose');

const Station = new Schema({
    station_name: String,
    station_api: String,
    station_location: String,
    station_online: Boolean,
    station_weather: String,
    station_temp: Number,
    station_pressure: Number,
    station_humidity: Number
});

module.exports = Station;
