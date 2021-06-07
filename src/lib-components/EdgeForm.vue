<template>
  <v-card-text>
    <loading :loading="loading"></loading>
    <v-row
      no-gutters
      class="align-center d-flex"
      v-for="field in orderedHeaders"
      :key="field.order"
    >
      <v-col v-if="!noIcon"
        :cols="1"
        class="justify-center flex-grow-0 flex-shrink-0 d-none d-md-flex"
      >
        <v-icon v-if="field.icon">{{ field.icon }}</v-icon>
      </v-col>

      <v-col
        cols="12"
        :md="noIcon? 12 : 11"
        class="align-start"
        @mouseenter="focusField(field.field)"
        @mousedown="fieldSelected(field.field)"
        :class="mapClass(field.type)"
      >
        <component
          :dense="dense"
          v-model="alt[field.field]"
          :is="mapType(field.type)"
          :key="field.order"
          :index="field.order"
          :active="active"
          :opts="field"
          :header="field"
          :label="field.text"
          :editField="editField"
          :field="field.field"
          :path="path"
          :class="mapClass(field.type)"
          v-on:act="update"
          v-on:fieldFocused="fieldFocused"
        >
        </component>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
import { VCard } from 'vuetify/lib';
import { VCardText } from 'vuetify/lib';
import { VRow } from 'vuetify/lib';
import { VCol } from 'vuetify/lib';
import { VIcon } from 'vuetify/lib';
const typeToComponent = {
    text: "textEdit",
    email: "textEdit",
    website: "selectEdit",
    checkbox: "SwitchEdit",
    textarea: "textareaEdit",
    select: "textSelect",
    date: "dateEdit",
//   documents: "file-attachments",
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


export default {
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
      orderedHeaders.sort((a, b) => ( a.order > b.order ? 1 : -1 ));
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
      let savedHeader = this.headers.find(
        ({ value }) => value === this.selectedField
      );
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
              this.$emit(`update:${this.selectedField}`, newValue);
              //this.$emit("act", newValue, this.selectedField);
            }
          }
        }
      }
    },
    validate(e, field) {
      console.log({ field });
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

      let response = await this.$repositories[this.path].subCreateFile(
        this.active.id,
        formData,
        "documents"
      );

      if (response.hasOwnProperty("error")) {
        this.$store.dispatch(`${this.path}/set_snack`, response);
      } else {
        this.$store.dispatch(`${this.path}/list`);
        this.$emit("success", files);
      }
      this.loading = false;
    },

    async update(e, field) {
      console.log({ e });
      console.log({ field });
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
</script>

<style lang="scss" scoped>
.input-field {
  height: 70px;
}

.textarea-field {
  min-height: 130px;
}

.wysiwyg-field {
  min-height: 400px;
}

.documents {
  min-height: 80px;
}
</style>
