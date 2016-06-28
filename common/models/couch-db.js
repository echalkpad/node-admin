module.exports = function(CouchDB) {

	var host = process.env.COUCHDB_HOST || '192.168.99.100';
	var port = process.env.COUCHDB_PORT || 5984;
	var couchDBUrl = 'http://' + host + ':' + port;
	var nano = require('nano')(couchDBUrl);
	var chardb = nano.db.use('character');

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
