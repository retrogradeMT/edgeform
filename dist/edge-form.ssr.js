'use strict';require('vue');var lib=require('vuetify/lib'),vueTheMask=require('vue-the-mask');function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var typeToComponent$1 = {
  text: "textEdit",
  email: "textEdit",
  website: "selectEdit",
  checkbox: "SwitchEdit",
  textarea: "textareaEdit",
  select: "textSelect",
  date: "dateEdit" //   documents: "file-attachments",
  //   documentsReadOnly: "file-attachments-read-only",
  //   contactAutocomplete: "contactAutocomplete",
  //   companyAutocomplete: "companyAutocomplete"

};
var typeToClass$1 = {
  text: "input-field",
  money: "input-field",
  select: "input-field",
  checkbox: "input-field",
  date: "input-field",
  textarea: "textarea-field",
  memberAction: "input-field",
  renew: "input-field",
  phone: "input-field",
  email: "input-field",
  states: "input-field",
  time: "input-field",
  website: "input-field",
  modelAutocomplete: "input-field",
  wysiwyg: "wysiwyg-field",
  documents: "documents",
  documentsReadOnly: "documents"
};
var script$g = {
  name: "edge-form",
  components: {
    VCard: lib.VCard,
    VCardText: lib.VCardText,
    VRow: lib.VRow,
    VCol: lib.VCol,
    VIcon: lib.VIcon,
    VForm: lib.VForm
  },
  created: function created() {
    this.generateRandom();
  },
  data: function data() {
    return {
      editField: "",
      selectedField: "",
      loading: false,
      random: ""
    };
  },
  props: {
    headers: {
      type: Array,
      required: true
    },
    active: {
      type: Object,
      required: true
    },
    path: {
      type: String,
      default: null
    },
    meta: {
      type: Boolean,
      default: false
    },
    subUpdate: {
      type: Boolean,
      default: false
    },
    parentPath: {
      type: String,
      default: ""
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    orderedHeaders: function orderedHeaders() {
      var orderedHeaders = JSON.parse(JSON.stringify(this.headers));
      orderedHeaders.sort(function (a, b) {
        return a.order > b.order ? 1 : -1;
      });
      return orderedHeaders;
    },
    alt: {
      get: function get() {
        return this.active;
      },
      set: function set() {
        this.saveChangedField();
      }
    }
  },
  methods: {
    generateRandom: function generateRandom() {
      this.random = Math.random().toString().substr(2, 8);
    },
    fieldFocused: function fieldFocused(field) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.focusField(field);

              case 2:
                _this.fieldSelected(field);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    fieldSelected: function fieldSelected(selectedField) {
      if (selectedField != this.selectedField) {
        this.saveChangedField();
      }

      this.selectedField = selectedField;
    },
    clickoutside: function clickoutside() {
      if (!this.meta) {
        this.saveChangedField();
      }
    },
    saveChangedField: function saveChangedField() {
      var _this2 = this;

      var meta = this.meta;
      var newValue = this.alt[this.selectedField];
      var savedHeader = this.headers.find(function (_ref) {
        var value = _ref.value;
        return value === _this2.selectedField;
      });

      if (savedHeader) {
        if (this.active.hasOwnProperty("id")) {
          if (savedHeader.type === "documents") {
            if (Array.isArray(newValue) && newValue.length > 0) {
              if (!newValue[0].hasOwnProperty("id")) {
                this.fileUpload(newValue);
              }
            }
          }
        } else {
          if (meta) {
            if (savedHeader.type === "documents") {
              if (newValue.length > 0 && !_.isEmpty(newValue)) {
                if (!newValue[0].hasOwnProperty("id")) {
                  this.$emit("update:".concat(this.selectedField), newValue);
                }
              }
            } else {
              //this.validate(newValue, this.selectedField);
              this.$emit("update:".concat(this.selectedField), newValue); //this.$emit("act", newValue, this.selectedField);
            }
          }
        }
      }
    },
    validate: function validate(e, field) {
      console.log({
        field: field
      });
      var header = this.headers.find(function (h) {
        return h.field === field;
      });

      if (header && header.required && e.length === 0) {
        this.$emit("update-validate", false, field);
        this.showErrorSnack(header.label + " is a required field!");
        return false;
      } else {
        this.$emit("update-validate", true, field);
        return true;
      }
    },
    mapType: function mapType(type) {
      return typeToComponent$1[type] ? typeToComponent$1[type] : type;
    },
    mapClass: function mapClass(type) {
      return typeToClass$1[type] ? typeToClass$1[type] : "input-field";
    },
    selected: function selected(e) {
      this.$emit(this.selectAction, e);
    },
    focusField: function focusField(name) {
      this.editField = name;
    },
    fileUpload: function fileUpload(files) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var formData, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!_this3.loading) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                _this3.loading = true;
                formData = new FormData();
                files.forEach(function (obj) {
                  formData.append("file[]", obj);
                });
                _context2.next = 7;
                return _this3.$repositories[_this3.path].subCreateFile(_this3.active.id, formData, "documents");

              case 7:
                response = _context2.sent;

                if (response.hasOwnProperty("error")) {
                  _this3.$store.dispatch("".concat(_this3.path, "/set_snack"), response);
                } else {
                  _this3.$store.dispatch("".concat(_this3.path, "/list"));

                  _this3.$emit("success", files);
                }

                _this3.loading = false;

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    update: function update(e, field) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var resource, obj, success;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log({
                  e: e
                });
                console.log({
                  field: field
                });

                if (!_this4.loading) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return");

              case 4:
                if (_this4.validate(e, field)) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return");

              case 6:
                _this4.loading = true;
                resource = {};
                resource[field] = e;
                obj = {};

                if (!_this4.meta) {
                  _context3.next = 14;
                  break;
                }

                _this4.$emit("act", e, field);

                _context3.next = 19;
                break;

              case 14:
                obj = {
                  id: _this4.active.id,
                  payload: resource
                };
                _context3.next = 17;
                return _this4.$store.dispatch("".concat(_this4.path, "/update"), obj);

              case 17:
                success = _context3.sent;

                if (success) {
                  _this4.$emit("success", e);
                }

              case 19:
                _this4.loading = false;

                if (_this4.subUpdate) {
                  _this4.$store.dispatch("".concat(_this4.parentPath, "/list"));
                }

              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$g = script$g;
/* template */

var __vue_render__$g = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-card-text', [_c('loading', {
    attrs: {
      "loading": _vm.loading
    }
  }), _vm._v(" "), _c('v-form', {
    ref: 'form_' + _vm.random
  }, _vm._l(_vm.orderedHeaders, function (field) {
    return _c('div', {
      key: field.order,
      staticClass: "align-start d-flex",
      class: _vm.mapClass(field.type),
      on: {
        "mouseenter": function mouseenter($event) {
          return _vm.focusField(field.field);
        },
        "mousedown": function mousedown($event) {
          return _vm.fieldSelected(field.field);
        }
      }
    }, [_c(_vm.mapType(field.type), {
      key: field.order,
      tag: "component",
      class: _vm.mapClass(field.type),
      attrs: {
        "dense": _vm.dense,
        "index": field.order,
        "active": _vm.active,
        "opts": field,
        "header": field,
        "label": field.text,
        "editField": _vm.editField,
        "field": field.field,
        "path": _vm.path
      },
      on: {
        "act": _vm.update,
        "fieldFocused": _vm.fieldFocused
      },
      model: {
        value: _vm.alt[field.field],
        callback: function callback($$v) {
          _vm.$set(_vm.alt, field.field, $$v);
        },
        expression: "alt[field.field]"
      }
    })], 1);
  }), 0)], 1);
};

var __vue_staticRenderFns__$g = [];
/* style */

