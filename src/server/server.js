const express = require('express');
const app = express();

// Get PORT from environment, default to 3000
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'));