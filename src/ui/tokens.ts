export type CardVariant = 'developer' | 'manager' | 'director';

export type LevelCode = 'L' | 'T' | 'S';

export interface CardVariantToken {
  accent: string;
  surface: string;
  text: string;
  mutedText: string;
  shadow: string;
  shadowHover: string;
}

export interface LevelBadgeToken {
  label: string;
  background: string;
  color: string;
}

export const CARD_VARIANT_TOKENS: Record<CardVariant, CardVariantToken> = {
  developer: {
    accent: 'var(--craft-cloud)',
    surface: 'var(--color-surface)',
    text: 'var(--color-text-primary)',
    mutedText: 'var(--color-text-secondary)',
    shadow: 'var(--card-shadow)',
    shadowHover: 'var(--card-shadow-hover)',
  },
  manager: {
    accent: 'var(--craft-mobile)',
    surface: 'var(--color-surface)',
    text: 'var(--color-text-primary)',
    mutedText: 'var(--color-text-secondary)',
    shadow: 'var(--card-shadow)',
    shadowHover: 'var(--card-shadow-hover)',
  },
  director: {
    accent: 'var(--craft-embedded)',
    surface: 'var(--color-surface)',
    text: 'var(--color-text-primary)',
    mutedText: 'var(--color-text-secondary)',
    shadow: 'var(--card-shadow)',
    shadowHover: 'var(--card-shadow-hover)',
  },
};

export const LEVEL_BADGE_TOKENS: Record<LevelCode, LevelBadgeToken> = {
  L: {
    label: 'Lead',
    background: 'rgba(59, 130, 246, 0.16)',
    color: '#1d4ed8',
  },
  T: {
    label: 'Tech Lead',
    background: 'rgba(139, 92, 246, 0.16)',
    color: '#6d28d9',
  },
  S: {
    label: 'Staff',
    background: 'rgba(16, 185, 129, 0.16)',
    color: '#047857',
  },
};

export const CARD_DIMENSIONS = {
  borderRadius: 'var(--card-border-radius)',
  padding: 'var(--card-padding)',
  gap: 'var(--spacing-sm)',
  tagGap: 'var(--spacing-xs)',
};

export const AVATAR_TOKENS = {
  size: 40,
  background: 'rgba(148, 163, 184, 0.18)',
  color: '#475569',
  fontWeight: 'var(--font-weight-semibold)',
};

export const BADGE_TOKENS = {
  borderRadius: '999px',
  fontSize: '11px',
  fontWeight: 'var(--font-weight-medium)',
  paddingInline: '8px',
  paddingBlock: '3px',
};

export const TITLE_TOKENS = {
  nameFontSize: 'var(--font-size-base)',
  titleFontSize: 'var(--font-size-sm)',
  titleFontWeight: 'var(--font-weight-medium)',
};
