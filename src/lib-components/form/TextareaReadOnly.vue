<template>
  <div class="overflow-y-scroll" v-html="active[opts.field]"></div>
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

<style lang="scss" scoped>
.overflow-y-scroll {
  overflow-y: scroll;
}
</style>
