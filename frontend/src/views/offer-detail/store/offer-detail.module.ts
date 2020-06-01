import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import { ICustomer, IOffer }                    from '@/views/offer-detail/store/offer-detail.interface';
import { mzOffer }                              from './offer-detail.state';
import * as offerDetailService                  from './offer-detail.service';

@Module({ namespaced: true, stateFactory: true })
export default class offerDetailModule extends VuexModule {
  public mzOffer: IOffer = cloneDeep(mzOffer);
  public activeCustomer: ICustomer = {
    name: '',
    picture: '',
    newMessages: 0,
    uuid: '',
    orderStatus: {
      status: 'notPropose',
      price: {
        value: 0,
        status: 'empty',
      },
      date: {
        value: '',
        status: 'empty',
      },
      progress: {
        value: '',
        accept: false,
      },
    },
  };

  @Mutation
  public setOffer(payload: IOffer): void {
    this.mzOffer = payload;
  }

  @Mutation
  public setActiveCustomer(payload: ICustomer): void {
    this.activeCustomer = payload;
  }

  @Mutation
  public setFirstActiveCustomer(payload: ICustomer): void {
    this.activeCustomer = payload;
  }

  @Action
  public async getOffer(payload: string): Promise<void> {
    try {
      const { data } = await offerDetailService.getOfferDetail(payload);
      this.context.commit('setOffer', data);
      if (data.customers.length) {
        this.context.commit('setActiveCustomer', data.customers[ 0 ]);
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}