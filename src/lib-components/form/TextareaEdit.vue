<template>
  <div>
    <transition name="fade" mode="out-in">
      <v-textarea
        hide-details
        :filled="editField != opts.field"
        class="mx-2"
        :label="label"
        rows="7"
        v-model="computedValue"
        outlined
        v-on:keyup.enter="emitChange"
        @change="emitChange"
        style="height:150px"
        @focus="emitFocus"
        :placeholder="'Add a ' + opts.label"
      ></v-textarea>
    </transition>
  </div>
</template>

<script>
import { VTextarea } from 'vuetify/lib';
export default {
  name: "textareaEdit",
  components: {
        VTextarea,
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
  methods: {
    emitChange() {
      if (this.emit) {
        this.$emit("act", this.computedValue, this.opts.field);
      }
    },
    emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    }
  },
  data: () => ({
    emit: null
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
    label() {
      if (this.editField == this.opts.field) {
        return this.opts.label;
      }
      return "";
    },
    computedValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.emit = value;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
