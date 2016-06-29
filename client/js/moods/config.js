/**
 * Created by danieldihardja on 29/06/16.
 */
export default function(nga, admin) {
	var moods = admin.getEntity('Moods');
	moods.listView()
		.title('Moods')
		.fields([
			nga.field('title')
		])
		.listActions(['edit'])
		.sortField('id')
		.sortDir('ASC');

	moods.editionView().fields(moods.listView().fields());
	moods.creationView().fields(moods.listView().fields());
	moods.showView().fields(moods.listView().fields());

	return moods;
}