var __vue_inject_styles__$g = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-7149e72c_0", {
    source: ".input-field[data-v-7149e72c]{min-height:70px}.textarea-field[data-v-7149e72c]{min-height:130px}.wysiwyg-field[data-v-7149e72c]{min-height:400px}.documents[data-v-7149e72c]{min-height:80px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$g = "data-v-7149e72c";
/* module identifier */

var __vue_module_identifier__$g = "data-v-7149e72c";
/* functional template */

var __vue_is_functional_template__$g = false;
/* style inject shadow dom */

var __vue_component__$g = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$g,
  staticRenderFns: __vue_staticRenderFns__$g
}, __vue_inject_styles__$g, __vue_script__$g, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, false, undefined, createInjectorSSR, undefined);var typeToComponent = {
  text: "textEdit",
  email: "textEdit",
  website: "selectEdit",
  checkbox: "SwitchEdit",
  textarea: "textareaEdit",
  select: "textSelect",
  date: "dateEdit" //   documents: "file-attachments",
  //   documentsReadOnly: "file-attachments-read-only",
  //   contactAutocomplete: "contactAutocomplete",
  //   companyAutocomplete: "companyAutocomplete"

};
var typeToClass = {
  text: "input-field",
  money: "input-field",
  select: "input-field",
  checkbox: "input-field",
  date: "input-field",
  textarea: "textarea-field",
  memberAction: "input-field",
  renew: "input-field",
  phone: "input-field",
  email: "input-field",
  states: "input-field",
  time: "input-field",
  website: "input-field",
  modelAutocomplete: "input-field",
  wysiwyg: "wysiwyg-field",
  documents: "documents",
  documentsReadOnly: "documents"
};
var script$f = {
  name: "edge-form",
  components: {
    VCard: lib.VCard,
    VCardText: lib.VCardText,
    VRow: lib.VRow,
    VCol: lib.VCol,
    VIcon: lib.VIcon,
    VForm: lib.VForm
  },
  created: function created() {
    this.generateRandom();
  },
  data: function data() {
    return {
      editField: "",
      selectedField: "",
      loading: false,
      random: ""
    };
  },
  props: {
    headers: {
      type: Array,
      required: true
    },
    active: {
      type: Object,
      required: true
    },
    path: {
      type: String,
      default: null
    },
    meta: {
      type: Boolean,
      default: false
    },
    subUpdate: {
      type: Boolean,
      default: false
    },
    parentPath: {
      type: String,
      default: ""
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: true
    },
    currentQuestionIndex: {
      type: Number,
      default: 0,
      required: false
    }
  },
  computed: {
    orderedHeaders: function orderedHeaders() {
      var orderedHeaders = JSON.parse(JSON.stringify(this.headers));
      orderedHeaders.sort(function (a, b) {
        return a.order > b.order ? 1 : -1;
      });
      return orderedHeaders;
    },
    alt: {
      get: function get() {
        return this.active;
      },
      set: function set() {
        this.saveChangedField();
      }
    },
    activeQuestion: function activeQuestion() {
      var activeIndex = this.currentQuestionIndex;
      return this.orderedHeaders.find(function (question) {
        return question.order === activeIndex;
      });
    }
  },
  methods: {
    generateRandom: function generateRandom() {
      this.random = Math.random().toString().substr(2, 8);
    },
    fieldFocused: function fieldFocused(field) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.focusField(field);

              case 2:
                _this.fieldSelected(field);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    fieldSelected: function fieldSelected(selectedField) {
      if (selectedField != this.selectedField) {
        this.saveChangedField();
      }

      this.selectedField = selectedField;
    },
    clickoutside: function clickoutside() {
      if (!this.meta) {
        this.saveChangedField();
      }
    },
    saveChangedField: function saveChangedField() {
      var _this2 = this;

      var meta = this.meta;
      var newValue = this.alt[this.selectedField];
      var savedHeader = this.headers.find(function (_ref) {
        var value = _ref.value;
        return value === _this2.selectedField;
      });

      if (savedHeader) {
        if (this.active.hasOwnProperty("id")) {
          if (savedHeader.type === "documents") {
            if (Array.isArray(newValue) && newValue.length > 0) {
              if (!newValue[0].hasOwnProperty("id")) {
                this.fileUpload(newValue);
              }
            }
          }
        } else {
          if (meta) {
            if (savedHeader.type === "documents") {
              if (newValue.length > 0 && !_.isEmpty(newValue)) {
                if (!newValue[0].hasOwnProperty("id")) {
                  this.$emit("update:".concat(this.selectedField), newValue);
                }
              }
            } else {
              //this.validate(newValue, this.selectedField);
              this.$emit("update:".concat(this.selectedField), newValue); //this.$emit("act", newValue, this.selectedField);
            }
          }
        }
      }
    },
    validate: function validate(e, field) {
      console.log({
        field: field
      });
      var header = this.headers.find(function (h) {
        return h.field === field;
      });

      if (header && header.required && e.length === 0) {
        this.$emit("update-validate", false, field);
        this.showErrorSnack(header.label + " is a required field!");
        return false;
      } else {
        this.$emit("update-validate", true, field);
        return true;
      }
    },
    mapType: function mapType(type) {
      return typeToComponent[type] ? typeToComponent[type] : type;
    },
    mapClass: function mapClass(type) {
      return typeToClass[type] ? typeToClass[type] : "input-field";
    },
    selected: function selected(e) {
      this.$emit(this.selectAction, e);
    },
    focusField: function focusField(name) {
      this.editField = name;
    },
    fileUpload: function fileUpload(files) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var formData, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!_this3.loading) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                _this3.loading = true;
                formData = new FormData();
                files.forEach(function (obj) {
                  formData.append("file[]", obj);
                });
                _context2.next = 7;
                return _this3.$repositories[_this3.path].subCreateFile(_this3.active.id, formData, "documents");

              case 7:
                response = _context2.sent;

                if (response.hasOwnProperty("error")) {
                  _this3.$store.dispatch("".concat(_this3.path, "/set_snack"), response);
                } else {
                  _this3.$store.dispatch("".concat(_this3.path, "/list"));

                  _this3.$emit("success", files);
                }

                _this3.loading = false;

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    update: function update(e, field) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var resource, obj, success;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log({
                  e: e
                });
                console.log({
                  field: field
                });

                if (!_this4.loading) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return");

              case 4:
                if (_this4.validate(e, field)) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return");

              case 6:
                _this4.loading = true;
                resource = {};
                resource[field] = e;
                obj = {};

                if (!_this4.meta) {
                  _context3.next = 14;
                  break;
                }

                _this4.$emit("act", e, field);

                _context3.next = 19;
                break;

              case 14:
                obj = {
                  id: _this4.active.id,
                  payload: resource
                };
                _context3.next = 17;
                return _this4.$store.dispatch("".concat(_this4.path, "/update"), obj);

              case 17:
                success = _context3.sent;

                if (success) {
                  _this4.$emit("success", e);
                }

              case 19:
                _this4.loading = false;

                if (_this4.subUpdate) {
                  _this4.$store.dispatch("".concat(_this4.parentPath, "/list"));
                }

              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  }
};/* script */
var __vue_script__$f = script$f;
/* template */

