import Vue     from 'vue';
import VueI18n from 'vue-i18n';
import axios   from 'axios';
import Store   from '@/store/store';
import pl      from './pl';

Vue.use(VueI18n);

export const languages = {
  pl,
};

export const i18n: VueI18n = new VueI18n({
  locale: Store.state.global.defaultLang || 'pl',
  fallbackLocale: Store.state.global.defaultLang || 'pl',
  messages: languages,
});

export function setI18nLanguage(lang: string) {
  i18n.locale = lang;
  axios.defaults.headers.common[ 'Accept-Language' ] = lang;

  (document
    .querySelector('html') as HTMLElement)
    .setAttribute('lang', lang);

  return lang;
}

export async function loadTranslationsAsync(lang: string, promise: Promise<any>) {
  try {
    const messages = await promise;
    i18n.mergeLocaleMessage(lang, messages.default);
    setI18nLanguage(lang);
  } catch (e) {
    throw new Error(e);
  }
}
