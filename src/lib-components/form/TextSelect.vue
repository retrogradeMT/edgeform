<template>

      <v-select
        key="select"
        @change="blurField"
        outlined
        :label="opts.label + required"
        
        v-model="computedValue"
        :items="items"
        :item-text="opts.itemText"
        :item-value="opts.itemValue"
        :chips="multiple"
        :deletable-chips="multiple"
        :multiple="multiple"
        :rules="rules"
        validate-on-blur
        small-chips
        :dense="dense"
        @focus="emitFocus"
      ></v-select>
   
</template>

<script>
import { VSelect } from 'vuetify/lib';
export default {
  name: "TextSelect",
  components: {
        VSelect,
  },
  created() {
    // this.seed();
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
