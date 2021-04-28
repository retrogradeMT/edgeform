<template>
  <div>
    <transition name="fade" mode="out-in">
      <v-text-field
        :ref="opts.field"
        key="moneyActive"
        :outlined="editField == opts.field"
        dense
        v-on:keyup.enter="emitChange"
        v-on:keydown="handleKeyDown"
        v-model="computedValue"
        :label="opts.label + required"
        class="ma-3"
        :rules="rules"
        validate-on-blur
        prefix="$"
        :readonly="opts.readOnly"
        @focus="emitFocus"
      ></v-text-field>
    </transition>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
export default {
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
    }
  },
  methods: {
    emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },
    handleKeyDown(e) {
      let lazyValue = this.$refs[this.opts.field].lazyValue;
      if (
        e.keyCode == 8 ||
        e.keyCode == 13 ||
        e.keyCode == 9 ||
        e.keyCode == 16
      ) {
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
      if (
        (e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 96 && e.keyCode <= 105)
      ) {
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
