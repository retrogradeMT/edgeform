import 'vue';
import { VCard, VCardText, VRow, VCol, VIcon, VOverlay, VBtn, VProgressCircular, VAutocomplete, VSwitch, VTextarea, VTextField, VSelect } from 'vuetify/lib';
import { mask } from 'vue-the-mask';
import { TiptapVuetify, History, Blockquote, Link, Underline, Strike, Italic, ListItem, BulletList, Image, OrderedList, Heading, Bold, Code, HorizontalRule, Paragraph, HardBreak } from 'tiptap-vuetify';

//
const typeToComponent = {
  text: "textEdit",
  email: "textEdit",
  website: "textEdit",
  checkbox: "SwitchEdit",
  textarea: "textareaEdit",
  select: "textSelect",
  date: "dateEdit" //   documents: "file-attachments",
  //   documentsReadOnly: "file-attachments-read-only",
  //   contactAutocomplete: "contactAutocomplete",
  //   companyAutocomplete: "companyAutocomplete"

};
const typeToClass = {
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
    VCard,
    VCardText,
    VRow,
    VCol,
    VIcon
  },

  data() {
    return {
      editField: "",
      selectedField: "",
      loading: false
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
    orderedHeaders() {
      let orderedHeaders = JSON.parse(JSON.stringify(this.headers));
      orderedHeaders.sort((a, b) => a.order > b.order ? 1 : -1);
      return orderedHeaders;
    },

    alt: {
      get() {
        return this.active;
      },

      set() {
        this.saveChangedField();
      }

    }
  },
  methods: {
    async fieldFocused(field) {
      await this.focusField(field);
      this.fieldSelected(field);
    },

    fieldSelected(selectedField) {
      if (selectedField != this.selectedField) {
        this.saveChangedField();
      }

      this.selectedField = selectedField;
    },

    clickoutside() {
      if (!this.meta) {
        this.saveChangedField();
      }
    },

    saveChangedField() {
      let meta = this.meta;
      let newValue = this.alt[this.selectedField];
      let savedHeader = this.headers.find(({
        value
      }) => value === this.selectedField);

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
                  this.$emit(`update:${this.selectedField}`, newValue);
                }
              }
            } else {
              //this.validate(newValue, this.selectedField);
              this.$emit(`update:${this.selectedField}`, newValue); //this.$emit("act", newValue, this.selectedField);
            }
          }
        }
      }
    },

    validate(e, field) {
      console.log({
        field
      });
      let header = this.headers.find(h => h.field === field);

      if (header && header.required && e.length === 0) {
        this.$emit("update-validate", false, field);
        this.showErrorSnack(header.label + " is a required field!");
        return false;
      } else {
        this.$emit("update-validate", true, field);
        return true;
      }
    },

    mapType(type) {
      return typeToComponent[type] ? typeToComponent[type] : type;
    },

    mapClass(type) {
      return typeToClass[type] ? typeToClass[type] : "input-field";
    },

    selected(e) {
      this.$emit(this.selectAction, e);
    },

    focusField(name) {
      this.editField = name;
    },

    async fileUpload(files) {
      if (this.loading) return;
      this.loading = true;
      let formData = new FormData();
      files.forEach(obj => {
        formData.append("file[]", obj);
      });
      let response = await this.$repositories[this.path].subCreateFile(this.active.id, formData, "documents");

      if (response.hasOwnProperty("error")) {
        this.$store.dispatch(`${this.path}/set_snack`, response);
      } else {
        this.$store.dispatch(`${this.path}/list`);
        this.$emit("success", files);
      }

      this.loading = false;
    },

    async update(e, field) {
      console.log({
        e
      });
      console.log({
        field
      });
      if (this.loading) return;

      if (!this.validate(e, field)) {
        return;
      }

      this.loading = true;
      let resource = {};
      resource[field] = e;
      let obj = {};

      if (this.meta) {
        this.$emit("act", e, field);
      } else {
        obj = {
          id: this.active.id,
          payload: resource
        };
        let success = await this.$store.dispatch(`${this.path}/update`, obj);

        if (success) {
          this.$emit("success", e);
        }
      }

      this.loading = false;

      if (this.subUpdate) {
        this.$store.dispatch(`${this.parentPath}/list`);
      }
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$f = script$f;
/* template */

var __vue_render__$f = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-card-text', [_c('loading', {
    attrs: {
      "loading": _vm.loading
    }
  }), _vm._v(" "), _vm._l(_vm.orderedHeaders, function (field) {
    return _c('v-row', {
      key: field.order,
      staticClass: "align-center d-flex",
      attrs: {
        "no-gutters": ""
      }
    }, [!_vm.noIcon ? _c('v-col', {
      staticClass: "justify-center flex-grow-0 flex-shrink-0 d-none d-md-flex",
      attrs: {
        "cols": 1
      }
    }, [field.icon ? _c('v-icon', [_vm._v(_vm._s(field.icon))]) : _vm._e()], 1) : _vm._e(), _vm._v(" "), _c('v-col', {
      staticClass: "align-start",
      class: _vm.mapClass(field.type),
      attrs: {
        "cols": "12",
        "md": _vm.noIcon ? 12 : 11
      },
      on: {
        "mouseenter": function ($event) {
          return _vm.focusField(field.field);
        },
        "mousedown": function ($event) {
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
        callback: function ($$v) {
          _vm.$set(_vm.alt, field.field, $$v);
        },
        expression: "alt[field.field]"
      }
    })], 1)], 1);
  })], 2);
};

