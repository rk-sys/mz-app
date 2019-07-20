<template>
    <div class="mz-logo">
        <router-link to="/"
                     v-if="isGreen"
                     class="mz-logo__icon icon-logo--green"></router-link>

        <router-link to="/" v-else class="mz-logo__icon icon-logo"></router-link>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class mzLogo extends Vue {
    @Prop(Boolean) public readonly isGreen!: boolean;
}
</script>

<style lang="scss" scoped>
.mz-logo {
    height: 4rem;

    &__icon {
        display: block;
        width: 100%;
        height: 100%;
    }
}
</style>
