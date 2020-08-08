<template>
  <div class="mz-personal-pickup">
    <mz-checkbox class="mz-personal-pickup__checkbox"
                 v-model="personalPickupOption.isSelected">

          <span class="mz-personal-pickup__title">
            {{ $t(`deliverySection.personalPickup.checkboxDelivery`) }}
          </span>
    </mz-checkbox>

    <span class="mz-personal-pickup__info"
          v-if="personalPickupOption.isSelected">
      {{ $t(`deliverySection.personalPickup.info`) }}
    </span>

    <mz-form :form-ref.sync="formPersonalPickup"
             :model="personalPickupOption"
             :rules="personalPickupRule"
             class="mz-personal-pickup__form"
             id="personalPickup"
             v-if="personalPickupOption.isSelected">

      <div class="mz-personal-pickup__form__wrapper">

        <mz-form-item class="item"
                      prop="name">

          <mz-input :holder="$t(`deliverySection.personalPickup.name`)"
                    id="name"
                    v-model="personalPickupOption.name" />

        </mz-form-item>

        <mz-form-item class="item"
                      prop="mail">

          <mz-input :holder="$t(`deliverySection.personalPickup.mail`)"
                    id="mail"
                    v-model="personalPickupOption.mail" />

        </mz-form-item>

        <mz-form-item class="item"
                      prop="phone">

          <mz-input :holder="$t(`deliverySection.personalPickup.phone`)"
                    id="phone"
                    v-model="personalPickupOption.phone" />

        </mz-form-item>
      </div>

      <div class="mz-personal-pickup__form__wrapper">

        <mz-form-item class="item"
                      prop="city">

          <mz-input :holder="$t(`deliverySection.personalPickup.city`)"
                    id="city"
                    v-model="personalPickupOption.city" />

        </mz-form-item>

        <mz-form-item class="item"
                      prop="address">

          <mz-input :holder="$t(`deliverySection.personalPickup.address`)"
                    id="address"
                    v-model="personalPickupOption.address" />

        </mz-form-item>
      </div>
    </mz-form>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace }                         from 'vuex-class';
import { IPersonalPickupDeliveryOption }     from '../../store/user-account-add-item.interface';
import mzAddItemModule                       from '../../store/user-account-add-item.module';
import mzBoxWithTitle                        from '@/components/box-with-title/box-with-title.component.vue';
import mzCheckbox                            from '@/components/form/checkbox/checkbox.component.vue';
import mzFormItem                            from '@/components/form/form-item/form-item.component.vue';
import mzButton                              from '@/components/buttons/button.component.vue';
import mzRadio                               from '@/components/form/radio/radio.component.vue';
import mzInput                               from '@/components/input/mz-input.component.vue';
import mzForm                                from '@/components/form/form/form.component.vue';
import { i18n }                              from '@/i18n/i18n';

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
  @local.State((state: mzAddItemModule) => state.mzPersonalPickupDelivery) public personalPickupOption!: IPersonalPickupDeliveryOption;
  @Prop(Boolean) public trigger!: boolean;

  public formPersonalPickup: HTMLElement | null = null;

  public personalPickupRule: any = {
    name: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'change', 'blur' ] },
    ],
    address: [
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

  @Emit('formPersonalPickup')
  public emitFormElement(): HTMLElement | null {
    return this.formPersonalPickup;
  }

  @Watch('trigger')
  public watchTrigger(): void {
    this.emitFormElement();
  }
}
</script>

<style lang="scss">
.mz-personal-pickup {
  .el-form-item__error {
    bottom: -.4rem;
    font-size: 1.5rem;
    top: auto;
    font-weight: bold;
    left: auto;
    right: 0;
  }
}
</style>

<style lang="scss"
       scoped>

.mz-personal-pickup {
  margin-top: 3rem;

  &__info {
    display: block;
    background: var(--primary-color);
    padding: .5rem;
    color: var(--white);
    text-align: center;
    margin: 1.5rem .5rem .5em;
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
    justify-content: space-around;

    &__wrapper {
      width: 40%;
    }
  }
}


@include respond-to(mobile) {
  .mz-personal-pickup__form {
    flex-direction: column;

    &__wrapper {
      width: 100%;
    }
  }
}
</style>
