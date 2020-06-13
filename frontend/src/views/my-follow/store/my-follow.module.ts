import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import { IMyFollow }                            from './my-follow.interface';
import { myFollow }                             from './my-follow.state';
import * as myFollowService                     from './my-follow.service';

@Module({ namespaced: true, stateFactory: true })
export default class mzUserAdministration extends VuexModule {
  public myFollow: IMyFollow = cloneDeep(myFollow);

  @Mutation
  public setMyFollow(payload: IMyFollow): void {
    this.myFollow = payload;
  }

  @Action
  public async getMyFollow(): Promise<void> {
    try {
      const { data } = await myFollowService.getMyFollow();
      this.context.commit('setMyFollow', data);
    } catch (e) {
      throw new Error(e);
    }
  }
}
