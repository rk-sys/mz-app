import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import {
  IAddItemGeneralInfo,
  IAddItemNewItem,
}                                               from './user-account-add-item.interface';
import {
  addItemGeneralInfo,
  newItem,
}                                               from './user-account-add-item.state';

@Module({ namespaced: true, stateFactory: true })
export default class mzUserAccountModule extends VuexModule {
  public mzAddItemGeneralInfo: IAddItemGeneralInfo = cloneDeep(addItemGeneralInfo);
  public newItem: IAddItemNewItem = cloneDeep(newItem);
  public numberOfActiveStep: number = 0;

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
  public goToStep1() {
    this.context.commit('setNumberOfActiveStep', 0);
  }

  @Action
  public goToStep2() {
    if (this.newItem.subCategory !== ''
      && this.newItem.mainCategory !== ''
      && this.newItem.mainRange !== '') {
      this.context.commit('setNumberOfActiveStep', 1);
    }
  }

  @Action
  public goToStep3() {
    this.context.commit('setNumberOfActiveStep', 2);
  }

  @Action
  public goToStep4() {
    this.context.commit('setNumberOfActiveStep', 3);
  }
}
