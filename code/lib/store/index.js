'use strict';

var db = require('riak-js').getClient({host: "192.168.33.10", port: "10018"});
var EventEmitter = require("events").EventEmitter;

module.exports = {

    storeStockActivity: function(bucketName, symbol, record) {
        var ee = new EventEmitter();
        var meta = {};
        db.save(bucketName, symbol, record, meta, function(err) {
            if(err) {
                console.log(err);
                ee.emit('err', err);
            }
            else {
                ee.emit('done');
            }
        });
        return ee;
    }

};
