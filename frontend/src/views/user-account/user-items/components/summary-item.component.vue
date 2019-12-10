<template>
  <div class="mz-summary-item"
       v-if="summaryLabel !== 'all'">

    {{ $t(`item.status.${ summaryLabel }`) }}:

    <span class="mz-summary-item__result">
      {{ filterUserItems(summaryLabel) }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace }            from 'vuex-class';
import mzUserAccountModule      from '@/views/user-account/store/user-account.module';
import { IUserItem }            from '@/views/user-account/store/user-account.interface';

const LOCAL_STORE = 'userAccount';
const local = namespace(LOCAL_STORE);

@Component({
  components: {},
})
export default class mzSummaryItem extends Vue {
  @local.State((state: mzUserAccountModule) => state.mzItems) public items!: IUserItem[];
  @Prop(String) public summaryLabel!: string;

  public filterUserItems(arg: string): number {
    const filteredItems = this.items.filter((item: IUserItem) => item.status === arg);
    return filteredItems.length;
  }
}
</script>


<style lang="scss"
       scoped>

.mz-summary-item {
  font-size: 1.4rem;
  margin-right: 2rem;

  &__result {
    color: var(--primary-color);
    font-weight: var(--font-bold);
  }
}

</style>
