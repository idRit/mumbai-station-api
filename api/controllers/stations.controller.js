let stations_v1 = require('../resources/csvStations/stations_v1.json');

exports.returnPrefferedRoute = (req, res) => {
    stations_v1.push({ version: 1 });
    res.json(stations_v1);    
}