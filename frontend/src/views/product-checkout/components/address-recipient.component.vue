<template>
  <mz-box-with-title :title="$t(`box.selectedProduct`)"
                     :is-disabled="!addressInfo.selected"
                     class="mz-address-recipient"
                     icon-name="icon-pin--stroke">

    <template v-if="addressInfo.selected">

      <template v-if="checkDelivery(deliveryType)">

        <mz-form :form-ref.sync="formElement"
                 :rules="parcelLockerRules"
                 :model="addressInfo.data"
                 class="mz-address-recipient__form"
                 id="parcelLockerForm">

          <div class="mz-selected-product__form__wrapper">
            <mz-form-item class="mz-selected-product__form__wrapper__item"
                          prop="name">

              <mz-input v-model="addressInfo.data.name"
                        :holder="$t(`form.placeholder.name`)"
                        :is-password="false" />

            </mz-form-item>

            <mz-form-item class="mz-selected-product__form__wrapper__item"
                          prop="mail">

              <mz-input v-model="addressInfo.data.mail"
                        :holder="$t(`form.placeholder.mail`)"
                        :is-password="false" />

            </mz-form-item>
          </div>

          <div class="mz-selected-product__form__wrapper">
            <mz-form-item class="mz-selected-product__form__wrapper__item"
                          prop="phone">

              <mz-input v-model="addressInfo.data.phone"
                        :holder="$t(`form.placeholder.phone`)"
                        :is-password="false" />

            </mz-form-item>

            <mz-form-item class="mz-selected-product__form__wrapper__item"
                          prop="parcelLockerCode">

              <mz-input v-model="addressInfo.data.parcelLockerCode"
                        :holder="$t(`form.placeholder.parcelLockerCode`)"
                        :is-password="false" />

            </mz-form-item>
          </div>
        </mz-form>
      </template>

      <template v-else>
        <mz-form :model="addressInfo.data"
                 :form-ref.sync="formElement"
                 :rules="sendProductRule"
                 class="mz-address-recipient__form"
                 id="addressForm">

          <div class="mz-selected-product__form__wrapper">
            <mz-form-item class="mz-selected-product__form__wrapper__item"
                          prop="name">

              <mz-input v-model="addressInfo.data.name"
                        :holder="$t(`form.placeholder.name`)"
                        :is-password="false" />

            </mz-form-item>

            <mz-form-item class="mz-selected-product__form__wrapper__item"
                          prop="phone">

              <mz-input v-model="addressInfo.data.phone"
                        :holder="$t(`form.placeholder.phone`)"
                        :is-password="false" />

            </mz-form-item>

            <mz-form-item class="mz-selected-product__form__wrapper__item"
                          prop="mail">

              <mz-input v-model="addressInfo.data.mail"
                        :holder="$t(`form.placeholder.mail`)"
                        :is-password="false" />

            </mz-form-item>
          </div>

          <div class="mz-selected-product__form__wrapper">
            <mz-form-item class="mz-selected-product__form__wrapper__item"
                          prop="zipCode">

              <mz-input v-model="addressInfo.data.zipCode"
                        :holder="$t(`form.placeholder.zipCode`)"
                        :is-password="false" />

            </mz-form-item>

            <mz-form-item class="mz-selected-product__form__wrapper__item"
                          prop="city">

              <mz-input v-model="addressInfo.data.city"
                        :holder="$t(`form.placeholder.city`)"
                        :is-password="false" />

            </mz-form-item>

            <mz-form-item class="mz-selected-product__form__wrapper__item"
                          prop="address">

              <mz-input v-model="addressInfo.data.address"
                        :holder="$t(`form.placeholder.address`)"
                        :is-password="false" />

            </mz-form-item>
          </div>
        </mz-form>
      </template>
    </template>
  </mz-box-with-title>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { namespace }                         from 'vuex-class';
import { IProductSummary }                   from '@/views/product-checkout/store/product-checkout.interface';
import mzProductCheckoutModule               from '../store/product-checkout.module';
import mzBoxWithTitle                        from '@/components/box-with-title/box-with-title.component.vue';
import mzForm                                from '@/components/form/form/form.component.vue';
import mzInput                               from '@/components/input/mz-input.component.vue';
import mzFormItem                            from '@/components/form/form-item/form-item.component.vue';
import { i18n }                              from '@/i18n/i18n';

const LOCAL_STORE: string = 'productCheckout';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzForm,
    mzInput,
    mzFormItem,
    mzBoxWithTitle,
  },
})
export default class mzSelectedProduct extends Vue {
  @local.State((state: mzProductCheckoutModule) => state.informationCheckout.address) public addressInfo!: IProductSummary;
  @local.State((state: mzProductCheckoutModule) => state.informationCheckout.label) public deliveryType!: string;
  @Prop(Boolean) public trigger!: boolean;

  public formElement: HTMLElement | null = null;

  public parcelLockerRules: any = {
    name: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'change', 'blur' ] },
    ],
    mail: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'change', 'blur' ] },
      { type: 'email', message: i18n.t('rules.correctEmail'), trigger: [ 'change', 'blur' ] },
    ],
    phone: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'change', 'blur' ] },
      { max: 9, message: i18n.t('rules.phoneLength'), trigger: [ 'change', 'blur' ] },
      { min: 9, message: i18n.t('rules.phoneLength'), trigger: [ 'change', 'blur' ] },
    ],
    parcelLockerCode: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'change', 'blur' ] },
    ],
  };

  public sendProductRule: any = {
    name: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'change', 'blur' ] },
    ],
    address: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'change', 'blur' ] },
    ],
    zipCode: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'change', 'blur' ] },
    ],
    city: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'change', 'blur' ] },
    ],
    mail: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'change', 'blur' ] },
      { type: 'email', message: i18n.t('rules.correctEmail'), trigger: [ 'change', 'blur' ] },
    ],
    phone: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'change', 'blur' ] },
      { max: 9, message: i18n.t('rules.phoneLength'), trigger: [ 'change', 'blur' ] },
      { min: 9, message: i18n.t('rules.phoneLength'), trigger: [ 'change', 'blur' ] },
    ],
  };

  @Emit('formElement')
  public emitFormElement(): HTMLElement | null {
    return this.formElement;
  }

  @Watch('trigger')
  public watchTrigger(): void {
    this.emitFormElement();
  }

  public checkDelivery(delivery: string): boolean {
    return delivery === 'parcelLocker';
  }
}
</script>

<style lang="scss">
.el-form-item__error {
  bottom: -1rem;
  font-size: 1.6rem;
  top: auto;
  font-weight: bold;
  left: auto;
  right: 0;
}
</style>
<style lang="scss"
       scoped>
.mz-address-recipient {
  margin-top: 3rem;

  &__form {
    display: flex;
    justify-content: space-around;
    margin: 2rem 0;

    &__wrapper {
      width: 50%;

      &__item {

      }
    }
  }
}

@include respond-to(mobile) {
  .mz-address-recipient {
    &__form {
      flex-direction: column;
    }
  }
}
</style>
