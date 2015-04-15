var fetch = require('request'),
    getIP = require('./revIP');

getIP('93.107.167.81', function (err, data) {
    if (err) {
        return;
    }

    fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + data.geo[0] + '&lon=' + data.geo[1], function (err, res, data) {
        console.log(data)
    });
});