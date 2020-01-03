<template>
  <el-tree class="mz-tree"
           v-bind="attributes"
           v-on="listeners">

    <template :slot="slot"
              slot-scope="scope"
              v-for="slot in Object.keys($scopedSlots)">

      <slot :name="slot"
            v-bind="scope" />
    </template>
  </el-tree>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElTree                from 'element-ui/lib/tree.js';
import mzTransparentWrapper  from 'src/components/transparent-component.mixin';

@Component({
  components: {
    ElTree,
  },
})
export default class mzTree extends Mixins(mzTransparentWrapper) {
}
</script>

<style lang="scss" scoped>
@import '~element-ui/lib/theme-chalk/tree.css';
@import '~element-ui/lib/theme-chalk/icon.css';

.mz-tree {
  background: none;
  margin-top: 3.5rem;

  /deep/ {
    .el-tree-node__label {
      font-size: 1.8rem;
      font-weight: 500;
    }

    .el-tree-node__content {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
      height: auto;

      &:hover,
      &:focus {
        background: none;
      }
    }

    .el-tree-node {
      &:hover {
        background: none;
      }

      &:focus {
        .el-tree-node__content {
          background: none;
        }
      }
    }
  }
}
</style>
