<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      nudge-bottom
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          :dense="dense"
          v-on="on"
          outlined
          :value="dateFormatted"
          :label="opts.label + required"
          
          :rules="rules"
          v-mask="'##/##/####'"
          @focus="emitFocus"
          @click:clear="clearDate()"
          :clearable="!opts.required"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="computedValue"
        @change="blurField"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import { VDatePicker } from 'vuetify/lib';
import { VTextField } from 'vuetify/lib';
import { VMenu } from 'vuetify/lib';
export default {
  directives: {
    mask
  },
  components: {
    VDatePicker,
    VTextField,
    VMenu

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
  data() {
    return {
      menu: false,
      emit: null
    };
  },
  watch: {
    emit() {
      this.$emit("input", this.emit);
    },
    value() {
      this.emit = this.value;
    }
  },
  computed: {
    dateFormatted() {
      if (!this.active[this.opts.field]) return null;
      const [year, month, day] = _.clone(
        this.active[this.opts.field].split("-")
      );
      return `${month}/${day}/${year}`;
    },
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
    clearDate() {
      this.$emit("fieldFocused", this.opts.field);
      this.$emit("input", null);
      this.$emit("act", null, this.opts.field);
    },
    emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },
    blurField(e) {
      this.$emit("act", e, this.opts.field);
      this.menu = false;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    }
    //parseDate(date) {
    //if (!date) return null;

    //const [month, day, year] = date.split("/");
    //let parsed = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    //this.blurField(parsed);
    //}
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
