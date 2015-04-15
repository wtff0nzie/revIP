/***************************************************
*               Reverse IP lookup
****************************************************
*
*   About:  Return as much data as possible from an
*           IP address
*
*   Notes:  Auth details required in process.env.revIP
*
****************************************************/
'use strict';

var fetch = require('request'),
    UAs = require('ua-list'),
    ipCache = {},
    keys;


keys = ['query', 'ip', 'countyCode', 'country', 'regionCode', 'regionName', 'city', 'postcode', 'latitude', 'longitude', 'isp', 'org'];


// Convert IP info to JSON
var toJson = function (str) {
    var jStr = str.split(','),
        obj = {};

    keys.forEach(function (key, index) {
        obj[key] = jStr[index].split('"').join('');
    });

    if (obj.query) {
        delete obj.query;
    }

    if (obj.latitude && obj.longitude) {
        obj.geo = [obj.latitude, obj.longitude];
        delete obj.latitude;
        delete obj.longitude;
    }

    return obj;
};


// Fetch from API
var APIfetch = function (IP, callback) {
    var options;

    if (!IP) {
        callback(true);
        return;
    }

    options = {
        url: process.env.revIP + IP,
        jar: true,
        followAllRedirects: true,
        headers: {
            'User-Agent': UAs()
        }
    };

    fetch(options, function (err, res, data) {
        if (err) {
            callback(err, data);
            return;
        }

        callback(null, data);
    });
};


// Get reverse IP info
var reverseIP = function (IP, callback) {
    var cachedData = ipCache[IP];

    if (cachedData) {
        callback(null, cachedData);
        return;
    }

    APIfetch(IP, function (err, data) {
        var json;

        if (err) {
            callback(true, {});
            return;
        }

        json = toJson(data);
        ipCache[IP] = json;

        callback(null, json);
    });
};


// Public API
if (typeof EVENTS !== 'undefined') {
    EVENTS.on('reverseIPLookup', reverseIP);
}
module.exports = reverseIP;