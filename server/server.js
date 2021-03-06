var loopback = require('loopback');
var boot = require('loopback-boot');

var http = require('http');
var https = require('https');
var sslConfig = require('./ssl-config');

var app = module.exports = loopback();

global.Promise = require('bluebird');

// Fix: 'Error: self signed certificate'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// boot scripts mount components like REST API
boot(app, __dirname);

app.start = function(httpOnly) {

  if (httpOnly === undefined) {
    httpOnly = process.env.HTTP ? true : false;
  }

  var server = null;

  if (!httpOnly) {
    var options = {
      key: sslConfig.privateKey,
      cert: sslConfig.certificate
    };
    server = https.createServer(options, app);
  }
  else {
    server = http.createServer(app);
  }

  server.listen(app.get('port'), function() {
    var baseUrl = (httpOnly ? 'http://' : 'https://') + app.get('host') + ':' + app.get('port');
    app.emit('started', baseUrl);
    console.log('LoopBack server listening @ %s%s', baseUrl, '/');
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
  return server;
};

// start the server if `$ node server.js`
if (require.main === module) {

  // set to true for httpOnly
   //app.start(true);

  // use ssl
  app.start();
}
