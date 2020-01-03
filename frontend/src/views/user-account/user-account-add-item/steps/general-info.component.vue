<template>
  <div class="mz-general-info">
    <div class="mz-general-info__range">
      <p class="title">{{ $t(`categorySelection.title.mainRange`) }}</p>

      <div class="mz-general-info__range__container">

        <mz-radio v-for="(mainRange, index) in addItemGeneralInfo.listOfMainRange"
                  :key="index"
                  v-model="newItem.mainRange"
                  :label="mainRange.label"
                  class="main-range-box">

          <span class="main-category__text">
            {{ $t(`listOfMainRange.${mainRange.label}`) }}
          </span>
        </mz-radio>
      </div>
    </div>

    <div class="mz-general-info__category">
      <p class="title">{{ $t(`categorySelection.title.category`) }}</p>

      <div class="mz-general-info__category__container">

        <div v-for="(category, index) in addItemGeneralInfo.listOfCategory"
             :key="index"
             v-model="newItem.mainCategory"
             :label="category.mainCategory"
             class="main-category-box"
             :class="{'main-category-box--selected': category.selected}"
             @click="setMainCategory(category.mainCategory)">

          <div class="main-category-box__wrapper">
            <div class="icon"
                 :class="{ 'icon-armor--gray': category.mainCategory === 'armor' && !category.selected,
                           'icon-sword--gray': category.mainCategory === 'weapon' && !category.selected,
                           'icon-tunic--gray': category.mainCategory === 'costume' && !category.selected,
                           'icon-masks--gray': category.mainCategory === 'other' && !category.selected,
                           'icon-armor--white': category.mainCategory === 'armor' && category.selected,
                           'icon-sword--white': category.mainCategory === 'weapon' && category.selected,
                           'icon-tunic--white': category.mainCategory === 'costume' && category.selected,
                           'icon-masks--white': category.mainCategory === 'other' && category.selected}">
            </div>
            {{ $t(`listOfCategory.mainCategory.${category.mainCategory}`) }}
          </div>
        </div>
      </div>
    </div>

    <div class="mz-general-info__subcategory">
      <p class="title">{{$t(`categorySelection.title.subCategory`)}}</p>

      <div class="mz-general-info__subcategory__container"
           v-for="(category, index) in addItemGeneralInfo.listOfCategory">

        <template v-if="category.selected">
          <mz-radio v-for="(subcategory, index) in category.listOfSubCategory"
                    :key="index"
                    v-model="newItem.subCategory"
                    :label="subcategory.label"
                    class="subcategory-box">

            <span class="main-category__text">
              {{ $t(`listOfCategory.mainCategory.subcategory.${subcategory.label}`) }}
            </span>
          </mz-radio>
        </template>
      </div>
    </div>

    <div class="mz-general-info__buttons">
      <mz-button class="button-next"
                 @click="goToStep2()">

        {{ $t(`button.goNextStep`) }}
      </mz-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }                       from 'vue-property-decorator';
import { namespace }                            from 'vuex-class';
import { IAddItemGeneralInfo, IAddItemNewItem } from '@/views/user-account/user-account-add-item/store/user-account-add-item.interface';
import mzAddItemModule                          from '@/views/user-account/user-account-add-item/store/user-account-add-item.module';
import mzButton                                 from '@/components/buttons/button.component.vue';
import mzRadio                                  from '@/components/form/radio/radio.component.vue';
import mzSteps                                  from '@/components/steps/steps.component.vue';

const LOCAL_STORE = 'addItem';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzSteps,
    mzRadio,
    mzButton,
  },
})
export default class mzUserAccount extends Vue {
  @local.State((state: mzAddItemModule) => state.mzAddItemGeneralInfo) public addItemGeneralInfo!: IAddItemGeneralInfo;
  @local.State((state: mzAddItemModule) => state.numberOfActiveStep) public activeNumber!: number;
  @local.State((state: mzAddItemModule) => state.newItem) public newItem!: IAddItemNewItem;
  @local.Mutation public setMainCategory!: (payload: string) => void;
  @local.Action public goToStep1!: () => void;
  @local.Action public goToStep2!: () => void;
}
</script>

<style lang="scss"
       scoped>

.mz-general-info {
  margin-top: 6rem;

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

@media screen and (max-width: 560px) and (min-width: 300px) {
  .mz-general-info {

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

@media screen and (max-width: 425px) and (min-width: 300px) {
  .mz-general-info {
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
