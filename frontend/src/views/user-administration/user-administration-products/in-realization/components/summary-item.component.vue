<template>
  <div class="mz-summary-item"
       v-if="summaryLabel !== 'all'">

    {{ $t(`item.status.${ summaryLabel }`) }}:
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop }                from 'vue-property-decorator';
import { namespace }                           from 'vuex-class';
import { IUserItem }                           from '../store/in-realization.interface';
import mzUserAdministrationInRealizationModule from '../store/in-realization.module';

const LOCAL_STORE: string = 'userAdministrationInRealization';
const local = namespace(LOCAL_STORE);

@Component({
  components: {},
})
export default class mzSummaryItem extends Vue {
  @local.State((state: mzUserAdministrationInRealizationModule) => state.mzItems) public items!: IUserItem[];
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
