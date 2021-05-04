<template>

      <v-text-field
        data-text-field
        key="textActive"
        :ref="opts.field"
        outlined
        :dense="dense"
        v-on:keydown.enter="emitChange"
        v-on:keydown.tab="emitChange"
        v-model="computedValue"
        :label="opts.label + required"
        
        :readonly="opts.readOnly"
        :rules="rules"
        validate-on-blur
        @focus="emitFocus"
        @change="emitChange"
      ></v-text-field>
    
</template>

<script>
import { VTextField } from 'vuetify/lib';
export default {
  name: "TextEdit",
  components: {
        VTextField,
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
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
