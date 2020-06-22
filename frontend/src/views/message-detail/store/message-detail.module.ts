import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import * as messageService                      from './message-detail.service';
import { messageDetail }                        from './message-detail.state';
import { IMessageDetail }                       from './message-detail.interface';
import { ICustomer }                            from '@/views/product-detail/store/product-detail.interface';

@Module({ namespaced: true, stateFactory: true })
export default class mzCraftsmenModule extends VuexModule {
  public mzMessageDetail: IMessageDetail = cloneDeep(messageDetail);

  public activeCustomer: ICustomer = {
    name: '',
    uuid: '',
    picture: '',
    newMessage: 0,
  };

  @Mutation
  public setActiveCustomer(payload: ICustomer): void {
    this.activeCustomer = payload;
  }

  @Mutation
  public setMzMessageDetail(payload: IMessageDetail): void {
    this.mzMessageDetail = payload;
  }

  @Action
  public async getMessageDetail(payload: string): Promise<void> {
    try {
      const { data }: { data: IMessageDetail } = await messageService.getMessageDetail();
      this.context.commit('setMzMessageDetail', data);
      if (data.customers) {
        this.context.commit('setActiveCustomer', data.customers[ 0 ]);
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
