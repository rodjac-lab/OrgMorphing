/**
 * Type definitions for the Organization Morphing Tool
 *
 * This file contains JSDoc type definitions for all data structures
 * used in the application.
 */

/**
 * @typedef {'Cloud'|'Mobile'|'Embarqué'|'Test auto'|'Infra'} CraftType
 */

/**
 * @typedef {1|2|3|4} SeniorityLevel
 */

/**
 * @typedef {0|50|100} ManagerTimePercent
 */

/**
 * Developer/Manager entity
 * @typedef {Object} Developer
 * @property {string} id - UUID unique identifier
 * @property {string} firstName - Developer's first name
 * @property {string} lastName - Developer's last name
 * @property {CraftType} craft - Technical craft/domain
 * @property {SeniorityLevel} seniority - Seniority level (1-4)
 * @property {boolean} isLeadDev - Is a Lead Developer
 * @property {boolean} isTechLead - Is a Tech Lead
 * @property {boolean} isScrumMaster - Is a Scrum Master
 * @property {string|null} managerId - ID of the N-1 manager
 * @property {string|null} squadId - ID of the assigned squad
 * @property {boolean} isManager - Is a craft manager
 * @property {ManagerTimePercent} managerTimePercent - Percentage of time spent on management (0, 50, or 100)
 */

/**
 * Squad entity
 * @typedef {Object} Squad
 * @property {string} id - UUID unique identifier
 * @property {string} name - Squad name (e.g., "Squad Alpha")
 * @property {string} trainId - ID of the parent train
 * @property {string[]} memberIds - Array of developer IDs in this squad
 */

/**
 * Train entity
 * @typedef {Object} Train
 * @property {string} id - UUID unique identifier
 * @property {string} name - Train name (e.g., "Cantal")
 * @property {string} rteId - ID of the Release Train Engineer
 * @property {string[]} squadIds - Array of squad IDs in this train
 */

/**
 * RTE (Release Train Engineer) entity
 * @typedef {Object} RTE
 * @property {string} id - UUID unique identifier
 * @property {string} firstName - RTE's first name
 * @property {string} lastName - RTE's last name
 * @property {string} title - Title (always "RTE")
 * @property {string} trainId - ID of the managed train
 */

/**
 * Director entity
 * @typedef {Object} Director
 * @property {string} id - UUID unique identifier
 * @property {string} firstName - Director's first name
 * @property {string} lastName - Director's last name
 * @property {string} title - Title (e.g., "Directeur de l'Engineering")
 * @property {boolean} isDirector - Always true for directors
 */

/**
 * Complete organization data structure
 * @typedef {Object} OrganizationData
 * @property {string} version - Data schema version
 * @property {number} lastUpdated - Timestamp of last update
 * @property {Director} director - The engineering director
 * @property {Developer[]} developers - All developers and managers
 * @property {Squad[]} squads - All squads
 * @property {Train} train - The agile train
 * @property {RTE} rte - The Release Train Engineer
 */

// Export constants
export const VALID_CRAFTS = ['Cloud', 'Mobile', 'Embarqué', 'Test auto', 'Infra'];
export const VALID_SENIORITY_LEVELS = [1, 2, 3, 4];
export const VALID_MANAGER_TIME_PERCENTS = [0, 50, 100];

// Export a dummy value to make this a proper ES module
export const TYPES_VERSION = '1.0';
