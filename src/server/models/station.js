const { Schema } = require('mongoose');

const Station = new Schema({
    id: Number,
    station_name: String,
    station_api: String,
    station_location: String,
    station_online: Boolean
});

module.exports = Station;