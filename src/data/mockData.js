/**
 * Mock data generator for the Organization Morphing Tool
 *
 * Generates realistic test data:
 * - 1 Director
 * - 6 Managers (Cloud x2, Mobile x2, Embarqué, Test auto, Infra)
 * - 40-50 Developers
 * - 8 Squads
 * - 1 RTE
 * - 1 Train (Cantal)
 */

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

// Fixed IDs for reference
const DIRECTOR_ID = 'director-001';
const RTE_ID = 'rte-001';
const TRAIN_ID = 'train-001';

// Manager IDs by craft
const MANAGER_IDS = {
  Cloud1: 'manager-cloud-001',
  Cloud2: 'manager-cloud-002',
  Mobile1: 'manager-mobile-001',
  Mobile2: 'manager-mobile-002',
  Embarqué: 'manager-embedded-001',
  'Test auto': 'manager-test-001',
  Infra: 'manager-infra-001'
};

// Squad IDs
const SQUAD_IDS = Array.from({ length: 8 }, (_, i) => `squad-${String(i + 1).padStart(3, '0')}`);

// Sample first names
const FIRST_NAMES = [
  'Jean', 'Marie', 'Pierre', 'Sophie', 'Luc', 'Claire', 'Thomas', 'Emma',
  'Nicolas', 'Julie', 'Alexandre', 'Camille', 'Julien', 'Laura', 'Maxime', 'Sarah',
  'Antoine', 'Léa', 'Baptiste', 'Manon', 'Mathieu', 'Charlotte', 'François', 'Alice',
  'Vincent', 'Chloé', 'Benjamin', 'Pauline', 'Lucas', 'Marine', 'Hugo', 'Anaïs',
  'Romain', 'Lucie', 'Simon', 'Mélanie', 'Clément', 'Audrey', 'Florian', 'Élise',
  'Adrien', 'Caroline', 'Damien', 'Laure', 'Jérôme', 'Céline', 'Olivier', 'Isabelle'
];

// Sample last names
const LAST_NAMES = [
  'Dupont', 'Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit',
  'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefebvre', 'Michel', 'Garcia',
  'David', 'Bertrand', 'Roux', 'Vincent', 'Fournier', 'Morel', 'Girard', 'André',
  'Lefevre', 'Mercier', 'Dupuis', 'Lambert', 'Bonnet', 'François', 'Martinez', 'Legrand',
  'Garnier', 'Faure', 'Rousseau', 'Blanc', 'Guerin', 'Muller', 'Henry', 'Roussel',
  'Nicolas', 'Perrin', 'Morin', 'Mathieu', 'Clement', 'Gauthier', 'Dumont', 'Lopez'
];

/**
 * Get a random element from an array
 */
function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get a random name that hasn't been used yet
 */
function getUniqueName(usedNames) {
  let attempts = 0;
  let firstName, lastName, fullName;

  do {
    firstName = randomFrom(FIRST_NAMES);
    lastName = randomFrom(LAST_NAMES);
    fullName = `${firstName} ${lastName}`;
    attempts++;

    // Safety: if we can't find unique name after 100 attempts, add a number
    if (attempts > 100) {
      fullName = `${firstName} ${lastName} ${attempts}`;
      break;
    }
  } while (usedNames.has(fullName));

  usedNames.add(fullName);
  return { firstName, lastName };
}

/**
 * Generate the Director
 */
function generateDirector() {
  return {
    id: DIRECTOR_ID,
    firstName: 'Marie',
    lastName: 'Dubois',
    title: 'Directeur de l\'Engineering',
    isDirector: true
  };
}

/**
 * Generate the RTE
 */
function generateRTE() {
  return {
    id: RTE_ID,
    firstName: 'Sophie',
    lastName: 'Laurent',
    title: 'RTE',
    trainId: TRAIN_ID
  };
}

/**
 * Generate managers
 */
