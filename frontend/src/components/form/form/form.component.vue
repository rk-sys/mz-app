<template>
  <el-form :form-ref="formRef"
           class="mz-form"
           novalidate
           ref="form"
           v-bind="attributes"
           v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-form>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import ElForm                      from 'element-ui/lib/form.js';
import mzTransparentWrapper         from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElForm,
  },
})
export default class mzForm extends Mixins(mzTransparentWrapper) {
  @Prop() public formRef!: Element | null;

  public mounted() {
    this.$emit('update:form-ref', this.$refs.form);
  }
}
</script>

<style lang="scss"
       scoped>

@import '~element-ui/lib/theme-chalk/form.css';

.mz-form {
}

</style>
