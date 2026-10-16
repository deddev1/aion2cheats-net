/** Locales for multilingual SEO. Priority markets get strongest copy. */

export const DEFAULT_LOCALE = 'en' as const;

export const LOCALES = [
  'en',
  'ko',
  'zh-tw',
  'de',
  'pt-br',
  'th',
  'ja',
  'es',
  'fr',
] as const;

export type Locale = (typeof LOCALES)[number];

export type LocaleMeta = {
  code: Locale;
  /** BCP 47 / hreflang */
  hreflang: string;
  /** Open Graph locale */
  ogLocale: string;
  /** Native label in language switcher */
  nativeName: string;
  /** English label */
  englishName: string;
  /** Priority ranking markets — stronger translation + SEO focus */
  priority: boolean;
  /** html lang attribute */
  htmlLang: string;
};

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: {
    code: 'en',
    hreflang: 'en',
    ogLocale: 'en_US',
    nativeName: 'English',
    englishName: 'United States',
    priority: true,
    htmlLang: 'en',
  },
  ko: {
    code: 'ko',
    hreflang: 'ko',
    ogLocale: 'ko_KR',
    nativeName: '한국어',
    englishName: 'South Korea',
    priority: true,
    htmlLang: 'ko',
  },
  'zh-tw': {
    code: 'zh-tw',
    hreflang: 'zh-TW',
    ogLocale: 'zh_TW',
    nativeName: '繁體中文',
    englishName: 'Taiwan',
    priority: true,
    htmlLang: 'zh-Hant-TW',
  },
  de: {
    code: 'de',
    hreflang: 'de',
    ogLocale: 'de_DE',
    nativeName: 'Deutsch',
    englishName: 'Germany',
    priority: true,
    htmlLang: 'de',
  },
  'pt-br': {
    code: 'pt-br',
    hreflang: 'pt-BR',
    ogLocale: 'pt_BR',
    nativeName: 'Português',
    englishName: 'Brazil',
    priority: true,
    htmlLang: 'pt-BR',
  },
  th: {
    code: 'th',
    hreflang: 'th',
    ogLocale: 'th_TH',
    nativeName: 'ไทย',
    englishName: 'Thailand',
    priority: true,
    htmlLang: 'th',
  },
  ja: {
    code: 'ja',
    hreflang: 'ja',
    ogLocale: 'ja_JP',
    nativeName: '日本語',
    englishName: 'Japan',
    priority: false,
    htmlLang: 'ja',
  },
  es: {
    code: 'es',
    hreflang: 'es',
    ogLocale: 'es_ES',
    nativeName: 'Español',
    englishName: 'Spain',
    priority: false,
    htmlLang: 'es',
  },
  fr: {
    code: 'fr',
    hreflang: 'fr',
    ogLocale: 'fr_FR',
    nativeName: 'Français',
    englishName: 'France',
    priority: false,
    htmlLang: 'fr',
  },
};

export const NON_DEFAULT_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function resolveLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Strip a leading /{locale} prefix if present. */
export function stripLocalePrefix(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  for (const locale of NON_DEFAULT_LOCALES) {
    if (path === `/${locale}` || path === `/${locale}/`) return '/';
    if (path.startsWith(`/${locale}/`)) {
      const rest = path.slice(locale.length + 1);
      return rest.startsWith('/') ? rest : `/${rest}`;
    }
  }
  return path;
}

/** Prefix path with locale (English stays unprefixed). */
export function localizePath(locale: Locale, path: string): string {
  if (!path || path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('#')) {
    return path;
  }
  const hashIndex = path.indexOf('#');
  const raw = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : '';
  let bare = stripLocalePrefix(raw);
  if (!bare.startsWith('/')) bare = `/${bare}`;
  if (bare !== '/' && !bare.endsWith('/')) bare = `${bare}/`;

  if (locale === DEFAULT_LOCALE) return `${bare}${hash}`;
  if (bare === '/') return `/${locale}/${hash}`;
  return `/${locale}${bare}${hash}`;
}

/** Locale from a pathname (/ko/blog/ → ko). */
export function localeFromPathname(pathname: string): Locale {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const segment = path.split('/').filter(Boolean)[0];
  return resolveLocale(segment && isLocale(segment) ? segment : DEFAULT_LOCALE);
}
