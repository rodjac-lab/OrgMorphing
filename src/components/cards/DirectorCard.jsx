/**
 * DirectorCard Component
 *
 * Simplified card for the Engineering Director
 * - No role badges
 * - Distinctive styling
 */

import React, { useState } from 'react';
import {
  AVATAR_TOKENS,
  CARD_DIMENSIONS,
  TITLE_TOKENS,
  CARD_SHADOW,
} from '../../utils/designTokens.js';

/**
 * @typedef {Object} DirectorCardProps
 * @property {import('../../data/types.js').Director} director - Director data
 * @property {string} [avatarUrl] - Optional avatar image URL
 * @property {() => void} [onClick] - Click handler
 */

/**
 * DirectorCard component
 * @param {DirectorCardProps} props
 */
function DirectorCard({ director, avatarUrl, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  const interactive = typeof onClick === 'function';
  const fullName = `${director.firstName} ${director.lastName}`;

  // Generate initials
  const initials = `${director.firstName?.[0]?.toUpperCase() || ''}${
    director.lastName?.[0]?.toUpperCase() || ''
  }`;

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
    boxShadow: isHovered || isFocusVisible ? CARD_SHADOW.hover : CARD_SHADOW.default,
    transform: isHovered || isFocusVisible ? 'translateY(-2px)' : 'translateY(0)',
    transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
    cursor: interactive ? 'pointer' : 'default',
    width: '240px',
    outline: 'none',
  };

  const accentBarStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '6px',
    height: '100%',
    borderTopLeftRadius: CARD_DIMENSIONS.borderRadius,
    borderBottomLeftRadius: CARD_DIMENSIONS.borderRadius,
    background: 'linear-gradient(135deg, var(--craft-cloud), var(--craft-infra))',
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
    color: 'var(--color-text-primary)',
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

  const interactiveProps = interactive
    ? {
        role: 'button',
        tabIndex: 0,
        onClick,
        onKeyDown: handleKeyDown,
        'aria-label': `${fullName}, ${director.title}`,
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
      {/* Accent bar (gradient for director) */}
      <span aria-hidden="true" style={accentBarStyle} />

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
          <span style={titleStyle}>{director.title}</span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(DirectorCard);
