<template>

    <v-switch
      inset
      color="secondary"
      :dense="dense"
      v-model="computedValue"
      :label="opts.label"
      v-on:change="blurField"
      hide-details
      @focus="emitFocus"
    ></v-switch>

</template>

<script>
import { VSwitch } from 'vuetify/lib';
export default {
  name: "SwitchEdit",
  components: {
        VSwitch,
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
      type: [ String, Number, Boolean ],
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
    },
  }
};
</script>

<style lang="scss" scoped></style>
