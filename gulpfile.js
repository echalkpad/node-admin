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

	generateModel('sensor_type')
		.then(generateModel('thema'))
		.then(generateModel('dialog'))
		.then(generateModel('mood'))
		.then(generateModel('sentence'))
		.then(generateModel('dialog_sentence'))
		.then(generateModel('user_input'))

		// TODO:
		// fix this. somehow it closes before all generation are completed
		//.then(end);
});