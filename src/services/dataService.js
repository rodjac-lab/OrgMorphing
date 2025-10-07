/**
 * Data service for CRUD operations on organization data
 *
 * Provides functions to create, read, update, and delete
 * developers, squads, and other entities.
 */

import { storage } from './storage.js';
import { generateMockData } from '../data/mockData.js';

/**
 * Generate a UUID v4
 * @returns {string} UUID
 */
function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Initialize data - load from storage or create mock data
 * @returns {import('../data/types.js').OrganizationData}
 */
export function initializeData() {
  let data = storage.load();

  if (!data) {
    // No data in storage, generate mock data
    data = generateMockData();
    storage.save(data);
    console.log('✅ Mock data generated and saved to LocalStorage');
  } else {
    console.log('✅ Data loaded from LocalStorage');
  }

  return data;
}

/**
 * Get all developers (including managers)
 * @param {import('../data/types.js').OrganizationData} data
 * @returns {import('../data/types.js').Developer[]}
 */
export function getAllDevelopers(data) {
  return data.developers;
}

/**
 * Get only managers
 * @param {import('../data/types.js').OrganizationData} data
 * @returns {import('../data/types.js').Developer[]}
 */
export function getManagers(data) {
  return data.developers.filter(dev => dev.isManager);
}

/**
 * Get only regular developers (not managers)
 * @param {import('../data/types.js').OrganizationData} data
 * @returns {import('../data/types.js').Developer[]}
 */
export function getRegularDevelopers(data) {
  return data.developers.filter(dev => !dev.isManager);
}

/**
 * Get developer by ID
 * @param {import('../data/types.js').OrganizationData} data
 * @param {string} id
 * @returns {import('../data/types.js').Developer|undefined}
 */
export function getDeveloperById(data, id) {
  return data.developers.find(dev => dev.id === id);
}

/**
 * Get developers by craft
 * @param {import('../data/types.js').OrganizationData} data
 * @param {import('../data/types.js').CraftType} craft
 * @returns {import('../data/types.js').Developer[]}
 */
export function getDevelopersByCraft(data, craft) {
  return data.developers.filter(dev => dev.craft === craft);
}

/**
 * Get developers by manager
 * @param {import('../data/types.js').OrganizationData} data
 * @param {string} managerId
 * @returns {import('../data/types.js').Developer[]}
 */
export function getDevelopersByManager(data, managerId) {
  return data.developers.filter(dev => dev.managerId === managerId);
}

/**
 * Get squad by ID
 * @param {import('../data/types.js').OrganizationData} data
 * @param {string} id
 * @returns {import('../data/types.js').Squad|undefined}
 */
export function getSquadById(data, id) {
  return data.squads.find(squad => squad.id === id);
}

/**
 * Get squad members
 * @param {import('../data/types.js').OrganizationData} data
 * @param {string} squadId
 * @returns {import('../data/types.js').Developer[]}
 */
export function getSquadMembers(data, squadId) {
  return data.developers.filter(dev => dev.squadId === squadId);
}

/**
 * Add a new developer
 * @param {import('../data/types.js').OrganizationData} data
 * @param {Omit<import('../data/types.js').Developer, 'id'>} developerData
 * @returns {import('../data/types.js').OrganizationData} Updated data
 */
export function addDeveloper(data, developerData) {
  const newDeveloper = {
    id: generateId(),
    ...developerData
  };

  const updatedData = {
    ...data,
    developers: [...data.developers, newDeveloper]
  };

  // Update squad memberIds if developer is assigned to a squad
  if (newDeveloper.squadId) {
    const squad = updatedData.squads.find(s => s.id === newDeveloper.squadId);
    if (squad && !squad.memberIds.includes(newDeveloper.id)) {
      squad.memberIds.push(newDeveloper.id);
    }
  }

  storage.save(updatedData);
  return updatedData;
}

/**
 * Update a developer
 * @param {import('../data/types.js').OrganizationData} data
 * @param {string} id
 * @param {Partial<import('../data/types.js').Developer>} updates
 * @returns {import('../data/types.js').OrganizationData} Updated data
 */
export function updateDeveloper(data, id, updates) {
  const updatedDevelopers = data.developers.map(dev =>
    dev.id === id ? { ...dev, ...updates } : dev
  );

  const updatedData = {
    ...data,
    developers: updatedDevelopers
  };

  // Update squad memberIds if squad changed
  if (updates.squadId !== undefined) {
    const oldDev = data.developers.find(d => d.id === id);
    const oldSquadId = oldDev?.squadId;
    const newSquadId = updates.squadId;

    // Remove from old squad
    if (oldSquadId) {
      const oldSquad = updatedData.squads.find(s => s.id === oldSquadId);
      if (oldSquad) {
        oldSquad.memberIds = oldSquad.memberIds.filter(memberId => memberId !== id);
      }
    }

    // Add to new squad
    if (newSquadId) {
      const newSquad = updatedData.squads.find(s => s.id === newSquadId);
      if (newSquad && !newSquad.memberIds.includes(id)) {
        newSquad.memberIds.push(id);
      }
    }
  }

  storage.save(updatedData);
  return updatedData;
}