var __vue_render__$f = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-card-text', [_c('loading', {
    attrs: {
      "loading": _vm.loading
    }
  }), _vm._v(" "), _c('v-form', {
    ref: 'form_' + _vm.random
  }, [_c('div', {
    staticClass: "align-start d-flex",
    class: _vm.mapClass(_vm.activeQuestion.type),
    on: {
      "mouseenter": function mouseenter($event) {
        return _vm.focusField(_vm.activeQuestion.field);
      },
      "mousedown": function mousedown($event) {
        return _vm.fieldSelected(_vm.activeQuestion.field);
      }
    }
  }, [_c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c(_vm.mapType(_vm.activeQuestion.type), {
    key: _vm.activeQuestion.order,
    tag: "component",
    class: _vm.mapClass(_vm.activeQuestion.type),
    attrs: {
      "dense": _vm.dense,
      "index": _vm.activeQuestion.order,
      "active": _vm.active,
      "opts": _vm.activeQuestion,
      "header": _vm.activeQuestion,
      "label": _vm.activeQuestion.text,
      "editField": _vm.editField,
      "field": _vm.activeQuestion.field,
      "path": _vm.path
    },
    on: {
      "act": _vm.update,
      "fieldFocused": _vm.fieldFocused
    },
    model: {
      value: _vm.alt[_vm.activeQuestion.field],
      callback: function callback($$v) {
        _vm.$set(_vm.alt, _vm.activeQuestion.field, $$v);
      },
      expression: "alt[activeQuestion.field]"
    }
  })], 1)], 1)])], 1);
};

var __vue_staticRenderFns__$f = [];
/* style */

var __vue_inject_styles__$f = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-aae64e54_0", {
    source: ".input-field[data-v-aae64e54]{min-height:70px}.textarea-field[data-v-aae64e54]{min-height:130px}.wysiwyg-field[data-v-aae64e54]{min-height:400px}.documents[data-v-aae64e54]{min-height:80px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$f = "data-v-aae64e54";
/* module identifier */

var __vue_module_identifier__$f = "data-v-aae64e54";
/* functional template */

var __vue_is_functional_template__$f = false;
/* style inject shadow dom */

var __vue_component__$f = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$f,
  staticRenderFns: __vue_staticRenderFns__$f
}, __vue_inject_styles__$f, __vue_script__$f, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, false, undefined, createInjectorSSR, undefined);//
var script$e = {
  name: 'loading',
  components: {
    VOverlay: lib.VOverlay,
    VBtn: lib.VBtn,
    VProgressCircular: lib.VProgressCircular
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  }
};/* script */
var __vue_script__$e = script$e;
/* template */

var __vue_render__$e = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-overlay', {
    attrs: {
      "value": _vm.loading,
      "absolute": true
    }
  }, [_c('v-btn', {
    attrs: {
      "text": "",
      "loading": _vm.loading
    }
  }, [_c('v-progress-circular', {
    attrs: {
      "indeterminate": "",
      "size": "64"
    }
  })], 1)], 1);
};

var __vue_staticRenderFns__$e = [];
/* style */

var __vue_inject_styles__$e = undefined;
/* scoped */

var __vue_scope_id__$e = "data-v-3fa38796";
/* module identifier */

var __vue_module_identifier__$e = "data-v-3fa38796";
/* functional template */

var __vue_is_functional_template__$e = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$e = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, false, undefined, undefined, undefined);var script$d = {
  directives: {
    mask: vueTheMask.mask
  },
  components: {
    VDatePicker: lib.VDatePicker,
    VTextField: lib.VTextField,
    VMenu: lib.VMenu
  },
  props: {
    active: {
      type: Object,
      required: true
    },
    opts: {
      type: Object,
      required: true
    },
    editField: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: false
    },
    dense: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      menu: false,
      emit: null
    };
  },
  watch: {
    emit: function emit() {
      this.$emit("input", this.emit);
    },
    value: function value() {
      this.emit = this.value;
    }
  },
  computed: {
    dateFormatted: function dateFormatted() {
      if (!this.active[this.opts.field]) return null;

      var _$clone = _.clone(this.active[this.opts.field].split("-")),
          _$clone2 = _slicedToArray(_$clone, 3),
          year = _$clone2[0],
          month = _$clone2[1],
          day = _$clone2[2];

      return "".concat(month, "/").concat(day, "/").concat(year);
    },
    computedValue: {
      get: function get() {
        return this.value;
      },
      set: function set(value) {
        this.emit = value;
      }
    },
    rules: function rules() {
      this.value;
      var required = true;

      if (this.opts.required) {
        required = function required(value) {
          return !!value || "Required.";
        };
      }

      return [required];
    },
    required: function required() {
      if (this.opts.required) {
        return "*";
      } else {
        return "";
      }
    }
  },
  methods: {
    clearDate: function clearDate() {
      this.$emit("fieldFocused", this.opts.field);
      this.$emit("input", null);
      this.$emit("act", null, this.opts.field);
    },
    emitFocus: function emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },
    blurField: function blurField(e) {
      this.$emit("act", e, this.opts.field);
      this.menu = false;
    },
    formatDate: function formatDate(date) {
      if (!date) return null;

      var _date$split = date.split("-"),
          _date$split2 = _slicedToArray(_date$split, 3),
          year = _date$split2[0],
          month = _date$split2[1],
          day = _date$split2[2];

      return "".concat(month, "/").concat(day, "/").concat(year);
    } //parseDate(date) {
    //if (!date) return null;
    //const [month, day, year] = date.split("/");
    //let parsed = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    //this.blurField(parsed);
    //}

  }
};/* script */
var __vue_script__$d = script$d;
/* template */

var __vue_render__$d = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('v-menu', {
    attrs: {
      "close-on-content-click": false,
      "transition": "scale-transition",
      "offset-y": "",
      "nudge-bottom": "",
      "min-width": "290px"
    },
    scopedSlots: _vm._u([{
      key: "activator",
      fn: function fn(ref) {
        var on = ref.on;
        return [_c('v-text-field', _vm._g({
          directives: [{
            name: "mask",
            rawName: "v-mask",
            value: '##/##/####',
            expression: "'##/##/####'"
          }],
          attrs: {
            "dense": _vm.dense,
            "outlined": "",
            "value": _vm.dateFormatted,
            "label": _vm.opts.label + _vm.required,
            "rules": _vm.rules,
            "clearable": !_vm.opts.required
          },
          on: {
            "focus": _vm.emitFocus,
            "click:clear": function clickClear($event) {
              return _vm.clearDate();
            }
          }
        }, on))];
      }
    }]),
    model: {
      value: _vm.menu,
      callback: function callback($$v) {
        _vm.menu = $$v;
      },
      expression: "menu"
    }
  }, [_vm._v(" "), _c('v-date-picker', {
    on: {
      "change": _vm.blurField
    },
    model: {
      value: _vm.computedValue,
      callback: function callback($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  })], 1)], 1);
};

var __vue_staticRenderFns__$d = [];
/* style */

var __vue_inject_styles__$d = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-b864e822_0", {
    source: ".fade-enter-active[data-v-b864e822],.fade-leave-active[data-v-b864e822]{transition:opacity .1s}.fade-enter[data-v-b864e822],.fade-leave-to[data-v-b864e822]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$d = "data-v-b864e822";
/* module identifier */

var __vue_module_identifier__$d = "data-v-b864e822";
/* functional template */

var __vue_is_functional_template__$d = false;
/* style inject shadow dom */

