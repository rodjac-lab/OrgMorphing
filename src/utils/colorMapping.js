/**
 * Color mapping utilities for crafts/métiers
 */

/**
 * Get the CSS color variable for a given craft
 * @param {import('../data/types.js').CraftType} craft - The craft/métier
 * @returns {string} CSS color variable
 */
export function getCraftColor(craft) {
  const colors = {
    'Cloud': 'var(--craft-cloud)',
    'Mobile': 'var(--craft-mobile)',
    'Embarqué': 'var(--craft-embedded)',
    'Test auto': 'var(--craft-test-auto)',
    'Infra': 'var(--craft-infra)',
  };

  return colors[craft] || 'var(--craft-cloud)'; // Fallback to cloud color
}

/**
 * Get the craft name in a readable format
 * @param {import('../data/types.js').CraftType} craft
 * @returns {string}
 */
export function getCraftLabel(craft) {
  return craft;
}

export default getCraftColor;
