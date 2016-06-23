/**
 * Created by danieldihardja on 22/06/16.
 */

var gulp = require('gulp');
var models = require('./utils/models')();
var Promise = require('bluebird');

gulp.task('models', function (cb) {

	/**
	 * generate a model based on the table info
	 * @param table
	 * @returns {*}
	 */
	function generateModel(table) {
		return models.generate(table)
	}

	/**
	 * close the datasource
	 */
	function end() {
		models.close();
		cb();
	}

	generateModel('dialog')
		.then(generateModel('dialog_type'))
		.then(generateModel('thema'))
		.then(generateModel('tracker_type'))
		.then(generateModel('user_option'))
		.then(end);
});