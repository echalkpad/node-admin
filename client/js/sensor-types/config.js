/**
 * Created by danieldihardja on 29/06/16.
 */
export default function (nga, admin) {
	var sensorTypes = admin.getEntity('SensorTypes');
	sensorTypes.listView()
		.title('Sensor Type')
		.infinitePagination(true)
		.fields([
			nga.field('title'),
			nga.field('description', 'text')
		])
		.listActions(['edit'])
		.sortField('id')
		.sortDir('ASC');

	sensorTypes.creationView().fields(sensorTypes.listView().fields());
	sensorTypes.editionView().fields(sensorTypes.listView().fields());

	return sensorTypes;
}