<template>
  <div class="mz-delivery">

    <mz-box-with-title :title="$t(`deliverySection.personalPickup.title`)"
                       icon-name="icon-user">

      <mz-delivery-personal-pickup :trigger="trigger"
                                   @formPersonalPickup="setFormPersonalPickup" />

    </mz-box-with-title>

    <mz-box-with-title :title="$t(`deliverySection.parcelLocker.title`)"
                       icon-name="icon-box">

      <mz-delivery-parcel-locker />

    </mz-box-with-title>

    <mz-box-with-title :title="$t(`deliverySection.courier.sendCourier`)"
                       icon-name="icon-delivery">
      <mz-delivery-courier />

    </mz-box-with-title>

    <mz-box-with-title :title="$t(`deliverySection.letter.sendLetter`)"
                       icon-name="icon-mail">
      <mz-delivery-letter />

    </mz-box-with-title>

    <div class="mz-delivery__buttons">
      <mz-button class="button-previous"
                 @click="goToStep3()">

        {{ $t(`button.goToPrevious`) }}
      </mz-button>

      <mz-button class="button-next"

                 @click="goToNextStep()">

        {{ $t(`button.goNextStep`) }}
      </mz-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }                                 from 'vue-property-decorator';
import { namespace }                                      from 'vuex-class';
import { IAddItemNewItem, IPersonalPickupDeliveryOption } from '../store/user-account-add-item.interface';
import mzAddItemModule                                    from '../store/user-account-add-item.module';
import mzDeliveryPersonalPickup                           from './components/delivery-personal-pickup.component.vue';
import mzDeliveryParcelLocker                             from './components/delivery-parcel-locker.component.vue';
import mzDeliveryCourier                                  from './components/delivery-courier.component.vue';
import mzDeliveryLetter                                   from './components/delivery-letter.component.vue';
import mzBoxWithTitle                                     from '@/components/box-with-title/box-with-title.component.vue';
import mzCheckbox                                         from '@/components/form/checkbox/checkbox.component.vue';
import mzFormItem                                         from '@/components/form/form-item/form-item.component.vue';
import mzButton                                           from '@/components/buttons/button.component.vue';
import mzRadio                                            from '@/components/form/radio/radio.component.vue';
import mzInput                                            from '@/components/input/mz-input.component.vue';
import mzForm                                             from '@/components/form/form/form.component.vue';

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
    mzDeliveryLetter,
    mzDeliveryCourier,
    mzDeliveryParcelLocker,
    mzDeliveryPersonalPickup,
  },
})
export default class mzUserAdministrationDelivery extends Vue {
  @local.State((state: mzAddItemModule) => state.newItem) public newItem!: IAddItemNewItem;
  @local.State((state: mzAddItemModule) => state.mzPersonalPickupDelivery) public personalPickupOption!: IPersonalPickupDeliveryOption;
  @local.Action public goToStep5!: () => void;
  @local.Action public goToStep3!: () => void;

  public formPersonalPickup: HTMLElement | null = null;
  public trigger: boolean = false;

  public setFormPersonalPickup(formElement: HTMLElement | null): void {
    this.formPersonalPickup = formElement;
  }

  public goToNextStep(): void {

    if ((this.newItem.parcelLockerDelivery.length ||
      this.newItem.letterDelivery.length ||
      this.newItem.courierDelivery.length ||
      this.newItem.personalPickupDelivery) ||
      this.personalPickupOption.isSelected) {

      if (this.personalPickupOption.isSelected) {
        this.trigger = !this.trigger;

        this.$nextTick(() => {
          (this.formPersonalPickup as any).validate(async (valid: boolean) => {
            if (valid) {

              this.goToStep5();
            } else {
              return false;
            }
          });
        });
      } else {
        this.goToStep5();
      }
    }
  }
}
</script>

<style lang="scss"
       scoped>

.mz-delivery {
  margin-top: 6rem;

  &__buttons {
    margin-top: 7rem;
    margin-bottom: 7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .button-next,
    .button-previous {
      width: auto;
    }

    .button-next {
      margin-right: 0;
      margin-left: auto;
    }
  }
}
</style>
