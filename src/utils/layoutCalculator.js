/**
 * Layout calculator for hierarchical view (REFACTORED - v2)
 *
 * Specifications:
 * - 3 levels: Director → Managers (grouped by craft) → Developers (single column, unlimited)
 * - T-shaped connections with right angles only
 * - Managers grouped visually by craft with spacing
 * - Reduced card size for better width management
 * - Vertical scroll acceptable, no horizontal scroll
 */

const LEVEL_HEIGHT = 180; // Vertical spacing between levels
const CARD_WIDTH = 240; // Width for proper name display with badges
const CARD_HEIGHT = 70; // Reduced from 80
const MANAGER_GROUP_SPACING = 40; // Spacing between managers of same craft (increased to prevent overlap)
const CARD_SPACING_Y = 12; // Vertical spacing for developers
const CRAFT_GROUP_SPACING = 80; // Extra spacing between different crafts (increased for clarity)

/**
 * Calculate positions for hierarchical layout
 * @param {import('../data/types.js').Director} director
 * @param {import('../data/types.js').Developer[]} developers - All developers (including managers)
 * @returns {Map<string, {x: number, y: number}>} Map of personId to position
 */
export function calculateHierarchicalLayout(director, developers) {
  const positions = new Map();

  // Separate managers and regular developers
  const managers = developers.filter(d => d.isManager);
  const regularDevs = developers.filter(d => !d.isManager);

  // Group managers by craft (sorted alphabetically for consistency)
  const managersByCraft = groupByCraft(managers);
  const crafts = Object.keys(managersByCraft).sort();

  // Calculate total width needed for all managers
  let totalManagersWidth = 0;
  crafts.forEach((craft, index) => {
    const craftManagers = managersByCraft[craft];
    const craftWidth = craftManagers.length * CARD_WIDTH +
                       (craftManagers.length - 1) * MANAGER_GROUP_SPACING;
    totalManagersWidth += craftWidth;

    // Add craft group spacing except after last group
    if (index < crafts.length - 1) {
      totalManagersWidth += CRAFT_GROUP_SPACING;
    }
  });

  // Calculate viewport center
  const viewportWidth = Math.max(1200, totalManagersWidth + 200);
  const centerX = viewportWidth / 2;

  // LEVEL 0: Director (centered at top)
  const directorY = 50;
  const directorX = centerX - CARD_WIDTH / 2;
  positions.set(director.id, { x: directorX, y: directorY });

  // LEVEL 1: Managers (grouped by craft, horizontal layout)
  const managersY = directorY + LEVEL_HEIGHT;
  let currentX = (viewportWidth - totalManagersWidth) / 2;

  crafts.forEach((craft, craftIndex) => {
    const craftManagers = managersByCraft[craft];

    craftManagers.forEach((manager, managerIndex) => {
      positions.set(manager.id, { x: currentX, y: managersY });

      // Move to next manager position
      currentX += CARD_WIDTH;

      // Add spacing between managers of same craft (except last)
      if (managerIndex < craftManagers.length - 1) {
        currentX += MANAGER_GROUP_SPACING;
      }
    });

    // Add craft group spacing (except after last group)
    if (craftIndex < crafts.length - 1) {
      currentX += CRAFT_GROUP_SPACING;
    }
  });

  // LEVEL 2: Developers (single column under each manager, unlimited rows)
  const devsY = managersY + LEVEL_HEIGHT;

  // Group developers by their manager
  const devsByManager = {};
  regularDevs.forEach(dev => {
    if (!devsByManager[dev.managerId]) {
      devsByManager[dev.managerId] = [];
    }
    devsByManager[dev.managerId].push(dev);
  });

  // Position developers in single column under each manager
  managers.forEach(manager => {
    const managerPos = positions.get(manager.id);
    if (!managerPos) return;

    const devs = devsByManager[manager.id] || [];

    // Column centered under manager
    const columnX = managerPos.x;

    devs.forEach((dev, index) => {
      const y = devsY + index * (CARD_HEIGHT + CARD_SPACING_Y);
      positions.set(dev.id, { x: columnX, y });
    });
  });

  return positions;
}

