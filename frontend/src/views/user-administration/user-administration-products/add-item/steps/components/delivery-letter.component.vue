<template>
  <div class="mz-letter">
    <mz-checkbox v-model="letterDeliveryOption.isSelected"
                 class="mz-letter__checkbox">

          <span class="mz-letter__title">
            {{ $t(`deliverySection.letter.checkboxDelivery`) }}
          </span>
    </mz-checkbox>

    <div v-if="letterDeliveryOption.isSelected"
         v-for="(option, index) in letterOptions"
         :key="index"
         class="mz-letter__options">

        <span class="mz-letter__options__label">
          {{option.label}}
        </span>

      <div class="mz-letter__options__price">
        {{option.price}} {{ $t(`itemSummary.currency`) }}

        <div class="icon icon-delete--red"
             @click="removeDeliveryLetter(index)"></div>
      </div>
    </div>

    <mz-form v-if="letterDeliveryOption.isSelected"
             :form-ref.sync="formLetter"
             @submit.prevent.native="addNewOptionCourier"
             :model="letterTempt"
             :rules="rulesLetter"
             class="mz-letter__form"
             id="letterForm">

      <mz-form-item class="item item--wide"
                    prop="label">

        <mz-input v-model="letterTempt.label"
                  :holder="$t(`deliverySection.parcelLocker.parcelLockerName`)"
                  id="label" />

      </mz-form-item>

      <mz-form-item class="item item--price"
                    prop="price">

        <mz-input v-model="letterTempt.price"
                  :holder="$t(`deliverySection.parcelLocker.price`)"
                  id="price" />

      </mz-form-item>

      <mz-button class="button"
                 form="letterForm"
                 native-type="submit"> +
      </mz-button>
    </mz-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue }                              from 'vue-property-decorator';
import { namespace }                                   from 'vuex-class';
import { IAddItemNewItem, IDelivery, IDeliveryOption } from '../../store/user-account-add-item.interface';
import mzAddItemModule                                 from '../../store/user-account-add-item.module';
import mzBoxWithTitle                                  from '@/components/box-with-title/box-with-title.component.vue';
import mzCheckbox                                      from '@/components/form/checkbox/checkbox.component.vue';
import mzFormItem                                      from '@/components/form/form-item/form-item.component.vue';
import mzButton                                        from '@/components/buttons/button.component.vue';
import mzRadio                                         from '@/components/form/radio/radio.component.vue';
import mzInput                                         from '@/components/input/mz-input.component.vue';
import mzForm                                          from '@/components/form/form/form.component.vue';
import { i18n }                                        from '@/i18n/i18n';

const LOCAL_STORE: string = 'addItem';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzForm,
    mzRadio,
    mzInput,
    mzButton,
    mzCheckbox,
    mzFormItem,
    mzBoxWithTitle,
  },
})
export default class mzUserAdministrationDelivery extends Vue {
  @local.State((state: mzAddItemModule) => state.mzLetterDelivery) public letterDeliveryOption!: IDeliveryOption;
  @local.State((state: mzAddItemModule) => state.letterTempt) public letterTempt!: IDelivery;
  @local.State((state: mzAddItemModule) => state.newItem.letterDelivery) public letterOptions!: IAddItemNewItem;
  @local.Mutation public removeDeliveryLetter!: (payload: number) => void;
  @local.Mutation public parsePrice!: (payload: string) => void;
  @local.Mutation public changeValueLetterTempt!: (payload: string) => void;
  @local.Action public addOptionToLetter!: () => void;

  public formLetter: HTMLElement | null = null;

  public rulesLetter: any = {
    label: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'blur', 'submit' ] },
    ],
    price: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'blur', 'submit' ] },
      {
        validator: (rule: any, value: string, callback: (error?: Error) => void) => {
          if (!this.checkPrice()) {
            callback(new Error(i18n.t(`rules.wrongPrice`) as string));
          } else {
            callback();
          }
        },
        trigger: 'submit',
      },
    ],
  };

  public checkPrice(): boolean {
    const value = this.letterTempt.price.replace(/[^0-9.]+/, '');
    const price: number = parseFloat(value);
    this.parsePrice(String(price));
    this.changeValueLetterTempt(price.toString());
    return price > 0;
  }

  public addNewOptionCourier(): void {
    (this.formLetter as any).validate(async (valid: boolean) => {
      if (valid) {
        try {
          await this.addOptionToLetter();
        } catch (e) {
          throw new Error(e);
        }
      }
    });
  }
}
</script>

<style lang="scss">
.mz-letter {
  .el-form-item__error {
    bottom: -.4rem;
    font-size: 1.5rem;
    top: auto;
    font-weight: bold;
    left: auto;
    right: 0;
  }
}

.mz-letter {
  .item--price {
    .mz-input__container {
      min-width: 20rem !important;
      width: 20rem;
    }
  }
}

@include respond-to(mobile) {
  .mz-letter {
    .item--price {
      .mz-input__container {
        width: 100%;
      }
    }
  }
}
</style>

<style lang="scss"
       scoped>

.mz-letter {
  margin-top: 3rem;

  &__options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: .5rem 0;
    padding: .5rem;

    &__label {
      display: block;
      font-size: 2.4rem;
      font-weight: var(--font-medium);
    }

    &__price {
      display: flex;
      font-size: 2.4rem;
      font-weight: var(--font-medium);
    }

    .icon {
      margin-left: 2rem;
      width: 3rem;
      height: 3rem;
      cursor: pointer;
    }

    &:hover {
      background: var(--gray-150);
    }
  }

  &__checkbox {
    display: flex;
    align-items: center;
  }

  &__title {
    font-weight: var(--font-medium);
    font-size: 2.2rem;
  }

  &__form {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .item {
      margin: 0;

      &--wide {
        width: 60%;
      }
    }

    .button {
      width: 5rem;
    }
  }
}

@include respond-to(mobile) {
  .mz-letter {
    &__form {
      flex-direction: column;

      .item {
        width: 100%;

        &--wide {
          width: 100%;
        }
      }

      .button {
        margin-top: 2rem;
        width: 100%;
      }
    }
  }
}
</style>
