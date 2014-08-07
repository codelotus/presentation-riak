/*
 * ingest
 * https://github.com/codelotus/market-ingest
 *
 * Copyright (c) 2014 Brian Ehmann
 * Licensed under the MIT license.
 */

'use strict';

var load = require("./load");
var store = require("./store");
var parser = require("./parser");

var EventEmitter = require("events").EventEmitter;

module.exports = {

    initializeStockActivities: function(symbols) {
        symbols.forEach(function(symbol) {
            load.getStockActivities(symbol, function(err, res) {
                if(err) { console.log(err); }
                var dataset = JSON.parse(res);
                var titles = parser.titlesToKeys(parser.extractTitles(dataset));
                var recordEvents = new EventEmitter();
                recordEvents.on('record', function(record){
                    var stockRecord = parser.keyToValuePairs(titles, record);
                    var recordKey = symbol + ':' + stockRecord.date;
                    store.storeStockActivity("stock_activities", recordKey, stockRecord);
                });
                parser.extractRecords(dataset, recordEvents);
            });
        });
    }

};
