<template>
  <div class="mz-user-portfolio">
    <div class="mz-user-portfolio__top-bar">
      <div class="mz-user-portfolio__summary">
        {{ $t(`amount`) }}

        <span class="mz-user-portfolio__summary--success">
        {{ items.length }} / {{ portfolioLimit }}
        </span>
      </div>

      <mz-button @click="dialogVisible = true"
                 class="mz-user-portfolio__button">

        {{ $t(`addPortfolio`) }}
      </mz-button>
    </div>

    <div class="mz-user-portfolio__items-wrapper">
      <mz-portfolio-item v-for="(item, index) in items"
                         :item="item"
                         :key="index" />
    </div>

    <mz-portfolio-modal :dialogVisible="dialogVisible" />

    <mz-dialog class="mz-user-portfolio__remove-item"
               :title="$t(`modal.title`)"
               :visible.sync="removeModalItemPortfolio">

      <p class="mz-user-portfolio__remove-item__title">
        {{ $t(`modal.description`) }}
      </p>

      <p class="mz-user-portfolio__remove-item__description">
        "{{ mzRemovedItemFromPortfolio.title }}"
      </p>

      <div class="mz-user-portfolio__remove-item__btn-content">
        <mz-button buttonStyle="info"
                   class="mz-user-portfolio__remove-item__btn-content__btn"
                   @click="removeModalItemPortfolio = false">

          {{ $t(`modal.buttonCancel`) }}
        </mz-button>

        <mz-button buttonStyle="danger"
                   class="mz-user-portfolio__remove-item__btn-content__btn">

          {{ $t(`modal.buttonRemove`) }}
        </mz-button>
      </div>
    </mz-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue }        from 'vue-property-decorator';
import { namespace }             from 'vuex-class';
import { loadTranslationsAsync } from '@/i18n/i18n';
import Store                     from '@/store/store';
import { Route }                 from 'vue-router';
import { IItemPortfolio }        from '@/views/user-account/store/user-account.interface';
import mzPortfolioItem           from './components/portfolio-item.component.vue';
import mzUserAccountModule       from '@/views/user-account/store/user-account.module';
import mzButton                  from '@/components/buttons/button.component.vue';
import mzPortfolioModal          from '@/views/user-account/user-portfolio/components/portfolio-modal.component.vue';
import mzDialog                  from '@/components/dialog/dialog.component.vue';

const LOCAL_STORE: string = 'userAccount';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzButton,
    mzPortfolioItem,
    mzPortfolioModal,
    mzDialog,
  },
})
export default class mzUserPortfolio extends Vue {
  @local.State((state: mzUserAccountModule) => state.mzItemsPortfolio) public items!: IItemPortfolio[];
  @local.State((state: mzUserAccountModule) => state.dialogVisible) public isDialogVisible!: boolean;
  @local.State((state: mzUserAccountModule) => state.mzRemoveModalItemPortfolio) public mzRemoveModalItemPortfolio!: boolean;
  @local.State((state: mzUserAccountModule) => state.mzRemovedItemFromPortfolio) public mzRemovedItemFromPortfolio!: IItemPortfolio;
  @local.Mutation public setMzRemoveModalItemPortfolio!: (payload: boolean) => void;
  @local.Mutation public setDialogVisible!: (status: boolean) => void;

  public portfolioLimit: number = 10;

  set removeModalItemPortfolio(status: boolean) {
    this.setMzRemoveModalItemPortfolio(status);
  }

  get removeModalItemPortfolio(): boolean {
    return this.mzRemoveModalItemPortfolio;
  }

  set dialogVisible(status: boolean) {
    this.setDialogVisible(status);
  }

  get dialogVisible(): boolean {
    return this.isDialogVisible;
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      await Store.dispatch(`${LOCAL_STORE}/getUserItemsPortfolio`);
      next();
    } catch (e) {
      next(false);
      throw new Error(e);
    }
  }
}
</script>

<style lang="scss"
       scoped>

.mz-user-portfolio {
  margin-left: 10rem;
  margin-bottom: 5rem;
  width: 85rem;

  &__top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  &__summary {
    &--success {
      font-weight: var(--font-bold);
      color: var(--primary-color);
    }
  }

  &__button {
    width: 20rem;

    &:hover {
      color: var(--white);
    }
  }

  &__items-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  }

  &__remove-item {

    &__title {
      font-size: 2rem;
      margin: 2rem 0 1rem;
    }

    &__description {
      font-size: 2.4rem;
      font-weight: var(--font-bold);
      margin: 0 0 2rem;
    }

    &__btn-content {
      display: flex;
      justify-content: flex-end;

      &__btn {
        width: 20rem;
        margin-left: 2rem;
        margin-right: 0;
        display: block;
      }
    }
  }
}


@media only screen and (max-width: 768px) and (min-width: 426px) {
  .mz-user-portfolio {
    margin-left: 0;

    &__items-wrapper {
      grid-template-columns: repeat(2, 1fr);
    }

    &__summary {
      font-size: 2.4rem;

      &--success {
        font-size: 2.4rem;
      }
    }

    &__button {
      width: auto;
    }
  }
}

@media only screen and (max-width: 425px) {
  .mz-user-portfolio {
    margin-left: 0;
    width: 45rem;

    &__items-wrapper {
      grid-template-columns: repeat(1, 1fr);
    }

    &__summary {
      font-size: 2.4rem;

      &--success {
        font-size: 2.4rem;
      }
    }

    &__button {
      width: auto;
    }
  }
}
</style>
