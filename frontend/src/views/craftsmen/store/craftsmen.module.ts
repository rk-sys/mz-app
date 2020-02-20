import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import * as craftsmenService                    from './craftsmen.service';
import { ICraftsmen, ICraftsmenList }           from '@/views/craftsmen/store/craftsmen.interface';
import { mzCraftsmen }                          from '@/views/craftsmen/store/craftsmen.state';

@Module({ namespaced: true, stateFactory: true })
export default class mzCraftsmenModule extends VuexModule {
  public mzCraftsmenState: ICraftsmenList = cloneDeep(mzCraftsmen);

  @Mutation
  public setCraftsmenList(payload: ICraftsmen[]): void {
    this.mzCraftsmenState.craftsmenList = payload;
  }

  @Mutation
  public setCraftsmenSortOption(value: string): void {
    this.mzCraftsmenState.defaultCraftsmenSortOption = value;
  }

  @Mutation
  public setTargetGroupSelectAll(): void {
    this.mzCraftsmenState.filters.targetGroup.forEach((element) => {
      element.isSelected = true;
    });
  }

  @Mutation
  public addTagToFilters(tag: string): void {
    this.mzCraftsmenState.filters.tags.push(tag);
  }

  @Mutation
  public removeTagFromFilters(index: number): void {
    this.mzCraftsmenState.filters.tags.splice(index, 1);
  }

  @Action
  public changeCraftsmenSortOption(value: string): void {
    this.context.commit('setCraftsmenSortOption', value);
  }

  @Action
  public checkTargetGroupSelected(): void {
    if (!this.mzCraftsmenState.filters.targetGroup[ 0 ].isSelected
      && !this.mzCraftsmenState.filters.targetGroup[ 1 ].isSelected
      && !this.mzCraftsmenState.filters.targetGroup[ 2 ].isSelected) {
      this.context.commit('setTargetGroupSelectAll');
    }
  }

  @Action
  public async getCraftsmenList(): Promise<void> {
    try {
      const { data } = await craftsmenService.getCraftsmen();
      this.context.commit('setCraftsmenList', data);
    } catch (e) {
      throw new Error(e);
    }
  }
}
