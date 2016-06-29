/**
 * Created by danieldihardja on 29/06/16.
 */
module.exports = function(app) {

	var remotes = app.remotes();

	/**
	 *
	 */
	remotes.before('*.create', function(ctx, next) {
		var args = ctx.args.data;
		if(args.id == null) {
			args.id = 0;
		}
		next();
	});

	/**
	 * 	Set X-Total-Count for all search requests
	 */
	remotes.after('*.find', function (ctx, next) {

		/*
		 var filter;
		 if (ctx.args && ctx.args.filter) {
		 filter = JSON.parse(ctx.args.filter).where;
		 }
		 */

		if (!ctx.res._headerSent) {

			console.log('*** ***');
			this.count({}, function (err, count) {
				ctx.res.set('Access-Control-Expose-Headers', 'x-total-count');
				ctx.res.set('X-Total-Count', count);
				next();
			});
		}
		else {
			next();
		}
	});
};