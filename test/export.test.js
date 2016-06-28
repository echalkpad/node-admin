/**
 * Created by danieldihardja on 27/06/16.
 */

var app = require('../server/server');
var Promise = require('bluebird');

var CouchDB = app.models.CouchDB;

describe('export', function() {
	describe('dialogs', function() {
		it('should export dialog', function(done) {
			CouchDB.updateDialogs()
				.then(function(res) {
					console.log(res);
					done();
				})
				.catch(function(err) {
				    throw err
				});
		});
	});
});