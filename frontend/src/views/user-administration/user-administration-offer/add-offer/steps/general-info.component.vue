<template>
  <div class="mz-general-info">
    <div class="mz-general-info__type">
      <p class="title">{{ $t(`categorySelection.title.type`) }}</p>

      <div class="mz-general-info__type__container">

        <mz-radio :class="{'light' : type.label === 'buy',
                           'dark' : type.label === 'craft'}"
                  :key="index"
                  :label="type.label"
                  class="main-range-box"
                  v-for="(type, index) in mzAddOfferGeneralInfo.listOfType"
                  v-model="newOffer.type">

          <span class="main-category__text">
            {{ $t(`listOfType.${type.label}`) }}
          </span>
        </mz-radio>
      </div>
    </div>

    <div class="mz-general-info__range">
      <p class="title">{{ $t(`categorySelection.title.mainRange`) }}</p>

      <div class="mz-general-info__range__container">

        <mz-radio :key="index"
                  :label="mainRange.label"
                  class="main-range-box"
                  v-for="(mainRange, index) in mzAddOfferGeneralInfo.listOfMainRange"
                  v-model="newOffer.mainRange">

          <span class="main-category__text">
            {{ $t(`listOfMainRange.${mainRange.label}`) }}
          </span>
        </mz-radio>
      </div>
    </div>

    <div class="mz-general-info__category">
      <p class="title">{{ $t(`categorySelection.title.category`) }}</p>

      <div class="mz-general-info__category__container">

        <div :class="{'main-category-box--selected': category.selected}"
             :key="index"
             :label="category.mainCategory"
             @click="setMainCategory(category.mainCategory)"
             class="main-category-box"
             v-for="(category, index) in mzAddOfferGeneralInfo.listOfCategory"
             v-model="newOffer.mainCategory">

          <div class="main-category-box__wrapper">
            <div :class="{ 'icon-armor--gray': category.mainCategory === 'armor' && !category.selected,
                           'icon-sword--gray': category.mainCategory === 'weapon' && !category.selected,
                           'icon-tunic--gray': category.mainCategory === 'costume' && !category.selected,
                           'icon-masks--gray': category.mainCategory === 'other' && !category.selected,
                           'icon-armor--white': category.mainCategory === 'armor' && category.selected,
                           'icon-sword--white': category.mainCategory === 'weapon' && category.selected,
                           'icon-tunic--white': category.mainCategory === 'costume' && category.selected,
                           'icon-masks--white': category.mainCategory === 'other' && category.selected}"
                 class="icon">
            </div>
            {{ $t(`listOfCategory.mainCategory.${category.mainCategory}`) }}
          </div>
        </div>
      </div>
    </div>

    <div class="mz-general-info__subcategory">
      <p class="title">{{$t(`categorySelection.title.subCategory`)}}</p>

      <div :key="categoryIndex"
           class="mz-general-info__subcategory__container"
           v-for="(category, categoryIndex) in mzAddOfferGeneralInfo.listOfCategory">

        <template v-if="category.selected">
          <mz-radio :key="index"
                    :label="subcategory.label"
                    class="subcategory-box"
                    v-for="(subcategory, index) in category.listOfSubCategory"
                    v-model="newOffer.subCategory">

            <span class="main-category__text">
              {{ $t(`listOfCategory.mainCategory.subcategory.${subcategory.label}`) }}
            </span>
          </mz-radio>
        </template>
      </div>
    </div>

    <div class="mz-general-info__buttons">
      <mz-button @click="goToStep2()"
                 class="button-next">

        {{ $t(`button.goNextStep`) }}
      </mz-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }                     from 'vue-property-decorator';
import { namespace }                          from 'vuex-class';
import mzButton                               from '@/components/buttons/button.component.vue';
import mzRadio                                from '@/components/form/radio/radio.component.vue';
import { IAddNewOffer, IAddOfferGeneralInfo } from '@/views/user-administration/user-administration-offer/add-offer/store/user-account-add-offer.interface';
import mzUserAccountAddOfferModule            from '../store/user-account-add-offer.module';

