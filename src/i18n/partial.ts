import type { Translations } from './types';

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (infer U)[]
    ? U[]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

export type DeepPartialTranslations = DeepPartial<Translations>;

/** Deep-merge locale overrides onto English (arrays replace, objects merge). */
export function mergeTranslations(
  base: Translations,
  override: DeepPartialTranslations | undefined,
): Translations {
  if (!override) return base;
  return mergeDeep(base, override) as Translations;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mergeDeep(base: unknown, override: unknown): unknown {
  if (override === undefined) return base;
  if (Array.isArray(override)) return override;
  if (!isPlainObject(base) || !isPlainObject(override)) return override;
  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue;
    out[key] = key in base ? mergeDeep(base[key], value) : value;
  }
  return out;
}