/**
 * Delete a developer
 * @param {import('../data/types.js').OrganizationData} data
 * @param {string} id
 * @returns {import('../data/types.js').OrganizationData} Updated data
 */
export function deleteDeveloper(data, id) {
  const developer = data.developers.find(d => d.id === id);

  const updatedData = {
    ...data,
    developers: data.developers.filter(dev => dev.id !== id)
  };

  // Remove from squad memberIds
  if (developer?.squadId) {
    const squad = updatedData.squads.find(s => s.id === developer.squadId);
    if (squad) {
      squad.memberIds = squad.memberIds.filter(memberId => memberId !== id);
    }
  }

  storage.save(updatedData);
  return updatedData;
}

/**
 * Add a new squad
 * @param {import('../data/types.js').OrganizationData} data
 * @param {Omit<import('../data/types.js').Squad, 'id'>} squadData
 * @returns {import('../data/types.js').OrganizationData} Updated data
 */
export function addSquad(data, squadData) {
  const newSquad = {
    id: generateId(),
    ...squadData
  };

  const updatedData = {
    ...data,
    squads: [...data.squads, newSquad],
    train: {
      ...data.train,
      squadIds: [...data.train.squadIds, newSquad.id]
    }
  };

  storage.save(updatedData);
  return updatedData;
}

/**
 * Update a squad
 * @param {import('../data/types.js').OrganizationData} data
 * @param {string} id
 * @param {Partial<import('../data/types.js').Squad>} updates
 * @returns {import('../data/types.js').OrganizationData} Updated data
 */
export function updateSquad(data, id, updates) {
  const updatedSquads = data.squads.map(squad =>
    squad.id === id ? { ...squad, ...updates } : squad
  );

  const updatedData = {
    ...data,
    squads: updatedSquads
  };

  storage.save(updatedData);
  return updatedData;
}

/**
 * Delete a squad
 * @param {import('../data/types.js').OrganizationData} data
 * @param {string} id
 * @returns {import('../data/types.js').OrganizationData} Updated data
 */
export function deleteSquad(data, id) {
  const updatedData = {
    ...data,
    squads: data.squads.filter(squad => squad.id !== id),
    train: {
      ...data.train,
      squadIds: data.train.squadIds.filter(squadId => squadId !== id)
    },
    // Remove squad assignment from developers
    developers: data.developers.map(dev =>
      dev.squadId === id ? { ...dev, squadId: null } : dev
    )
  };

  storage.save(updatedData);
  return updatedData;
}

/**
 * Update director information
 * @param {import('../data/types.js').OrganizationData} data
 * @param {Partial<import('../data/types.js').Director>} updates
 * @returns {import('../data/types.js').OrganizationData} Updated data
 */
export function updateDirector(data, updates) {
  const updatedData = {
    ...data,
    director: { ...data.director, ...updates }
  };

  storage.save(updatedData);
  return updatedData;
}

/**
 * Update RTE information
 * @param {import('../data/types.js').OrganizationData} data
 * @param {Partial<import('../data/types.js').RTE>} updates
 * @returns {import('../data/types.js').OrganizationData} Updated data
 */
export function updateRTE(data, updates) {
  const updatedData = {
    ...data,
    rte: { ...data.rte, ...updates }
  };

  storage.save(updatedData);
  return updatedData;
}

/**
 * Replace all data (used for CSV import)
 * @param {import('../data/types.js').OrganizationData} newData
 * @returns {import('../data/types.js').OrganizationData} Updated data
 */
export function replaceAllData(newData) {
  storage.createBackup(); // Backup before replacing
  storage.save(newData);
  return newData;
}

/**
 * Reset to mock data
 * @returns {import('../data/types.js').OrganizationData} New mock data
 */
export function resetToMockData() {
  storage.createBackup();
  const mockData = generateMockData();
  storage.save(mockData);
  return mockData;
}

// Export all functions
export const dataService = {
  initializeData,
  getAllDevelopers,
  getManagers,
  getRegularDevelopers,
  getDeveloperById,
  getDevelopersByCraft,
  getDevelopersByManager,
  getSquadById,
  getSquadMembers,
  addDeveloper,
  updateDeveloper,
  deleteDeveloper,
  addSquad,
  updateSquad,
  deleteSquad,
  updateDirector,
  updateRTE,
  replaceAllData,
  resetToMockData
};

export default dataService;