/**
 * Calculate T-shaped connection lines (right angles only)
 * @param {import('../data/types.js').Director} director
 * @param {import('../data/types.js').Developer[]} developers
 * @param {Map<string, {x: number, y: number}>} positions
 * @returns {Array<{type: 'line', x1: number, y1: number, x2: number, y2: number}>}
 */
export function calculateHierarchicalConnections(director, developers, positions) {
  const connections = [];

  const managers = developers.filter(d => d.isManager);
  const regularDevs = developers.filter(d => !d.isManager);

  const directorPos = positions.get(director.id);
  if (!directorPos) return connections;

  // Director center point (bottom)
  const directorCenterX = directorPos.x + CARD_WIDTH / 2;
  const directorBottomY = directorPos.y + CARD_HEIGHT;

  // Calculate horizontal line extent (leftmost to rightmost manager)
  let minManagerX = Infinity;
  let maxManagerX = -Infinity;
  let managersTopY = 0;

  managers.forEach(manager => {
    const pos = positions.get(manager.id);
    if (pos) {
      const centerX = pos.x + CARD_WIDTH / 2;
      minManagerX = Math.min(minManagerX, centerX);
      maxManagerX = Math.max(maxManagerX, centerX);
      managersTopY = pos.y;
    }
  });

  // === T-SHAPED CONNECTION: Director to Managers ===
  if (managers.length > 0) {
    const horizontalY = managersTopY - 30; // Horizontal line Y position

    // 1. Vertical line from director down to horizontal line
    connections.push({
      type: 'line',
      x1: directorCenterX,
      y1: directorBottomY,
      x2: directorCenterX,
      y2: horizontalY
    });

    // 2. Horizontal line connecting all managers
    connections.push({
      type: 'line',
      x1: minManagerX,
      y1: horizontalY,
      x2: maxManagerX,
      y2: horizontalY
    });

    // 3. Vertical lines down to each manager
    managers.forEach(manager => {
      const pos = positions.get(manager.id);
      if (pos) {
        const centerX = pos.x + CARD_WIDTH / 2;
        connections.push({
          type: 'line',
          x1: centerX,
          y1: horizontalY,
          x2: centerX,
          y2: pos.y
        });
      }
    });
  }

  // === Connections from each Manager to their Developers (vertical lines) ===
  managers.forEach(manager => {
    const managerPos = positions.get(manager.id);
    if (!managerPos) return;

    const managerDevs = regularDevs.filter(d => d.managerId === manager.id);
    if (managerDevs.length === 0) return;

    const managerCenterX = managerPos.x + CARD_WIDTH / 2;
    const managerBottomY = managerPos.y + CARD_HEIGHT;

    // Single vertical line from manager through all developers
    const lastDev = managerDevs[managerDevs.length - 1];
    const lastDevPos = positions.get(lastDev.id);

    if (lastDevPos) {
      connections.push({
        type: 'line',
        x1: managerCenterX,
        y1: managerBottomY,
        x2: managerCenterX,
        y2: lastDevPos.y + CARD_HEIGHT
      });
    }
  });

  return connections;
}

/**
 * Calculate the total dimensions needed for the hierarchical view
 * @param {Map<string, {x: number, y: number}>} positions
 * @returns {{width: number, height: number}}
 */
export function calculateHierarchicalDimensions(positions) {
  let maxX = 0;
  let maxY = 0;

  positions.forEach(pos => {
    maxX = Math.max(maxX, pos.x + CARD_WIDTH);
    maxY = Math.max(maxY, pos.y + CARD_HEIGHT);
  });

  return {
    width: maxX + 100, // Add padding
    height: maxY + 100
  };
}

/**
 * Helper: Group items by craft
 * @param {import('../data/types.js').Developer[]} items
 * @returns {Object<string, import('../data/types.js').Developer[]>}
 */
function groupByCraft(items) {
  const groups = {};
  items.forEach(item => {
    if (!groups[item.craft]) {
      groups[item.craft] = [];
    }
    groups[item.craft].push(item);
  });
  return groups;
}

export default calculateHierarchicalLayout;
