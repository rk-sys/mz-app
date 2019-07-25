import {ModuleOptions} from 'vuex';
import store from '@/store/store';

export function registerStoreModule<T, S>(path: any, module: any, options?: ModuleOptions) {
  if (hasStoreModule(path) === false) {
    store.registerModule(path, module);
  }
}

export function hasStoreModule(path: any): boolean {

  return hasObjectPath(store.state, (typeof path === 'string') ? path : path.join('.'));
}

export function hasObjectPath(variable: any, path: any) {
  const keys: string[] = ((typeof path === 'string') ? path : path.join('/')).split('.');

  for (const key of keys) {
    if (variable && variable.hasOwnProperty(key)) {
      variable = variable[key];
      continue;
    }

    return false;
  }

  return true;
}

