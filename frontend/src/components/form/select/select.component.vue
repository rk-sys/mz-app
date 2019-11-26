<template>
  <el-select class="mz-select"
             v-bind="attributes"
             v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-select>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElSelect              from 'element-ui/lib/select.js';
import mzTransparentWrapper  from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElSelect,
  },
})
export default class mzSelect extends Mixins(mzTransparentWrapper) {

}
</script>

<style lang="scss"
       scoped>

@import '~element-ui/lib/theme-chalk/select.css';

</style>
