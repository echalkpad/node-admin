/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(18);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// require('ng-admin'); removed here and added back as a <script> tag to hep debugging - WebPack doesn't properly handle sourcemaps of dependencies yet
	//require('./api');
	
	'use strict';
	
	var myApp = angular.module('myApp', ['ng-admin']);
	
	// custom API flavor
	var apiFlavor = __webpack_require__(2);
	
	myApp.config(['RestangularProvider', apiFlavor.requestInterceptor]);
	myApp.config(['RestangularProvider', apiFlavor.responseInterceptor]);
	
	// custom 'amount' type
	myApp.config(['NgAdminConfigurationProvider', 'FieldViewConfigurationProvider', function (nga, fvp) {
	    nga.registerFieldType('amount', __webpack_require__(3));
	    fvp.registerFieldView('amount', __webpack_require__(7));
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
	myApp.controller('username', ['$scope', '$window', function ($scope, $window) {
	    // used in header.html
	    $scope.username = $window.localStorage.getItem('posters_galore_login');
	}]);
	
	// custom states (pages)
	//myApp.config(['$stateProvider', require('./segments/segmentsState')]);
	
	myApp.config(['NgAdminConfigurationProvider', function (nga) {
	    // create the admin application
	    var admin = nga.application('Character').baseApiUrl('https://192.168.99.100:3000/api/');
	
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
	
	    __webpack_require__(8)(nga, admin);
	    __webpack_require__(9)(nga, admin);
	    __webpack_require__(10)(nga, admin);
	    __webpack_require__(11)(nga, admin);
	    __webpack_require__(12)(nga, admin);
	    __webpack_require__(13)(nga, admin);
	    __webpack_require__(14)(nga, admin);
	    __webpack_require__(15)(nga, admin);
	    __webpack_require__(16)(nga, admin);
	
	    //admin.dashboard(require('./dashboard/config')(nga, admin));
	    //admin.header(require('./header.html'));
	    admin.menu(__webpack_require__(17)(nga, admin));
	
	    // attach the admin application to the DOM and execute it
	    nga.configure(admin);
	}]);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	function requestInterceptor(RestangularProvider) {
	    // use the custom query parameters function to format the API request correctly
	    RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params) {
	        if (operation == "getList") {
	
	            // custom pagination params
	            if (params._page) {
	
	                params['filter[skip]'] = (params._page - 1) * params._perPage;
	                params['filter[limit]'] = 100;
	
	                delete params._page;
	                delete params._perPage;
	            }
	
	            // custom sort params
	            if (params._sortField) {
	                params['filter[order]'] = params._sortField + ' ' + params._sortDir;
	
	                delete params._sortField;
	                delete params._sortDir;
	            }
	
	            // custom filters
	            if (params._filters) {
	                for (var key in params._filters) {
	                    params['filter[where][' + key + ']'] = params._filters[key];
	                }
	                delete params._filters;
	            }
	        }
	        return { params: params };
	    });
	}
	
	function responseInterceptor(RestangularProvider) {
	    RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response) {
	        /*
	        if (operation == "getList") {
	            var contentRange = response.headers('Content-Range');
	            response.totalCount = contentRange.split('/')[1];
	        }
	        */
	        return data;
	    });
	}
	
	exports['default'] = { requestInterceptor: requestInterceptor, responseInterceptor: responseInterceptor };
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _adminConfigLibFieldNumberField = __webpack_require__(4);
	
	var _adminConfigLibFieldNumberField2 = _interopRequireDefault(_adminConfigLibFieldNumberField);
	
	var AmountField = (function (_NumberField) {
	    _inherits(AmountField, _NumberField);
	
	    function AmountField(name) {
	        _classCallCheck(this, AmountField);
	
	        _get(Object.getPrototypeOf(AmountField.prototype), "constructor", this).call(this, name);
	        this._currency = '$';
	        this._type = "amount";
	        this._baseFormat = '0.00';
	        this._format = this._currency + this._baseFormat;
	    }
	
	    _createClass(AmountField, [{
	        key: "currency",
	        value: function currency(_currency) {
	            if (!arguments.length) return this._currency;
	            this._currency = _currency;
	            this._format = _currency + this._baseFormat;
	            return this;
	        }
	    }]);
	
	    return AmountField;
	})(_adminConfigLibFieldNumberField2["default"]);
	
	exports["default"] = AmountField;
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Field2 = __webpack_require__(5);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	var NumberField = (function (_Field) {
	    _inherits(NumberField, _Field);
	
	    function NumberField(name) {
	        _classCallCheck(this, NumberField);
	
	        _get(Object.getPrototypeOf(NumberField.prototype), "constructor", this).call(this, name);
	        this._type = "number";
	        this._format = undefined;
	    }
	
	    /**
	     * Specify format pattern for number to string conversion. 
	     *
	     * Based on NumeralJs, which uses a syntax similar to Excel.
	     *
	     * {@link} http://numeraljs.com/
	     * {@link} https://github.com/baumandm/angular-numeraljs
	     * {@example}
	     *
	     *     nga.field('height', 'number').format('$0,0.00');
	     */
	
	    _createClass(NumberField, [{
	        key: "format",
	        value: function format(value) {
	            if (!arguments.length) return this._format;
	            this._format = value;
	            return this;
	        }
	    }, {
	        key: "fractionSize",
	        value: function fractionSize(decimals) {
	            console.warn('NumberField.fractionSize() is deprecated, use NumberField.format() instead');
	            this.format('0.' + '0'.repeat(decimals));
	            return this;
	        }
	    }]);
	
	    return NumberField;
	})(_Field3["default"]);
	
	exports["default"] = NumberField;
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _UtilsStringUtils = __webpack_require__(6);
	
	var _UtilsStringUtils2 = _interopRequireDefault(_UtilsStringUtils);
	
	var Field = (function () {
	    function Field(name) {
	        _classCallCheck(this, Field);
	
	        this._name = name || Math.random().toString(36).substring(7);
	        this._detailLink = name === 'id';
	        this._type = "string";
	        this._order = null;
	        this._label = null;
	        this._maps = [];
	        this._transforms = [];
	        this._attributes = {};
	        this._cssClasses = null;
	        this._validation = { required: false, minlength: 0, maxlength: 99999 };
	        this._defaultValue = null;
	        this._editable = true;
	        this._detailLinkRoute = 'edit';
	        this._pinned = false;
	        this._flattenable = true;
	        this.dashboard = true;
	        this.list = true;
	        this._template = function () {
	            return '';
	        };
	    }
	
	    _createClass(Field, [{
	        key: "label",
	        value: function label() {
	            if (arguments.length) {
	                this._label = arguments[0];
	                return this;
	            }
	
	            if (this._label === null) {
	                return _UtilsStringUtils2["default"].camelCase(this._name);
	            }
	
	            return this._label;
	        }
	    }, {
	        key: "type",
	        value: function type() {
	            return this._type;
	        }
	    }, {
	        key: "name",
	        value: function name() {
	            if (arguments.length) {
	                this._name = arguments[0];
	                return this;
	            }
	
	            return this._name;
	        }
	    }, {
	        key: "order",
	        value: function order() {
	            if (arguments.length) {
	                if (arguments[1] !== true) {
	                    console.warn('Setting order with Field.order is deprecated, order directly in fields array');
	                }
	                this._order = arguments[0];
	                return this;
	            }
	
	            return this._order;
	        }
	    }, {
	        key: "isDetailLink",
	        value: function isDetailLink(detailLink) {
	            if (arguments.length) {
	                this._detailLink = arguments[0];
	                return this;
	            }
	
	            if (this._detailLink === null) {
	                return this._name === 'id';
	            }
	
	            return this._detailLink;
	        }
	    }, {
	        key: "map",
	
	        /**
	         * Add a function to be applied to the response object to turn it into an entry
	         */
	        value: function map(fn) {
	            if (!fn) return this._maps;
	            if (typeof fn !== "function") {
	                var type = typeof fn;
	                throw new Error("Map argument should be a function, " + type + " given.");
	            }
	
	            this._maps.push(fn);
	
	            return this;
	        }
	    }, {
	        key: "hasMaps",
	        value: function hasMaps() {
	            return !!this._maps.length;
	        }
	    }, {
	        key: "getMappedValue",
	        value: function getMappedValue(value, entry) {
	            for (var i in this._maps) {
	                value = this._maps[i](value, entry);
	            }
	
	            return value;
	        }
	
	        /**
	         * Add a function to be applied to the entry to turn it into a response object
	         */
	    }, {
	        key: "transform",
	        value: function transform(fn) {
	            if (!fn) return this._transforms;
	            if (typeof fn !== "function") {
	                var type = typeof fn;
	                throw new Error("transform argument should be a function, " + type + " given.");
	            }
	
	            this._transforms.push(fn);
	
	            return this;
	        }
	    }, {
	        key: "hasTranforms",
	        value: function hasTranforms() {
	            return !!this._transforms.length;
	        }
	    }, {
	        key: "getTransformedValue",
	        value: function getTransformedValue(value, entry) {
	            for (var i in this._transforms) {
	                value = this._transforms[i](value, entry);
	            }
	
	            return value;
	        }
	    }, {
	        key: "attributes",
	        value: function attributes(_attributes) {
	            if (!arguments.length) {
	                return this._attributes;
	            }
	
	            this._attributes = _attributes;
	
	            return this;
	        }
	    }, {
	        key: "cssClasses",
	        value: function cssClasses(classes) {
	            if (!arguments.length) return this._cssClasses;
	            this._cssClasses = classes;
	            return this;
	        }
	    }, {
	        key: "getCssClasses",
	        value: function getCssClasses(entry) {
	            if (!this._cssClasses) {
	                return '';
	            }
	
	            if (this._cssClasses.constructor === Array) {
	                return this._cssClasses.join(' ');
	            }
	
	            if (typeof this._cssClasses === 'function') {
	                return this._cssClasses(entry);
	            }
	
	            return this._cssClasses;
	        }
	    }, {
	        key: "validation",
	        value: function validation(_validation) {
	            if (!arguments.length) {
	                return this._validation;
	            }
	
	            for (var property in _validation) {
	                if (!_validation.hasOwnProperty(property)) continue;
	                if (_validation[property] === null) {
	                    delete this._validation[property];
	                } else {
	                    this._validation[property] = _validation[property];
	                }
	            }
	
	            return this;
	        }
	    }, {
	        key: "defaultValue",
	        value: function defaultValue(_defaultValue) {
	            if (!arguments.length) return this._defaultValue;
	            this._defaultValue = _defaultValue;
	            return this;
	        }
	    }, {
	        key: "editable",
	        value: function editable(_editable) {
	            if (!arguments.length) return this._editable;
	            this._editable = _editable;
	            return this;
	        }
	    }, {
	        key: "detailLinkRoute",
	        value: function detailLinkRoute(route) {
	            if (!arguments.length) return this._detailLinkRoute;
	            this._detailLinkRoute = route;
	            return this;
	        }
	    }, {
	        key: "pinned",
	        value: function pinned(_pinned) {
	            if (!arguments.length) return this._pinned;
	            this._pinned = _pinned;
	            return this;
	        }
	    }, {
	        key: "flattenable",
	        value: function flattenable() {
	            return this._flattenable;
	        }
	    }, {
	        key: "getTemplateValue",
	        value: function getTemplateValue(data) {
	            if (typeof this._template === 'function') {
	                return this._template(data);
	            }
	
	            return this._template;
	        }
	    }, {
	        key: "template",
	        value: function template(_template) {
	            if (!arguments.length) return this._template;
	            this._template = _template;
	            return this;
	        }
	    }, {
	        key: "detailLink",
	        set: function set(isDetailLink) {
	            return this._detailLink = isDetailLink;
	        }
	    }]);
	
	    return Field;
	})();
	
	exports["default"] = Field;
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = {
	    /**
	     * @see http://stackoverflow.com/questions/10425287/convert-string-to-camelcase-with-regular-expression
	     * @see http://phpjs.org/functions/ucfirst/
	     */
	    camelCase: function camelCase(text) {
	        if (!text) {
	            return text;
	        }
	
	        var f = text.charAt(0).toUpperCase();
	        text = f + text.substr(1);
	
	        return text.replace(/[-_.\s](.)/g, function (match, group1) {
	            return ' ' + group1.toUpperCase();
	        });
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = {
	    getReadWidget: function getReadWidget() {
	        return '<ma-number-column field="::field" value="::entry.values[field.name()]"></ma-number-column>';
	    },
	    getLinkWidget: function getLinkWidget() {
	        return '<a ng-click="gotoDetail()">' + module.exports.getReadWidget() + '</a>';
	    },
	    getFilterWidget: function getFilterWidget() {
	        return '<ma-input-field type="number" step="any" field="::field" value="values[field.name()]"></ma-input-field>';
	    },
	    getWriteWidget: function getWriteWidget() {
	        return '<div class="input-group"><span class="input-group-addon">{{ field.currency() }}</span><ma-input-field type="number" step="any" field="::field" value="entry.values[field.name()]"></ma-input-field></div>';
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Created by danieldihardja on 29/06/16.
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	exports['default'] = function (nga, admin) {
		var sensorTypes = admin.getEntity('SensorTypes');
		sensorTypes.listView().title('Sensor Type').infinitePagination(true).fields([nga.field('title'), nga.field('description', 'text')]).listActions(['edit']).sortField('id').sortDir('ASC');
	
		sensorTypes.creationView().fields(sensorTypes.listView().fields());
		sensorTypes.editionView().fields(sensorTypes.listView().fields());
	
		return sensorTypes;
	};
	
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Created by danieldihardja on 29/06/16.
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	exports['default'] = function (nga, admin) {
		var moods = admin.getEntity('Moods');
		moods.listView().title('Moods').fields([nga.field('title')]).listActions(['edit']).sortField('id').sortDir('ASC');
	
		moods.creationView().fields([nga.field('title')]);
	
		moods.editionView().fields(moods.creationView().fields());
		moods.showView().fields(moods.listView().fields());
	
		return moods;
	};
	
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Created by danieldihardja on 29/06/16.
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	exports['default'] = function (nga, admin) {
		var userInputs = admin.getEntity('UserInputs');
	
		userInputs.listView().fields([nga.field('title'), nga.field('inputType')]).listActions(['edit']).sortField('id').sortDir('ASC');
	
		userInputs.creationView().fields(userInputs.listView().fields());
		userInputs.editionView().fields(userInputs.listView().fields());;
		userInputs.showView().fields(userInputs.listView().fields());;
	
		return userInputs;
	};
	
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Created by danieldihardja on 29/06/16.
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	exports['default'] = function (nga, admin) {
	
		var themes = admin.getEntity('Themes');
	
		themes.listView().fields([nga.field('title'), nga.field('description')]).listActions(['edit']).sortField('id').sortDir('ASC');
	
		themes.creationView().fields([nga.field('title'), nga.field('description', 'text')]);
	
		themes.editionView().fields(themes.creationView().fields());
		themes.showView().fields(themes.creationView().fields());
	
		return themes;
	};
	
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Created by danieldihardja on 29/06/16.
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	exports['default'] = function (nga, admin) {
		var dialog = admin.getEntity('Dialogs');
	
		dialog.listView().fields([nga.field('title')]).listActions(['edit']).sortField('id').sortDir('ASC');
	
		dialog.creationView().fields([nga.field('title')]);
	
		dialog.editionView().fields(dialog.creationView().fields());
		dialog.showView().fields(dialog.creationView().fields());
	
		return dialog;
	};
	
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Created by danieldihardja on 29/06/16.
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	exports['default'] = function (nga, admin) {
	
		var dialogBlocks = admin.getEntity('DialogBlocks');
	
		dialogBlocks.listView().fields([nga.field('title'), nga.field('description')]).listActions(['edit']).sortField('id').sortDir('ASC');
	
		dialogBlocks.creationView().fields([nga.field('title'), nga.field('description', 'text')]);
	
		dialogBlocks.editionView().fields(dialogBlocks.creationView().fields());
		dialogBlocks.showView().fields(dialogBlocks.creationView().fields());
	
		return dialogBlocks;
	};
	
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Created by danieldihardja on 29/06/16.
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	exports['default'] = function (nga, admin) {
	
		var dialogSentence = admin.getEntity('DialogSentences');
	
		dialogSentence.listView().fields([nga.field('dialogBlockId'), nga.field('sentenceId')]).listActions(['edit']).sortField('id').sortDir('ASC');
	
		dialogSentence.creationView().fields([nga.field('dialogBlockId'), nga.field('sentenceId')]);
	
		dialogSentence.editionView().fields(dialogSentence.creationView().fields());
		dialogSentence.showView().fields(dialogSentence.creationView().fields());
	
		return dialogSentence;
	};
	
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Created by danieldihardja on 29/06/16.
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	exports['default'] = function (nga, admin) {
	
		var dialogUserInputs = admin.getEntity('DialogUserInputs');
	
		dialogUserInputs.listView().fields([nga.field('dialogBlockId'), nga.field('userInputId'), nga.field('nextDialogBlockId')]).listActions(['edit']).sortField('id').sortDir('ASC');
	
		dialogUserInputs.creationView().fields([nga.field('dialogBlockId'), nga.field('userInputId'), nga.field('nextDialogBlockId')]);
	
		dialogUserInputs.editionView().fields(dialogUserInputs.creationView().fields());
		dialogUserInputs.showView().fields(dialogUserInputs.creationView().fields());
	
		return dialogUserInputs;
	};
	
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Created by danieldihardja on 29/06/16.
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	exports['default'] = function (nga, admin) {
	
		var sentences = admin.getEntity('Sentences');
	
		sentences.listView().fields([nga.field('title')]).listActions(['edit']).sortField('id').sortDir('ASC');
	
		sentences.creationView().fields([nga.field('title', 'text')]);
	
		sentences.editionView().fields(sentences.creationView().fields());
		sentences.showView().fields(sentences.creationView().fields());
	
		return sentences;
	};
	
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	exports['default'] = function (nga, admin) {
	    return nga.menu().addChild(nga.menu().title('Device').icon('<span class="fa fa-users fa-fw"></span>').addChild(nga.menu(admin.getEntity('SensorTypes')).title('Sensor Type'))).addChild(nga.menu().title('Dialogs').icon('<span class="fa fa-users fa-fw"></span>').active(function (path) {
	        return path.indexOf('/customers') === 0;
	    }) // active() is the function that determines if the menu is active
	
	    .addChild(nga.menu(admin.getEntity('Moods')).title('Mood')).addChild(nga.menu(admin.getEntity('UserInputs')).title('User Input')).addChild(nga.menu(admin.getEntity('Themes')).title('Theme')).addChild(nga.menu(admin.getEntity('Dialogs')).title('Dialog')).addChild(nga.menu(admin.getEntity('DialogBlocks')).title('Dialog Block')).addChild(nga.menu(admin.getEntity('DialogSentences')).title('Dialog Sentence')).addChild(nga.menu(admin.getEntity('DialogUserInputs')).title('Dialog User Input')).addChild(nga.menu(admin.getEntity('Sentences')).title('Sentences')));
	};
	
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map