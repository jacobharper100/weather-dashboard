const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/dashboard', function(req, res) {
    res.send("BOOP");
});

///

app.get('/ping', (req, res) => {
    res.send('Pong!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});