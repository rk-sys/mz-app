import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import { userAccountMenu }                      from './user-account.state';
import * as userAccountService                  from './user-account.service';
import 'firebase/auth';
import { IUserAccountMenu, IUserInfo }          from '@/views/user-account/store/user-account.interface';


@Module({ namespaced: true, stateFactory: true })
export default class mzUserAccountModule extends VuexModule {
  public mzUserAccountMenuState: IUserAccountMenu = cloneDeep(userAccountMenu);

  get userAccountMenuLinks() {
    return this.mzUserAccountMenuState.links;
  }

  get userAccountInfo() {
    return this.mzUserAccountMenuState.userInfo;
  }

  @Mutation
  public setUserInfo(payload: IUserInfo) {
    this.mzUserAccountMenuState.userInfo = {
      displayName: payload.displayName,
      photoURL: payload.photoURL,
      emailVerified: payload.emailVerified,
      email: payload.email,
      uid: payload.uid,
    };
  }

  @Action
  public async getCurrentUserInfo() {
    try {
      const user = await userAccountService.getCurrentLoginUser();
      this.context.commit('setUserInfo', user);
    } catch (e) {
      throw new Error(e);
    }
  }
}