var __vue_staticRenderFns__$f = [];
/* style */

const __vue_inject_styles__$f = function (inject) {
  if (!inject) return;
  inject("data-v-231f1512_0", {
    source: ".input-field[data-v-231f1512]{height:70px}.textarea-field[data-v-231f1512]{min-height:160px}.wysiwyg-field[data-v-231f1512]{min-height:400px}.documents[data-v-231f1512]{min-height:80px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$f = "data-v-231f1512";
/* module identifier */

const __vue_module_identifier__$f = undefined;
/* functional template */

const __vue_is_functional_template__$f = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$f = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$f,
  staticRenderFns: __vue_staticRenderFns__$f
}, __vue_inject_styles__$f, __vue_script__$f, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, false, createInjector, undefined, undefined);

//
var script$e = {
  name: 'loading',
  components: {
    VOverlay,
    VBtn,
    VProgressCircular
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  }
};

/* script */
const __vue_script__$e = script$e;
/* template */

var __vue_render__$e = function () {
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

const __vue_inject_styles__$e = undefined;
/* scoped */

const __vue_scope_id__$e = "data-v-3fa38796";
/* module identifier */

const __vue_module_identifier__$e = undefined;
/* functional template */

const __vue_is_functional_template__$e = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$e = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, false, undefined, undefined, undefined);

//
var script$d = {
  directives: {
    mask
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

  data() {
    return {
      menu: false,
      emit: null
    };
  },

  watch: {
    emit() {
      this.$emit("input", this.emit);
    },

    value() {
      this.emit = this.value;
    }

  },
  computed: {
    dateFormatted() {
      if (!this.active[this.opts.field]) return null;

      const [year, month, day] = _.clone(this.active[this.opts.field].split("-"));

      return `${month}/${day}/${year}`;
    },

    computedValue: {
      get() {
        return this.value;
      },

      set(value) {
        this.emit = value;
      }

    },

    rules() {
      this.value;
      let required = true;

      if (this.opts.required) {
        required = value => !!value || "Required.";
      }

      return [required];
    },

    required() {
      if (this.opts.required) {
        return "*";
      } else {
        return "";
      }
    }

  },
  methods: {
    clearDate() {
      this.$emit("fieldFocused", this.opts.field);
      this.$emit("input", null);
      this.$emit("act", null, this.opts.field);
    },

    emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },

    blurField(e) {
      this.$emit("act", e, this.opts.field);
      this.menu = false;
    },

    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    } //parseDate(date) {
    //if (!date) return null;
    //const [month, day, year] = date.split("/");
    //let parsed = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    //this.blurField(parsed);
    //}


  }
};

/* script */
const __vue_script__$d = script$d;
/* template */

var __vue_render__$d = function () {
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
      fn: function (ref) {
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
            "click:clear": function ($event) {
              return _vm.clearDate();
            }
          }
        }, on))];
      }
    }]),
    model: {
      value: _vm.menu,
      callback: function ($$v) {
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
      callback: function ($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  })], 1)], 1);
};

var __vue_staticRenderFns__$d = [];
/* style */

