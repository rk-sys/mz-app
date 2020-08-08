import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import * as userAccountService                  from './in-realization.service';
import { IDeleteProduct, IUserItem }            from './in-realization.interface';

@Module({ namespaced: true, stateFactory: true })
export default class mzUserAdministrationMyItemsModule extends VuexModule {
  public mzItems: IUserItem[] = [];
  public isModalOpen: boolean = false;
  public deleteProduct: IDeleteProduct = {
    uuid: '',
    title: '',
  };

  @Mutation
  public setDeleteProduct(item: IDeleteProduct): void {
    this.deleteProduct = { ...item };
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
