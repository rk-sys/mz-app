<template>
  <div class="mz-summary-item"
       v-if="summaryLabel !== 'all'">

    {{ $t(`item.status.${ summaryLabel }`) }}:
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue }          from 'vue-property-decorator';
import { namespace }                     from 'vuex-class';
import { IUserItem }                     from '../store/my-items.interface';
import mzUserAdministrationMyItemsModule from '../store/my-items.module';

const LOCAL_STORE: string = 'userAdministrationMyItems';
const local = namespace(LOCAL_STORE);

@Component({
  components: {},
})
export default class mzSummaryItem extends Vue {
  @local.State((state: mzUserAdministrationMyItemsModule) => state.mzItems) public items!: IUserItem[];
  @Prop(String) public summaryLabel!: string;
}
</script>


<style lang="scss"
       scoped>

.mz-summary-item {
  margin-right: 2rem;
  font-size: 1.8rem;

  &__result {
    color: var(--primary-color);
    font-weight: var(--font-bold);
  }
}

</style>