const LOCAL_STORE: string = 'addOffer';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzRadio,
    mzButton,
  },
})
export default class mzUserAdministrationGeneralInfo extends Vue {
  @local.State((state: mzUserAccountAddOfferModule) => state.mzAddOfferGeneralInfo) public mzAddOfferGeneralInfo!: IAddOfferGeneralInfo;
  @local.State((state: mzUserAccountAddOfferModule) => state.numberOfActiveStep) public activeNumber!: number;
  @local.State((state: mzUserAccountAddOfferModule) => state.newOffer) public newOffer!: IAddNewOffer;
  @local.Mutation public setMainCategory!: (payload: string) => void;
  @local.Action public goToStep1!: () => void;
  @local.Action public goToStep2!: () => void;
}
</script>

<style lang="scss"
       scoped>

.mz-general-info {
  margin-top: 6rem;

  &__type,
  &__range,
  &__category,
  &__subcategory {
    margin-bottom: 5rem;

    .title {
      font-size: 2.2rem;
      font-weight: var(--font-regular);

      &:after {
        content: '*';
        color: var(--error);
        margin-left: .2rem;
      }
    }
  }

  &__type,
  &__range,
  &__subcategory {
    &__container {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      .main-range-box,
      .subcategory-box {
        margin-right: 2rem;
        color: var(--gray-500);
        padding: .5rem 1rem;
        background-color: var(--white);
        border: 1px solid var(--white);
        border-radius: 2px;

        &__text {
          font-size: 1.6rem;
          font-weight: var(--font-medium);
        }

        &:hover {
          border: 1px solid var(--primary-color);
          color: var(--primary-color);
          cursor: pointer;
          box-shadow: 0 0 .5rem 0 rgba(0, 0, 0, .2);
        }
      }

      .subcategory-box {
        margin-bottom: 2rem;
      }

      .is-checked {
        background-color: var(--primary-color);
        border: 1px solid var(--primary-color);
        color: var(--white);

        &:hover {
          color: var(--white);
        }

        &.light {
          background-color: var(--thirth-color);
        }

        &.dark {
          background-color: var(--secondary-color);
        }
      }
    }
  }

  &__category {
    &__container {
      display: flex;
      align-items: center;
      cursor: pointer;

      .main-category-box {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--white);
        width: 12.5rem;
        height: 12.5rem;
        border-radius: 2px;
        margin-right: 2rem;
        color: var(--gray-500);

        &__wrapper {
          font-size: 1.6rem;
          font-weight: var(--font-medium);
          display: flex;
          flex-direction: column;
          align-items: center;

          .icon {
            margin-bottom: 1rem;
            width: 6rem;
            height: 6rem;
          }
        }

        &--selected {
          background-color: var(--primary-color);

          .main-category-box__wrapper {
            color: var(--white);
          }

          .text {
            color: var(--white);
          }
        }

        &:hover {
          border: 1px solid var(--primary-color);
          box-shadow: 0 0 .5rem 0 rgba(0, 0, 0, .2);
        }
      }
    }
  }

  &__buttons {
    margin-top: 7rem;
    margin-bottom: 4rem;

    .button-next {
      width: auto;
      margin-right: 0;
      margin-left: auto;
      display: block;
    }
  }
}

@media screen and (max-width: 560px) {
  .mz-general-info {

    &__type,
    &__range,
    &__category,
    &__subcategory {

      .title {
        font-size: 3.2rem;
      }
    }

    &__category {
      &__container {
        .main-category-box {
          min-width: 17rem;
          min-height: 17rem;

          &__wrapper {
            font-size: 2.8rem;

            .icon {
              width: 8rem;
              height: 8rem;
            }
          }
        }
      }
    }

    &__buttons {
      .button-next {
        width: auto;
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .mz-general-info {

    &__type,
    &__range,
    &__subcategory {
      &__container {
        flex-direction: column;

        .main-range-box {
          margin: 0 0 2rem 0;
        }
      }
    }

    &__category {
      &__container {
        flex-wrap: wrap;
        justify-content: center;

        .main-category-box {
          margin-bottom: 2rem;
        }
      }
    }
  }
}
</style>
