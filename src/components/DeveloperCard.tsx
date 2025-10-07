import React, {
  FocusEvent,
  KeyboardEvent,
  useMemo,
  useState,
  type CSSProperties,
} from 'react';
import {
  AVATAR_TOKENS,
  BADGE_TOKENS,
  CARD_DIMENSIONS,
  CARD_VARIANT_TOKENS,
  LEVEL_BADGE_TOKENS,
  TITLE_TOKENS,
  type CardVariant,
  type LevelCode,
} from '../ui/tokens';

export interface DeveloperCardProps {
  name: string;
  title: string;
  level: LevelCode;
  tags?: string[];
  avatarUrl?: string;
  variant?: CardVariant;
  onClick?: () => void;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  name,
  title,
  level,
  tags = [],
  avatarUrl,
  variant = 'developer',
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  const interactive = typeof onClick === 'function';
  const variantTokens = CARD_VARIANT_TOKENS[variant];
  const levelBadgeTokens =
    LEVEL_BADGE_TOKENS[level] ??
    ({
      label: 'Level',
      background: 'rgba(148, 163, 184, 0.24)',
      color: '#1f2937',
    } as const);

  const initials = useMemo(() => {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0]?.toUpperCase() ?? '')
      .join('');
  }, [name]);

  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.matches(':focus-visible')) {
      setIsFocusVisible(true);
    }
  };

  const handleBlur = () => {
    setIsFocusVisible(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!interactive) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  };

  const baseCardStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: CARD_DIMENSIONS.gap,
    padding: CARD_DIMENSIONS.padding,
    borderRadius: CARD_DIMENSIONS.borderRadius,
    background: variantTokens.surface,
    border: '1px solid var(--color-border)',
    boxShadow:
      isHovered || isFocusVisible
        ? variantTokens.shadowHover
        : variantTokens.shadow,
    transform:
      isHovered || isFocusVisible ? 'translateY(-2px)' : 'translateY(0)',
    transition:
      'transform var(--transition-fast), box-shadow var(--transition-fast)',
    cursor: interactive ? 'pointer' : 'default',
    minWidth: '220px',
    outline: 'none',
  };

  const accentBarStyle: CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '4px',
    borderTopLeftRadius: CARD_DIMENSIONS.borderRadius,
    borderTopRightRadius: CARD_DIMENSIONS.borderRadius,
    background: variantTokens.accent,
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: CARD_DIMENSIONS.gap,
  };

  const avatarWrapperStyle: CSSProperties = {
    width: AVATAR_TOKENS.size,
    height: AVATAR_TOKENS.size,
    borderRadius: '50%',
    background: AVATAR_TOKENS.background,
    color: AVATAR_TOKENS.color,
    fontSize: '14px',
    fontWeight: AVATAR_TOKENS.fontWeight as CSSProperties['fontWeight'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  const infoStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    minWidth: 0,
  };

  const nameStyle: CSSProperties = {
    fontSize: TITLE_TOKENS.nameFontSize,
    fontWeight: 'var(--font-weight-semibold)',
    color: variantTokens.text,
    lineHeight: 1.25,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  };

  const titleStyle: CSSProperties = {
    fontSize: TITLE_TOKENS.titleFontSize,
    fontWeight: TITLE_TOKENS.titleFontWeight as CSSProperties['fontWeight'],
    color: variantTokens.mutedText,
    lineHeight: 1.2,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  };

  const badgeStackStyle: CSSProperties = {
    marginLeft: 'auto',
    display: 'flex',
    gap: CARD_DIMENSIONS.tagGap,
    alignItems: 'center',
  };

  const levelBadgeStyle: CSSProperties = {
    background: levelBadgeTokens.background,
    color: levelBadgeTokens.color,
    borderRadius: BADGE_TOKENS.borderRadius,
    padding: `${BADGE_TOKENS.paddingBlock} ${BADGE_TOKENS.paddingInline}`,
    fontSize: BADGE_TOKENS.fontSize,
    fontWeight: BADGE_TOKENS.fontWeight as CSSProperties['fontWeight'],
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    lineHeight: 1,
  };

  const tagsContainerStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: CARD_DIMENSIONS.tagGap,
  };

  const tagBadgeStyle: CSSProperties = {
    background: 'rgba(226, 232, 240, 0.6)',
    color: variantTokens.text,
    borderRadius: BADGE_TOKENS.borderRadius,
    padding: `${BADGE_TOKENS.paddingBlock} ${BADGE_TOKENS.paddingInline}`,
    fontSize: BADGE_TOKENS.fontSize,
    fontWeight: BADGE_TOKENS.fontWeight as CSSProperties['fontWeight'],
    lineHeight: 1,
  };

  const interactiveProps = interactive
    ? {
        role: 'button' as const,
        tabIndex: 0,
        onClick,
        onKeyDown: handleKeyDown,
        'aria-label': `${name}, ${title}`,
      }
    : {
        role: 'group' as const,
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
      <span aria-hidden="true" style={accentBarStyle} />

      <div style={headerStyle}>
        <div style={avatarWrapperStyle}>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${name} avatar`}
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

        <div style={infoStyle}>
          <span style={nameStyle}>{name}</span>
          <span style={titleStyle}>{title}</span>
        </div>

        <div style={badgeStackStyle}>
          <span
            style={levelBadgeStyle}
            aria-label={`${levelBadgeTokens.label} badge`}
          >
            {level}
          </span>
        </div>
      </div>

      {tags.length > 0 ? (
        <div style={tagsContainerStyle}>
          {tags.map(tag => (
            <span key={tag} style={tagBadgeStyle}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default DeveloperCard;
