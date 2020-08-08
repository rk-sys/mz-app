<template>
  <div :class="{'is-empty' : customers.length < 1}"
       class="mz-message-detail-customers">

    <div @click="showPrevCustomer"
         class="mz-message-detail-customers__icon-prev icon-arrow--black"
         v-if="customers.length"></div>

    <div :class="{'is-empty' : customers.length < 1}"
         class="mz-message-detail-customers__content">

      <div :style="{'margin-left': marginLeft + 'rem'}"
           class="mz-message-detail-customers__wrapper">

        <template v-if="customers.length">
          <div :key="index"
               @click="setActiveCustomer(customer)"
               class="mz-message-detail-customers__wrapper__detail"
               v-for="(customer, index) in customers">

            <mz-tooltip :content="customer.name"
                        placement="top">

              <mz-badge :max="10"
                        :value="customer.newMessages"
                        class="mz-message-detail-customers__wrapper__detail__picture"
                        type="primary"
                        v-if="customer.newMessages > 0 ">

                <img :alt="customer.name"
                     :class="{'active' : customer.uuid === mzActiveCustomer.uuid}"
                     :src="customer.picture"
                     class="image">
              </mz-badge>

              <div :max="10"
                   :value="customer.newMessages"
                   class="mz-message-detail-customers__wrapper__detail__picture"
                   v-else>

                <img :alt="customer.name"
                     :src="customer.picture"
                     class="image">
              </div>
            </mz-tooltip>
          </div>
        </template>

        <template v-else>
          <span class="mz-message-detail-customers__wrapper__empty">
            {{ $t('empty') }}
          </span>
        </template>

      </div>
    </div>

    <div @click="showNextCustomer"
         class="mz-message-detail-customers__icon-next icon-arrow--black"
         v-if="customers.length"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ICustomer }            from '@/views/product-detail/store/product-detail.interface';
import { namespace }            from 'vuex-class';
import mzTooltip                from '@/components/tooltip/tooltip.component.vue';
import mzBadge                  from '@/components/badge/badge.component.vue';
import mzMessageDetailModule    from '../store/message-detail.module';

const LOCAL_STORE: string = 'mzMessageDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzTooltip,
    mzBadge,
  },
})
export default class mzMessageDetailCustomers extends Vue {
  @local.State((state: mzMessageDetailModule) => state.activeCustomer) public mzActiveCustomer!: ICustomer;
  @local.Mutation public setActiveCustomer!: (arg: ICustomer) => void;

  @Prop(Array) public readonly customers!: ICustomer[];


  public marginLeft = 0;

  public showNextCustomer(): void {
    const value = this.marginLeft;
    const minMargin = value - 14;

    if (this.customers.length > 4) {
      if ((minMargin) < 0) {
        this.marginLeft = 0;
      } else {
        this.marginLeft += 14;
      }
    }
  }

  public showPrevCustomer(): void {
    const maxMargin = (this.customers.length * 12 - 60) * -1;
    const value = this.marginLeft;
    const maxValue = value - 14;

    if (this.customers.length > 4) {
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

.mz-message-detail-customers {
  background: var(--white);
  border-radius: 2px;
  overflow: hidden;
  width: 100%;
  height: 12rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  margin: 2rem 0;

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
  .mz-message-detail-customers {
    width: 100%;
  }
}

@include respond-to(tablet) {
  .mz-message-detail-customers {
    width: 100%;
  }
}

@include respond-to(mobile) {
  .mz-message-detail-customers {
    width: 100%;
  }
}
</style>
