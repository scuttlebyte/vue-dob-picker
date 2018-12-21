(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('moment')) :
    typeof define === 'function' && define.amd ? define(['exports', 'moment'], factory) :
    (factory((global.DobPicker = {}),global.moment));
}(this, (function (exports,moment) { 'use strict';

    moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

    var script = {
        name: 'DobPicker',
        props: {
            field: {
                type: String,
                default: null
            },
            format: {
                type: String,
                default: 'YYYY-MM-DD'
            },
            inputClass: {
                type: Object|String|Array,
                default: function () { return ['form-control']; }
            },
            labelClass: {
                type: Object|String|Array,
                default: function () { return ['small']; }
            },
            inputWrapperClass: {
                type: Object|String|Array,
                default: function () { return ['col']; }
            },
            wrapperClass: {
                type: Object|String|Array,
                default: function () { return ['form-group', 'row']; }
            },
            floor: {
                type: Number,
                default: 100
            },
            value: {
                type: Date|moment|String,
                default: function () {
                    return null
                },
                validator: function (val) {
                    return moment(val).isValid() ? 'success' : 'danger'
                }
            }
        },

        data: function data() {
            return {
                year: '',
                month: '',
                day: ''
            };
        },

        created: function created() {
            if (this.value) {

                var date;

                if (moment.isMoment(this.value)) {
                    date = this.value;
                }
                else if (typeof this.value === 'string') {
                    date = moment(this.value, this.format);
                }
                else {
                    date = moment(this.value);
                }

                this.year = date.year();
                this.month = date.month();
                this.day = date.date();
            }
        },

        computed: {
            /**
             * @return moment.Moment
             */
            date: function date() {
                return moment([this.year, this.month, this.day])
            },

            years: function years() {
                var current = moment().year();

                return this.range(current - this.floor, current).reverse()
            },

            months: function months() {
                return this.range(1, 12)
            },

            days: function days() {
                if (this.month && this.year) {
                    var edge = moment().year(this.year).month(this.month);

                    return this.range(1, edge.daysInMonth())
                }

                if (this.month && this.month !== 2) {
                    return this.range(1, moment().month(this.month).daysInMonth())
                }

                return this.range(1, 31);
            },

            inputLabelDay: function inputLabelDay() {
                var uid = this._uid;

                return ("inputLabelDay" + uid)
            },

            inputLabelMonth: function inputLabelMonth() {
                var uid = this._uid;

                return ("inputLabelMonth" + uid)
            },

            inputLabelYear: function inputLabelYear() {
                var uid = this._uid;

                return ("inputLabelYear" + uid)
            },
        },

        methods: {
            /**
             * @link https://wsvincent.com/javascript-array-range-function/
             */
            range: function range(start, edge, step) {
                // If only 1 number passed make it the edge and 0 the start
                if (arguments.length === 1) {
                    edge = start;
                    start = 0;
                }

                // Validate edge/start
                edge = edge || 0;
                step = step || 1;

                // Create array of numbers, stopping before the edge
                var arr = [];
                for (arr; (edge - start) * step >= 0; start += step) {
                    arr.push(start);
                }
                return arr
            },

            updateInput: function updateInput () {
                this.$emit('input', this.date);
            }
        },
    };

    /* script */
                var __vue_script__ = script;
                
    /* template */
    var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.wrapperClass,attrs:{"data-jest":"component-wrapper"}},[_c('div',{class:_vm.inputWrapperClass,attrs:{"data-jest":"month-input-wrapper"}},[_c('label',{class:_vm.labelClass,attrs:{"for":_vm.inputLabelMonth,"data-jest":"month-label"}},[_vm._v("Month")]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.month),expression:"month"}],class:_vm.inputClass,attrs:{"id":_vm.inputLabelMonth,"data-jest":"month-input"},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.month=$event.target.multiple ? $$selectedVal : $$selectedVal[0];},_vm.updateInput]}},[_c('option',{attrs:{"disabled":"","value":""}},[_vm._v("Choose")]),_vm._v(" "),_vm._l((_vm.months),function(monthOption,monthValue){return _c('option',{domProps:{"value":monthValue}},[_vm._v(_vm._s(monthOption))])})],2)]),_vm._v(" "),_c('div',{class:_vm.inputWrapperClass,attrs:{"data-jest":"day-input-wrapper"}},[_c('label',{class:_vm.labelClass,attrs:{"for":_vm.inputLabelDay,"data-jest":"day-label"}},[_vm._v("Day")]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.day),expression:"day"}],class:_vm.inputClass,attrs:{"id":_vm.inputLabelDay,"data-jest":"day-input"},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.day=$event.target.multiple ? $$selectedVal : $$selectedVal[0];},_vm.updateInput]}},[_c('option',{attrs:{"disabled":"","value":""}},[_vm._v("Choose")]),_vm._v(" "),_vm._l((_vm.days),function(dayOption){return _c('option',{domProps:{"value":dayOption}},[_vm._v(_vm._s(dayOption))])})],2)]),_vm._v(" "),_c('div',{class:_vm.inputWrapperClass,attrs:{"data-jest":"year-input-wrapper"}},[_c('label',{class:_vm.labelClass,attrs:{"for":_vm.inputLabelYear,"data-jest":"year-label"}},[_vm._v("Year")]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.year),expression:"year"}],class:_vm.inputClass,attrs:{"id":_vm.inputLabelYear,"data-jest":"year-input"},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.year=$event.target.multiple ? $$selectedVal : $$selectedVal[0];},_vm.updateInput]}},[_c('option',{attrs:{"disabled":"","value":""}},[_vm._v("Choose")]),_vm._v(" "),_vm._l((_vm.years),function(yearOption){return _c('option',{domProps:{"value":yearOption}},[_vm._v(_vm._s(yearOption))])})],2)]),_vm._v(" "),(_vm.field)?_c('input',{attrs:{"type":"hidden","name":_vm.field},domProps:{"value":_vm.date.format(_vm.format)}}):_vm._e()])};
    var __vue_staticRenderFns__ = [];

      /* style */
      var __vue_inject_styles__ = undefined;
      /* scoped */
      var __vue_scope_id__ = undefined;
      /* module identifier */
      var __vue_module_identifier__ = undefined;
      /* functional template */
      var __vue_is_functional_template__ = false;
      /* component normalizer */
      function __vue_normalize__(
        template, style, script$$1,
        scope, functional, moduleIdentifier,
        createInjector, createInjectorSSR
      ) {
        var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

        // For security concerns, we use only base name in production mode.
        component.__file = "dob-picker.vue";

        if (!component.render) {
          component.render = template.render;
          component.staticRenderFns = template.staticRenderFns;
          component._compiled = true;

          if (functional) { component.functional = true; }
        }

        component._scopeId = scope;

        return component
      }
      /* style inject */
      
      /* style inject SSR */
      

      
      var component = __vue_normalize__(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        undefined,
        undefined
      );

    // Import vue component

    // install function executed by Vue.use()
    function install(Vue) {
      if (install.installed) { return; }
      install.installed = true;
      Vue.component('DobPicker', component);
    }

    // Create module definition for Vue.use()
    var plugin = {
      install: install,
    };

    // To auto-install when vue is found
    /* global window global */
    var GlobalVue = null;
    if (typeof window !== 'undefined') {
      GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
      GlobalVue = global.Vue;
    }
    if (GlobalVue) {
      GlobalVue.use(plugin);
    }

    // It's possible to expose named exports when writing components that can
    // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
    // export const RollupDemoDirective = component;

    exports.default = component;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
