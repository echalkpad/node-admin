/**
 * Created by danieldihardja on 27/06/16.
 */

var app = require('../server/server');
var Promise = require('bluebird');

var CouchDB = app.models.CouchDB;

describe('export', function() {

	describe('updateAll', function() {
		it('should update all docs', function(done) {
			CouchDB.updateAll()
				.then(function(res) {
					console.log(res);
					done();
				})
				.catch(function(err) {
					throw err
				});
		});
	});

	describe('sensorType', function() {
		it('should export sensor types', function(done) {
			CouchDB.updateSensorTypes()
				.then(function(res) {
					console.log(res);
					done();
				})
				.catch(function(err) {
					throw err
				});
		});
	});

	describe('themes', function() {
		it('should export themes', function(done) {
			CouchDB.updateThemes()
				.then(function(res) {
					console.log(res);
					done();
				})
				.catch(function(err) {
					throw err
				});
		});
	});

	describe('dialogs', function() {
		it('should export dialogs', function(done) {
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

	describe('dialogBlocks', function() {
		it('should export dialog boxes', function(done) {
			CouchDB.updateDialogBlocks()
				.then(function(res) {
					console.log(res);
					done();
				})
				.catch(function(err) {
				    throw err
				});
		});
	});

	describe('designDocs', function() {
		it('should update design docs', function(done) {
			CouchDB.updateDesignDocs()
				.then(function(res) {
					done();
				})
				.catch(function(err) {
				    throw err
				});

		});
	})
});