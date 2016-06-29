// require('ng-admin'); removed here and added back as a <script> tag to hep debugging - WebPack doesn't properly handle sourcemaps of dependencies yet
//require('./api');

var myApp = angular.module('myApp', ['ng-admin']);

// custom API flavor
var apiFlavor = require('./api_flavor');

myApp.config(['RestangularProvider', apiFlavor.requestInterceptor]);
myApp.config(['RestangularProvider', apiFlavor.responseInterceptor]);

// custom 'amount' type
myApp.config(['NgAdminConfigurationProvider', 'FieldViewConfigurationProvider', function(nga, fvp) {
    nga.registerFieldType('amount', require('./types/AmountField'));
    fvp.registerFieldView('amount', require('./types/AmountFieldView'));
}]);

// custom directives
/*
myApp.directive('approveReview', require('./reviews/approveReview'));
myApp.directive('batchApprove', require('./reviews/batchApprove'));
myApp.directive('starRating', require('./reviews/starRating'));
myApp.directive('basket', require('./commands/basket'));
myApp.directive('dashboardSummary', require('./dashboard/dashboardSummary'));
myApp.directive('zoomInModal', require('./products/zoomInModal'));
*/

// custom controllers
myApp.controller('username', ['$scope', '$window', function($scope, $window) { // used in header.html
    $scope.username =  $window.localStorage.getItem('posters_galore_login');
}]);

// custom states (pages)
//myApp.config(['$stateProvider', require('./segments/segmentsState')]);

myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create the admin application
    var admin = nga.application('Character')
        .baseApiUrl('https://192.168.99.100:3000/api/');

    // add entities
    admin.addEntity(nga.entity('SensorTypes'));
    admin.addEntity(nga.entity('Moods'));
    admin.addEntity(nga.entity('UserInputs'));
    admin.addEntity(nga.entity('Themes'));
    admin.addEntity(nga.entity('Dialogs'));
    admin.addEntity(nga.entity('DialogBlocks'));
    admin.addEntity(nga.entity('DialogSentences'));
    admin.addEntity(nga.entity('DialogUserInputs'));
    admin.addEntity(nga.entity('Sentences'));

    // configure entities

    require('./sensor-types/config')(nga, admin);
    require('./moods/config')(nga, admin);
    require('./user-input/config')(nga, admin);
    require('./themes/config')(nga, admin);
    require('./dialogs/config')(nga, admin);
    require('./dialog-blocks/config')(nga, admin);
    require('./dialog-sentences/config')(nga, admin);
    require('./dialog-user-inputs/config')(nga, admin);
    require('./sentences/config')(nga, admin);



    //admin.dashboard(require('./dashboard/config')(nga, admin));
    //admin.header(require('./header.html'));
    admin.menu(require('./menu')(nga, admin));

    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);
