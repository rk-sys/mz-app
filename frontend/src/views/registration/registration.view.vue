<template>
  <div class="mz-registration-view">
    <mz-logo :is-green="true" class="mz-registration-view__logo" />

    <div class="mz-registration-view__box">
      <h2 class="title">{{$t(`titlePage`)}}</h2>

      <mz-icons-box :icons="registrationStateIcon"
                    class="mz-registration-view__box__icons" />

      <mz-registration-form />

    </div>

    <mz-footer :is-light="false"
               class="mz-registration-view__footer"></mz-footer>

    <mz-social-media class="mz-registration-view__social-media" />
  </div>
</template>

<script lang="ts">
import { Component, Vue }        from 'vue-property-decorator';
import { registerStoreModule }   from '@/helpers/helpers';
import { namespace }             from 'vuex-class';
import { IIcon }                 from '@/views/registration/registration.interface';
import { Route }                 from 'vue-router';
import Store                     from '@/store/store';
import mzRegistrationModule      from '@/views/registration/store/registration.module';
import mzFooter                  from '@/components/footer/footer.component.vue';
import mzIconsBox                from '@/components/icons-box/icons-box.component.vue';
import mzSocialMedia             from '@/components/social-media/social-media.component.vue';
import mzLogo                    from '@/components/logo/logo.component.vue';
import mzRegistrationForm        from './components/registration.form.component.vue';
import { loadTranslationsAsync } from '@/i18n/i18n';

const LOCAL_STORE = 'registration';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzIconsBox,
    mzFooter,
    mzLogo,
    mzSocialMedia,
    mzRegistrationForm,
  },
})
export default class mzRegistration extends Vue {
  @local.State((state: mzRegistrationModule) => state.mzRegistrationState.icons) public registrationStateIcon!: IIcon;

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzRegistrationModule);
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

.mz-registration-view {
  min-height: 100vh;
  background: var(--background-color);
  height: 100%;
  display: grid;
  grid-template-rows: 10rem auto 8rem 5rem;
  grid-template-columns: auto;

  &__logo {
    width: 15rem;
    height: 5rem;
    grid-row-start: 1;
    grid-column-start: 1;
    align-self: end;
    justify-self: center;
  }

  &__box {
    background: var(--white);
    width: 50rem;
    height: auto;
    -webkit-border-radius: .2rem;
    -moz-border-radius: .2rem;
    border-radius: .2rem;
    box-shadow: 0 0 1rem 0 var(--gray-450);
    padding: 1rem 4rem;
    display: flex;
    flex-direction: column;
    grid-row-start: 2;
    grid-column-start: 1;
    place-self: center;
    align-self: center;
    z-index: 10;

    .title {
      text-align: center;
      font-weight: 300;
      user-select: none;
      margin-bottom: 1rem;
    }

    &__icons {
      filter: brightness(.2);
    }
  }

  &__footer {
    grid-row-start: 4;
    grid-column-start: 1;
    align-self: center;
    place-self: center;
  }

  &__social-media {
    grid-row-start: 3;
    grid-column-start: 1;
    place-self: center;
  }
}

@include respond-to(tablet) {

  .mz-registration-view__box {
    max-width: 40rem;
    padding: 1rem 2rem;
  }

  .mz-registration-view {
    grid-template-columns: 100%;
    height: auto;
  }

  .title {
    margin: 1rem 0 3rem;
    font-size: 2.8rem;
  }
}

@include respond-to(mobile) {

  .mz-registration-view__box {
    width: 30rem;
  }
}
</style>
