module.exports = function(CouchDB) {

	var host = process.env.COUCHDB_HOST || '192.168.99.100';
	var port = process.env.COUCHDB_PORT || 5984;
	var couchDBUrl = 'http://' + host + ':' + port;
	var nano = require('nano')(couchDBUrl);
	var chardb = nano.db.use('character');

	/**
	 *
	 */
	CouchDB.updateAll = function() {
		var defer = Promise.pending();

		CouchDB.updateThemes()
			.then(function(res) {
				return CouchDB.updateDialogs();
			})
			.then(function(res) {
				return CouchDB.updateDialogBlocks();
			})
			.then(function(res) {
				defer.resolve({status: 'ok'});
			})
			.catch(function(err) {
			    defer.reject(err);
			});
		return defer.promise;
	};

	/**
	 * update sensor type docs
	 */
	CouchDB.updateSensorTypes = function() {
		var defer = Promise.pending();
		var models = CouchDB.app.models;
		var SensorType = models.SensorType;
		SensorType.find()
			.then(function(res) {
				var promises = [];
				for(var i=0; i<res.length; i++) {
					var senType = res[i];
					senType._id = 'SensorType-' + senType.id;
					promises.push(writeDoc(senType));
				}
				return Promise.all(promises);
			})
			.then(function(res) {
				defer.resolve({status: 'ok'})
			})
			.catch(function(err) {
			    defer.reject(err);
			});
		return defer.promise;
	};

	/**
	 * update Theme Docs
	 */
	CouchDB.updateThemes = function() {
		var defer = Promise.pending();
		var models = CouchDB.app.models;
		var Theme = models.Theme;
		Theme.find()
			.then(function(res) {
				var promises = [];
				for(var i=0; i<res.length; i++) {
					var theme = res[i];
					theme._id = 'Theme-' + theme.id;
					promises.push(writeDoc(theme));
				}
				return Promise.all(promises);
			})
			.then(function(res) {
				defer.resolve({status: 'ok'});
			})
			.catch(function(err) {
			    defer.reject(err);
			});
		return defer.promise;
	};

	/**
	 * Update Dialog Docs
	 */
	CouchDB.updateDialogs = function() {
		var defer = Promise.pending();
		var models = CouchDB.app.models;
		var Dialog = models.Dialog;
		Dialog.find()
			.then(function(res) {
				var promises = [];
				for(var i=0; i<res.length; i++) {
					var dialog = res[i];
					dialog._id = 'Dialog-' + dialog.id;
					promises.push(writeDoc(dialog));
				}
				return Promise.all(promises)
			})
			.then(function(res) {
				defer.resolve({status: 'ok'});
			})
			.catch(function(err) {
			    defer.reject(err);
			});
		return defer.promise;
	};

	/**
	 *	update Dialog Blocks
	 */
	CouchDB.updateDialogBlocks = function() {
		var defer = Promise.pending();

		var models = CouchDB.app.models;
		var DialogBlock = models.DialogBlock;

		var q = {
			include: [
				{relation: 'dialogSentences', scope: {include: 'sentence'}},
				{relation: 'dialogInputs', scope: {include: 'input'}}
			]
		};

		DialogBlock.find(q)
			.then(function(res) {
				var tmp = [];
				for(var i=0; i<res.length; i++) {

					var r = res[i].toJSON();
					var dialogBlock = {};

					dialogBlock._id = 'DialogBlock-' + r.id;
					dialogBlock.id = r.id;
					dialogBlock.title = r.title;
					dialogBlock.description = r.description;
					dialogBlock.isEntryPoint = r.isEntryPoint;
					dialogBlock.dialogId = r.dialogId;
					dialogBlock.sentences = [];
					dialogBlock.inputs = {};
					dialogBlock.type = r.type;


					for(var j=0; j<r.dialogSentences.length; j++) {
						dialogBlock.sentences.push(r.dialogSentences[j].sentence);
					}

					var inputTypeTable = {};

					for(var j=0; j<r.dialogInputs.length; j++) {
						var dInput = r.dialogInputs[j];
						var input = dInput.input;
						input.nextDialogBlockId = dInput.nextDialogBlockId;

						if(! inputTypeTable[input.inputType]) inputTypeTable[input.inputType] = [];
						inputTypeTable[input.inputType].push(input);

						//console.log('input', input);

					}
					dialogBlock.inputs = inputTypeTable;
					tmp.push(dialogBlock);
				}

				var promises = [];
				for(var i=0; i<tmp.length; i++) {
					var block = tmp[i];
					promises.push(writeDoc(block));
				}
				return Promise.all(promises);
			})
			.then(function(res) {
				defer.resolve({status: 'ok'})
			})
			.catch(function(err) {
			    defer.reject(err);
			});
		return defer.promise;
	};

	/**
	 *
	 */
	CouchDB.updateDesignDocs = function() {
		var defer = Promise.pending();

		//--------------------------//
		// Query sensor type by id
		//--------------------------//

		function sensorTypeById() {
			return function(doc) {
				if(doc.type == 'SensorType') {
					emit(doc.id, doc);
				}
			}
		}

		//--------------------------//
		// query Theme by its id
		//--------------------------//

		function themeById() {
			return function(doc) {
				if(doc.type == 'Theme') {
					emit(doc.id, doc);
				}
			}
		}

		//--------------------------//
		// query Theme by sensorType id
		//--------------------------//

		function themeBySensorType() {
			return function(doc) {
				if(doc.type == 'Theme') {
					emit(doc.sensorTypeId, doc);
				}
			}
		}

		//--------------------------//
		// query Dialog by its id
		//--------------------------//

		function dialogById() {
			return function(doc) {
				if(doc.type == 'Dialog') {
					emit(doc.id, doc);
				}
			}
		}

		//--------------------------//
		// query DialogBlock by its id
		//--------------------------//

		function dialogBlockById() {
			return function(doc) {
				if(doc.type == 'DialogBlock') {
					emit(doc.id, doc);
				}
			}
		}

		//--------------------------//
		// query Dialog by Theme id
		//--------------------------//

		function dialogByThemeId() {
			return function(doc) {
				if(doc.type == 'Dialog') {
					emit(doc.themeId, doc);
				}
			}
		}

		//--------------------------//
		// query DialogBlock by Dialog id
		//--------------------------//

		function dialogBlockByDialogId() {
			return function(doc) {
				if(doc.type == 'DialogBlock') {
					emit(doc.dialogId, doc);
				}
			}
		}

		designDoc('SensorType', 'by_id', sensorTypeById())
			.then(function(res) {
				designDoc('Theme', 'by_id', themeById())
			})
			.then(function(res) {
				designDoc('ThemeBySensorType', 'by_sensor_type_id', themeBySensorType())
			})
			.then(function(res) {
				return designDoc('Dialog', 'by_id', dialogById())
			})
			.then(function(res) {
				return designDoc('DialogBlock', 'by_id', dialogBlockById())
			})
			.then(function(res) {
				return designDoc('DialogByTheme', 'by_theme_id', dialogByThemeId())
			})
			.then(function(res) {
				return designDoc('DialogBlockByDialog', 'by_dialog_id', dialogBlockByDialogId())
			})
			.then(function(res) {
				defer.resolve();
			})
			.catch(function(err) {
			    defer.reject(err);
			});
		return defer.promise;
	};


	/**
	 * util function to write json into couchdb docs
	 * @param doc
	 */
	function writeDoc(doc) {
		var defer = Promise.pending();

		var _doc;

		// check if the doc exist
		function getDoc() {
			var defer = Promise.pending();
			chardb.get(doc._id, function(err, res) {
				_doc = res;
				defer.resolve();
			});
			return defer.promise;
		}

		// update / insert the doc
		function updateDoc() {
			var defer = Promise.pending();
			if(_doc) doc._rev = _doc._rev;
			chardb.insert(doc, doc._id, function(err, res) {
				if(err) {
					defer.reject(err);
				}
				defer.resolve();
			});
			return defer.promise;
		}

		getDoc()
			.then(function(res) {
				return updateDoc()
			})
			.then(function(res) {
				defer.resolve();
			})
			.catch(function(err) {
			    defer.reject(err);
			});

		return defer.promise;
	}

	/**
	 * util function to write the design docs
	 * @param designDoc
	 * @param viewName
	 * @param mapFunc
	 */
	function designDoc(designDoc, viewName, mapFunc) {
		var defer = Promise.pending();

		var v = {};
		v[viewName] = {
			map: mapFunc
		};

		var view = {
			language: 'javascript',
			views: v
		};

		// Fix: 'Error: self signed certificate'
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

		chardb.insert(view, '_design/' + designDoc, function(err, res) {
			console.log('done', err, res);
			defer.resolve();
		});

		return defer.promise;
	}


	/**
	 *
	 */
	CouchDB.remoteMethod(
		'updateDialogBlocks', {
			accepts:[],
			returns: [
				{arg:'data', type:'object', root:true}
			]
		}
	);

	/**
	 *
	 */
	CouchDB.remoteMethod(
		'updateDialogs', {
			accepts:[],
			returns: [
				{arg:'data', type:'object', root:true}
			]
		}
	);

	/**
	 *
	 */
	CouchDB.remoteMethod(
		'updateThemes', {
			accepts:[],
			returns: [
				{arg:'data', type:'object', root:true}
			]
		}
	);
};
