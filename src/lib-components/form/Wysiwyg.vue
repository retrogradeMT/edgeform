<template>
  <div class="" @mouseleave="blurField">
    <label class="v-label v-label--active theme--light caption mb-1">{{
      opts.label + required
    }}</label>
    <v-toolbar dense flat v-if="auto_inserts.length > 0">
      <v-spacer></v-spacer>
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
    <quill-editor
      ref="editor"
      v-model="computedValue"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    />
  </div>
</template>

<script>
export default {
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
  data() {
    return {
      editor: null,
      editorOption: {
        // Some Quill options...
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            ["link", "image"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],

            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],

            ["clean"]
          ]
        }
      },
      emit: null
    };
  },
  computed: {
    //TODO: finish auto inserts
    auto_inserts() {
      console.log("opts");
      console.log(this.opts);
      if (this.opts.hasOwnProperty("auto_inserts")) {
        console.log(this.opts.auto_inserts);
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
    computedValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.emit = value;
      }
    },
    required() {
      if (this.opts.required) {
        return "*";
      } else {
        return "";
      }
    }
  },
  mounted() {},
  methods: {
    addText(mergeFieldText) {
      var selection = this.editor.getSelection(true);
      this.editor.insertText(selection.index, mergeFieldText);
    },
    blurField() {
      if (this.emit) {
       
          this.$emit("act", this.emit, this.opts.field);
        
      }
    },
    onEditorBlur(editor) {
      //console.log('editor blur!', editor)
     
        // this.$emit("act", this.emit, this.opts.field);
      
    },
    onEditorFocus(editor) {
      this.$emit("fieldFocused", this.opts.field);
      this.editor = editor;
      //console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      //console.log('editor ready!', editor)
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
.quill-editor {
  height: 250px;
  min-height: 200;
  max-height: 200;
  border-radius: 2px;
}
.ql-container.ql-snow {
  border-radius: 6px;
}
.ql-toolbar.ql-snow {
  border-radius: 6px;
}

</style>
