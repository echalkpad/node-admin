/**
 * Created by danieldihardja on 29/06/16.
 */
export default function(nga, admin) {
	var userInputs = admin.getEntity('UserInputs');

	userInputs.listView()
		.fields([
			nga.field('title'),
			nga.field('inputType')
		])
		.listActions(['edit'])
		.sortField('id')
		.sortDir('ASC');

	userInputs.creationView().fields(userInputs.listView().fields());
	userInputs.editionView().fields(userInputs.listView().fields());;
	userInputs.showView().fields(userInputs.listView().fields());;

	return userInputs;
}