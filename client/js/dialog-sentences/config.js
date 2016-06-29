/**
 * Created by danieldihardja on 29/06/16.
 */
export default function(nga, admin) {

	var dialogSentence = admin.getEntity('DialogSentences');

		dialogSentence.listView()
			.fields([
				nga.field('dialogBlockId'),
				nga.field('sentenceId')
			])
			.listActions(['edit'])
		    .sortField('id')
		    .sortDir('ASC');

		dialogSentence.creationView().fields([
			nga.field('dialogBlockId'),
			nga.field('sentenceId')
		]);

		dialogSentence.editionView().fields(dialogSentence.creationView().fields());
		dialogSentence.showView().fields(dialogSentence.creationView().fields());

		return dialogSentence;
}