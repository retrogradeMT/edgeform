<template>
  <div>
    <v-select
      key="select"
      :outlined="editField == opts.field"
      @change="blurField"
      :label="opts.label"
      class="ma-3"
      v-model="computedValue"
      :items="items"
      item-text="label"
      item-value="value"
      hide-details
      :multiple="false"
      dense
      @focus="emitFocus"
    ></v-select>
  </div>
</template>

<script>
import { VSelect} from 'vuetify/lib';
export default {
  name: "Time",
  components: {
        VSelect,
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
    path: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number, Boolean],
      required: false
    }
  },
  data() {
    return {
      assigned: null,
      items: [
        {
          label: "12:00 AM",
          value: "00:00:00"
        },
        {
          label: "1:00 AM",
          value: "01:00:00"
        },
        {
          label: "1:30 AM",
          value: "01:30:00"
        },
        {
          label: "2:00 AM",
          value: "02:00:00"
        },
        {
          label: "2:30 AM",
          value: "02:30:00"
        },
        {
          label: "3:00 AM",
          value: "03:00:00"
        },
        {
          label: "3:30 AM",
          value: "03:30:00"
        },
        {
          label: "4:00 AM",
          value: "04:00:00"
        },
        {
          label: "4:30 AM",
          value: "04:30:00"
        },
        {
          label: "5:00 AM",
          value: "05:00:00"
        },
        {
          label: "5:30 AM",
          value: "05:30:00"
        },
        {
          label: "6:00 AM",
          value: "06:00:00"
        },
        {
          label: "6:30 AM",
          value: "06:30:00"
        },
        {
          label: "7:00 AM",
          value: "07:00:00"
        },
        {
          label: "7:30 AM",
          value: "07:30:00"
        },
        {
          label: "8:00 AM",
          value: "08:00:00"
        },
        {
          label: "8:30 AM",
          value: "08:30:00"
        },
        {
          label: "9:00 AM",
          value: "09:00:00"
        },
        {
          label: "9:30 AM",
          value: "09:30:00"
        },
        {
          label: "10:00 AM",
          value: "10:00:00"
        },
        {
          label: "10:30 AM",
          value: "10:30:00"
        },
        {
          label: "11:00 AM",
          value: "11:00:00"
        },
        {
          label: "11:30 AM",
          value: "11:30:00"
        },
        {
          label: "12:00 PM",
          value: "12:00:00"
        },
        {
          label: "1:00 PM",
          value: "13:00:00"
        },
        {
          label: "1:30 PM",
          value: "13:30:00"
        },
        {
          label: "2:00 PM",
          value: "14:00:00"
        },
        {
          label: "2:30 PM",
          value: "14:30:00"
        },
        {
          label: "3:00 PM",
          value: "15:00:00"
        },
        {
          label: "3:30 PM",
          value: "15:30:00"
        },
        {
          label: "4:00 PM",
          value: "16:00:00"
        },
        {
          label: "4:30 PM",
          value: "16:30:00"
        },
        {
          label: "5:00 PM",
          value: "17:00:00"
        },
        {
          label: "5:30 PM",
          value: "17:30:00"
        },
        {
          label: "6:00 PM",
          value: "18:00:00"
        },
        {
          label: "6:30 PM",
          value: "18:30:00"
        },
        {
          label: "7:00 PM",
          value: "19:00:00"
        },
        {
          label: "7:30 PM",
          value: "19:30:00"
        },
        {
          label: "8:00 PM",
          value: "20:00:00"
        },
        {
          label: "8:30 PM",
          value: "20:30:00"
        },
        {
          label: "9:00 PM",
          value: "21:00:00"
        },
        {
          label: "9:30 PM",
          value: "21:30:00"
        },
        {
          label: "10:00 PM",
          value: "22:00:00"
        },
        {
          label: "10:30 PM",
          value: "22:30:00"
        },
        {
          label: "11:00 PM",
          value: "23:00:00"
        },
        {
          label: "11:30 PM",
          value: "23:30:00"
        }
      ]
    };
  },
  computed: {
    multiple() {
      // if (this.opts.multiple) {
      //   return true;
      // }
      return false;
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
    //this.refreshModel();
  },
  methods: {
    blurField() {
      this.$emit("act", this.assigned, this.opts.field);
    },
    emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },
    seed() {
      this.assigned = _.clone(this.active[this.opts.field]);
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
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}
</style>
