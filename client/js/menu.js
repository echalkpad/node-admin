export default function (nga, admin) {
    return nga.menu()
        .addChild(nga.menu()
            .title('Dialogs')
            .icon('<span class="fa fa-users fa-fw"></span>')
            .active(path => path.indexOf('/customers') === 0) // active() is the function that determines if the menu is active

            .addChild(nga.menu(admin.getEntity('SensorTypes')).title('Sensor Type'))
            .addChild(nga.menu(admin.getEntity('Moods')).title('Mood'))



        )
}
