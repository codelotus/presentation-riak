'use strict';

var ingest = require('./lib/ingest.js');
var mapr = require('./lib/mapred');

ingest.initializeStockActivities(["SBUX"]);

mapr.floatingAverage();
mapr.averageVolume();