var __vue_component__$d = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, undefined, createInjectorSSR, undefined);var script$c = {
  components: {
    VAutocomplete: lib.VAutocomplete
  },
  created: function created() {
    this.debouncedQuery = _.debounce(this.querySelections, 300);
  },
  mounted: function mounted() {
    this.seed();
  },
  props: {
    active: {
      type: Object,
      required: true
    },
    opts: {
      type: Object,
      required: true
    },
    editField: {
      type: String,
      required: true
    },
    value: {
      type: [Object, Array, String, Number],
      required: false
    },
    clearable: {
      type: Boolean,
      required: false,
      default: false
    },
    dense: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      loading: false,
      search: null,
      selectBox: [],
      items: []
    };
  },
  computed: {
    selectedItem: function selectedItem() {
      return this.active[this.opts.field];
    },
    multiple: function multiple() {
      return this.opts.multiple;
    }
  },
  methods: {
    emitFocus: function emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },
    remove: function remove(item) {
      var selectBoxFindIndex = this.selectBox.indexOf(item.id);

      if (selectBoxFindIndex >= 0) {
        this.selectBox.splice(selectBoxFindIndex, 1);
        this.blurField();
      }
    },
    blurField: function blurField() {
      this.$emit("act", this.selectBox, this.opts.field);
      this.$emit("input", this.selectBox);
    },
    seed: function seed() {
      var selectBoxClone = _.clone(this.active[this.opts.field]);

      var selectBox = [];

      if (this.opts.multiple) {
        if (selectBoxClone) {
          if (!Array.isArray(selectBoxClone)) {
            if (selectBoxClone !== undefined) {
              if (selectBoxClone.hasOwnProperty("id")) {
                selectBox.push(selectBoxClone.id);
              }
            }
          } else {
            selectBoxClone.forEach(function (item) {
              selectBox.push(item.id);
            });
          }
        }
      } else {
        if (selectBoxClone) {
          selectBox = selectBoxClone.id;
        }
      }

      this.selectBox = selectBox;
      var opts = this.opts;
      this.items = Object.values(this.$store.state[this.opts.model].all).sort(function (a, b) {
        var nameA = a[opts.itemText].toLowerCase(),
            nameB = b[opts.itemText].toLowerCase();
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    },
    querySelections: function querySelections() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var includes, _this$$store$state$_t, sortBy, descending, sort, params, results;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.loading = true;
                includes = _this.$store.state[_this.opts.model].include;
                _this$$store$state$_t = _this.$store.state[_this.opts.model].pagination, sortBy = _this$$store$state$_t.sortBy, descending = _this$$store$state$_t.descending;
                sort = sortBy;

                if (descending) {
                  sort = "-" + sortBy;
                }

                params = {
                  "filter_scope[search]": _this.search,
                  sort: sort,
                  include: includes
                };
                _context.next = 8;
                return _this.$repositories[_this.opts.model].index(params);

              case 8:
                results = _context.sent;
                _this.items = [].concat(_toConsumableArray(_this.items), _toConsumableArray(results.data));
                _this.loading = false;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  },
  watch: {
    search: function search(newValue, oldValue) {
      if (newValue && newValue.length > 0) {
        this.debouncedQuery();
      }
    }
  }
};/* script */
var __vue_script__$c = script$c;
/* template */

var __vue_render__$c = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-autocomplete', {
    key: _vm.opts.itemValue,
    attrs: {
      "allow-overflow": "",
      "loading": _vm.loading,
      "items": _vm.items,
      "outlined": "",
      "search-input": _vm.search,
      "label": _vm.opts.label,
      "item-text": _vm.opts.itemText,
      "item-value": _vm.opts.itemValue,
      "hide-details": "",
      "deletable-chips": _vm.multiple,
      "multiple": _vm.multiple,
      "small-chips": "",
      "clearable": _vm.clearable,
      "dense": _vm.dense,
      "type": "select",
      "autocomplete": "new-password"
    },
    on: {
      "update:searchInput": function updateSearchInput($event) {
        _vm.search = $event;
      },
      "update:search-input": function updateSearchInput($event) {
        _vm.search = $event;
      },
      "change": function change($event) {
        return _vm.blurField();
      },
      "focus": _vm.emitFocus
    },
    scopedSlots: _vm._u([{
      key: "no-data",
      fn: function fn() {
        return [_c('v-list-item', [_c('v-list-item-title', [_vm._v("Search by typing")])], 1)];
      },
      proxy: true
    }, {
      key: "selection",
      fn: function fn(data) {
        return [_c('v-chip', _vm._b({
          attrs: {
            "input-value": data.selected,
            "close": _vm.multiple,
            "small": "",
            "label": ""
          },
          on: {
            "click:close": function clickClose($event) {
              return _vm.remove(data.item);
            }
          }
        }, 'v-chip', data.attrs, false), [_vm._v(_vm._s(data.item[_vm.opts.itemText]) + "\n    ")])];
      }
    }, {
      key: "item",
      fn: function fn(ref) {
        var item = ref.item;
        return [_c('v-list-item-content', {
          staticClass: "mb-2"
        }, [_c('v-list-item-title', {
          staticClass: "text--primary",
          domProps: {
            "textContent": _vm._s(item[_vm.opts.itemText])
          }
        })], 1)];
      }
    }]),
    model: {
      value: _vm.selectBox,
      callback: function callback($$v) {
        _vm.selectBox = $$v;
      },
      expression: "selectBox"
    }
  });
};

var __vue_staticRenderFns__$c = [];
/* style */

var __vue_inject_styles__$c = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-a314c256_0", {
    source: ".fade-enter-active[data-v-a314c256],.fade-leave-active[data-v-a314c256]{transition:opacity .1s}.fade-enter[data-v-a314c256],.fade-leave-to[data-v-a314c256]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$c = "data-v-a314c256";
/* module identifier */

var __vue_module_identifier__$c = "data-v-a314c256";
/* functional template */

var __vue_is_functional_template__$c = false;
/* style inject shadow dom */

var __vue_component__$c = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, undefined, createInjectorSSR, undefined);//
var script$b = {
  name: "States",
  components: {
    VAutocomplete: lib.VAutocomplete
  },
  created: function created() {
    this.seed();
  },
  props: {
    active: {
      type: Object,
      required: true
    },
    opts: {
      type: Object,
      required: true
    },
    editField: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: false
    },
    dense: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      assigned: null,
      items: ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"]
    };
  },
  computed: {
    multiple: function multiple() {
      return !!this.opts.multiple;
    },
    rules: function rules() {
      this.value;
      var required = true;

      if (this.opts.required) {
        required = function required(value) {
          return !!value || "Required.";
        };
      }

      return [required];
    },
    required: function required() {
      if (this.opts.required) {
        return "*";
      } else {
        return "";
      }
    },
    computedValue: {
      get: function get() {
        return this.value;
      },
      set: function set(value) {
        this.assigned = value;
      }
    }
  },
  mounted: function mounted() {
    this.refreshModel();
  },
  methods: {
    emitFocus: function emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },
    blurField: function blurField() {
      this.$emit("act", this.assigned, this.opts.field);
    },
    seed: function seed() {
      this.assigned = _.clone(this.active[this.opts.field]);
    },
    refreshModel: function refreshModel() {
      if (this.items.length < 1) {
        this.$store.dispatch("".concat(this.opts.model, "/list"));
      }
    }
  },
  watch: {
    matched: {
      handler: function handler(newValue, oldValue) {
        if (newValue != oldValue) {
          this.seed();
        }
      },
      immediate: true
    },
    assigned: function assigned() {
      this.$emit("input", this.assigned);
    }
  }
};/* script */
var __vue_script__$b = script$b;
/* template */

var __vue_render__$b = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-autocomplete', {
    key: "select",
    attrs: {
      "label": _vm.opts.label + _vm.required,
      "items": _vm.items,
      "rules": _vm.rules,
      "validate-on-blur": "",
      "multiple": false,
      "dense": _vm.dense,
      "type": "select",
      "outlined": "",
      "autocomplete": "new-password"
    },
    on: {
      "change": _vm.blurField,
      "focus": _vm.emitFocus
    },
    model: {
      value: _vm.computedValue,
      callback: function callback($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  });
};

var __vue_staticRenderFns__$b = [];
/* style */

