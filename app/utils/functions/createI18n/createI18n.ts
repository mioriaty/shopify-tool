import { isBrowser } from 'app/utils/isBrowser';
import * as R from 'ramda';
import { I18n, TransitionDefault } from './types';

const createI18n = <T extends TransitionDefault>(source: T): I18n<T[keyof T]> => {
  let _locale = isBrowser ? localStorage.getItem('__LOCALE__') || navigator.language || 'en' : 'en';
  isBrowser && localStorage.setItem('__LOCALE__', _locale);
  const _setLocale = (locale: string) => {
    isBrowser && localStorage.setItem('__LOCALE__', locale);
    _locale = isBrowser ? (localStorage.getItem('__LOCALE__') as string) : 'en';
  };
  const translation: I18n<T[keyof T]>['t'] = (key, options) => {
    const _lang = source[_locale.replace(/(-|_).*/g, '')] || source['en'];
    const _options = options as Record<string, string>;
    if (!_lang) {
      return '';
    }
    const value = key.includes('.') ? R.path(key.split('.'), _lang) : _lang[key as string];
    if (!_options) {
      return value;
    }
    return Object.entries(_options).reduce((acc, [prop, value]) => {
      const regex = new RegExp(`\\{\\{\\s*${prop}\\s*\\}\\}`, 'g');

      return acc.replace(regex, value);
    }, value);
  };

  return {
    setLocale: _setLocale,
    t: translation,
  };
};

export default createI18n;
