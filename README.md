# revIP
Get as much information as possible from an IP address.

## Usage

    var getIP = require('./revIP');

    getIP('XXX.XXX.XXX.XXX', function (err, data) {
        if (err) {
            return;
        }

        console.log(data);
    });

## Response JSON
The following keys are return where available.

*query
*ip
*countyCode
*country
*regionCode
*regionName
*city
*postcode
*latitude
*longitude
*isp
*org