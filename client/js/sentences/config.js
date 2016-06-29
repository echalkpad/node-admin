/**
 * Created by danieldihardja on 29/06/16.
 */
export default function(nga, admin) {

	var sentences = admin.getEntity('Sentences');

		sentences.listView()
			.fields([
				nga.field('title')
			])
			.listActions(['edit'])
		    .sortField('id')
		    .sortDir('ASC');

		sentences.creationView().fields([
			nga.field('title', 'text')
		]);

		sentences.editionView().fields(sentences.creationView().fields());
		sentences.showView().fields(sentences.creationView().fields());

		return sentences;
}