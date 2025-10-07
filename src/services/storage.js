/**
 * LocalStorage service for persisting organization data
 *
 * Provides simple CRUD operations for storing and retrieving
 * organization data in the browser's LocalStorage.
 */

const STORAGE_KEY = 'org_morphing_data';
const BACKUP_KEY = 'org_morphing_data_backup';

/**
 * Save organization data to LocalStorage
 * @param {import('../data/types.js').OrganizationData} data - Organization data to save
 * @returns {boolean} Success status
 */
export function saveData(data) {
  try {
    // Update lastUpdated timestamp
    const dataToSave = {
      ...data,
      lastUpdated: Date.now()
    };

    const serialized = JSON.stringify(dataToSave);
    localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch (error) {
    console.error('Error saving data to LocalStorage:', error);
    return false;
  }
}

/**
 * Load organization data from LocalStorage
 * @returns {import('../data/types.js').OrganizationData|null} Organization data or null if not found
 */
export function loadData() {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);

    if (!serialized) {
      return null;
    }

    const data = JSON.parse(serialized);

    // Validate that data has expected structure
    if (!data.version || !data.director || !Array.isArray(data.developers)) {
      console.warn('Invalid data structure in LocalStorage');
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error loading data from LocalStorage:', error);
    return null;
  }
}

/**
 * Create a backup of current data before making changes
 * @returns {boolean} Success status
 */
export function createBackup() {
  try {
    const currentData = localStorage.getItem(STORAGE_KEY);

    if (!currentData) {
      return false;
    }

    localStorage.setItem(BACKUP_KEY, currentData);
    return true;
  } catch (error) {
    console.error('Error creating backup:', error);
    return false;
  }
}

/**
 * Restore data from backup
 * @returns {boolean} Success status
 */
export function restoreBackup() {
  try {
    const backupData = localStorage.getItem(BACKUP_KEY);

    if (!backupData) {
      console.warn('No backup found');
      return false;
    }

    localStorage.setItem(STORAGE_KEY, backupData);
    return true;
  } catch (error) {
    console.error('Error restoring backup:', error);
    return false;
  }
}

/**
 * Clear all organization data from LocalStorage
 * @returns {boolean} Success status
 */
export function clearData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(BACKUP_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
}

/**
 * Check if data exists in LocalStorage
 * @returns {boolean} True if data exists
 */
export function hasData() {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

/**
 * Get data size in bytes
 * @returns {number} Size in bytes
 */
export function getDataSize() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? new Blob([data]).size : 0;
}

/**
 * Export all storage functions as a single object
 */
export const storage = {
  save: saveData,
  load: loadData,
  createBackup,
  restoreBackup,
  clear: clearData,
  hasData,
  getDataSize
};

export default storage;
