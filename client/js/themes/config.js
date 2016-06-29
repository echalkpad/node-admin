/**
 * Created by danieldihardja on 29/06/16.
 */

export default function(nga, admin) {

	var themes = admin.getEntity('Themes');

	themes.listView()
		.fields([
			nga.field('title'),
			nga.field('description')
		])
		.listActions(['edit'])
		.sortField('id')
		.sortDir('ASC');

	themes.creationView().fields([
		nga.field('title'),
		nga.field('description', 'text')
	]);

	themes.editionView().fields(themes.creationView().fields());
	themes.showView().fields(themes.creationView().fields());

	return themes;
}