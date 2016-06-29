export default function (nga, admin) {
    return nga.menu()
        .addChild(nga.menu()
            .title('Device')
            .icon('<span class="fa fa-users fa-fw"></span>')
            .addChild(nga.menu(admin.getEntity('SensorTypes')).title('Sensor Type'))
        )
        .addChild(nga.menu()
            .title('Dialogs')
            .icon('<span class="fa fa-users fa-fw"></span>')
            .active(path => path.indexOf('/customers') === 0) // active() is the function that determines if the menu is active

            .addChild(nga.menu(admin.getEntity('Moods')).title('Mood'))
            .addChild(nga.menu(admin.getEntity('UserInputs')).title('User Input'))
            .addChild(nga.menu(admin.getEntity('Themes')).title('Theme'))
            .addChild(nga.menu(admin.getEntity('Dialogs')).title('Dialog'))

        )
}
