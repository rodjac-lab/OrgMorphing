/**
 * SquadContainer Component
 *
 * Container for a squad showing:
 * - Squad name header
 * - List of squad members (developers)
 * - Subtle border and background
 */

import React from 'react';
import DeveloperCard from '../cards/DeveloperCard.jsx';

/**
 * @typedef {Object} SquadContainerProps
 * @property {import('../../data/types.js').Squad} squad - Squad data
 * @property {import('../../data/types.js').Developer[]} members - Developers in this squad
 * @property {boolean} [showSeniority=false] - Whether to show seniority badges
 * @property {(person: any) => void} [onPersonClick] - Click handler for person cards
 */

/**
 * SquadContainer component
 * @param {SquadContainerProps} props
 */
function SquadContainer({ squad, members, showSeniority = false, onPersonClick }) {
  return (
    <div style={styles.container}>
      {/* Squad header */}
      <div style={styles.header}>
        <h3 style={styles.squadName}>{squad.name}</h3>
        <span style={styles.memberCount}>
          {members.length} {members.length === 1 ? 'membre' : 'membres'}
        </span>
      </div>

      {/* Squad members */}
      <div style={styles.membersContainer}>
        {members.map((member) => (
          <div key={member.id} style={styles.cardWrapper}>
            <DeveloperCard
              developer={member}
              showSeniority={showSeniority}
              onClick={onPersonClick ? () => onPersonClick(member) : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '20px',
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    minWidth: '280px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--color-border)',
  },
  squadName: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-text-primary)',
    margin: 0,
  },
  memberCount: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-text-secondary)',
    background: 'rgba(226, 232, 240, 0.5)',
    padding: '4px 10px',
    borderRadius: '12px',
  },
  membersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  cardWrapper: {
    // Cards are already sized at 240px
  },
};

export default React.memo(SquadContainer);
