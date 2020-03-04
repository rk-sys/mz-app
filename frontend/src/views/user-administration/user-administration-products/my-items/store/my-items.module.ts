import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import * as userAccountService                  from './my-items.service';
import { IDeleteItem, IUserItem }               from './my-items.interface';

@Module({ namespaced: true, stateFactory: true })
export default class mzUserAdministrationMyItemsModule extends VuexModule {
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
  public setIsModalOpen(payload: boolean): void {
    this.isModalOpen = payload;
  }

  @Mutation
  public setUserItems(payload: IUserItem[]): void {
    this.mzItems = payload;
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
