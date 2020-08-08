import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import * as homeServices                      from './home.service';
import { mzHome }                        from './home.state';
import { IHome }                from './home.interface';

@Module({ namespaced: true, stateFactory: true })
export default class mzCraftsmenModule extends VuexModule {
  public mzHome: IHome = cloneDeep(mzHome);

  public search: string = '';
  public searchTypes: Array<string> = [ 'craftsman', 'product', 'offer' ];
  public searchType: string = '';

  @Mutation
  public setHome(payload: IHome): void {
    this.mzHome = payload;
  }

  @Mutation
  public setSearchType(payload: string): void {
    this.searchType = payload
  }

  @Action
  public async getHomePage(): Promise<void> {
    try {
      const { data }: { data: IHome } = await homeServices.getHomeData();
      this.context.commit('setHome', data);
    } catch (e) {
      throw new Error(e);
    }
  }
}
