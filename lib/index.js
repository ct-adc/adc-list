(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["ct-adc-list"] = factory(require("vue"));
	else
		root["ct-adc-list"] = factory(root["vue"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__adc_table_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__adc_table_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__adc_table_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__adc_table_column_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__adc_table_column_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__adc_table_column_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "table", function() { return __WEBPACK_IMPORTED_MODULE_0__adc_table_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "column", function() { return __WEBPACK_IMPORTED_MODULE_1__adc_table_column_vue___default.a; });






/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(3),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/rubyisapm/teamshare/CT-ADC/ct-adc-list/src/component/adc-table.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-46b8a27e", Component.options)
  } else {
    hotAPI.reload("data-v-46b8a27e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'adc-table',
    model: {
        prop: 'selection',
        event: 'change'
    },
    props: {
        data: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        selection: {
            type: Object,
            default: function _default() {
                return {
                    checkAll: false,
                    checked: []
                };
            }
        },
        status: {
            type: Boolean,
            default: true
        },
        msg: {
            type: String,
            default: ''
        },
        className: {
            type: [String, Array],
            default: 'table-bordered'
        }
    },
    data: function data() {
        return {
            column: [],
            allChecked: false,
            checked: []
        };
    },

    computed: {
        isSelection: function isSelection() {
            return this.column.filter(function (col) {
                return col.type === 'selection';
            }).length > 0;
        }
    },
    created: function created() {
        this.initChecked();
    },
    render: function render(h) {
        var rows = void 0,
            tip = void 0;

        var colgroups = this.column.map(function (col) {
            if (col.width !== '') {
                return h('col', {
                    attrs: { width: col.width }
                });
            }
            return h('col');
        });
        var ths = this.column.map(function (col) {
            if (col.name !== '') {
                return h('th', [col.name]);
            }
        });

        if (!this.status) {
            tip = h('tr', [h(
                'td',
                {
                    attrs: { colspan: this.column.length },
                    'class': 'text-muted text-center' },
                [this.msg || '请求出错']
            )]);
        } else if (this.status && this.msg !== '') {
            tip = h('tr', [h(
                'td',
                {
                    attrs: { colspan: this.column.length },
                    'class': 'text-muted text-center' },
                [this.msg]
            )]);
        } else if (this.data.length === 0) {
            tip = h('tr', [h(
                'td',
                {
                    attrs: { colspan: this.column.length },
                    'class': 'text-muted text-center' },
                ['\u6CA1\u6709\u6570\u636E']
            )]);
        } else {
            rows = this.rows(h);
        }
        var allCheckbox = h('input', {
            attrs: {
                type: 'checkbox'
            },
            domProps: {
                checked: this.allChecked
            },
            on: {
                click: this.checkAll
            }
        });
        var className = Array.isArray(this.className) ? ['table'].concat(this.className).join(' ') : 'table ' + this.className;

        return h('div', [h(
            'div',
            { style: { display: 'hidden' } },
            [this.$slots.default]
        ), h(
            'div',
            { 'class': 'panel panel-default' },
            [h(
                'table',
                { 'class': className },
                [h('colgroup', [colgroups]), h('thead', [h('tr', [this.isSelection ? h('th', [allCheckbox]) : '', ths])]), h('tbody', [tip, rows])]
            )]
        )]);
    },

    methods: {
        initChecked: function initChecked() {
            this.allChecked = this.selection.checkAll;
            if (this.allChecked) {
                var checked = [];

                for (var i = 0; i < this.data.length; i++) {
                    checked.push(i);
                }
                this.checked = checked;
            } else {
                this.checked = this.selection.checked;
            }
        },
        colIsVisible: function colIsVisible(col, item, index) {
            var visible = [typeof col.visible === 'boolean' && col.visible, typeof col.visible === 'undefined', typeof col.visible === 'function' && col.visible.apply(this.$parent, [item[col.prop], item, index, col.prop])];

            return visible;
        },
        rows: function rows(h) {
            var _this = this;

            return this.data.map(function (item, index, data) {
                var tds = _this.column.map(function (col) {
                    var visible = _this.colIsVisible(col, item, index);

                    if (visible.indexOf(true) > -1) {
                        if (col.vm.name !== '') {
                            var vm = h(col.vm.name, {
                                props: {
                                    config: col.vm.config,
                                    prop: col.prop,
                                    item: item,
                                    index: index,
                                    data: data
                                }
                            });

                            return h('td', [vm]);
                        } else if (col.type === 'selection') {
                            var checked = _this.checked.indexOf(index) > -1 || _this.allChecked;
                            var checkbox = h('input', {
                                type: 'checkbox',
                                attrs: {
                                    type: 'checkbox'
                                },
                                domProps: {
                                    checked: checked
                                },
                                on: {
                                    click: _this.checkOne(index)
                                }
                            });

                            return h('td', [checkbox]);
                        } else {
                            var val = item[col.prop];
                            var result = void 0;

                            if (col.mapper.length > 0 && val !== null && typeof val !== 'undefined' && val !== '') {
                                var matched = col.mapper.filter(function (item) {
                                    return item.key === val;
                                });

                                if (matched.length > 0) {
                                    result = matched[0].val;
                                } else {
                                    result = val;
                                }
                            } else {
                                result = val;
                            }

                            if (col.filter !== '') {
                                if (typeof col.filter === 'string') {
                                    result = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.filter(col.filter)(result);
                                } else {
                                    result = col.filter.apply(_this.$parent, [result, item, index, col.prop]);
                                }
                            }
                            if (col.asHtml) {
                                return h('td', {
                                    domProps: {
                                        innerHTML: result
                                    }
                                });
                            } else {
                                var className = '';

                                if (typeof col.className !== 'undefined') {
                                    if (typeof col.className === 'string') {
                                        className += ' ' + col.className;
                                    } else if (typeof col.className === 'function') {
                                        className += ' ' + col.className.apply(_this.$parent, [result, item, index, col.prop]);
                                    } else if (Array.isArray(col.className)) {
                                        var _matched = col.className.filter(function (item) {
                                            return item.text === result;
                                        });
                                        if (_matched.length > 0) {
                                            className += ' ' + _matched[0].className;
                                        }
                                    }
                                }
                                return h(
                                    'td',
                                    { 'class': className },
                                    [result]
                                );
                            }
                        }
                    } else {
                        return h('td');
                    }
                });

                return h('tr', [tds]);
            });
        },
        addCol: function addCol(col) {
            this.column.push(col);
        },
        updateCol: function updateCol(col) {
            this.column = this.column.map(function (item) {
                if (item.prop === col.prop && item.name === col.name) {
                    return col;
                }
                return item;
            });
        },
        checkAll: function checkAll() {
            this.allChecked = !this.allChecked;
            if (this.allChecked) {
                var checked = [];

                for (var i = 0; i < this.data.length; i++) {
                    checked.push(i);
                }
                this.checked = checked;
            } else {
                this.checked = [];
            }
            this.$emit('check-all', this.allChecked);
            if (this.allChecked) {
                this.$emit('change', {
                    checkAll: this.allChecked
                });
            } else {
                this.$emit('change', {
                    checkAll: this.allChecked,
                    checked: this.checked
                });
            }
        },
        checkOne: function checkOne(index) {
            var _this2 = this;

            return function (e) {
                if (e.target.checked && !_this2.checked.indexOf(index) > -1) {
                    _this2.checked.push(index);
                    _this2.allChecked = _this2.checked.length === _this2.data.length;
                } else {
                    _this2.checked = _this2.checked.filter(function (item) {
                        return item !== index;
                    });
                    _this2.allChecked = false;
                }
                _this2.$emit('check', { index: index, checked: e.target.checked });
                _this2.$emit('change', {
                    checkAll: _this2.allChecked,
                    checked: _this2.checked
                });
            };
        },
        getChecked: function getChecked() {
            if (this.allChecked) {
                return {
                    checkAll: true
                };
            }
            return {
                checkAll: false,
                checked: this.checked
            };
        }
    },
    watch: {
        'selection.checkAll': function selectionCheckAll() {
            this.initChecked();
        },
        'selection.checked': function selectionChecked() {
            this.initChecked();
        }
    }
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(6),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/rubyisapm/teamshare/CT-ADC/ct-adc-list/src/component/adc-table-column.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6e14d835", Component.options)
  } else {
    hotAPI.reload("data-v-6e14d835", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'adc-table-column',
    props: {
        prop: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        width: {
            type: [Number, String],
            default: ''
        },
        vm: {
            type: Object,
            default: function _default() {
                return {
                    name: '',
                    config: {}
                };
            }
        },
        type: {
            type: String,
            default: ''
        },
        visible: {
            type: [Boolean, Function],
            default: true
        },
        mapper: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        filter: {
            type: [String, Function],
            default: ''
        },
        asHtml: {
            type: Boolean,
            default: false
        },
        color: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        className: {
            type: [String, Function, Array],
            default: ''
        }
    },
    computed: {
        column: function column() {
            return {
                type: this.type,
                prop: this.prop,
                name: this.name,
                width: this.width,
                vm: this.vm,
                visible: this.visible,
                filter: this.filter,
                mapper: this.mapper,
                asHtml: this.asHtml,
                color: this.color,
                className: this.className
            };
        }
    },
    render: function render(h) {
        return h('div');
    },
    created: function created() {
        this.addCol();
    },

    methods: {
        addCol: function addCol() {
            this.$parent.addCol(this.column);
        },
        updateCol: function updateCol() {
            this.$parent.updateCol(this.column);
        }
    },
    watch: {
        column: function column() {
            this.updateCol();
        }
    }
});

/***/ })
/******/ ]);
});