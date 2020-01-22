import { Module, Action, Mutation, VuexModule }  from 'vuex-module-decorators';
import cloneDeep                                 from 'lodash/cloneDeep';
import { craftsmenDetail, craftsmenMenuLinks }   from './craftsmen-detail.state';
import { ICraftsmenDetail, ICraftsmenMenuLinks } from './craftsmen-detail.interface';
import * as craftsmenDetailService               from './craftsmen-detail.service';

@Module({ namespaced: true, stateFactory: true })
export default class craftsmenDetailModule extends VuexModule {
  public mzCraftsmenDetailState: ICraftsmenDetail = cloneDeep(craftsmenDetail);
  public mzCraftsMenMenuLinks: ICraftsmenMenuLinks[] = cloneDeep(craftsmenMenuLinks);

  public visibleModal: boolean = false;
  public activeItemIndex: number = 0;

  @Mutation
  public setVisibleModal(payload: boolean): void {
    this.visibleModal = payload;
  }

  @Mutation
  public setActiveItemIndex(payload: number): void {
    this.activeItemIndex = payload;
  }

  @Mutation
  public setCraftsmenDetail(payload: ICraftsmenDetail): void {
    this.mzCraftsmenDetailState = payload;
  }

  @Mutation
  public previewPortfolio(): void {
    if (this.activeItemIndex === 0) {
      this.activeItemIndex = this.mzCraftsmenDetailState.craftsmenPortfolio.length - 1;
    } else {
      this.activeItemIndex -= 1;
    }
  }

  @Mutation
  public nextPortfolio(): void {
    if (this.activeItemIndex === this.mzCraftsmenDetailState.craftsmenPortfolio.length - 1) {
      this.activeItemIndex = 0;
    } else {
      this.activeItemIndex += 1;
    }
  }

  @Action
  public openModal(payload: number): void {
    this.context.commit('setActiveItemIndex', payload);
    this.context.commit('setVisibleModal', true);
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
