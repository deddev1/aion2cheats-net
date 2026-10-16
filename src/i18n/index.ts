export type { Translations } from './types';
export type { DeepPartialTranslations } from './partial';
export { mergeTranslations } from './partial';
export {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_META,
  NON_DEFAULT_LOCALES,
  isLocale,
  localeFromPathname,
  localizePath,
  resolveLocale,
  stripLocalePrefix,
  type Locale,
} from './locales';

import { en } from './en';
import { mergeTranslations, type DeepPartialTranslations } from './partial';
import { DEFAULT_LOCALE, resolveLocale, type Locale } from './locales';
import type { Translations } from './types';

import { ko } from './locales/ko';
import { zhTw } from './locales/zh-tw';
import { de } from './locales/de';
import { ptBr } from './locales/pt-br';
import { th } from './locales/th';
import { ja } from './locales/ja';
import { es } from './locales/es';
import { fr } from './locales/fr';

const OVERRIDES: Partial<Record<Locale, DeepPartialTranslations>> = {
  ko,
  'zh-tw': zhTw,
  de,
  'pt-br': ptBr,
  th,
  ja,
  es,
  fr,
};

/** @deprecated Prefer getTranslations(locale) on localized pages. */
export const t: Translations = en;

const cache = new Map<Locale, Translations>();

export function getTranslations(locale: string | undefined | null): Translations {
  const code = resolveLocale(locale);
  const hit = cache.get(code);
  if (hit) return hit;
  const merged =
    code === DEFAULT_LOCALE ? en : mergeTranslations(en, OVERRIDES[code]);
  cache.set(code, merged);
  return merged;
}

export function avatarSrc(style: string, seed: string) {
  return `https://api.dicebear.com/9.x/${style}/png?seed=${seed}&size=28&backgroundColor=0a0d10,7f3dee,181f26,e9a82f,11161b`;
}
