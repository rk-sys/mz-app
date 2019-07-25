<template>
  <el-table class="mz-table"
            v-bind="attributes"
            v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />

  </el-table>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElTable               from 'element-ui/lib/table.js';
import mzTransparentWrapper   from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElTable,
  },
})
export default class mzTable extends Mixins(mzTransparentWrapper) {

}
</script>

<style lang="scss"
       scoped>

@import '~element-ui/lib/theme-chalk/table.css';

.mz-table {
  border: .1rem solid var(--gray-300);
  border-bottom: 0;
}

/deep/ {
  .mz-table__link {
    color: var(--secondary-color);
    text-decoration: none;
  }

  .cell {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--black);
    font-weight: var(--font-light);
    line-height: 1.3;
    font-size: var(--font-size-13);
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .status {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    text-align: center;
    margin-left: 1.5rem;
    background-color: var(--error);
  }

  .active,
  .started {
    background-color: var(--success);
  }

  .inactive,
  .stopped {
    background-color: var(--error);
  }

  .setup,
  .not_responding {
    background-color: var(--warning);
  }

  .created {
    background-color: var(--secondary-color);
  }

  .center-content {
    display: flex;
    justify-content: center;
  }

  .el-table__header {
    th {
      background-color: var(--gray-150);
      padding-top: .5rem;
      padding-bottom: .5rem;
    }

    .cell {
      color: var(--black);
      font-size: 1.3rem;
      font-weight: var(--font-medium);
      text-overflow: initial;

      .caret-wrapper {
        width: 1.8rem;
      }
    }

    th:first-of-type {
      padding-left: 1rem;
    }

    th:nth-last-child(2) {
      padding-right: 1rem;
    }
  }

  .el-table__body-wrapper {
    .el-table__row td:first-of-type {
      padding-left: 1rem;
    }

    .el-table__row td:last-of-type {
      padding-right: 1rem;
    }

    .el-table__row {
      td {
        padding: .8rem 0;
      }
    }
  }

  .el-table__body {
    tr.el-table__row--striped {
      td {
        background-color: var(--gray-150);
      }
    }
  }
}
</style>