var __vue_inject_styles__$b = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-00203bbf_0", {
    source: ".fade-enter-active[data-v-00203bbf],.fade-leave-active[data-v-00203bbf]{transition:opacity .1s}.fade-enter[data-v-00203bbf],.fade-leave-to[data-v-00203bbf]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$b = "data-v-00203bbf";
/* module identifier */

var __vue_module_identifier__$b = "data-v-00203bbf";
/* functional template */

var __vue_is_functional_template__$b = false;
/* style inject shadow dom */

var __vue_component__$b = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, undefined, createInjectorSSR, undefined);//
var script$a = {
  name: "SwitchEdit",
  components: {
    VSwitch: lib.VSwitch
  },
  props: {
    active: {
      type: Object,
      required: true
    },
    opts: {
      type: Object,
      required: true
    },
    editField: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number, Boolean],
      required: false
    },
    dense: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      assigned: null
    };
  },
  computed: {
    computedValue: {
      get: function get() {
        return this.value;
      },
      set: function set(value) {
        this.assigned = value;
      }
    }
  },
  methods: {
    blurField: function blurField(e) {
      this.$emit("act", e, this.opts.field);
    },
    build: function build() {
      this.assigned = _.clone(this.active[this.opts.field]);
    },
    emitFocus: function emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    }
  },
  created: function created() {
    this.build();
  },
  watch: {
    active: {
      handler: function handler(newValue, oldValue) {
        if (newValue != oldValue) {
          this.build();
        }
      },
      deep: true
    },
    assigned: function assigned() {
      this.$emit("input", this.assigned);
    }
  }
};/* script */
var __vue_script__$a = script$a;
/* template */

var __vue_render__$a = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-switch', {
    attrs: {
      "inset": "",
      "color": "secondary",
      "dense": _vm.dense,
      "label": _vm.opts.label,
      "hide-details": ""
    },
    on: {
      "change": _vm.blurField,
      "focus": _vm.emitFocus
    },
    model: {
      value: _vm.computedValue,
      callback: function callback($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  });
};

var __vue_staticRenderFns__$a = [];
/* style */

var __vue_inject_styles__$a = undefined;
/* scoped */

var __vue_scope_id__$a = "data-v-0c001880";
/* module identifier */

var __vue_module_identifier__$a = "data-v-0c001880";
/* functional template */

var __vue_is_functional_template__$a = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$a = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);//
var script$9 = {
  name: "TextareaEdit",
  components: {
    VTextarea: lib.VTextarea
  },
  props: {
    active: {
      type: Object,
      required: true
    },
    opts: {
      type: Object,
      required: true
    },
    editField: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: false
    },
    dense: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    emitChange: function emitChange() {
      if (this.emit) {
        this.$emit("act", this.computedValue, this.opts.field);
      }
    },
    emitFocus: function emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    }
  },
  data: function data() {
    return {
      emit: null
    };
  },
  watch: {
    emit: function emit() {
      this.$emit("input", this.emit);
    },
    value: function value() {
      this.emit = this.value;
    }
  },
  computed: {
    label: function label() {
      if (this.editField == this.opts.field) {
        return this.opts.label;
      }

      return "";
    },
    computedValue: {
      get: function get() {
        return this.value;
      },
      set: function set(value) {
        this.emit = value;
      }
    }
  }
};/* script */
var __vue_script__$9 = script$9;
/* template */

var __vue_render__$9 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-textarea', {
    attrs: {
      "hide-details": "",
      "label": _vm.label,
      "rows": "7",
      "outlined": "",
      "placeholder": 'Add a ' + _vm.opts.label
    },
    on: {
      "keyup": function keyup($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        return _vm.emitChange($event);
      },
      "change": _vm.emitChange,
      "focus": _vm.emitFocus
    },
    model: {
      value: _vm.computedValue,
      callback: function callback($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  });
};

var __vue_staticRenderFns__$9 = [];
/* style */

var __vue_inject_styles__$9 = undefined;
/* scoped */

var __vue_scope_id__$9 = "data-v-4c4a52b4";
/* module identifier */

var __vue_module_identifier__$9 = "data-v-4c4a52b4";
/* functional template */

var __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$9 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);//
//
//
//
var script$8 = {
  props: {
    opts: {
      type: Object,
      default: function _default() {}
    },
    active: {
      type: Object,
      default: function _default() {}
    }
  }
};/* script */
var __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "overflow-y-scroll",
    domProps: {
      "innerHTML": _vm._s(_vm.active[_vm.opts.field])
    }
  }, []);
};

var __vue_staticRenderFns__$8 = [];
/* style */

var __vue_inject_styles__$8 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-528d20bf_0", {
    source: ".overflow-y-scroll[data-v-528d20bf]{overflow-y:scroll}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$8 = "data-v-528d20bf";
/* module identifier */

var __vue_module_identifier__$8 = "data-v-528d20bf";
/* functional template */

var __vue_is_functional_template__$8 = false;
/* style inject shadow dom */

var __vue_component__$8 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, createInjectorSSR, undefined);//
var script$7 = {
  name: "TextEdit",
  components: {
    VTextField: lib.VTextField
  },
  props: {
    active: {
      type: Object,
      required: true
    },
    opts: {
      type: Object,
      required: true
    },
    editField: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: false
    },
    dense: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      emit: null,
      edit: false
    };
  },
  computed: {
    computedValue: {
      get: function get() {
        return this.value;
      },
      set: function set(value) {
        this.emit = value;
      }
    },
    rules: function rules() {
      this.value;
      var required = true;

      if (this.opts.required) {
        required = function required(value) {
          return !!value || "Required.";
        };
      }

      return [required];
    },
    required: function required() {
      if (this.opts.required) {
        return "*";
      } else {
        return "";
      }
    }
  },
  methods: {
    emitFocus: function emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },
    emitChange: function emitChange() {
      //this.$emit("act", this.emit, this.opts.field);
      if (this.emit != null) {
        this.$emit("act", this.emit, this.opts.field);
      }
    }
  },
  watch: {
    emit: function emit() {
      this.$emit("input", this.emit);
    },
    value: function value() {
      this.emit = this.value;
    },
    editField: function editField() {
      if (this.editField == this.opts.field) {
        this.edit = true;
      } else {
        this.edit = false;
      }
    }
  }
};/* script */
var __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-text-field', {
    key: "textActive",
    ref: _vm.opts.field,
    attrs: {
      "data-text-field": "",
      "outlined": "",
      "dense": _vm.dense,
      "label": _vm.opts.label + _vm.required,
      "hide-details": "",
      "readonly": _vm.opts.readOnly,
      "rules": _vm.rules,
      "validate-on-blur": ""
    },
    on: {
      "keydown": [function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        return _vm.emitChange($event);
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")) {
          return null;
        }

        return _vm.emitChange($event);
      }],
      "focus": _vm.emitFocus,
      "change": _vm.emitChange
    },
    model: {
      value: _vm.computedValue,
      callback: function callback($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  });
};

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-2dacb537_0", {
    source: ".fade-enter-active[data-v-2dacb537],.fade-leave-active[data-v-2dacb537]{transition:opacity .1s}.fade-enter[data-v-2dacb537],.fade-leave-to[data-v-2dacb537]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$7 = "data-v-2dacb537";
/* module identifier */

var __vue_module_identifier__$7 = "data-v-2dacb537";
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject shadow dom */

