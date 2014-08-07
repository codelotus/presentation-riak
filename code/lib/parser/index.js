'use strict';

var _ = require('underscore');

module.exports = {

    extractTitles: function(jsonObj) {
        var columnNames = jsonObj['column_names'];
        return columnNames;
    },

    titlesToKeys: function(titles) {
        var keys = [];
        titles.forEach(function(title) {
          keys.push(title.toLowerCase().replace(/\s/g, '_').replace(/\./g,''));
        });
        return keys;
    },

    extractRecords: function(jsonObj, ee) {
        var records = jsonObj["data"];
        records.forEach(function(record){
            ee.emit('record', record);
        });
    },

    //this.testKeys = ['date', 'itemA', 'itemB'];
    //this.testRecords = ['2012-09-28', 'valueA', 'valueB'];
    // {'date':'20120928', 'itemA':'valueA', 'itemB':'valueB' }

    keyToValuePairs: function(keys, record) {
        var date = record[0];
        record[0] = date.replace(/-/g,''); // remove dashes from dates
        return _.object(keys, record);
    }

};