/**
 * Created by danieldihardja on 29/06/16.
 */
export default function(nga, admin) {
	var dialog = admin.getEntity('Dialogs');

		dialog.listView()
			.fields([
				nga.field('themeId')
			])
			.listActions(['edit'])
			.sortField('id')
			.sortDir('ASC');

		dialog.creationView().fields([
			nga.field('themeId')
		]);

		dialog.editionView().fields(dialog.creationView().fields());
		dialog.showView().fields(dialog.creationView().fields());

		return dialog;
}