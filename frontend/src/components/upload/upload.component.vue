<template>
  <el-upload :style="{width: width, height: height}"
             class="mz-upload"
             v-bind="attributes" v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-upload>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import ElUpload                    from 'element-ui/lib/upload.js';
import mzTransparentWrapper        from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElUpload,
  },
})
export default class mzUpload extends Mixins(mzTransparentWrapper) {
  @Prop(String) public width!: string;
  @Prop(String) public height!: string;
}
</script>

<style>

@import '~element-ui/lib/theme-chalk/upload.css';

.mz-upload .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  min-height: 100%;
}

.mz-upload:hover {
  background: var(--gray-150);
  border-radius: 50%;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
</style>
