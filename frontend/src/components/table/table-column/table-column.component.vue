<template>
  <el-table-column class="mz-table-column"
                   v-bind="attributes"
                   v-on="listeners">

    <!-- Pass on all named slots -->
    <slot :name="slot"
          :slot="slot"
          v-for="slot in Object.keys($slots)" />

    <!-- Pass on all scoped slots -->
    <template :slot="slot"
              slot-scope="scope"
              v-for="slot in Object.keys($scopedSlots)">

      <slot :name="slot"
            v-bind="scope" />
    </template>
  </el-table-column>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElTableColumn         from 'element-ui/lib/table-column.js';
import mzTransparentWrapper  from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElTableColumn,
  },
})
export default class mzTableColumn extends Mixins(mzTransparentWrapper) {
}
</script>

<style lang="scss"
       scoped>

@import '~element-ui/lib/theme-chalk/table-column.css';

</style>
