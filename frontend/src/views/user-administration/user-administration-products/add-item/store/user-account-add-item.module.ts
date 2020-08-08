import { Action, Module, Mutation, VuexModule }                                                                        from 'vuex-module-decorators';
import cloneDeep                                                                                                       from 'lodash/cloneDeep';
import { IAddItemGeneralInfo, IAddItemNewItem, IDelivery, IDeliveryOption, IPersonalPickupDeliveryOption }            from './user-account-add-item.interface';
import { addItemGeneralInfo, courierDelivery, letterDelivery, newItem, parcelLockerDelivery, personalPickupDelivery } from './user-account-add-item.state';

@Module({ namespaced: true, stateFactory: true })
export default class mzUserAccountModule extends VuexModule {
  public mzAddItemGeneralInfo: IAddItemGeneralInfo = cloneDeep(addItemGeneralInfo);
  public mzPersonalPickupDelivery: IPersonalPickupDeliveryOption = cloneDeep(personalPickupDelivery);
  public mzParcelLockerDelivery: IDeliveryOption = cloneDeep(parcelLockerDelivery);
  public mzCourierDelivery: IDeliveryOption = cloneDeep(courierDelivery);
  public mzLetterDelivery: IDeliveryOption = cloneDeep(letterDelivery);
  public newItem: IAddItemNewItem = cloneDeep(newItem);
  public numberOfActiveStep: number = 0;

  public parcelLockerTempt: IDelivery = {
    label: '',
    price: '',
  };

  public courierTempt: IDelivery = {
    label: '',
    price: '',
  };

  public letterTempt: IDelivery = {
    label: '',
    price: '',
  };

  @Mutation
  public resetTemptLetter(): void {
    this.letterTempt = {
      label: '',
      price: '',
    };
  }

  @Mutation
  public resetTemptParcelLocker(): void {
    this.parcelLockerTempt = {
      label: '',
      price: '',
    };
  }

  @Mutation
  public resetTemptCourier(): void {
    this.courierTempt = {
      label: '',
      price: '',
    };
  }

  @Mutation
  public changeValueParcelLockerTempt(payload: string): void {
    this.parcelLockerTempt.price = payload;
  }

  @Mutation
  public changeValueLetterTempt(payload: string): void {
    this.letterTempt.price = payload;
  }

  @Mutation
  public changeValueCourierTempt(payload: string): void {
    this.courierTempt.price = payload;
  }

  @Mutation
  public addDeliveryToParcelLocker(payload: IDelivery): void {
    this.newItem.parcelLockerDelivery.push(payload);
  }

  @Mutation
  public addDeliveryToCourier(payload: IDelivery): void {
    this.newItem.courierDelivery.push(payload);
  }

  @Mutation
  public addDeliveryToLetter(payload: IDelivery): void {
    this.newItem.letterDelivery.push(payload);
  }

  @Mutation
  public addDeliveryPersonalPickup(payload: IPersonalPickupDeliveryOption): void {
    this.newItem.personalPickupDelivery = payload;
  }

  @Mutation
  public removeDeliveryParcelLocker(payload: number): void {
    this.newItem.parcelLockerDelivery.splice(payload, 1);
  }

  @Mutation
  public removeDeliveryLetter(payload: number): void {
    this.newItem.letterDelivery.splice(payload, 1);
  }

  @Mutation
  public removeDeliveryCourier(payload: number): void {
    this.newItem.courierDelivery.splice(payload, 1);
  }

  @Mutation
  public setMainCategory(payload: string): void {
    for (const category of this.mzAddItemGeneralInfo.listOfCategory) {
      if (payload === category.mainCategory) {
        category.selected = true;
        this.newItem.mainCategory = payload;
        this.newItem.subCategory = '';
      } else {
        category.selected = false;
      }
    }
  }

  @Mutation
  public setNumberOfActiveStep(payload: number): void {
    this.numberOfActiveStep = payload;
  }

  @Mutation
  public addTagToList(payload: string): void {
    this.newItem.tags.push(payload);
  }

  @Mutation
  public removeTagFromList(payload: number): void {
    this.newItem.tags.splice(payload, 1);
  }

  @Mutation
  public parsePrice(payload: string) {
    this.newItem.price = payload;
  }

  @Mutation
  public removePicture(payload: number) {
    if (this.newItem.mainPicture.url === this.newItem.pictures[ payload ].url) {
      this.newItem.mainPicture.url = '';
    }
    this.newItem.pictures.splice(payload, 1);
  }

  @Mutation
  public changeMainPicture(payload: number) {
    this.newItem.mainPicture = this.newItem.pictures[ payload ];
  }

  @Mutation
  public uploadPicture(payload: any) {
    this.newItem.pictures.push(
      {
        url: URL.createObjectURL(payload),
        file: payload,
      });
  }

  @Action
  public goToStep1(): void {
    this.context.commit('setNumberOfActiveStep', 0);
  }

  @Action
  public goToStep2(): void {
    if (this.newItem.subCategory !== ''
      && this.newItem.mainCategory !== ''
      && this.newItem.mainRange !== '') {
      this.context.commit('setNumberOfActiveStep', 1);
    }
  }

  @Action
  public goToStep3(): void {
    this.context.commit('setNumberOfActiveStep', 2);
  }

  @Action
  public goToStep4(): void {
    this.context.commit('setNumberOfActiveStep', 3);
  }

  @Action
  public goToStep5(): void {
    this.context.commit('addDeliveryPersonalPickup', this.mzPersonalPickupDelivery);
    this.context.commit('setNumberOfActiveStep', 4);
  }

  @Action
  public addOptionToParcelLocker(): void {
    this.context.commit('addDeliveryToParcelLocker', this.parcelLockerTempt);
    this.context.commit('resetTemptParcelLocker');
  }

  @Action
  public addOptionToCourier(): void {
    this.context.commit('addDeliveryToCourier', this.courierTempt);
    this.context.commit('resetTemptCourier');
  }

  @Action
  public addOptionToLetter(): void {
    this.context.commit('addDeliveryToLetter', this.letterTempt);
    this.context.commit('resetTemptLetter');
  }
}
