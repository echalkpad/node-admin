module.exports = function(CouchDb) {

	/**
	 *
	 */
	CouchDb.export = function() {
		var defer = Promise.pending();

		var models = CouchDb.app.models;
		var Thema = models.Thema;
		var Dialog = models.Dialog;

		Thema.find()
			.then(function(res) {
				defer.resolve(res);
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
