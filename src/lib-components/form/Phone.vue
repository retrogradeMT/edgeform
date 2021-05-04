<template>

      <v-text-field
        key="textActive"
        :dense="dense"
        outlined
        v-on:keyup.enter="emitChange"
        v-on:keyup.tab="emitChange"
        :value="value"
        v-on:input="setPhone"
        :label="opts.label + required"
      
        :rules="rules"
        validate-on-blur
        :readonly="opts.readOnly"
        v-mask="'(###) ###-####'"
        @focus="emitFocus"
        @change="emitChange"
      ></v-text-field>
    
</template>

<script>
import { mask } from "vue-the-mask";
export default {
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
      let submit = value.replace(/\D+/g, "");
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
