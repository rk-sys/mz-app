import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import * as userAccountService                  from './in-realization.service';
import { IUserOffers, IDeleteOffer }            from './in-realization.interface';

@Module({ namespaced: true, stateFactory: true })
export default class mzOfferInRealizationModule extends VuexModule {
  public isModalOpen: boolean = false;
  public mzOffers: IUserOffers[] = [];
  public deleteOffer: IDeleteOffer = {
    uuid: '',
    title: '',
  };

  @Mutation
  public setDeleteOffer(item: IUserOffers): void {
    this.deleteOffer = { ...item };
  }

  @Mutation
  public setUserOffers(payload: IUserOffers[]): void {
    this.mzOffers = payload;
  }

  @Mutation
  public setIsModalOpen(payload: boolean): void {
    this.isModalOpen = payload;
  }

  @Action
  public async getUserOffers(): Promise<void> {
    try {
      const { data } = await userAccountService.getUserOffers();
      await this.context.commit('setUserOffers', data);
    } catch (e) {
      throw Error(e);
    }
  }
}
