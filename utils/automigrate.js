/**
 * Created by danieldihardja on 26/04/15.
 */

var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));

var dataSource = app.dataSources.mysqlDs;

var models = [];

// get the models names from the cli args
for(var i=2; i<process.argv.length; i++) {
    models.push(process.argv[i]);
}

// automigrate the models
dataSource.autoupdate(models, function(err) {
    if(err) throw(err);
    dataSource.disconnect();
});
