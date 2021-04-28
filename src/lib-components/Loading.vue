<template>
    <v-overlay :value="loading" :absolute="true">
        <v-btn text :loading="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-btn>
    </v-overlay>
</template>

<script>
import { VOverlay } from 'vuetify/lib';
import { VBtn } from 'vuetify/lib';
import { VProgressCircular } from 'vuetify/lib';
export default {
    name: 'loading',
    components: {
        VOverlay,
        VBtn,
        VProgressCircular
    },
    props: {
        loading: {
            type: Boolean,
            default: true
        }
    }
};
</script>

<style lang="scss" scoped>
</style>