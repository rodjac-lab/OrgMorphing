/**
 * DeveloperCard Component
 *
 * Displays a developer card with:
 * - Vertical craft color bar (left)
 * - Avatar with initials
 * - Name and title
 * - Role badges (L, T, S - can be cumulative)
 * - Optional seniority badge (1-4)
 * - Optional tags (languages, skills, etc.)
 * - Hover effects and interactions
 */

import React, { useState, useMemo } from 'react';
import { getCraftColor } from '../../utils/colorMapping.js';
import {
  AVATAR_TOKENS,
  BADGE_TOKENS,
  CARD_DIMENSIONS,
  TITLE_TOKENS,
  ROLE_BADGE_TOKENS,
  SENIORITY_BADGE_TOKEN,
  CARD_SHADOW,
} from '../../utils/designTokens.js';

/**
 * @typedef {Object} DeveloperCardProps
 * @property {import('../../data/types.js').Developer} developer - Developer data from Lot 1
 * @property {boolean} [showSeniority=false] - Whether to show seniority badge
 * @property {string[]} [tags=[]] - Additional tags (languages, skills, etc.)
 * @property {string} [avatarUrl] - Optional avatar image URL
 * @property {() => void} [onClick] - Click handler
 */

/**
 * DeveloperCard component
 * @param {DeveloperCardProps} props
 */
