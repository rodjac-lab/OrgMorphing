/**
 * Morphing Animation Configuration
 * 
 * Contains timing, easing, and stagger strategies for the morphing animation.
 */

// Stagger strategies
export const STAGGER_STRATEGIES = {
  // Option A: Par squad - toutes les cartes d'une squad partent ensemble
  BY_SQUAD: 'by_squad',
  
  // Option B: Carte par carte - vague progressive
  BY_CARD: 'by_card',
  
  // Option D: "Slow then fast" - premières squads lentes, puis accélération
  SLOW_THEN_FAST: 'slow_then_fast',
};

// Current active strategy (change this to test different approaches)
export const ACTIVE_STRATEGY = STAGGER_STRATEGIES.SLOW_THEN_FAST;

// Base transition config
export const TRANSITION_CONFIG = {
  duration: 0.8, // Base duration in seconds
  ease: [0.43, 0.13, 0.23, 0.96], // Cubic bezier for organic movement
};

// Stagger delays per strategy
export const STAGGER_CONFIG = {
  [STAGGER_STRATEGIES.BY_SQUAD]: {
    delayPerSquad: 0.1, // 100ms between each squad
    delayPerCard: 0, // All cards in squad move together
  },
  
  [STAGGER_STRATEGIES.BY_CARD]: {
    delayPerCard: 0.02, // 20ms between each card (wave effect)
    delayPerSquad: 0, // Squads don't matter
  },
  
  [STAGGER_STRATEGIES.SLOW_THEN_FAST]: {
    firstSquadsDelay: 0.3, // 300ms for first 2 squads (pedagogical)
    remainingSquadsDelay: 0.1, // 100ms for squads 3+
    threshold: 2, // Number of "slow" squads
  },
};

/**
 * Calculate the delay for a card based on strategy
 * @param {number} cardIndex - Global card index
 * @param {number} squadIndex - Squad index
 * @param {number} cardIndexInSquad - Card index within its squad
 * @param {string} strategy - Strategy to use (defaults to ACTIVE_STRATEGY)
 * @returns {number} Delay in seconds
 */
export function calculateCardDelay(cardIndex, squadIndex, cardIndexInSquad, strategy = ACTIVE_STRATEGY) {
  const config = STAGGER_CONFIG[strategy];
  
  switch (strategy) {
    case STAGGER_STRATEGIES.BY_SQUAD:
      return squadIndex * config.delayPerSquad;
    
    case STAGGER_STRATEGIES.BY_CARD:
      return cardIndex * config.delayPerCard;
    
    case STAGGER_STRATEGIES.SLOW_THEN_FAST:
      if (squadIndex < config.threshold) {
        // First 2 squads: slow delay
        return squadIndex * config.firstSquadsDelay;
      } else {
        // Remaining squads: faster delay
        const baseDelay = config.threshold * config.firstSquadsDelay;
        const additionalDelay = (squadIndex - config.threshold) * config.remainingSquadsDelay;
        return baseDelay + additionalDelay;
      }
    
    default:
      return 0;
  }
}