var __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, createInjectorSSR, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$6 = {
  props: {
    active: {
      type: Object,
      required: true
    },
    opts: {
      type: Object,
      required: true
    },
    editField: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      required: false
    },
    dense: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      emit: 0,
      rawValue: 0,
      currency_config: {
        decimal: '.',
        thousands: ',',
        prefix: '$ ',
        precision: 2,
        masked: false,
        allowBlank: true,
        min: Number.MIN_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER
      }
    };
  },
  computed: {
    computedValue: {
      get: function get() {
        return this.value;
      },
      set: function set(value) {
        this.emit = value;
      }
    },
    rules: function rules() {
      this.value;
      var required = true;

      if (this.opts.required) {
        required = function required(value) {
          return !!value || "Required.";
        };
      }

      return [required];
    },
    required: function required() {
      if (this.opts.required) {
        return "*";
      } else {
        return "";
      }
    }
  },
  methods: {
    emitFocus: function emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },
    emitChange: function emitChange() {
      if (this.emit) {
        this.$emit("act", this.emit, this.opts.field);
      }
    }
  },
  watch: {
    emit: function emit() {
      this.$emit("input", this.emit);
    },
    value: {
      handler: function handler(ov, nv) {
        this.emit = this.value;
      },
      immediate: true
    }
  }
};/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-currency-field', _vm._b({
    key: "moneyActive",
    ref: _vm.opts.field,
    attrs: {
      "dense": _vm.dense,
      "outlined": "",
      "label": _vm.opts.label + _vm.required
    },
    on: {
      "change": _vm.emitChange
    },
    model: {
      value: _vm.emit,
      callback: function callback($$v) {
        _vm.emit = $$v;
      },
      expression: "emit"
    }
  }, 'v-currency-field', _vm.currency_config, false));
};

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-45e92b17_0", {
    source: ".fade-enter-active[data-v-45e92b17],.fade-leave-active[data-v-45e92b17]{transition:opacity .1s}.fade-enter[data-v-45e92b17],.fade-leave-to[data-v-45e92b17]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$6 = "data-v-45e92b17";
/* module identifier */

var __vue_module_identifier__$6 = "data-v-45e92b17";
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject shadow dom */

var __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, createInjectorSSR, undefined);//
var script$5 = {
  props: {
    active: {
      type: Object,
      required: true
    },
    opts: {
      type: Object,
      required: true
    },
    editField: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      required: false
    },
    dense: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    emitFocus: function emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },
    handleKeyDown: function handleKeyDown(e) {
      var lazyValue = this.$refs[this.opts.field].lazyValue;

      if (e.keyCode == 8 || e.keyCode == 13 || e.keyCode == 9 || e.keyCode == 16) {
        return;
      }

      if (this.computedValue.toString().length >= 10) {
        e.preventDefault();
        return;
      }

      if (lazyValue.toString().indexOf(".") > -1) {
        if (e.keyCode == 190 || e.keyCode == 110) {
          e.preventDefault();
          return;
        }
      }

      if (e.keyCode == 190 || e.keyCode == 110) {
        return;
      }

      if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105) {
        return;
      }

      e.preventDefault();
      return;
    },
    emitChange: function emitChange() {
      if (this.emit) {
        this.$emit("act", this.emit, this.opts.field);
      }
    }
  },
  data: function data() {
    return {
      emit: null,
      rawValue: ""
    };
  },
  watch: {
    emit: function emit() {
      this.$emit("input", this.emit);
    },
    value: function value() {
      this.emit = this.value;
    }
  },
  computed: {
    computedValue: {
      get: function get() {
        return this.value;
      },
      set: function set(value) {
        this.emit = Math.floor(value);
      }
    },
    rules: function rules() {
      this.value;
      var required = true;

      if (this.opts.required) {
        required = function required(value) {
          return !!value || "Required.";
        };
      }

      return [required];
    },
    required: function required() {
      if (this.opts.required) {
        return "*";
      } else {
        return "";
      }
    }
  }
};/* script */
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-text-field', {
    key: "moneyActive",
    ref: _vm.opts.field,
    attrs: {
      "dense": _vm.dense,
      "outlined": "",
      "label": _vm.opts.label + _vm.required,
      "rules": _vm.rules,
      "validate-on-blur": "",
      "prefix": "$",
      "readonly": _vm.opts.readOnly
    },
    on: {
      "keyup": function keyup($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        return _vm.emitChange($event);
      },
      "keydown": _vm.handleKeyDown,
      "focus": _vm.emitFocus
    },
    model: {
      value: _vm.computedValue,
      callback: function callback($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  });
};

var __vue_staticRenderFns__$5 = [];
/* style */

var __vue_inject_styles__$5 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-17ab313c_0", {
    source: ".fade-enter-active[data-v-17ab313c],.fade-leave-active[data-v-17ab313c]{transition:opacity .1s}.fade-enter[data-v-17ab313c],.fade-leave-to[data-v-17ab313c]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$5 = "data-v-17ab313c";
/* module identifier */

var __vue_module_identifier__$5 = "data-v-17ab313c";
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject shadow dom */

var __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, createInjectorSSR, undefined);//
var script$4 = {
  directives: {
    mask: vueTheMask.mask
  },
  props: {
    active: {
      type: Object,
      required: true
    },
    opts: {
      type: Object,
      required: true
    },
    editField: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: false
    },
    dense: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    emitFocus: function emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },
    emitChange: function emitChange() {
      if (this.emit != null) {
        this.$emit("act", this.emit, this.opts.field);
      }
    },
    setPhone: function setPhone(value) {
      value.replace(/\D+/g, "");
      this.emit = value;
    }
  },
  data: function data() {
    return {
      emit: null,
      masked: false
    };
  },
  watch: {
    emit: function emit() {
      this.$emit("input", this.emit);
    },
    value: function value() {
      this.emit = this.value;
    }
  },
  computed: {
    computedValue: {
      get: function get() {
        return this.value;
      },
      set: function set(value) {
        var submit = value.replace(/\D+/g, "");
        console.log(submit);
        this.emit = value;
      }
    },
    rules: function rules() {
      this.value;
      var required = true;

      if (this.opts.required) {
        required = function required(value) {
          return !!value || "Required.";
        };
      }

      return [required];
    },
    required: function required() {
      if (this.opts.required) {
        return "*";
      } else {
        return "";
      }
    }
  }
};/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-text-field', {
    directives: [{
      name: "mask",
      rawName: "v-mask",
      value: '(###) ###-####',
      expression: "'(###) ###-####'"
    }],
    key: "textActive",
    attrs: {
      "dense": _vm.dense,
      "outlined": "",
      "value": _vm.value,
      "label": _vm.opts.label + _vm.required,
      "rules": _vm.rules,
      "validate-on-blur": "",
      "readonly": _vm.opts.readOnly
    },
    on: {
      "keyup": [function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        return _vm.emitChange($event);
      }, function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")) {
          return null;
        }

        return _vm.emitChange($event);
      }],
      "input": _vm.setPhone,
      "focus": _vm.emitFocus,
      "change": _vm.emitChange
    }
  });
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-82b6e0d4_0", {
    source: ".fade-enter-active[data-v-82b6e0d4],.fade-leave-active[data-v-82b6e0d4]{transition:opacity .1s}.fade-enter[data-v-82b6e0d4],.fade-leave-to[data-v-82b6e0d4]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$4 = "data-v-82b6e0d4";
/* module identifier */

var __vue_module_identifier__$4 = "data-v-82b6e0d4";
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject shadow dom */

var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, createInjectorSSR, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$3 = {
  props: {
    opts: {
      type: Object,
      default: function _default() {}
    },
    active: {
      type: Object,
      default: function _default() {}
    }
  }
};/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm.opts.nested ? [_c('v-text-field', {
    attrs: {
      "value": _vm.active[_vm.opts.field][_vm.opts.nestedValue],
      "label": _vm.opts.label,
      "readonly": ""
    }
  })] : [_c('v-text-field', {
    attrs: {
      "value": _vm.active[_vm.opts.field],
      "label": _vm.opts.label,
      "readonly": ""
    }
  })]], 2);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = "data-v-427f4f5e";
