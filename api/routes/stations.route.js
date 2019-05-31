module.exports = (app) => {
    const station = require('../controllers/stations.controller');

    app.get('/', station.returnPrefferedRoute)
}