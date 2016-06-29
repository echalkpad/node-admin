/**
 * Created by danieldihardja on 29/06/16.
 */
export default function(nga, admin) {

	var dialogBlocks = admin.getEntity('DialogBlocks');

		dialogBlocks.listView()
			.fields([
				nga.field('title'),
				nga.field('description')
			])
			.listActions(['edit'])
		    .sortField('id')
		    .sortDir('ASC');

		dialogBlocks.creationView().fields([
			nga.field('title'),
			nga.field('description', 'text')
		]);

		dialogBlocks.editionView().fields(dialogBlocks.creationView().fields());
		dialogBlocks.showView().fields(dialogBlocks.creationView().fields());

		return dialogBlocks;
}