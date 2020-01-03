<template>
  <el-table-column class="mz-table-column"
                   v-bind="attributes"
                   v-on="listeners">

    <!-- Pass on all named slots -->
    <slot v-for="slot in Object.keys($slots)"
          :name="slot"
          :slot="slot" />

    <!-- Pass on all scoped slots -->
    <template v-for="slot in Object.keys($scopedSlots)"
              :slot="slot"
              slot-scope="scope">

      <slot v-bind="scope"
            :name="slot" />
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
