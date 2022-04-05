const { Schema } = require('mongoose');

const Service = new Schema({
    domain: String,
    api_url: String,
    access_key: String
});

module.exports = Service;