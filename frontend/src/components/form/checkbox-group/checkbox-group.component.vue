<template>
  <el-checkbox-group class="mz-checkbox-group"
               v-bind="attributes"
               v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-checkbox-group>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElCheckboxGroup            from 'element-ui/lib/checkbox-group.js';
import mzTransparentWrapper   from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElCheckboxGroup,
  },
})
export default class mzCheckboxGroup extends Mixins(mzTransparentWrapper) {

}
</script>


<style lang="scss"
       scoped>

@import '~element-ui/lib/theme-chalk/checkbox-group.css';


</style>
