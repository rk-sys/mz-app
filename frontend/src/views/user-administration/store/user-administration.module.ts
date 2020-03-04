import { Module, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                        from 'lodash/cloneDeep';
import { menuAdministration }           from './user-administration.state';
import { IUserAdministration }          from '@/views/user-administration/store/user-administration.interface';

@Module({ namespaced: true, stateFactory: true })
export default class mzUserAdministration extends VuexModule {
  public menuAdministration: IUserAdministration = cloneDeep(menuAdministration);

  @Mutation
  public setOpenMenu(payload: boolean): void {
    this.menuAdministration.isOpen = payload;
  }
}
