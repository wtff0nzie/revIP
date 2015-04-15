getIP = require('./revIP');

getIP('93.107.167.81', function (err, data) {
    if (err) {
        return;
    }

    console.log(data);
});