function DeveloperCard({
  developer,
  showSeniority = false,
  tags = [],
  avatarUrl,
  onClick,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  const interactive = typeof onClick === 'function';
  const craftColor = getCraftColor(developer.craft);

  // Generate initials from first and last name
  const initials = useMemo(() => {
    const first = developer.firstName?.[0]?.toUpperCase() || '';
    const last = developer.lastName?.[0]?.toUpperCase() || '';
    return `${first}${last}`;
  }, [developer.firstName, developer.lastName]);

  // Full name
  const fullName = `${developer.firstName} ${developer.lastName}`;

  // Title (craft + manager status if applicable)
  const title = developer.isManager
    ? `Manager ${developer.craft}`
    : developer.craft;

  // Build array of role badges to display
  const roleBadges = [];
  if (developer.isLeadDev) roleBadges.push('L');
  if (developer.isTechLead) roleBadges.push('T');
  if (developer.isScrumMaster) roleBadges.push('S');

  // Event handlers
  const handleFocus = (event) => {
    if (event.currentTarget.matches(':focus-visible')) {
      setIsFocusVisible(true);
    }
  };

  const handleBlur = () => {
    setIsFocusVisible(false);
  };

  const handleKeyDown = (event) => {
    if (!interactive) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  };

  // Styles
  const baseCardStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: CARD_DIMENSIONS.gap,
    padding: CARD_DIMENSIONS.padding,
    paddingLeft: 'calc(var(--card-padding) + 6px)',
    borderRadius: CARD_DIMENSIONS.borderRadius,
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    boxShadow: isHovered || isFocusVisible ? 'var(--shadow-lg)' : 'var(--shadow-md)',
    transform: isHovered || isFocusVisible ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
    transition: 'transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast)',
    cursor: interactive ? 'pointer' : 'default',
    width: '240px',
    outline: 'none',
    willChange: interactive ? 'transform, box-shadow' : 'auto',
    borderColor: isHovered || isFocusVisible ? 'var(--craft-cloud)' : 'var(--color-border)',
  };

  const accentBarStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: isHovered || isFocusVisible ? '8px' : '6px',
    height: '100%',
    borderTopLeftRadius: CARD_DIMENSIONS.borderRadius,
    borderBottomLeftRadius: CARD_DIMENSIONS.borderRadius,
    background: craftColor,
    transition: 'width var(--transition-fast)',
  };

  const badgeContainerStyle = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    display: 'flex',
    gap: CARD_DIMENSIONS.tagGap,
    alignItems: 'center',
    zIndex: 2,
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: CARD_DIMENSIONS.gap,
  };

  const avatarWrapperStyle = {
    width: `${AVATAR_TOKENS.size}px`,
    height: `${AVATAR_TOKENS.size}px`,
    borderRadius: '50%',
    background: AVATAR_TOKENS.background,
    color: AVATAR_TOKENS.color,
    fontSize: '14px',
    fontWeight: AVATAR_TOKENS.fontWeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  };

  const infoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    minWidth: 0,
    flex: 1,
  };

  const nameStyle = {
    fontSize: TITLE_TOKENS.nameFontSize,
    fontWeight: 'var(--font-weight-semibold)',
    color: developer.isManager ? craftColor : 'var(--color-text-primary)',
    lineHeight: 1.25,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  };

  const titleStyle = {
    fontSize: TITLE_TOKENS.titleFontSize,
    fontWeight: TITLE_TOKENS.titleFontWeight,
    color: 'var(--color-text-secondary)',
    lineHeight: 1.2,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  };


  const roleBadgeStyle = (roleCode) => {
    const token = ROLE_BADGE_TOKENS[roleCode];
    return {
      background: token.background,
      color: token.color,
      borderRadius: BADGE_TOKENS.borderRadius,
      padding: `${BADGE_TOKENS.paddingBlock} ${BADGE_TOKENS.paddingInline}`,
      fontSize: BADGE_TOKENS.fontSize,
      fontWeight: BADGE_TOKENS.fontWeight,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      lineHeight: 1,
    };
  };

  const seniorityBadgeStyle = {
    background: SENIORITY_BADGE_TOKEN.background,
    color: SENIORITY_BADGE_TOKEN.color,
    borderRadius: BADGE_TOKENS.borderRadius,
    padding: `${BADGE_TOKENS.paddingBlock} ${BADGE_TOKENS.paddingInline}`,
    fontSize: BADGE_TOKENS.fontSize,
    fontWeight: BADGE_TOKENS.fontWeight,
    lineHeight: 1,
  };

  const tagsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: CARD_DIMENSIONS.tagGap,
  };

  const tagBadgeStyle = {
    background: 'rgba(226, 232, 240, 0.6)',
    color: 'var(--color-text-primary)',
    borderRadius: BADGE_TOKENS.borderRadius,
    padding: `${BADGE_TOKENS.paddingBlock} ${BADGE_TOKENS.paddingInline}`,
    fontSize: BADGE_TOKENS.fontSize,
    fontWeight: BADGE_TOKENS.fontWeight,
    lineHeight: 1,
  };

  const interactiveProps = interactive
    ? {
        role: 'button',
        tabIndex: 0,
        onClick,
        onKeyDown: handleKeyDown,
        'aria-label': `${fullName}, ${title}`,
      }
    : {
        role: 'group',
      };

  return (
    <div
      {...interactiveProps}
      style={baseCardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {/* Accent bar (craft color) */}
      <span aria-hidden="true" style={accentBarStyle} />

      {/* Role badges + Seniority (positioned in top-right corner) */}
      {(roleBadges.length > 0 || showSeniority) && (
        <div style={badgeContainerStyle}>
          {/* Role badges (L, T, S) */}
          {roleBadges.map((roleCode) => (
            <span
              key={roleCode}
              style={roleBadgeStyle(roleCode)}
              aria-label={`${ROLE_BADGE_TOKENS[roleCode].label} badge`}
              title={ROLE_BADGE_TOKENS[roleCode].label}
            >
              {roleCode}
            </span>
          ))}

          {/* Seniority badge */}
          {showSeniority && (
            <span
              style={seniorityBadgeStyle}
              aria-label={`Seniority level ${developer.seniority}`}
              title={`Seniority: ${developer.seniority}`}
            >
              {developer.seniority}
            </span>
          )}
        </div>
      )}

      {/* Header: Avatar + Name/Title */}
      <div style={headerStyle}>
        {/* Avatar */}
        <div style={avatarWrapperStyle}>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${fullName} avatar`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            initials
          )}
        </div>

        {/* Name and title */}
        <div style={infoStyle}>
          <span style={nameStyle}>{fullName}</span>
          <span style={titleStyle}>{title}</span>
        </div>
      </div>

      {/* Tags (languages, skills, etc.) */}
      {tags.length > 0 && (
        <div style={tagsContainerStyle}>
          {tags.map((tag) => (
            <span key={tag} style={tagBadgeStyle}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(DeveloperCard);
