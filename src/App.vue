<template>
    <div id="appContainer" :data-theme="darkMode">
        <AppHeader/>
        <router-view/>
        <div
            class="loadingMask"
            v-show="globalLoading"
            v-loading="globalLoading"
            element-loading-background="#050709"
        />
    </div>
</template>
<script>
import { mapState } from 'vuex'
import AppHeader from '@/components/AppHeader.vue'

export default {
    computed: {...mapState(['darkMode', 'globalLoading'])},
    components: { AppHeader }
}
</script>
<style lang="scss">
@import '@/assets/scss/reset.scss';
@import '@/assets/scss/theme.scss';
@import '@/assets/scss/main.scss';
@import '@/assets/scss/custom.scss';
</style>