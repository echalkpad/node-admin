module.exports = function(CouchDb) {

	/**
	 *
	 */
	CouchDb.export = function() {
		var defer = Promise.pending();

		var models = CouchDb.app.models;
		var Thema = models.Thema;
		var Dialog = models.Dialog;



		defer.resolve({status: 'ok'});
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
