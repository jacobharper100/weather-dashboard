require('dotenv').config({ path: '../../.env' });

const express = require('express');
const app = express();

// Setup database
const mongoose = require('mongoose');
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '27017';

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}`, {
    dbName: 'weather-dashboard',
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
});

mongoose.model('Station', require('./models/station'));
mongoose.model('Service', require('./models/service'));

// Attach routing middleware
app.use(require('./routes/index'));

// Get PORT from environment, default to 3000
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => console.log('server started'));
