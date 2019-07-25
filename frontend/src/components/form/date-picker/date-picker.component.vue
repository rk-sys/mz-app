<template>
  <el-date-picker class="mz-date-picker"
                  v-bind="attributes"
                  v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-date-picker>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElDatePicker          from 'element-ui/lib/date-picker.js';
import mzTransparentWrapper   from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElDatePicker,
  },
})
export default class mzDatePicker extends Mixins(mzTransparentWrapper) {

}
</script>

<style lang="scss"
       scoped>

@import '~element-ui/lib/theme-chalk/date-picker.css';

.mz-date-picker {
  width: auto;
}

</style>
