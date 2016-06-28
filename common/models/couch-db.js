module.exports = function(CouchDB) {

	/**
	 *
	 */
	CouchDB.updateThemes = function() {
		var defer = Promise.pending();
		defer.resolve({status: 'ok'});
		return defer.promise;
	};

	/**
	 *
	 */
	CouchDB.updateDialogs = function() {
		var defer = Promise.pending();

		var models = CouchDB.app.models;
		var Dialog = models.Dialog;

		var q = {
			include: [
				{relation: 'theme'},
				{relation: 'dialogSentences', scope: {include: 'sentence'}},
				{relation: 'dialogInputs', scope: {include: 'input'}}
			]
		};

		Dialog.find(q)
			.then(function(res) {
				var tmp = [];
				for(var i=0; i<res.length; i++) {

					var r = res[i].toJSON();
					var dialog = {};

					dialog.id = r.id;
					dialog.title = r.title;
					dialog.description = r.description;
					dialog.isEntryPoint = r.isEntryPoint;
					dialog.theme = r.theme;
					dialog.sentences = [];
					dialog.inputs = {};

					for(var j=0; j<r.dialogSentences.length; j++) {
						dialog.sentences.push(r.dialogSentences[j].sentence);
					}

					var inputTypeTable = {};

					for(var j=0; j<r.dialogInputs.length; j++) {
						var dInput = r.dialogInputs[j];
						var input = dInput.input;
						input.nextDialogId = dInput.nextDialogId;

						if(! inputTypeTable[input.type]) inputTypeTable[input.type] = [];
						inputTypeTable[input.type].push(input);

						console.log('input', input);
					}
					dialog.inputs = inputTypeTable;
					tmp.push(dialog);
				}
				defer.resolve(tmp);
			})
			.catch(function(err) {
			    defer.reject(err);
			});
		return defer.promise;
	};

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
