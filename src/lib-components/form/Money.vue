<template>
  <div>
    <transition name="fade" mode="out-in">
      <v-currency-field
        v-bind="currency_config"
        :ref="opts.field"
        key="moneyActive"
        :outlined="editField == opts.field"
        dense
        v-model="emit"
        :label="opts.label + required"
        class="ma-3"
        v-on:change="emitChange"
      ></v-currency-field>
    </transition>
  </div>
</template>

<script>

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
      },
  }),

  computed: {
    computedValue: {
      get() {
        return this.value
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

    emitChange(){
      if (this.emit) {
        this.$emit("act", this.emit, this.opts.field);
      }
    },

  },
  watch: {
    emit() {
      this.$emit("input", this.emit);
    },
    value: {
      handler(ov,nv) {

      this.emit = this.value;
    },
    immediate: true}
  },
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
