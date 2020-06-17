<template>
  <div class="mz-offer-detail-order-status">
    <div class="mz-offer-detail-order-status__price">

      <span class="mz-offer-detail-order-status__price__label">
        {{ $t(`order.price`) }}
      </span>

      <span v-if="mzActiveCustomer.orderStatus.price.value"
            class="value">

        {{ mzActiveCustomer.orderStatus.price.value }}
      </span>

      <span v-else
            class="value-none">

        {{ $t(`order.none`)}}
      </span>

      <span v-if="mzActiveCustomer.orderStatus.price.status !== 'notPropose'"
            class="proposed"
            :class="{'propose' : mzActiveCustomer.orderStatus.price.status === 'propose',
                     'accept' : mzActiveCustomer.orderStatus.price.status === 'accept'}">

        {{ $t(`order.${mzActiveCustomer.orderStatus.price.status}`) }}
      </span>

      <span v-else
            class="propose">

        {{ $t(`order.propose`) }}
      </span>
    </div>

    <div class="mz-offer-detail-order-status__date">
      <span class="mz-offer-detail-order-status__date__label">
        {{ $t('order.date') }}
      </span>

      <span v-if="mzActiveCustomer.orderStatus.date.value"
            class="value">

        {{ mzActiveCustomer.orderStatus.date.value }}
      </span>

      <span v-else
            class="value-none">

        {{ $t(`order.none`)}}
      </span>

      <span v-if="mzActiveCustomer.orderStatus.date.status !== 'notPropose'"
            class="proposed"
            :class="{'propose' : mzActiveCustomer.orderStatus.date.status === 'propose',
                     'accept' : mzActiveCustomer.orderStatus.date.status === 'accept'}">

        {{ $t(`order.${mzActiveCustomer.orderStatus.date.status}`) }}
      </span>

      <span v-else
            class="propose">

        {{ $t(`order.propose`) }}
      </span>
    </div>

    <div class="mz-offer-detail-order-status__status">
      <span class="mz-offer-detail-order-status__status__label">
        {{ $t('order.status') }}
      </span>

      <span v-if="mzActiveCustomer.orderStatus.status !== 'notPropose'"
            class="value"
            :class="{'accept' : mzActiveCustomer.orderStatus.status === 'accept',
                     'inProgress' : mzActiveCustomer.orderStatus.status === 'inProgress'}">

        {{ $t(`order.${mzActiveCustomer.orderStatus.status}`)}}
      </span>

      <span v-else
            class="value-none">

        {{ $t(`order.none`)}}
      </span>
    </div>

    <!--<div class="mz-offer-detail-order-status__progress">-->
    <!--<span class="mz-offer-detail-order-status__progress__label">-->
    <!--{{ $t('order.progress') }}-->
    <!--</span>-->

    <!--<span v-if="mzActiveCustomer.orderStatus.progress.value"-->
    <!--class="value">-->

    <!--{{ $t(`order.${mzActiveCustomer.orderStatus.progress.value}`)}}-->
    <!--</span>-->

    <!--<span v-else-->
    <!--class="value-none">-->
    <!--{{ $t(`order.none`)}}-->
    <!--</span>-->
    <!--</div>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace }            from 'vuex-class';
import { ICustomer }            from '@/views/offer-detail/store/offer-detail.interface';
import mzOfferDetailModule      from '../store/offer-detail.module';

const LOCAL_STORE: string = 'offerDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {},
})
export default class mzOfferDetailOrderStatus extends Vue {
  @local.State((state: mzOfferDetailModule) => state.activeCustomer) public mzActiveCustomer!: ICustomer;
  @Prop(String) public readonly status!: string;

}
</script>

<style lang="scss"
       scoped>

.mz-offer-detail-order-status {
  background: var(--white);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 1rem;
  width: 80rem;
  height: 12rem;
  padding: 1rem;

  &__price,
  &__status,
  &__progress,
  &__date {
    width: 33%;

    &__label {
      display: block;
      text-align: center;
      font-size: 2rem;
      font-weight: var(--font-medium);
    }

    .value {
      display: block;
      text-align: center;
      color: var(--primary-color);
      font-weight: var(--font-bold);
      font-size: 2.2rem;
      margin: 1rem 0;

      &-none {
        display: block;
        text-align: center;
        color: var(--gray-500);
        font-size: 1.8rem;
        margin: 1rem 0;
      }
    }

    .accept {
      color: var(--success);
    }

    .inProgress {
      color: var(--blue);
    }

    .propose {
      text-align: center;
      margin: 0 auto;
      display: table;
      box-shadow: inset 0 -1px 0 0 var(--warning);
      transition: all;
      transition-duration: .25s;
      font-weight: var(--font-medium);
      color: var(--black-75);

      &:hover {
        cursor: pointer;
        box-shadow: inset 0 -2rem 0 0 var(--warning);
        color: var(--black);
      }
    }

    .proposed {
      text-align: center;
      display: block;
    }
  }
}

@include respond-to(desktop) {
  .mz-offer-detail-order-status {
    width: 100%;
  }
}

@include respond-to(tablet) {
  .mz-offer-detail-order-status {
    width: 100%;
  }
}

@include respond-to(mobile) {
  .mz-offer-detail-order-status {
    width: 100%;
  }
}
</style>