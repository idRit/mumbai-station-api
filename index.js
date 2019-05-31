const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./api/routes/stations.route.js')(app);

app.listen(3000);
console.log('listening on port 3000');