function generateManagers(usedNames) {
  const managers = [];

  // Cloud managers (2)
  managers.push({
    id: MANAGER_IDS.Cloud1,
    ...getUniqueName(usedNames),
    craft: 'Cloud',
    seniority: 4,
    isLeadDev: false,
    isTechLead: false,
    isScrumMaster: false,
    managerId: DIRECTOR_ID,
    squadId: SQUAD_IDS[0], // First Cloud manager is 50% dev
    isManager: true,
    managerTimePercent: 50
  });

  managers.push({
    id: MANAGER_IDS.Cloud2,
    ...getUniqueName(usedNames),
    craft: 'Cloud',
    seniority: 4,
    isLeadDev: false,
    isTechLead: false,
    isScrumMaster: false,
    managerId: DIRECTOR_ID,
    squadId: null, // Second Cloud manager is 100% management
    isManager: true,
    managerTimePercent: 100
  });

  // Mobile managers (2)
  managers.push({
    id: MANAGER_IDS.Mobile1,
    ...getUniqueName(usedNames),
    craft: 'Mobile',
    seniority: 4,
    isLeadDev: false,
    isTechLead: false,
    isScrumMaster: false,
    managerId: DIRECTOR_ID,
    squadId: SQUAD_IDS[2], // First Mobile manager is 50% dev
    isManager: true,
    managerTimePercent: 50
  });

  managers.push({
    id: MANAGER_IDS.Mobile2,
    ...getUniqueName(usedNames),
    craft: 'Mobile',
    seniority: 4,
    isLeadDev: false,
    isTechLead: false,
    isScrumMaster: false,
    managerId: DIRECTOR_ID,
    squadId: null, // Second Mobile manager is 100% management
    isManager: true,
    managerTimePercent: 100
  });

  // Embarqué manager (1) - 100% management
  managers.push({
    id: MANAGER_IDS.Embarqué,
    ...getUniqueName(usedNames),
    craft: 'Embarqué',
    seniority: 4,
    isLeadDev: false,
    isTechLead: false,
    isScrumMaster: false,
    managerId: DIRECTOR_ID,
    squadId: null,
    isManager: true,
    managerTimePercent: 100
  });

  // Test auto manager (1) - 50% dev
  managers.push({
    id: MANAGER_IDS['Test auto'],
    ...getUniqueName(usedNames),
    craft: 'Test auto',
    seniority: 4,
    isLeadDev: false,
    isTechLead: false,
    isScrumMaster: false,
    managerId: DIRECTOR_ID,
    squadId: SQUAD_IDS[5],
    isManager: true,
    managerTimePercent: 50
  });

  // Infra manager (1) - 100% management
  managers.push({
    id: MANAGER_IDS.Infra,
    ...getUniqueName(usedNames),
    craft: 'Infra',
    seniority: 4,
    isLeadDev: false,
    isTechLead: false,
    isScrumMaster: false,
    managerId: DIRECTOR_ID,
    squadId: null,
    isManager: true,
    managerTimePercent: 100
  });

  return managers;
}

/**
 * Generate developers
 */
function generateDevelopers(usedNames) {
  const developers = [];

  // Distribution: ~45 developers distributed across crafts
  // Cloud: 12, Mobile: 10, Embarqué: 8, Test auto: 8, Infra: 7
  const distribution = {
    'Cloud': 12,
    'Mobile': 10,
    'Embarqué': 8,
    'Test auto': 8,
    'Infra': 7
  };

  // Helper to get manager ID for a craft
  const getManagerForCraft = (craft) => {
    if (craft === 'Cloud') {
      return Math.random() > 0.5 ? MANAGER_IDS.Cloud1 : MANAGER_IDS.Cloud2;
    } else if (craft === 'Mobile') {
      return Math.random() > 0.5 ? MANAGER_IDS.Mobile1 : MANAGER_IDS.Mobile2;
    } else {
      return MANAGER_IDS[craft];
    }
  };

  let devIndex = 0;

  for (const [craft, count] of Object.entries(distribution)) {
    for (let i = 0; i < count; i++) {
      const seniority = [2, 2, 2, 3, 3, 3, 3, 4][i % 8] || 2; // Mix of seniority
      const isLeadDev = i === 0 && Math.random() > 0.5; // Some crafts have lead devs
      const isTechLead = i === 1 && Math.random() > 0.6; // Some have tech leads
      const isScrumMaster = i % 6 === 0; // ~1 SM per squad roughly

      // Assign to squads (distributed across all squads)
      const squadId = SQUAD_IDS[devIndex % SQUAD_IDS.length];

      developers.push({
        id: generateId(),
        ...getUniqueName(usedNames),
        craft,
        seniority,
        isLeadDev,
        isTechLead,
        isScrumMaster,
        managerId: getManagerForCraft(craft),
        squadId,
        isManager: false,
        managerTimePercent: 0
      });

      devIndex++;
    }
  }

  return developers;
}

/**
 * Generate squads
 */
function generateSquads(developers, managers) {
  const squads = [];
  const squadNames = [
    'Squad Alpha',
    'Squad Beta',
    'Squad Gamma',
    'Squad Delta',
    'Squad Epsilon',
    'Squad Zeta',
    'Squad Eta',
    'Squad Theta'
  ];

  // All people who can be in squads (devs + managers with 50% dev time)
  const allSquadMembers = [
    ...developers,
    ...managers.filter(m => m.squadId !== null)
  ];

  for (let i = 0; i < SQUAD_IDS.length; i++) {
    const squadId = SQUAD_IDS[i];
    const memberIds = allSquadMembers
      .filter(p => p.squadId === squadId)
      .map(p => p.id);

    squads.push({
      id: squadId,
      name: squadNames[i],
      trainId: TRAIN_ID,
      memberIds
    });
  }

  return squads;
}

/**
 * Generate the train
 */
function generateTrain() {
  return {
    id: TRAIN_ID,
    name: 'Cantal',
    rteId: RTE_ID,
    squadIds: [...SQUAD_IDS]
  };
}

/**
 * Generate complete mock data
 * @returns {import('./types.js').OrganizationData}
 */
export function generateMockData() {
  const usedNames = new Set();

  const director = generateDirector();
  const rte = generateRTE();
  const managers = generateManagers(usedNames);
  const developers = generateDevelopers(usedNames);
  const squads = generateSquads(developers, managers);
  const train = generateTrain();

  return {
    version: '1.0',
    lastUpdated: Date.now(),
    director,
    developers: [...managers, ...developers], // Managers are also in developers array
    squads,
    train,
    rte
  };
}

// Export for console testing if needed
export default generateMockData;
