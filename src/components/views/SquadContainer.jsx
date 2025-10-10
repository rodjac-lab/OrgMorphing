/**
 * SquadContainer Component
 */

import React from 'react';
import { motion } from 'framer-motion';
import DeveloperCard from '../cards/DeveloperCard.jsx';
import { TRANSITION_CONFIG, calculateCardDelay } from '../../utils/morphingConfig.js';

function SquadContainer({ squad, members, showSeniority = false, onPersonClick, squadIndex = 0, globalCardOffset = 0, staggerStrategy }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.squadName}>{squad.name}</h3>
        <span style={styles.memberCount}>
          {members.length} {members.length === 1 ? 'membre' : 'membres'}
        </span>
      </div>

      <div style={styles.membersContainer}>
        {members.map((member, cardIndexInSquad) => {
          const globalCardIndex = globalCardOffset + cardIndexInSquad;
          const delay = calculateCardDelay(globalCardIndex, squadIndex, cardIndexInSquad, staggerStrategy);

          return (
            <motion.div
              key={member.id}
              layoutId={`person-${member.id}`}
              style={styles.cardWrapper}
              transition={{
                layout: {
                  duration: TRANSITION_CONFIG.duration,
                  ease: TRANSITION_CONFIG.ease,
                  delay: delay,
                }
              }}
            >
              <DeveloperCard
                developer={member}
                showSeniority={showSeniority}
                onClick={onPersonClick ? () => onPersonClick(member) : undefined}
              />
            </motion.div>
          );
        })}
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
  cardWrapper: {},
};

export default React.memo(SquadContainer);
