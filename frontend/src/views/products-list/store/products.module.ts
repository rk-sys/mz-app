import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import * as productsService                     from './products.service';
import { mzProducts }                           from '@/views/products-list/store/products.state';
import { IProduct, IProductsList }              from '@/views/products-list/store/products.interface';

@Module({ namespaced: true, stateFactory: true })
export default class mzProductsModule extends VuexModule {
  public mzProductsState: IProductsList = cloneDeep(mzProducts);

  @Mutation
  public setProductList(payload: IProduct[]): void {
    this.mzProductsState.productList = payload;
  }

  @Mutation
  public setProductsSortOption(value: string): void {
    this.mzProductsState.defaultProductsSortOption = value;
  }

  @Mutation
  public setTargetGroupSelectAll(): void {
    this.mzProductsState.filters.targetGroup.forEach((element: any) => {
      element.isSelected = true;
    });
  }

  @Mutation
  public removeTagFromFilters(index: number): void {
    this.mzProductsState.filters.tags.splice(index, 1);
  }

  @Mutation
  public addTagToFilters(tag: string): void {
    this.mzProductsState.filters.tags.push(tag);
  }

  @Action
  public checkTargetGroupSelected(): void {
    if (!this.mzProductsState.filters.targetGroup[ 0 ].isSelected
      && !this.mzProductsState.filters.targetGroup[ 1 ].isSelected
      && !this.mzProductsState.filters.targetGroup[ 2 ].isSelected) {
      this.context.commit('setTargetGroupSelectAll');
    }
  }

  @Action
  public changeProductsSortOption(value: string): void {
    this.context.commit('setProductsSortOption', value);
  }

  @Action
  public async getProductList(): Promise<void> {
    try {
      const { data } = await productsService.getProducts();
      this.context.commit('setProductList', data);
    } catch (e) {
      throw new Error(e);
    }
  }
}
