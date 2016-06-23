/**
 * Created by danieldihardja on 22/06/16.
 */

var gulp = require('gulp');
var Promise = require('bluebird');
var models = require('./utils/models')();

gulp.task('models', function (cb) {
	models.generate('dialog')
		.then(function(res) {
			return models.generate('dialog_type')
		})
		.then(function(res) {
			return models.generate('thema')
		})
		.then(function(res) {
			return models.generate('tracker_type')
		})
		.then(function(res) {
			return models.generate('user_option')
		})
		.then(function() {
			models.close();
			cb();
		})
});