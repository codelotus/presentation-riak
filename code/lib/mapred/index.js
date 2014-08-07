var db = require('riak-js').getClient({host: "192.168.33.10", port: "10018"});


module.exports = {

    floatingAverage: function() {
        db.mapreduce
            .add({
                bucket: 'stock_activities',
                key_filters: [
                    [ "and",
                        [
                            ["tokenize", ":", 1],
                            ["eq", "SBUX"]
                        ],
                        [
                            ["tokenize", ":", 2],
                            ["string_to_int"],
                            ["between", 20140709, 20140805]
                        ]
                    ]
                ]
            })
            .map(function (obj) {
                var data = JSON.parse(obj.values[0].data);
                return [
                     [ parseInt(data.date), data.close ]
                ];
            })
            .reduce(function (objects) {
                var sum = 0;
                objects.forEach(function (obj) {
                    sum = sum + obj[1];
                });
                return [sum / objects.length];
            })
            .run(function (err, data) {
                console.log("Err: " + err);
                console.log("Floating Average Data: " + JSON.stringify(data));
            });
    },

    averageVolume: function() {
        db.mapreduce.add('stock_activities')
            .map(function(obj) {
                var data = JSON.parse(obj.values[0].data);
                return [
                    [ data.date, data.open, data.close, data.volume ]
                ];
            })
//            .map(function(obj) {
//                var movement = Math.round(obj[2] - obj[1]);
//                    return [
//                        [ movement, obj[3] ]
//                    ];
//            })
            .reduce(function (objects) {
                var r = {};
                objects.forEach(function (obj) {
                    if((obj[2] - obj[1]) > 1.0) {
                        r[obj[0]] = obj[3];
                    }
                });
                return [ r ];
            })
            .run(function (err, data) {
                console.log("Err: " + JSON.stringify(err));
                console.log("Volume Counts Data: " + JSON.stringify(data));
            });
    }

};