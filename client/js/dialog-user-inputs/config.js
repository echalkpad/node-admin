/**
 * Created by danieldihardja on 29/06/16.
 */
export default function(nga, admin) {

	var dialogUserInputs = admin.getEntity('DialogUserInputs');

		dialogUserInputs.listView()
			.fields([
				nga.field('dialogBlockId'),
				nga.field('userInputId'),
				nga.field('nextDialogBlockId')
			])
			.listActions(['edit'])
		    .sortField('id')
		    .sortDir('ASC');

		dialogUserInputs.creationView().fields([
			nga.field('dialogBlockId'),
			nga.field('userInputId'),
			nga.field('nextDialogBlockId')
		]);

		dialogUserInputs.editionView().fields(dialogUserInputs.creationView().fields());
		dialogUserInputs.showView().fields(dialogUserInputs.creationView().fields());

		return dialogUserInputs;
}