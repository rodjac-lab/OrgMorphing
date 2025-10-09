/**
 * Design tokens for the Organization Morphing Tool
 * Converted from TypeScript to JavaScript with JSDoc
 */

/**
 * @typedef {'L'|'T'|'S'} RoleCode
 * L = Lead Dev, T = Tech Lead, S = Scrum Master
 */

/**
 * @typedef {Object} RoleBadgeToken
 * @property {string} label - Full role name
 * @property {string} background - Background color
 * @property {string} color - Text color
 */

export const ROLE_BADGE_TOKENS = {
  L: {
    label: 'Lead Dev',
    background: 'rgba(59, 130, 246, 0.16)',
    color: '#1d4ed8',
  },
  T: {
    label: 'Tech Lead',
    background: 'rgba(139, 92, 246, 0.16)',
    color: '#6d28d9',
  },
  S: {
    label: 'Scrum Master',
    background: 'rgba(16, 185, 129, 0.16)',
    color: '#047857',
  },
};

export const SENIORITY_BADGE_TOKEN = {
  label: 'Seniority',
  background: 'rgba(251, 146, 60, 0.16)',
  color: '#c2410c',
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

export const CARD_SHADOW = {
  default: 'var(--card-shadow)',
  hover: 'var(--card-shadow-hover)',
};
