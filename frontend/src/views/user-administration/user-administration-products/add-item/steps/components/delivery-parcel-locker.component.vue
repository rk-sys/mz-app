<template>
  <div class="mz-parcel-locker">
    <mz-checkbox class="mz-parcel-locker__checkbox"
                 v-model="parcelLockerDeliveryOption.isSelected">

          <span class="mz-parcel-locker__title">
            {{ $t(`deliverySection.parcelLocker.checkboxDelivery`) }}
          </span>
    </mz-checkbox>

    <div :key="index"
         class="mz-parcel-locker__options"
         v-for="(option, index) in parcelLockerOption"
         v-if="parcelLockerDeliveryOption.isSelected">

        <span class="mz-parcel-locker__options__label">
          {{option.label}}
        </span>

      <div class="mz-parcel-locker__options__price">
        {{option.price}} {{ $t(`itemSummary.currency`) }}

        <div @click="removeDeliveryParcelLocker(index)"
             class="icon icon-delete--red"></div>
      </div>
    </div>

    <mz-form :form-ref.sync="formParcelLocker"
             :model="parcelLockerTempt"
             :rules="rules"
             @submit.prevent.native="addNewOption"
             class="mz-parcel-locker__form"
             id="parcelLockerForm"
             v-if="parcelLockerDeliveryOption.isSelected">

      <mz-form-item class="item item--wide"
                    prop="label">

        <mz-input :holder="$t(`deliverySection.parcelLocker.parcelLockerName`)"
                  id="label"
                  v-model="parcelLockerTempt.label" />

      </mz-form-item>

      <mz-form-item class="item item--price"
                    prop="price">

        <mz-input :holder="$t(`deliverySection.parcelLocker.price`)"
                  id="price"
                  v-model="parcelLockerTempt.price" />

      </mz-form-item>

      <mz-button class="button"
                 form="parcelLockerForm"
                 native-type="submit">
      </mz-button>
    </mz-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue }             from 'vue-property-decorator';
import { namespace }                  from 'vuex-class';
import { IDelivery, IDeliveryOption } from '../../store/user-account-add-item.interface';
import mzAddItemModule                from '../../store/user-account-add-item.module';
import mzBoxWithTitle                 from '@/components/box-with-title/box-with-title.component.vue';
import mzCheckbox                     from '@/components/form/checkbox/checkbox.component.vue';
import mzFormItem                     from '@/components/form/form-item/form-item.component.vue';
import mzButton                       from '@/components/buttons/button.component.vue';
import mzRadio                        from '@/components/form/radio/radio.component.vue';
import mzInput                        from '@/components/input/mz-input.component.vue';
import mzForm                         from '@/components/form/form/form.component.vue';
import { i18n }                       from '@/i18n/i18n';

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
  @local.State((state: mzAddItemModule) => state.mzParcelLockerDelivery) public parcelLockerDeliveryOption!: IDeliveryOption;
  @local.State((state: mzAddItemModule) => state.parcelLockerTempt) public parcelLockerTempt!: IDelivery;
  @local.State((state: mzAddItemModule) => state.newItem.parcelLockerDelivery) public parcelLockerOption!: IDelivery;
  @local.Mutation public removeDeliveryParcelLocker!: (payload: number) => void;
  @local.Mutation public parsePrice!: (payload: string) => void;
  @local.Mutation public changeValueParcelLockerTempt!: (payload: string) => void;
  @local.Action public addOptionToParcelLocker!: () => void;

  public formParcelLocker: HTMLElement | null = null;

  public rules: any = {
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
    const value = this.parcelLockerTempt.price.replace(/[^0-9.]+/, '');
    const price: number = parseFloat(value);
    this.parsePrice(String(price));
    this.changeValueParcelLockerTempt(price.toString());
    return price > 0;
  }

  public addNewOption(): void {
    (this.formParcelLocker as any).validate(async (valid: boolean) => {
      if (valid) {
        try {
          await this.addOptionToParcelLocker();
        } catch (e) {
          throw new Error(e);
        }
      }
    });
  }
}
</script>

<style lang="scss">
.mz-parcel-locker {
  .el-form-item__error {
    bottom: -.5rem;
    font-size: 1.5rem;
    top: auto;
    font-weight: bold;
    left: auto;
    right: 0;
  }
}

.mz-parcel-locker {
  .item--price {
    .mz-input__container {
      min-width: 20rem !important;
      width: 20rem;
    }
  }
}

@include respond-to(mobile) {
  .mz-parcel-locker {
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

.mz-parcel-locker {
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
  .mz-parcel-locker {
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
