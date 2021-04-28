<template>
  <div>
    <template v-if="opts.nested">
      <v-text-field
        :value="active[opts.field][opts.nestedValue]"
        :label="opts.label"
        readonly
      ></v-text-field>

      <!-- {{ opts[opts.field][opts.nestedValue] }} -->
    </template>
    <template v-else>
      <v-text-field
        :value="active[opts.field]"
        :label="opts.label"
        readonly
      ></v-text-field>
      <!-- {{ active[opts.field] }} -->
    </template>
  </div>
</template>

<script>
export default {
  props: {
    opts: {
      type: Object,
      default: () => {},
    },
    active: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped></style>
