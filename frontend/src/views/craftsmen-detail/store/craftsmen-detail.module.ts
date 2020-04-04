import { Module, Action, Mutation, VuexModule }            from 'vuex-module-decorators';
import cloneDeep                                           from 'lodash/cloneDeep';
import { craftsmenDetail, craftsmenMenuLinks }             from './craftsmen-detail.state';
import { IComment, ICraftsmenDetail, ICraftsmenMenuLinks } from './craftsmen-detail.interface';
import * as craftsmenDetailService                         from './craftsmen-detail.service';
import { IProduct }                                        from '@/views/products-list/store/products.interface';

@Module({ namespaced: true, stateFactory: true })
export default class craftsmenDetailModule extends VuexModule {
  public mzCraftsmenDetailState: ICraftsmenDetail = cloneDeep(craftsmenDetail);
  public mzCraftsmenMenuLinks: ICraftsmenMenuLinks[] = cloneDeep(craftsmenMenuLinks);

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

  @Mutation
  public setCraftsmenCommentsAndRate(payload: IComment[]): void {
    this.mzCraftsmenDetailState.craftsmenComments = payload;
  }

  @Mutation
  public setCraftsmenProducts(payload: IProduct[]): void {
    this.mzCraftsmenDetailState.craftsmenProducts = payload;
  }

  @Action
  public openModal(payload: number): void {
    this.context.commit('setActiveItemIndex', payload);
    this.context.commit('setVisibleModal', true);
  }

  @Action
  public async getCraftsmenDetail(payload: string): Promise<void> {
    try {
      const response = await craftsmenDetailService.getCraftsmenDetail(payload);
      this.context.commit('setCraftsmenDetail', response.data);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Action
  public async getCraftsmenCommentsAndRate(payload: string): Promise<void> {
    try {
      const response = await craftsmenDetailService.getCraftsmenCommentsAndRating(payload);
      this.context.commit('setCraftsmenCommentsAndRate', response.data);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Action
  public async getCraftsmenProducts(payload: string): Promise<void> {
    try {
      const { data }: { data: IProduct[] } = await craftsmenDetailService.getCraftsmenProducts(payload);
      this.context.commit('setCraftsmenProducts', data);
    } catch (e) {
      throw new Error(e);
    }
  }
}