const __vue_inject_styles__$d = function (inject) {
  if (!inject) return;
  inject("data-v-ea77df86_0", {
    source: ".fade-enter-active[data-v-ea77df86],.fade-leave-active[data-v-ea77df86]{transition:opacity .1s}.fade-enter[data-v-ea77df86],.fade-leave-to[data-v-ea77df86]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$d = "data-v-ea77df86";
/* module identifier */

const __vue_module_identifier__$d = undefined;
/* functional template */

const __vue_is_functional_template__$d = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$d = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, createInjector, undefined, undefined);

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
var script$c = {
  created() {
    this.debouncedQuery = _.debounce(this.querySelections, 300);
  },

  mounted() {
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

  data() {
    return {
      loading: false,
      search: null,
      selectBox: [],
      items: []
    };
  },

  computed: {
    selectedItem() {
      return this.active[this.opts.field];
    },

    multiple() {
      return this.opts.multiple;
    }

  },
  methods: {
    emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },

    remove(item) {
      let selectBoxFindIndex = this.selectBox.indexOf(item.id);

      if (selectBoxFindIndex >= 0) {
        this.selectBox.splice(selectBoxFindIndex, 1);
        this.blurField();
      }
    },

    blurField() {
      this.$emit("act", this.selectBox, this.opts.field);
      this.$emit("input", this.selectBox);
    },

    seed() {
      let selectBoxClone = _.clone(this.active[this.opts.field]);

      let selectBox = [];

      if (this.opts.multiple) {
        if (selectBoxClone) {
          if (!Array.isArray(selectBoxClone)) {
            if (selectBoxClone !== undefined) {
              if (selectBoxClone.hasOwnProperty("id")) {
                selectBox.push(selectBoxClone.id);
              }
            }
          } else {
            selectBoxClone.forEach(item => {
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
      let opts = this.opts;
      this.items = Object.values(this.$store.state[this.opts.model].all).sort(function (a, b) {
        var nameA = a[opts.itemText].toLowerCase(),
            nameB = b[opts.itemText].toLowerCase();
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    },

    async querySelections() {
      this.loading = true;
      let includes = this.$store.state[this.opts.model].include;
      let {
        sortBy,
        descending
      } = this.$store.state[this.opts.model].pagination;
      let sort = sortBy;

      if (descending) {
        sort = "-" + sortBy;
      }

      let params = {
        "filter_scope[search]": this.search,
        sort: sort,
        include: includes
      };
      let results = await this.$repositories[this.opts.model].index(params);
      this.items = [...this.items, ...results.data];
      this.loading = false;
    }

  },
  watch: {
    search: function (newValue, oldValue) {
      if (newValue && newValue.length > 0) {
        this.debouncedQuery();
      }
    }
  }
};

/* script */
const __vue_script__$c = script$c;
/* template */

var __vue_render__$c = function () {
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
      "update:searchInput": function ($event) {
        _vm.search = $event;
      },
      "update:search-input": function ($event) {
        _vm.search = $event;
      },
      "change": function ($event) {
        return _vm.blurField();
      },
      "focus": _vm.emitFocus
    },
    scopedSlots: _vm._u([{
      key: "no-data",
      fn: function () {
        return [_c('v-list-item', [_c('v-list-item-title', [_vm._v("Search by typing")])], 1)];
      },
      proxy: true
    }, {
      key: "selection",
      fn: function (data) {
        return [_c('v-chip', _vm._b({
          attrs: {
            "input-value": data.selected,
            "close": _vm.multiple,
            "small": "",
            "label": ""
          },
          on: {
            "click:close": function ($event) {
              return _vm.remove(data.item);
            }
          }
        }, 'v-chip', data.attrs, false), [_vm._v(_vm._s(data.item[_vm.opts.itemText]) + "\n    ")])];
      }
    }, {
      key: "item",
      fn: function (ref) {
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
      callback: function ($$v) {
        _vm.selectBox = $$v;
      },
      expression: "selectBox"
    }
  });
};

var __vue_staticRenderFns__$c = [];
/* style */

const __vue_inject_styles__$c = function (inject) {
  if (!inject) return;
  inject("data-v-8494003a_0", {
    source: ".fade-enter-active[data-v-8494003a],.fade-leave-active[data-v-8494003a]{transition:opacity .1s}.fade-enter[data-v-8494003a],.fade-leave-to[data-v-8494003a]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$c = "data-v-8494003a";
/* module identifier */

const __vue_module_identifier__$c = undefined;
/* functional template */

const __vue_is_functional_template__$c = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$c = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, createInjector, undefined, undefined);

//
var script$b = {
  name: "States",
  components: {
    VAutocomplete
  },

  created() {
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

  data() {
    return {
      assigned: null,
      items: ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"]
    };
  },

  computed: {
    multiple() {
      return !!this.opts.multiple;
    },

    rules() {
      this.value;
      let required = true;

      if (this.opts.required) {
        required = value => !!value || "Required.";
      }

      return [required];
    },

    required() {
      if (this.opts.required) {
        return "*";
      } else {
        return "";
      }
    },

    computedValue: {
      get() {
        return this.value;
      },

      set(value) {
        this.assigned = value;
      }

    }
  },

  mounted() {
    this.refreshModel();
  },

  methods: {
    emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },

    blurField() {
      this.$emit("act", this.assigned, this.opts.field);
    },

    seed() {
      this.assigned = _.clone(this.active[this.opts.field]);
    },

    refreshModel() {
      if (this.items.length < 1) {
        this.$store.dispatch(`${this.opts.model}/list`);
      }
    }

  },
  watch: {
    matched: {
      handler(newValue, oldValue) {
        if (newValue != oldValue) {
          this.seed();
        }
      },

      immediate: true
    },

    assigned() {
      this.$emit("input", this.assigned);
    }

  }
};

/* script */
const __vue_script__$b = script$b;
/* template */

var __vue_render__$b = function () {
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
      callback: function ($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  });
};

var __vue_staticRenderFns__$b = [];
/* style */

const __vue_inject_styles__$b = function (inject) {
  if (!inject) return;
  inject("data-v-00203bbf_0", {
    source: ".fade-enter-active[data-v-00203bbf],.fade-leave-active[data-v-00203bbf]{transition:opacity .1s}.fade-enter[data-v-00203bbf],.fade-leave-to[data-v-00203bbf]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$b = "data-v-00203bbf";
/* module identifier */

const __vue_module_identifier__$b = undefined;
/* functional template */

const __vue_is_functional_template__$b = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$b = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, createInjector, undefined, undefined);

//
var script$a = {
  name: "SwitchEdit",
  components: {
    VSwitch
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

  data() {
    return {
      assigned: null
    };
  },

  computed: {
    computedValue: {
      get() {
        return this.value;
      },

      set(value) {
        this.assigned = value;
      }

    }
  },
  methods: {
    blurField(e) {
      this.$emit("act", e, this.opts.field);
    },

    build() {
      this.assigned = _.clone(this.active[this.opts.field]);
    },

    emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    }

  },

  created() {
    this.build();
  },

  watch: {
    active: {
      handler(newValue, oldValue) {
        if (newValue != oldValue) {
          this.build();
        }
      },

      deep: true
    },

    assigned() {
      this.$emit("input", this.assigned);
    }

  }
};

/* script */
const __vue_script__$a = script$a;
/* template */

var __vue_render__$a = function () {
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
      callback: function ($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  });
};

var __vue_staticRenderFns__$a = [];
/* style */

const __vue_inject_styles__$a = undefined;
/* scoped */

const __vue_scope_id__$a = "data-v-0c001880";
/* module identifier */

const __vue_module_identifier__$a = undefined;
/* functional template */

const __vue_is_functional_template__$a = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$a = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);

//
var script$9 = {
  name: "TextareaEdit",
  components: {
    VTextarea
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
    emitChange() {
      if (this.emit) {
        this.$emit("act", this.computedValue, this.opts.field);
      }
    },

    emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    }

  },
  data: () => ({
    emit: null
  }),
  watch: {
    emit() {
      this.$emit("input", this.emit);
    },

    value() {
      this.emit = this.value;
    }

  },
  computed: {
    label() {
      if (this.editField == this.opts.field) {
        return this.opts.label;
      }

      return "";
    },

    computedValue: {
      get() {
        return this.value;
      },

      set(value) {
        this.emit = value;
      }

    }
  }
};

/* script */
const __vue_script__$9 = script$9;
/* template */

var __vue_render__$9 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-textarea', {
    staticStyle: {
      "height": "135px"
    },
    attrs: {
      "hide-details": "",
      "filled": _vm.editField != _vm.opts.field,
      "label": _vm.label,
      "rows": "7",
      "outlined": "",
      "placeholder": 'Add a ' + _vm.opts.label
    },
    on: {
      "keyup": function ($event) {
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
      callback: function ($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  });
};

var __vue_staticRenderFns__$9 = [];
/* style */

const __vue_inject_styles__$9 = undefined;
/* scoped */

const __vue_scope_id__$9 = "data-v-08a7446b";
/* module identifier */

const __vue_module_identifier__$9 = undefined;
/* functional template */

const __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$9 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);

//
//
//
//
var script$8 = {
  props: {
    opts: {
      type: Object,
      default: () => {}
    },
    active: {
      type: Object,
      default: () => {}
    }
  }
};

/* script */
const __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "overflow-y-scroll",
    domProps: {
      "innerHTML": _vm._s(_vm.active[_vm.opts.field])
    }
  });
};

var __vue_staticRenderFns__$8 = [];
/* style */

const __vue_inject_styles__$8 = function (inject) {
  if (!inject) return;
  inject("data-v-e2d10ec2_0", {
    source: ".overflow-y-scroll[data-v-e2d10ec2]{overflow-y:scroll}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$8 = "data-v-e2d10ec2";
/* module identifier */

const __vue_module_identifier__$8 = undefined;
/* functional template */

const __vue_is_functional_template__$8 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$8 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, createInjector, undefined, undefined);

//
var script$7 = {
  name: "TextEdit",
  components: {
    VTextField
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
  data: () => ({
    emit: null,
    edit: false
  }),
  computed: {
    computedValue: {
      get() {
        return this.value;
      },

      set(value) {
        this.emit = value;
      }

    },

    rules() {
      this.value;
      let required = true;

      if (this.opts.required) {
        required = value => !!value || "Required.";
      }

      return [required];
    },

    required() {
      if (this.opts.required) {
        return "*";
      } else {
        return "";
      }
    }

  },
  methods: {
    emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },

    emitChange() {
      //this.$emit("act", this.emit, this.opts.field);
      if (this.emit != null) {
        this.$emit("act", this.emit, this.opts.field);
      }
    }

  },
  watch: {
    emit() {
      this.$emit("input", this.emit);
    },

    value() {
      this.emit = this.value;
    },

    editField() {
      if (this.editField == this.opts.field) {
        this.edit = true;
      } else {
        this.edit = false;
      }
    }

  }
};

/* script */
const __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function () {
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
      callback: function ($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  });
};

var __vue_staticRenderFns__$7 = [];
/* style */

const __vue_inject_styles__$7 = function (inject) {
  if (!inject) return;
  inject("data-v-da244980_0", {
    source: ".fade-enter-active[data-v-da244980],.fade-leave-active[data-v-da244980]{transition:opacity .1s}.fade-enter[data-v-da244980],.fade-leave-to[data-v-da244980]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$7 = "data-v-da244980";
/* module identifier */

const __vue_module_identifier__$7 = undefined;
/* functional template */

const __vue_is_functional_template__$7 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, createInjector, undefined, undefined);

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
  data: () => ({
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
  }),
  computed: {
    computedValue: {
      get() {
        return this.value;
      },

      set(value) {
        this.emit = value;
      }

    },

    rules() {
      this.value;
      let required = true;

      if (this.opts.required) {
        required = value => !!value || "Required.";
      }

      return [required];
    },

    required() {
      if (this.opts.required) {
        return "*";
      } else {
        return "";
      }
    }

  },
  methods: {
    emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },

    emitChange() {
      if (this.emit) {
        this.$emit("act", this.emit, this.opts.field);
      }
    }

  },
  watch: {
    emit() {
      this.$emit("input", this.emit);
    },

    value: {
      handler(ov, nv) {
        this.emit = this.value;
      },

      immediate: true
    }
  }
};

/* script */
const __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function () {
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
      callback: function ($$v) {
        _vm.emit = $$v;
      },
      expression: "emit"
    }
  }, 'v-currency-field', _vm.currency_config, false));
};

var __vue_staticRenderFns__$6 = [];
/* style */

const __vue_inject_styles__$6 = function (inject) {
  if (!inject) return;
  inject("data-v-45e92b17_0", {
    source: ".fade-enter-active[data-v-45e92b17],.fade-leave-active[data-v-45e92b17]{transition:opacity .1s}.fade-enter[data-v-45e92b17],.fade-leave-to[data-v-45e92b17]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$6 = "data-v-45e92b17";
/* module identifier */

const __vue_module_identifier__$6 = undefined;
/* functional template */

const __vue_is_functional_template__$6 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, createInjector, undefined, undefined);

//
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
    emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },

    handleKeyDown(e) {
      let lazyValue = this.$refs[this.opts.field].lazyValue;

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

    emitChange() {
      if (this.emit) {
        this.$emit("act", this.emit, this.opts.field);
      }
    }

  },
  data: () => ({
    emit: null,
    rawValue: ""
  }),
  watch: {
    emit() {
      this.$emit("input", this.emit);
    },

    value() {
      this.emit = this.value;
    }

  },
  computed: {
    computedValue: {
      get() {
        return this.value;
      },

      set(value) {
        this.emit = Math.floor(value);
      }

    },

    rules() {
      this.value;
      let required = true;

      if (this.opts.required) {
        required = value => !!value || "Required.";
      }

      return [required];
    },

    required() {
      if (this.opts.required) {
        return "*";
      } else {
        return "";
      }
    }

  }
};

/* script */
const __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function () {
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
      "keyup": function ($event) {
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
      callback: function ($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  });
};

var __vue_staticRenderFns__$5 = [];
/* style */

const __vue_inject_styles__$5 = function (inject) {
  if (!inject) return;
  inject("data-v-17ab313c_0", {
    source: ".fade-enter-active[data-v-17ab313c],.fade-leave-active[data-v-17ab313c]{transition:opacity .1s}.fade-enter[data-v-17ab313c],.fade-leave-to[data-v-17ab313c]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$5 = "data-v-17ab313c";
/* module identifier */

const __vue_module_identifier__$5 = undefined;
/* functional template */

const __vue_is_functional_template__$5 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, createInjector, undefined, undefined);

//
var script$4 = {
  directives: {
    mask
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
    emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },

    emitChange() {
      if (this.emit != null) {
        this.$emit("act", this.emit, this.opts.field);
      }
    },

    setPhone(value) {
      value.replace(/\D+/g, "");
      this.emit = value;
    }

  },
  data: () => ({
    emit: null,
    masked: false
  }),
  watch: {
    emit() {
      this.$emit("input", this.emit);
    },

    value() {
      this.emit = this.value;
    }

  },
  computed: {
    computedValue: {
      get() {
        return this.value;
      },

      set(value) {
        let submit = value.replace(/\D+/g, "");
        console.log(submit);
        this.emit = value;
      }

    },

    rules() {
      this.value;
      let required = true;

      if (this.opts.required) {
        required = value => !!value || "Required.";
      }

      return [required];
    },

    required() {
      if (this.opts.required) {
        return "*";
      } else {
        return "";
      }
    }

  }
};

/* script */
const __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function () {
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

const __vue_inject_styles__$4 = function (inject) {
  if (!inject) return;
  inject("data-v-82b6e0d4_0", {
    source: ".fade-enter-active[data-v-82b6e0d4],.fade-leave-active[data-v-82b6e0d4]{transition:opacity .1s}.fade-enter[data-v-82b6e0d4],.fade-leave-to[data-v-82b6e0d4]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$4 = "data-v-82b6e0d4";
/* module identifier */

const __vue_module_identifier__$4 = undefined;
/* functional template */

const __vue_is_functional_template__$4 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, createInjector, undefined, undefined);

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
var script$3 = {
  props: {
    opts: {
      type: Object,
      default: () => {}
    },
    active: {
      type: Object,
      default: () => {}
    }
  }
};

/* script */
const __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function () {
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

const __vue_inject_styles__$3 = undefined;
/* scoped */

const __vue_scope_id__$3 = "data-v-427f4f5e";
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

//
var script$2 = {
  name: "SelectEdit",
  components: {
    VSwitch
  },

  created() {// this.seed();
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

  data() {
    return {
      assigned: null
    };
  },

  computed: {
    computedValue: {
      get() {
        return this.value;
      },

      set(value) {
        this.assigned = value;
      }

    },

    items() {
      if (this.opts.model) {
        return Object.values(this.$store.state[this.opts.model].all);
      } else if (this.opts.freeModel) {
        return this.opts.freeModel;
      }

      return [];
    },

    multiple() {
      if (this.opts.multiple) {
        return true;
      }

      return false;
    },

    rules() {
      this.value;
      let required = true;

      if (this.opts.required) {
        required = value => !!value || "Required.";
      }

      return [required];
    },

    required() {
      if (this.opts.required) {
        return "*";
      } else {
        return "";
      }
    }

  },

  updated() {
    this.refreshModel();
  },

  methods: {
    blurField() {
      this.$emit("act", this.assigned, this.opts.field);
    },

    seed() {
      this.assigned = _.clone(this.active[this.opts.field]);
    },

    refreshModel() {
      //this.seed();
      if (this.items.length < 1) {
        this.$store.dispatch(`${this.opts.model}/list`);
      }
    },

    emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    }

  },
  watch: {
    assigned() {
      this.$emit("input", this.assigned);
    },

    value() {
      this.assigned = this.value;
    }

  }
};

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
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
      callback: function ($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  });
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = function (inject) {
  if (!inject) return;
  inject("data-v-ccd59f58_0", {
    source: ".fade-enter-active[data-v-ccd59f58],.fade-leave-active[data-v-ccd59f58]{transition:opacity .1s}.fade-enter[data-v-ccd59f58],.fade-leave-to[data-v-ccd59f58]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$2 = "data-v-ccd59f58";
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, createInjector, undefined, undefined);

//
var script$1 = {
  name: "Time",
  components: {
    VSelect
  },

  created() {
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

  data() {
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
    multiple() {
      // if (this.opts.multiple) {
      //   return true;
      // }
      return false;
    },

    computedValue: {
      get() {
        return this.value;
      },

      set(value) {
        this.assigned = value;
      }

    }
  },

  mounted() {//this.refreshModel();
  },

  methods: {
    blurField() {
      this.$emit("act", this.assigned, this.opts.field);
    },

    emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },

    seed() {
      this.assigned = _.clone(this.active[this.opts.field]);
    }

  },
  watch: {
    matched: {
      handler(newValue, oldValue) {
        if (newValue != oldValue) {
          this.seed();
        }
      },

      immediate: true
    },

    assigned() {
      this.$emit("input", this.assigned);
    }

  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
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
      callback: function ($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  })], 1);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-382e1100_0", {
    source: ".fade-enter-active[data-v-382e1100],.fade-leave-active[data-v-382e1100]{transition:opacity .1s}.fade-enter[data-v-382e1100],.fade-leave-to[data-v-382e1100]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = "data-v-382e1100";
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

//
var script = {
  components: {
    TiptapVuetify
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
    }
  },
  data: () => ({
    textcolor: '#000000',
    coloredtext: '',
    dialog: false,
    editor: null,
    emit: null,
    swatches: [['#FF0000', '#AA0000', '#550000'], ['#FFFF00', '#AAAA00', '#555500'], ['#00FF00', '#00AA00', '#005500'], ['#00FFFF', '#00AAAA', '#005555'], ['#0000FF', '#0000AA', '#000000']]
  }),
  computed: {
    auto_inserts() {
      if (this.opts.hasOwnProperty("auto_inserts")) {
        let auto_inserts = [];
        this.opts.auto_inserts.forEach(insert => {
          if (insert.manual_list.length > 0) {
            auto_inserts.push({
              title: insert.title,
              values: insert.manual_list
            });
          } else {
            let headers = this.$store.getters[`${insert.source}/visibleHeaders`];
            let newList = [];
            headers.forEach(header => {
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

    extensions() {
      if (this.opts.hasOwnProperty("extensions")) {
        return this.opts.extensions;
      }

      return [History, Blockquote, Link, Underline, Strike, Italic, ListItem, BulletList, Image, OrderedList, [Heading, {
        options: {
          levels: [1, 2, 3]
        }
      }], Bold, Code, HorizontalRule, Paragraph, HardBreak];
    },

    label() {
      if (this.editField == this.opts.field) {
        return this.opts.label;
      }

      return "";
    },

    computedValue: {
      get() {
        return this.value;
      },

      set(value) {
        this.emit = value;
      }

    },

    rules() {
      this.value;
      let required = true;

      if (this.opts.required) {
        required = value => !!value || "Required.";
      }

      return [required];
    },

    required() {
      if (this.opts.required) {
        return "*";
      } else {
        return "";
      }
    }

  },
  methods: {
    blurField() {
      if (this.emit) {
        this.$emit("act", this.emit, this.opts.field);
      }
    },

    emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },

    onInit({
      editor
    }) {
      this.editor = editor;
    },

    addText(value) {
      const transaction = this.editor.state.tr.insertText(value);
      this.editor.view.dispatch(transaction);
    },

    addColoredText() {
      const transaction = this.editor.state.tr.insertText('{{ [' + this.textcolor + '] ' + this.coloredtext + ' }}');
      this.editor.view.dispatch(transaction);
      this.textcolor = '#000000', this.coloredtext = '';
      this.dialog = false;
    }

  },
  watch: {
    emit() {
      this.$emit("input", this.emit);
    },

    value() {
      this.emit = this.value;
    }

  }
};

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "mx-2",
    on: {
      "mouseleave": _vm.blurField
    }
  }, [_vm.auto_inserts.length > 0 ? _c('v-toolbar', {
    attrs: {
      "dense": "",
      "flat": ""
    }
  }, [_c('v-spacer'), _vm._v(" "), _c('v-dialog', {
    attrs: {
      "width": "380"
    },
    scopedSlots: _vm._u([{
      key: "activator",
      fn: function (ref) {
        var on = ref.on;
        var attrs = ref.attrs;
        return [_c('v-btn', _vm._g(_vm._b({
          staticClass: "ml-4",
          attrs: {
            "outlined": "",
            "color": "primary",
            "dark": "",
            "small": ""
          }
        }, 'v-btn', attrs, false), on), [_vm._v("\n          Colored Text\n        ")])];
      }
    }], null, false, 2817776160),
    model: {
      value: _vm.dialog,
      callback: function ($$v) {
        _vm.dialog = $$v;
      },
      expression: "dialog"
    }
  }, [_vm._v(" "), _c('v-card', [_c('v-card-title', {
    staticClass: "headline grey lighten-2"
  }, [_vm._v("\n          Choose Text Color\n        ")]), _vm._v(" "), _c('v-card-text', [_c('v-color-picker', {
    attrs: {
      "swatches": _vm.swatches,
      "dot-size": "17",
      "hide-canvas": "",
      "show-swatches": "",
      "hide-inputs": "",
      "swatches-max-height": "200"
    },
    model: {
      value: _vm.textcolor,
      callback: function ($$v) {
        _vm.textcolor = $$v;
      },
      expression: "textcolor"
    }
  }), _vm._v(" "), _c('v-textarea', {
    attrs: {
      "outlined": "",
      "name": "input-7-4",
      "label": "Enter Text"
    },
    model: {
      value: _vm.coloredtext,
      callback: function ($$v) {
        _vm.coloredtext = $$v;
      },
      expression: "coloredtext"
    }
  })], 1), _vm._v(" "), _c('v-divider'), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "color": "primary",
      "text": ""
    },
    on: {
      "click": function ($event) {
        return _vm.addColoredText();
      }
    }
  }, [_vm._v("\n            Insert Text\n          ")])], 1)], 1)], 1), _vm._v(" "), _vm._l(_vm.auto_inserts, function (insert, index) {
    return [_c('v-menu', {
      key: index,
      staticClass: "ma-4",
      attrs: {
        "offset-y": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function (ref) {
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
          "click": function ($event) {
            return _vm.addText(item.value);
          }
        }
      }, [_c('v-list-item-title', [_vm._v(_vm._s(item.label))])], 1);
    }), 1)], 1)];
  })], 2) : _vm._e(), _vm._v(" "), _c('label', {
    staticClass: "v-label v-label--active theme--light caption mb-1"
  }, [_vm._v(_vm._s(_vm.opts.label + _vm.required))]), _vm._v(" "), _c('span', {
    staticClass: "caption"
  }), _vm._v(" "), _c('tiptap-vuetify', {
    staticClass: "editor-height",
    attrs: {
      "card-props": {
        outlined: true
      },
      "extensions": _vm.extensions
    },
    on: {
      "focus": _vm.emitFocus,
      "init": _vm.onInit
    },
    model: {
      value: _vm.computedValue,
      callback: function ($$v) {
        _vm.computedValue = $$v;
      },
      expression: "computedValue"
    }
  })], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-708b0f54_0", {
    source: ".editor-height{height:100%}.ProseMirror{min-height:300px}.tiptap-vuetify-editor__content{min-height:300px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  EdgeForm: __vue_component__$f,
  Loading: __vue_component__$e,
  DateEdit: __vue_component__$d,
  ModelAutocomplete: __vue_component__$c,
  States: __vue_component__$b,
  SwitchEdit: __vue_component__$a,
  TextareaEdit: __vue_component__$9,
  TextAreaReadOnly: __vue_component__$8,
  TextEdit: __vue_component__$7,
  Money: __vue_component__$6,
  MoneyRaw: __vue_component__$5,
  Phone: __vue_component__$4,
  TextReadOnly: __vue_component__$3,
  SelectEdit: __vue_component__$2,
  Time: __vue_component__$1,
  Wysiwyg: __vue_component__
});

// Import vue components

const install = function installEdgeForm(Vue) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export default install;
export { __vue_component__$d as DateEdit, __vue_component__$f as EdgeForm, __vue_component__$e as Loading, __vue_component__$c as ModelAutocomplete, __vue_component__$6 as Money, __vue_component__$5 as MoneyRaw, __vue_component__$4 as Phone, __vue_component__$2 as SelectEdit, __vue_component__$b as States, __vue_component__$a as SwitchEdit, __vue_component__$8 as TextAreaReadOnly, __vue_component__$7 as TextEdit, __vue_component__$3 as TextReadOnly, __vue_component__$9 as TextareaEdit, __vue_component__$1 as Time, __vue_component__ as Wysiwyg };
