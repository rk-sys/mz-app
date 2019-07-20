<template>
    <div id="mzApp">
        <template v-if="!($route.name === 'Registration' || $route.name ===  'Login')">
            <mz-nav-bar />
        </template>
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import mzNavBar           from '@/components/nav-bar/navbar.component.vue';

@Component({
    components: {
        mzNavBar,
    },
})

export default class mzApp extends Vue {

}
</script>
<style lang="scss">
@import '~@/assets/styles/main';
</style>

<style lang="scss"
       scoped>
</style>
