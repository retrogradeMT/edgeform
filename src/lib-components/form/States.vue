<template>
  <div>
    <transition name="fade" mode="out-in">
      <v-autocomplete
        key="select"
        :outline="editField == opts.field"
        @change="blurField"
        :label="opts.label + required"
        class="ma-3"
        v-model="computedValue"
        :items="items"
        :rules="rules"
        validate-on-blur
        :multiple="false"
        dense
        @focus="emitFocus"
        type="select"
        autocomplete="new-password"
      ></v-autocomplete>
    </transition>
  </div>
</template>

<script>
import { VAutocomplete } from 'vuetify/lib';
export default {
  name: "States",
  components: {
        VAutocomplete,
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
    }
  },
  data() {
    return {
      assigned: null,
      items: [
        "AL",
        "AK",
        "AS",
        "AZ",
        "AR",
        "CA",
        "CO",
        "CT",
        "DE",
        "DC",
        "FM",
        "FL",
        "GA",
        "GU",
        "HI",
        "ID",
        "IL",
        "IN",
        "IA",
        "KS",
        "KY",
        "LA",
        "ME",
        "MH",
        "MD",
        "MA",
        "MI",
        "MN",
        "MS",
        "MO",
        "MT",
        "NE",
        "NV",
        "NH",
        "NJ",
        "NM",
        "NY",
        "NC",
        "ND",
        "MP",
        "OH",
        "OK",
        "OR",
        "PW",
        "PA",
        "PR",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VT",
        "VI",
        "VA",
        "WA",
        "WV",
        "WI",
        "WY"
      ]
    };
  },

  computed: {
    multiple() {
      return !!this.opts.multiple;
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
    },
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
