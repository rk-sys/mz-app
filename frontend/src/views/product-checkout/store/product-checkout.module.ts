import { Action, Module, Mutation, VuexModule }                                                         from 'vuex-module-decorators';
import cloneDeep                                                                                        from 'lodash/cloneDeep';
import * as productCheckoutService                                                                      from './product-checkout.service';
import { checkoutInformation, productCheckout }                                                         from '@/views/product-checkout/store/product-checkout.state';
import { IDeliveryAtPoints, IDeliveryLetter, IDeliveryOptions, IInformationCheckout, IProductCheckout } from '@/views/product-checkout/store/product-checkout.interface';
import Notification                                                                                     from '@/components/notification/notifications';
import { i18n }                                                                                         from '@/i18n/i18n';
import router                                                                                           from '@/router';

@Module({ namespaced: true, stateFactory: true })
export default class productDetailModule extends VuexModule {
  public productCheckout: IProductCheckout = cloneDeep(productCheckout);
  public informationCheckout: IInformationCheckout = cloneDeep(checkoutInformation);
  public hideAddress: boolean = true;
  public productUuid: string = '';

  @Mutation
  public setProductUuid(payload: string): void {
    this.productUuid = payload;
  }

  @Mutation
  public setProductCheckout(payload: IProductCheckout): void {
    this.productCheckout = payload;
  }

  @Mutation
  public setDeliveryOption(payload: string | IDeliveryOptions): void {
    this.informationCheckout.deliveryOption = payload;
  }

  @Mutation
  public setAddressSelected(payload: boolean): void {
    this.informationCheckout.address.selected = payload;
  }

  @Mutation
  public setAddressDeliveryTyp(): void {
    if (this.informationCheckout.label === 'parcelLocker') {
      this.informationCheckout.address.data = {
        parcelLockerCode: '',
        name: '',
        phone: '',
        mail: '',
      };
    } else if (this.informationCheckout.label === 'personalPickup') {
      this.informationCheckout.address.data = null;
    } else {
      this.informationCheckout.address.data = {
        address: '',
        zipCode: '',
        name: '',
        city: '',
        phone: '',
        mail: '',
      };
    }
  }

  @Mutation
  public setAddressData(payload: IDeliveryLetter | IDeliveryAtPoints): void {
    this.informationCheckout.address.data = payload;
  }

  @Mutation
  public setHideAddress(payload: boolean): void {
    this.hideAddress = payload;
  }

  @Action
  public async getProductCheckout(payload: string): Promise<void> {
    try {
      const { data } = await productCheckoutService.getProductCheckout(payload);
      this.context.commit('setProductCheckout', data);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Action
  public buyProduct() {
    // TODO kupno przedmiotu
    Notification.successNotification(i18n.t(`notification.congratulations`) as string, i18n.t(`notification.bought`) as string);
    router.push({ name: 'Home' });
  }
}
