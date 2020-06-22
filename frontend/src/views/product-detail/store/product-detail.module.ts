import { Module, Action, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import * as craftsmenDetailService              from './product-detail.service';
import { productDetail }                        from './product-detail.state';
import { ICustomer, IProductDetail }            from './product-detail.interface';
import { IMessage }                             from '@/views/offer-detail/store/offer-detail.interface';

@Module({ namespaced: true, stateFactory: true })
export default class productDetailModule extends VuexModule {
  public mzProductDetail: IProductDetail = cloneDeep(productDetail);
  public message: IMessage[] = [];
  public activeCustomer: ICustomer = {
    name: '',
    uuid: '',
    newMessage: 0,
    picture: '',
  };

  @Mutation
  public setActiveCustomer(payload: ICustomer): void {
    this.activeCustomer = payload;
  }

  @Mutation
  public setMessage(payload: IMessage[]): void {
    this.message = payload;
  }

  @Mutation
  public setMzProductDetail(payload: IProductDetail): void {
    this.mzProductDetail = payload;
  }

  @Action
  public async getProductDetail(payload: string): Promise<void> {
    try {
      const { data } = await craftsmenDetailService.getProductDetail(payload);
      this.context.commit('setMzProductDetail', data);
      if (data.customers) {
        this.context.commit('setActiveCustomer', data.customers[ 0 ]);
      }
      this.context.commit('setMessage', data.messages);
    } catch (e) {
      throw new Error(e);
    }
  }
}