/* module identifier */

var __vue_module_identifier__$3 = "data-v-427f4f5e";
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);//
var script$2 = {
  name: "TextSelect",
  components: {
    VSelect: lib.VSelect
  },
  created: function created() {// this.seed();
  },
  props: {
    active: {
      type: Object,
      required: true
    },
    opts: {
      type: Object,
      required: true
    },
    editField: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number, Array],
      required: false
    },
    dense: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      assigned: null
    };
  },
  computed: {
    computedValue: {
      get: function get() {
        return this.value;
      },
      set: function set(value) {
        this.assigned = value;
      }
    },
    items: function items() {
      if (this.opts.model) {
        return Object.values(this.$store.state[this.opts.model].all);
      } else if (this.opts.freeModel) {
        return this.opts.freeModel;
      }

      return [];
    },
    multiple: function multiple() {
      if (this.opts.multiple) {
        return true;
      }

      return false;
    },
    rules: function rules() {
      this.value;
      var required = true;

      if (this.opts.required) {
        required = function required(value) {
          return !!value || "Required.";
        };
      }

      return [required];
    },
    required: function required() {
      if (this.opts.required) {
        return "*";
      } else {
        return "";
      }
    }
  },
  updated: function updated() {
    this.refreshModel();
  },
  methods: {
    blurField: function blurField() {
      this.$emit("act", this.assigned, this.opts.field);
    },
    seed: function seed() {
      this.assigned = _.clone(this.active[this.opts.field]);
    },
    refreshModel: function refreshModel() {
      //this.seed();
      if (this.items.length < 1) {
        this.$store.dispatch("".concat(this.opts.model, "/list"));
      }
    },
    emitFocus: function emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    }
  },
  watch: {
    assigned: function assigned() {
      this.$emit("input", this.assigned);
    },
    value: function value() {
      this.assigned = this.value;
    }
  }
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-select', {
    key: "select",
    attrs: {
      "outlined": "",
      "label": _vm.opts.label + _vm.required,
      "items": _vm.items,
      "item-text": _vm.opts.itemText,
      "item-value": _vm.opts.itemValue,
      "chips": _vm.multiple,
      "deletable-chips": _vm.multiple,
      "multiple": _vm.multiple,
      "rules": _vm.rules,
      "validate-on-blur": "",
      "small-chips": "",
      "dense": _vm.dense
    },
    on: {
      "change": _vm.blurField,
      "focus": _vm.emitFocus
    },
    model: {
      value: _vm.computedValue,
      callback: function callback($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  });
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-504251b0_0", {
    source: ".fade-enter-active[data-v-504251b0],.fade-leave-active[data-v-504251b0]{transition:opacity .1s}.fade-enter[data-v-504251b0],.fade-leave-to[data-v-504251b0]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$2 = "data-v-504251b0";
/* module identifier */

