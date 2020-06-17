<template>
  <div class="mz-product-detail-customer-list"
       :class="{'is-empty' : customerList.length < 1}">

    <div v-if="customerList.length"
         class="mz-product-detail-customer-list__icon-prev icon-arrow--black"
         @click="showPrevCustomer"></div>

    <div class="mz-product-detail-customer-list__content"
         :class="{'is-empty' : customerList.length < 1}">

      <div class="mz-product-detail-customer-list__wrapper"
           :style="{'margin-left': marginLeft + 'rem'}">

        <template v-if="customerList.length">
          <div v-for="(customer, index) in customerList"
               :key="index"
               class="mz-product-detail-customer-list__wrapper__detail"
               @click="setActiveCustomer(customer)">

            <mz-tooltip :content="customer.name"
                        placement="top">

              <mz-badge v-if="customer.newMessages > 0 "
                        :value="customer.newMessages"
                        :max="10"
                        type="primary"
                        class="mz-product-detail-customer-list__wrapper__detail__picture">

                <img :src="customer.picture"
                     :alt="customer.name"
                     :class="{'active' : customer.uuid === mzActiveCustomer.uuid}"
                     class="image">
              </mz-badge>

              <div v-else
                   :value="customer.newMessages"
                   :max="10"
                   class="mz-product-detail-customer-list__wrapper__detail__picture">

                <img :src="customer.picture"
                     :alt="customer.name"
                     class="image">
              </div>
            </mz-tooltip>
          </div>
        </template>

        <template v-else>
          <span class="mz-product-detail-customer-list__wrapper__empty">
            {{ $t('empty') }}
          </span>
        </template>

      </div>
    </div>

    <div v-if="customerList.length"
         class="mz-product-detail-customer-list__icon-next icon-arrow--black"
         @click="showNextCustomer"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace }            from 'vuex-class';
import { ICustomer }            from '../store/product-detail.interface';
import mzTooltip                from '@/components/tooltip/tooltip.component.vue';
import mzBadge                  from '@/components/badge/badge.component.vue';
import mzProductDetailModule    from '../store/product-detail.module';

const LOCAL_STORE: string = 'productDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzBadge,
    mzTooltip,
  },
})
export default class mzProductDetailCustomerList extends Vue {
  @local.State((state: mzProductDetailModule) => state.activeCustomer) public mzActiveCustomer!: ICustomer;
  @local.Mutation public setActiveCustomer!: (arg: ICustomer) => void;
  @Prop(Array) public readonly customerList!: ICustomer[];

  public marginLeft = 0;

  public showNextCustomer(): void {
    let value = this.marginLeft;

    if (this.customerList.length > 4) {
      if ((value += 14) > 0) {
        this.marginLeft = 0;
      } else {
        this.marginLeft += 14;
      }
    }
  }

  public showPrevCustomer(): void {
    const maxMargin = (this.customerList.length * 12 - 60) * -1;
    let value = this.marginLeft;

    if (this.customerList.length > 4) {
      if ((value -= 14) < maxMargin) {
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

.mz-product-detail-customer-list {
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
  .mz-product-detail-customer-list {
    width: 100%;
  }
}

@include respond-to(tablet) {
  .mz-product-detail-customer-list {
    width: 100%;
  }
}

@include respond-to(mobile) {
  .mz-product-detail-customer-list {
    width: 100%;
  }
}
</style>