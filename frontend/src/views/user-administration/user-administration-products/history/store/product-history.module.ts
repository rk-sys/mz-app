import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import * as userAccountService                  from './product-history.service';
import { IUserItem, IDeleteItem }               from './product-history.interface';

@Module({ namespaced: true, stateFactory: true })
export default class mzUserAdministrationMyItemsHistoryModule extends VuexModule {
  public isModalOpen: boolean = false;
  public mzItems: IUserItem[] = [];
  public deleteItem: IDeleteItem = {
    uuid: '',
    title: '',
  };

  @Mutation
  public setDeleteItem(item: IUserItem): void {
    this.deleteItem = { ...item };
  }

  @Mutation
  public setUserItems(payload: IUserItem[]): void {
    this.mzItems = payload;
  }

  @Mutation
  public setIsModalOpen(payload: boolean): void {
    this.isModalOpen = payload;
  }

  @Action
  public async getUserItems(): Promise<void> {
    try {
      const { data } = await userAccountService.getUserItems();
      await this.context.commit('setUserItems', data);
    } catch (e) {
      throw Error(e);
    }
  }
}