var __vue_module_identifier__$2 = "data-v-504251b0";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, createInjectorSSR, undefined);//
var script$1 = {
  name: "Time",
  components: {
    VSelect: lib.VSelect
  },
  created: function created() {
    this.seed();
  },
  props: {
    active: {
      type: Object,
      required: true
    },
    opts: {
      type: Object,
      required: true
    },
    editField: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number, Boolean],
      required: false
    },
    dense: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      assigned: null,
      items: [{
        label: "12:00 AM",
        value: "00:00:00"
      }, {
        label: "1:00 AM",
        value: "01:00:00"
      }, {
        label: "1:30 AM",
        value: "01:30:00"
      }, {
        label: "2:00 AM",
        value: "02:00:00"
      }, {
        label: "2:30 AM",
        value: "02:30:00"
      }, {
        label: "3:00 AM",
        value: "03:00:00"
      }, {
        label: "3:30 AM",
        value: "03:30:00"
      }, {
        label: "4:00 AM",
        value: "04:00:00"
      }, {
        label: "4:30 AM",
        value: "04:30:00"
      }, {
        label: "5:00 AM",
        value: "05:00:00"
      }, {
        label: "5:30 AM",
        value: "05:30:00"
      }, {
        label: "6:00 AM",
        value: "06:00:00"
      }, {
        label: "6:30 AM",
        value: "06:30:00"
      }, {
        label: "7:00 AM",
        value: "07:00:00"
      }, {
        label: "7:30 AM",
        value: "07:30:00"
      }, {
        label: "8:00 AM",
        value: "08:00:00"
      }, {
        label: "8:30 AM",
        value: "08:30:00"
      }, {
        label: "9:00 AM",
        value: "09:00:00"
      }, {
        label: "9:30 AM",
        value: "09:30:00"
      }, {
        label: "10:00 AM",
        value: "10:00:00"
      }, {
        label: "10:30 AM",
        value: "10:30:00"
      }, {
        label: "11:00 AM",
        value: "11:00:00"
      }, {
        label: "11:30 AM",
        value: "11:30:00"
      }, {
        label: "12:00 PM",
        value: "12:00:00"
      }, {
        label: "1:00 PM",
        value: "13:00:00"
      }, {
        label: "1:30 PM",
        value: "13:30:00"
      }, {
        label: "2:00 PM",
        value: "14:00:00"
      }, {
        label: "2:30 PM",
        value: "14:30:00"
      }, {
        label: "3:00 PM",
        value: "15:00:00"
      }, {
        label: "3:30 PM",
        value: "15:30:00"
      }, {
        label: "4:00 PM",
        value: "16:00:00"
      }, {
        label: "4:30 PM",
        value: "16:30:00"
      }, {
        label: "5:00 PM",
        value: "17:00:00"
      }, {
        label: "5:30 PM",
        value: "17:30:00"
      }, {
        label: "6:00 PM",
        value: "18:00:00"
      }, {
        label: "6:30 PM",
        value: "18:30:00"
      }, {
        label: "7:00 PM",
        value: "19:00:00"
      }, {
        label: "7:30 PM",
        value: "19:30:00"
      }, {
        label: "8:00 PM",
        value: "20:00:00"
      }, {
        label: "8:30 PM",
        value: "20:30:00"
      }, {
        label: "9:00 PM",
        value: "21:00:00"
      }, {
        label: "9:30 PM",
        value: "21:30:00"
      }, {
        label: "10:00 PM",
        value: "22:00:00"
      }, {
        label: "10:30 PM",
        value: "22:30:00"
      }, {
        label: "11:00 PM",
        value: "23:00:00"
      }, {
        label: "11:30 PM",
        value: "23:30:00"
      }]
    };
  },
  computed: {
    multiple: function multiple() {
      // if (this.opts.multiple) {
      //   return true;
      // }
      return false;
    },
    computedValue: {
      get: function get() {
        return this.value;
      },
      set: function set(value) {
        this.assigned = value;
      }
    }
  },
  mounted: function mounted() {//this.refreshModel();
  },
  methods: {
    blurField: function blurField() {
      this.$emit("act", this.assigned, this.opts.field);
    },
    emitFocus: function emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },
    seed: function seed() {
      this.assigned = _.clone(this.active[this.opts.field]);
    }
  },
  watch: {
    matched: {
      handler: function handler(newValue, oldValue) {
        if (newValue != oldValue) {
          this.seed();
        }
      },
      immediate: true
    },
    assigned: function assigned() {
      this.$emit("input", this.assigned);
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('v-select', {
    key: "select",
    attrs: {
      "outlined": "",
      "label": _vm.opts.label,
      "items": _vm.items,
      "item-text": "label",
      "item-value": "value",
      "hide-details": "",
      "multiple": false,
      "dense": _vm.dense
    },
    on: {
      "change": _vm.blurField,
      "focus": _vm.emitFocus
    },
    model: {
      value: _vm.computedValue,
      callback: function callback($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  })], 1);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-382e1100_0", {
    source: ".fade-enter-active[data-v-382e1100],.fade-leave-active[data-v-382e1100]{transition:opacity .1s}.fade-enter[data-v-382e1100],.fade-leave-to[data-v-382e1100]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = "data-v-382e1100";
/* module identifier */

var __vue_module_identifier__$1 = "data-v-382e1100";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: "wysiwyg",
  props: {
    active: {
      type: Object,
      required: true
    },
    opts: {
      type: Object,
      required: true
    },
    editField: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: false
    }
  },
  data: function data() {
    return {
      editor: null,
      editorOption: {
        // Some Quill options...
        theme: "snow",
        modules: {
          toolbar: [["bold", "italic", "underline", "strike"], ["blockquote", "code-block"], ["link", "image"], [{
            list: "ordered"
          }, {
            list: "bullet"
          }], [{
            script: "sub"
          }, {
            script: "super"
          }], [{
            indent: "-1"
          }, {
            indent: "+1"
          }], [{
            direction: "rtl"
          }], [{
            size: ["small", false, "large", "huge"]
          }], [{
            header: [1, 2, 3, 4, 5, 6, false]
          }], [{
            color: []
          }, {
            background: []
          }], [{
            font: []
          }], [{
            align: []
          }], ["clean"]]
        }
      },
      emit: null
    };
  },
  computed: {
    //TODO: finish auto inserts
    auto_inserts: function auto_inserts() {
      var _this = this;

      console.log("opts");
      console.log(this.opts);

      if (this.opts.hasOwnProperty("auto_inserts")) {
        console.log(this.opts.auto_inserts);
        var auto_inserts = [];
        this.opts.auto_inserts.forEach(function (insert) {
          if (insert.manual_list.length > 0) {
            auto_inserts.push({
              title: insert.title,
              values: insert.manual_list
            });
          } else {
            var headers = _this.$store.getters["".concat(insert.source, "/visibleHeaders")];

            var newList = [];
            headers.forEach(function (header) {
              if (header.type == "text" || header.type == "date" || header.type == "states") {
                newList.push({
                  label: header.label,
                  value: "%" + insert.source + "_" + header.value + "%"
                });
              }

              if (header.type == "select") {
                if (header.hasOwnProperty("multiple")) {
                  if (!header.multiple) {
                    newList.push({
                      label: header.label,
                      value: "%" + insert.source + "_" + header.value + "%"
                    });
                  }
                } else {
                  newList.push({
                    label: header.label,
                    value: "%" + insert.source + "_" + header.value + "%"
                  });
                }
              }
            });
            auto_inserts.push({
              title: insert.title,
              values: newList
            });
          }
        });
        return auto_inserts;
      }

      return [];
    },
    computedValue: {
      get: function get() {
        return this.value;
      },
      set: function set(value) {
        this.emit = value;
      }
    },
    required: function required() {
      if (this.opts.required) {
        return "*";
      } else {
        return "";
      }
    }
  },
  mounted: function mounted() {},
  methods: {
    addText: function addText(mergeFieldText) {
      var selection = this.editor.getSelection(true);
      this.editor.insertText(selection.index, mergeFieldText);
    },
    blurField: function blurField() {
      if (this.emit) {
        this.$emit("act", this.emit, this.opts.field);
      }
    },
    onEditorBlur: function onEditorBlur(editor) {//console.log('editor blur!', editor)
      // this.$emit("act", this.emit, this.opts.field);
    },
    onEditorFocus: function onEditorFocus(editor) {
      this.$emit("fieldFocused", this.opts.field);
      this.editor = editor; //console.log('editor focus!', editor)
    },
    onEditorReady: function onEditorReady(editor) {//console.log('editor ready!', editor)
    }
  },
  watch: {
    emit: function emit() {
      this.$emit("input", this.emit);
    },
    value: function value() {
      this.emit = this.value;
    }
  }
};/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    on: {
      "mouseleave": _vm.blurField
    }
  }, [_vm._ssrNode("<label class=\"v-label v-label--active theme--light caption mb-1\">" + _vm._ssrEscape(_vm._s(_vm.opts.label + _vm.required)) + "</label> "), _vm.auto_inserts.length > 0 ? _c('v-toolbar', {
    attrs: {
      "dense": "",
      "flat": ""
    }
  }, [_c('v-spacer'), _vm._v(" "), _vm._l(_vm.auto_inserts, function (insert, index) {
    return [_c('v-menu', {
      key: index,
      staticClass: "ma-4",
      attrs: {
        "offset-y": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function fn(ref) {
          var on = ref.on;
          return [_c('v-btn', _vm._g({
            staticClass: "ml-4",
            attrs: {
              "outlined": "",
              "color": "primary",
              "dark": "",
              "small": ""
            }
          }, on), [_vm._v(_vm._s(insert.title))])];
        }
      }], null, true)
    }, [_vm._v(" "), _c('v-list', {
      attrs: {
        "dense": ""
      }
    }, _vm._l(insert.values, function (item, index) {
      return _c('v-list-item', {
        key: index,
        on: {
          "click": function click($event) {
            return _vm.addText(item.value);
          }
        }
      }, [_c('v-list-item-title', [_vm._v(_vm._s(item.label))])], 1);
    }), 1)], 1)];
  })], 2) : _vm._e(), _vm._ssrNode(" "), _c('quill-editor', {
    ref: "editor",
    attrs: {
      "options": _vm.editorOption
    },
    on: {
      "blur": function blur($event) {
        return _vm.onEditorBlur($event);
      },
      "focus": function focus($event) {
        return _vm.onEditorFocus($event);
      },
      "ready": function ready($event) {
        return _vm.onEditorReady($event);
      }
    },
    model: {
      value: _vm.computedValue,
      callback: function callback($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  })], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-6c8e55fe_0", {
    source: ".quill-editor{height:250px;min-height:200;max-height:200;border-radius:2px}.ql-container.ql-snow{border-radius:6px}.ql-toolbar.ql-snow{border-radius:6px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-6c8e55fe";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);/* eslint-disable import/prefer-default-export */var components$1=/*#__PURE__*/Object.freeze({__proto__:null,EdgeForm: __vue_component__$g,EdgeFormSingle: __vue_component__$f,Loading: __vue_component__$e,DateEdit: __vue_component__$d,ModelAutocomplete: __vue_component__$c,States: __vue_component__$b,SwitchEdit: __vue_component__$a,TextareaEdit: __vue_component__$9,TextareaReadOnly: __vue_component__$8,TextEdit: __vue_component__$7,Money: __vue_component__$6,MoneyRaw: __vue_component__$5,Phone: __vue_component__$4,TextReadOnly: __vue_component__$3,TextSelect: __vue_component__$2,Time: __vue_component__$1,Wysiwyg: __vue_component__});var install = function installEdgeForm(Vue) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default': install,EdgeForm: __vue_component__$g,EdgeFormSingle: __vue_component__$f,Loading: __vue_component__$e,DateEdit: __vue_component__$d,ModelAutocomplete: __vue_component__$c,States: __vue_component__$b,SwitchEdit: __vue_component__$a,TextareaEdit: __vue_component__$9,TextareaReadOnly: __vue_component__$8,TextEdit: __vue_component__$7,Money: __vue_component__$6,MoneyRaw: __vue_component__$5,Phone: __vue_component__$4,TextReadOnly: __vue_component__$3,TextSelect: __vue_component__$2,Time: __vue_component__$1,Wysiwyg: __vue_component__});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== 'default') {
    install[componentName] = component;
  }
});module.exports=install;