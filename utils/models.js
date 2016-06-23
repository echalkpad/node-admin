/**
 * Created by danieldihardja on 23/06/16.
 */

module.exports = function() {

	var path    = require('path');
	var app     = require(path.resolve(__dirname, '../server/server'));
	var fs      = require('fs');
	var Promise = require('bluebird');
	var ds 		= app.dataSources.mysqlDs;

	/**
	 * util func to convert snakecase into camelcase
	 * @param str
	 * @returns {string}
	 */
	function camelToDash(str) {
		return str.replace(/\W+/g, '-')
			.replace(/([a-z\d])([A-Z])/g, '$1-$2')
			.toLowerCase();
	}

	/**
	 *	generate a models from a table
	 */
	function generate(targetTable, targetDir) {
		var defer = Promise.pending();

		if(! targetTable) {
			return console.err('targetTable can not be empty');
		}

		if(! targetDir) {
			targetDir = "";
		}
		else targetDir = targetDir + '/';


		var modelPath = "../common/models/";
		var modelConfigFile = path.resolve(__dirname, "../server/model-config.json");


		ds.discoverSchemas(targetTable, {relations:false}, function(err, schema) {

			if(err) {
				return console.log('err', err);
			}

			for(var key in schema) {

				var table = schema[key];

				var modelName = table.name;
				var modelNameDashCase = camelToDash(modelName);

				// 1. create the model module
				var fileContent = 'module.exports = function(/*'+modelName+'*/){};';
				var fileDir = path.resolve(__dirname, modelPath + targetDir);
				var fileName = path.resolve(__dirname, modelPath +  targetDir + modelNameDashCase + ".js");

				if(! fs.existsSync(fileDir)) {
					fs.mkdirSync(fileDir);
				}

				if(! fs.existsSync(fileName)) {
					fs.writeFileSync(fileName, fileContent);
					console.log('created', fileName);
				}

				// 2. create the model json file
				fileName = path.resolve(__dirname, modelPath + targetDir + modelNameDashCase + ".json");

				if(fs.existsSync(fileName)) {
					var currJSON = JSON.parse(fs.readFileSync(fileName));

					// properties to keep

					if(currJSON['base']) {
						table['base'] = currJSON['base'];
					}
					if(currJSON['acls']) {
						table['acls'] = currJSON['acls']
					}

					if(currJSON['options']['relations']) {
						table['options']['relations'] = currJSON['options']['relations'];
					}
					else {
						table['options']['relations'] = {};
					}
				}

				fileContent= JSON.stringify(table, null, 4);
				fs.writeFileSync(fileName, fileContent);

				// 3. update the model config


				var cfg = JSON.parse(fs.readFileSync(modelConfigFile));

				var sources = cfg['_meta']['sources'];
				var modelDir = '../common/models/' + targetDir.toLowerCase();

				var exists = false;
				for(var i=0; i<sources.length; i++) {
					var s = sources[i];
					if(s == modelDir) {
						exists = true;
						break;
					}
				}

				if(! exists) sources.push(modelDir);

				cfg[modelName] = {
					dataSource:'mysqlDs',
					public:true
				};

				fs.writeFileSync(modelConfigFile, JSON.stringify(cfg, null, 2));
				console.log(modelName, ' generated');
			}
			defer.resolve();
		});

		return defer.promise;
	}

	/**
	 * close the db connection
	 */
	function close() {
		ds.disconnect();
	}

	return {
		generate: generate,
		close: close
	}
};