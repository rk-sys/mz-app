<template>
  <div :class="{'is-empty' : customerList.length < 1}"
       class="mz-offer-detail-customer-list">

    <div @click="showPrevCustomer"
         class="mz-offer-detail-customer-list__icon-prev icon-arrow--black"
         v-if="customerList.length"></div>

    <div :class="{'is-empty' : customerList.length < 1}"
         class="mz-offer-detail-customer-list__content">

      <div :style="{'margin-left': marginLeft + 'rem'}"
           class="mz-offer-detail-customer-list__wrapper">

        <template v-if="customerList.length">
          <div :key="index"
               @click="setActiveCustomer(customer)"
               class="mz-offer-detail-customer-list__wrapper__detail"
               v-for="(customer, index) in customerList">

            <mz-tooltip :content="customer.name"
                        placement="top">

              <mz-badge :max="10"
                        :value="customer.newMessages"
                        class="mz-offer-detail-customer-list__wrapper__detail__picture"
                        type="primary"
                        v-if="customer.newMessages > 0 ">

                <img :alt="customer.name"
                     :class="{'active' : customer.uuid === mzActiveCustomer.uuid}"
                     :src="customer.picture"
                     class="image">
              </mz-badge>

              <div :max="10"
                   :value="customer.newMessages"
                   class="mz-offer-detail-customer-list__wrapper__detail__picture"
                   v-else>

                <img :alt="customer.name"
                     :src="customer.picture"
                     class="image">
              </div>
            </mz-tooltip>
          </div>
        </template>

        <template v-else>
          <span class="mz-offer-detail-customer-list__wrapper__empty">
            {{ $t('empty') }}
          </span>
        </template>

      </div>
    </div>

    <div @click="showNextCustomer"
         class="mz-offer-detail-customer-list__icon-next icon-arrow--black"
         v-if="customerList.length"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace }            from 'vuex-class';
import { ICustomer }            from '@/views/offer-detail/store/offer-detail.interface';
import mzTooltip                from '@/components/tooltip/tooltip.component.vue';
import mzBadge                  from '@/components/badge/badge.component.vue';
import mzOfferDetailModule      from '../store/offer-detail.module';

const LOCAL_STORE: string = 'offerDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzBadge,
    mzTooltip,
  },
})
export default class mzOfferDetailCustomerList extends Vue {
  @local.State((state: mzOfferDetailModule) => state.activeCustomer) public mzActiveCustomer!: ICustomer;
  @local.Mutation public setActiveCustomer!: (arg: ICustomer) => void;
  @Prop(Array) public readonly customerList!: ICustomer[];

  public marginLeft = 0;

  public showNextCustomer(): void {
    const value = this.marginLeft;
    const minMargin = value - 14;

    if (this.customerList.length > 4) {
      if ((minMargin) < 0) {
        this.marginLeft = 0;
      } else {
        this.marginLeft += 14;
      }
    }
  }

  public showPrevCustomer(): void {
    const maxMargin = (this.customerList.length * 12 - 60) * -1;
    const value = this.marginLeft;
    const maxValue = value - 14;

    if (this.customerList.length > 4) {
      if ((maxValue) <= maxMargin) {
        this.marginLeft = maxMargin;
      } else {
        this.marginLeft -= 14;
      }
    }
  }
}
</script>

<style lang="scss"
       scoped>

.mz-offer-detail-customer-list {
  background: var(--white);
  border-radius: 2px;
  overflow: hidden;
  width: 80rem;
  height: 12rem;
  padding: 1rem;
  display: flex;
  align-items: center;

  &__icon-prev {
    transform: rotate(180deg);
  }

  &__icon-next {
    margin-right: 0;
    margin-left: auto;
  }

  &__icon-prev,
  &__icon-next {
    min-width: 4rem;
    height: 100%;
    opacity: .4;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }

  &__content {
    position: relative;
    overflow: hidden;

    &.is-empty {
      width: 100%;
    }
  }

  &__wrapper {
    display: flex;
    height: 12rem;
    align-items: center;
    transition: .25s ease-out;

    &__detail {
      margin-right: 4rem;

      &__picture {
        .image {
          width: 8.5rem;
          height: 8.5rem;
          border-radius: 50%;
          object-fit: cover;
          filter: grayscale(.5);
          opacity: .5;
          transition: .2s;
        }

        .active {
          filter: grayscale(0);
          opacity: 1;
          border: 4px solid var(--primary-color);
          transition: .2s;
        }

        &:hover {
          cursor: pointer;

          .image {
            filter: grayscale(0);
            opacity: 1;
          }
        }
      }
    }

    &__empty {
      text-align: center;
      display: block;
      width: 100%;
      font-size: 3rem;
      color: var(--gray-700);
    }

    &.is-empty {
      width: 100%;
    }
  }

  &.is-empty {
    height: 5rem;
  }
}

@include respond-to(desktop) {
  .mz-offer-detail-customer-list {
    width: 100%;
  }
}

@include respond-to(tablet) {
  .mz-offer-detail-customer-list {
    width: 100%;
  }
}

@include respond-to(mobile) {
  .mz-offer-detail-customer-list {
    width: 100%;
  }
}
</style>