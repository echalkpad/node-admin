module.exports = function(CouchDb) {

	/**
	 *
	 */
	CouchDb.export = function() {
		var defer = Promise.pending();

		var models = CouchDb.app.models;
		var Theme = models.Theme;
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
					dialog.title = r.title;
					dialog.description = r.description;
					dialog.isEntryPoint = r.isEntryPoint;
					dialog.theme = r.theme;
					dialog.sentences = [];
					dialog.inputs = [];


					for(var j=0; j<r.dialogSentences.length; j++) {
						dialog.sentences.push(r.dialogSentences[j].sentence);
					}

					for(var j=0; j<r.dialogInputs.length; j++) {
						dialog.inputs.push(r.dialogInputs[j].input);
					}

					tmp.push(dialog);
				}
				defer.resolve(tmp);
			})
			.catch(function(err) {
			    defer.reject(err);
			});
		return defer.promise;
	};

	CouchDb.remoteMethod(
		'export', {
			accepts:[],
			returns: [
				{arg:'data', type:'object', root:true}
			]
		}
	);
};
