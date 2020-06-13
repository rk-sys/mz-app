import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import { addOfferGeneralInfo, newOffer }        from '@/views/user-administration/user-administration-offer/add-offer/store/user-account-add-offer.state';
import { IAddNewOffer, IAddOfferGeneralInfo }   from '@/views/user-administration/user-administration-offer/add-offer/store/user-account-add-offer.interface';

@Module({ namespaced: true, stateFactory: true })
export default class mzUserAccountModule extends VuexModule {
  public mzAddOfferGeneralInfo: IAddOfferGeneralInfo = cloneDeep(addOfferGeneralInfo);
  public newOffer: IAddNewOffer = cloneDeep(newOffer);
  public numberOfActiveStep: number = 0;

  @Mutation
  public setMainCategory(payload: string): void {
    for (const category of this.mzAddOfferGeneralInfo.listOfCategory) {
      if (payload === category.mainCategory) {
        category.selected = true;
        this.newOffer.mainCategory = payload;
        this.newOffer.subCategory = '';
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
    this.newOffer.tags.push(payload);
  }

  @Mutation
  public removeTagFromList(payload: number): void {
    this.newOffer.tags.splice(payload, 1);
  }

  @Mutation
  public parsePrice(payload: string) {
    this.newOffer.price = payload;
  }

  @Mutation
  public removePicture(payload: number) {
    if (this.newOffer.mainPicture.url === this.newOffer.pictures[ payload ].url) {
      this.newOffer.mainPicture.url = '';
    }
    this.newOffer.pictures.splice(payload, 1);
  }

  @Mutation
  public changeMainPicture(payload: number) {
    this.newOffer.mainPicture = this.newOffer.pictures[ payload ];
  }

  @Mutation
  public uploadPicture(payload: any) {
    this.newOffer.pictures.push(
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
    if (this.newOffer.subCategory !== ''
      && this.newOffer.mainCategory !== ''
      && this.newOffer.mainRange !== '') {
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
    this.context.commit('setNumberOfActiveStep', 4);
  }

  @Action
  public addOptionToParcelLocker(): void {
    this.context.commit('resetTemptParcelLocker');
  }

  @Action
  public addOptionToCourier(): void {
    this.context.commit('resetTemptCourier');
  }

  @Action
  public addOptionToLetter(): void {
    this.context.commit('resetTemptLetter');
  }
}
