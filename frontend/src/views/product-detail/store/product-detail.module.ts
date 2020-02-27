import { Module, Action, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import * as craftsmenDetailService              from './product-detail.service';
import { productDetail }                        from './product-detail.state';
import { IProductDetail }                       from '@/views/product-detail/store/product-detail.interface';

@Module({ namespaced: true, stateFactory: true })
export default class productDetailModule extends VuexModule {
  public mzProductDetail: IProductDetail = cloneDeep(productDetail);

  @Mutation
  public setMzProductDetail(payload: IProductDetail): void {
    this.mzProductDetail = payload;
  }

  @Action
  public async getProductDetail(payload: string): Promise<void> {
    try {
      const { data } = await craftsmenDetailService.getProductDetail(payload);
      this.context.commit('setMzProductDetail', data);
    } catch (e) {
      throw new Error(e);
    }
  }
}
