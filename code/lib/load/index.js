'use strict';

var Quandl = require("quandl");
var quandl = new Quandl();

module.exports = {

    getStockActivities: function(symbol, callback) {
        quandl.dataset({ source: "WIKI", table: symbol }, callback);
    }
};