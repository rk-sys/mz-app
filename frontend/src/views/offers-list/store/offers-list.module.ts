import { Action, Module, Mutation, VuexModule }            from 'vuex-module-decorators';
import cloneDeep                                           from 'lodash/cloneDeep';
import * as offersListService                              from './offers-list.service';
import { mzOffers }                                        from '@/views/offers-list/store/offers-list.state';
import { IFilterTargetGroup, IOffer, IOffersState, TSort } from '@/views/offers-list/store/offers-list.interface';

@Module({ namespaced: true, stateFactory: true })
export default class mzOffersListModule extends VuexModule {
  public mzOffersList: IOffersState = cloneDeep(mzOffers);

  @Mutation
  public setOffersList(payload: IOffer[]): void {
    this.mzOffersList.offersList = payload;
  }

  @Mutation
  public setTargetGroupSelectAll(): void {
    this.mzOffersList.filters.targetGroup.forEach((element: IFilterTargetGroup) => {
      element.isSelected = true;
    });
  }

  @Mutation
  public removeTagFromFilters(index: number): void {
    this.mzOffersList.filters.tags.splice(index, 1);
  }

  @Mutation
  public addTagToFilters(tag: string): void {
    this.mzOffersList.filters.tags.push(tag);
  }

  @Mutation
  public setOffersSortOption(value: TSort): void {
    this.mzOffersList.defaultOffersSortOption = value;
  }


  @Action
  public changeOffersSortOption(value: TSort): void {
    this.context.commit('setOffersSortOption', value);
  }

  @Action
  public checkTargetGroupSelected(): void {
    if (!this.mzOffersList.filters.targetGroup[ 0 ].isSelected
      && !this.mzOffersList.filters.targetGroup[ 1 ].isSelected
      && !this.mzOffersList.filters.targetGroup[ 2 ].isSelected) {
      this.context.commit('setTargetGroupSelectAll');
    }
  }

  @Action
  public async getOffersList(): Promise<void> {
    try {
      const { data }: { data: IOffer[] } = await offersListService.getOffers();
      this.context.commit('setOffersList', data);
    } catch (e) {
      throw new Error(e);
    }
  }
}
