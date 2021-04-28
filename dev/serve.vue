<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
import { EdgeForm } from '@/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  components: {
   EdgeForm,
  }
});
</script>

<template>
  <div id="app">
    <edge-form />
  </div>
</template>
