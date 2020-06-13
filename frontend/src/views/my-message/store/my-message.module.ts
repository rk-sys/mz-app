import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import * as myMessagesService                   from './my-message.service';
import { IMyMessage }                           from '@/views/my-message/store/my-message.interface';
import { myMessages }                           from '@/views/my-message/store/my-message.state';

@Module({ namespaced: true, stateFactory: true })
export default class mzMyMessages extends VuexModule {
  public myMessages: IMyMessage[] = cloneDeep(myMessages);

  @Mutation
  public setMyMessages(payload: IMyMessage[]) {
    this.myMessages = payload;
  }

  @Action
  public async getMyMessages(): Promise<void> {
    try {
      const { data } = await myMessagesService.getMyMessages();
      this.context.commit('setMyMessages', data);
    } catch (e) {
      throw new Error(e);
    }
  }
}
