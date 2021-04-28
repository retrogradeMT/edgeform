<template>
  <div class="mx-2" @mouseleave="blurField">
    <v-toolbar dense flat v-if="auto_inserts.length > 0">
      <v-spacer></v-spacer>


      <v-dialog
        v-model="dialog"
        width="380"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-4" 
            outlined 
            color="primary" 
            dark
            v-bind="attrs"
            v-on="on"
            small
          >
            Colored Text
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2">
            Choose Text Color
          </v-card-title>

          <v-card-text>
              <v-color-picker
                v-model="textcolor"
                :swatches="swatches"
                dot-size="17"
                  hide-canvas
                  show-swatches
                  hide-inputs
                  swatches-max-height="200"
              ></v-color-picker>
              <v-textarea
                  outlined
                  name="input-7-4"
                  label="Enter Text"
                  v-model="coloredtext"
              ></v-textarea>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="addColoredText()"
            >
              Insert Text
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <template v-for="(insert, index) in auto_inserts">
        <v-menu class="ma-4" :key="index" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn class="ml-4" outlined color="primary" dark v-on="on" small>{{
              insert.title
            }}</v-btn>
          </template>
          <v-list dense>
            <v-list-item
              v-for="(item, index) in insert.values"
              :key="index"
              @click="addText(item.value)"
            >
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-toolbar>
    <label class="v-label v-label--active theme--light caption mb-1">{{
      opts.label + required
    }}</label>
    <span class="caption"></span>
    <tiptap-vuetify
      :card-props="{ outlined: true }"
      v-model.lazy="computedValue"
      :extensions="extensions"
      @focus="emitFocus"
      @init="onInit"
      class="editor-height"
    />
  </div>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image
} from "tiptap-vuetify";

export default {
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
    swatches: [
      ['#FF0000', '#AA0000', '#550000'],
      ['#FFFF00', '#AAAA00', '#555500'],
      ['#00FF00', '#00AA00', '#005500'],
      ['#00FFFF', '#00AAAA', '#005555'],
      ['#0000FF', '#0000AA', '#000000'],
    ],
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
            let headers = this.$store.getters[
              `${insert.source}/visibleHeaders`
            ];
            let newList = [];
            headers.forEach(header => {
              if (
                header.type == "text" ||
                header.type == "date" ||
                header.type == "states"
              ) {
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
            auto_inserts.push({ title: insert.title, values: newList });
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
      return [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        Image,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ];
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
      let value = this.value;
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
    onInit({ editor }) {
      this.editor = editor;
    },
    addText(value) {
      const transaction = this.editor.state.tr.insertText(value);
      this.editor.view.dispatch(transaction);
    },
    addColoredText() {
      const transaction = this.editor.state.tr.insertText('{{ [' + this.textcolor + '] ' + this.coloredtext +' }}');
      this.editor.view.dispatch(transaction);
      this.textcolor = '#000000',
      this.coloredtext = '';
      this.dialog = false
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
</script>

<style lang="scss">
.editor-height {
  height: 100%;
}
.ProseMirror {
  min-height: 300px;
}
.tiptap-vuetify-editor__content {
  min-height: 300px;
}
</style>
