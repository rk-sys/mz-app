import { Module, Action, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import { craftsmenDetail }                      from './craftsmen-detail.state';
import { ICraftsmenDetail }                     from './craftsmen-detail.interface';
import * as craftsmenDetailService              from './craftsmen-detail.service';

@Module({ namespaced: true, stateFactory: true })
export default class mzCraftsmenDetailModule extends VuexModule {
  public mzCraftsmenDetailState: ICraftsmenDetail = cloneDeep(craftsmenDetail);

  @Mutation
  public setCraftsmenDetail(payload: ICraftsmenDetail) {
    this.mzCraftsmenDetailState = payload;
  }

  @Action
  public async getCraftsmenDetail(payload: string): Promise<void> {
    try {
      const request = await craftsmenDetailService.getCraftsmenDetail(payload);
      this.context.commit('setCraftsmenDetail', request.data);
    } catch (e) {
      throw new Error(e);
    }
  }

}
