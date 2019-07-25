<template>
  <div class="mz-filters">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import yInput             from '../form/input/input.component.vue';

@Component({
  components: {
    yInput,
  },
})
export default class mzFilters extends Vue {
}
</script>

<style lang="scss"
       scoped>

.mz-filters {
  display: flex;
  justify-content: space-between;
  border: .1rem solid var(--gray-300);
  border-bottom: 0;
  width: 100%;
  padding: 1.5rem 0;
}
</style>
