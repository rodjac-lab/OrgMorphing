/**
 * Tests pour dataService
 * 
 * Tests de la logique métier CRUD critique
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
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
} from './dataService';
import * as storage from './storage';

// Mock du module storage
vi.mock('./storage', () => ({
  storage: {
    load: vi.fn(),
    save: vi.fn(),
    createBackup: vi.fn(),
  },
  saveData: vi.fn(),
}));

describe('dataService', () => {
  let mockOrgData;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Mock organization data
    mockOrgData = {
      version: '1.0',
      lastUpdated: Date.now(),
      director: {
        id: 'dir-1',
        firstName: 'Marie',
        lastName: 'Directeur',
        title: 'Directeur Engineering',
        isDirector: true,
      },
      developers: [
        {
          id: 'mgr-1',
          firstName: 'Pierre',
          lastName: 'Manager',
          craft: 'Cloud',
          seniority: 4,
          isManager: true,
          managerTimePercent: 100,
          isLeadDev: false,
          isTechLead: false,
          isScrumMaster: false,
          managerId: null,
          squadId: null,
        },
        {
          id: 'dev-1',
          firstName: 'Jean',
          lastName: 'Dupont',
          craft: 'Cloud',
          seniority: 3,
          isManager: false,
          managerTimePercent: 0,
          isLeadDev: false,
          isTechLead: true,
          isScrumMaster: false,
          managerId: 'mgr-1',
          squadId: 'squad-1',
        },
        {
          id: 'dev-2',
          firstName: 'Alice',
          lastName: 'Martin',
          craft: 'Mobile',
          seniority: 2,
          isManager: false,
          managerTimePercent: 0,
          isLeadDev: true,
          isTechLead: false,
          isScrumMaster: false,
          managerId: 'mgr-1',
          squadId: 'squad-1',
        },
      ],
      squads: [
        {
          id: 'squad-1',
          name: 'Squad Alpha',
          trainId: 'train-1',
          memberIds: ['dev-1', 'dev-2'],
        },
      ],
      train: {
        id: 'train-1',
        name: 'Cantal',
        rteId: 'rte-1',
        squadIds: ['squad-1'],
      },
      rte: {
        id: 'rte-1',
        firstName: 'Sophie',
        lastName: 'RTE',
        title: 'RTE',
        trainId: 'train-1',
      },
    };
  });

  describe('initializeData', () => {
    it('charge les données depuis le storage si disponibles', () => {
      storage.storage.load.mockReturnValue(mockOrgData);
      
      const data = initializeData();
      
      expect(storage.storage.load).toHaveBeenCalled();
      expect(data).toEqual(mockOrgData);
    });

    it('génère des mock data si le storage est vide', () => {
      storage.storage.load.mockReturnValue(null);
      
      const data = initializeData();
      
      expect(storage.storage.load).toHaveBeenCalled();
      expect(storage.storage.save).toHaveBeenCalled();
      expect(data).toBeDefined();
      expect(data.director).toBeDefined();
      expect(Array.isArray(data.developers)).toBe(true);
    });
  });

  describe('Getters', () => {
    it('getAllDevelopers retourne tous les développeurs', () => {
      const devs = getAllDevelopers(mockOrgData);
      expect(devs).toHaveLength(3);
    });

    it('getManagers retourne uniquement les managers', () => {
      const managers = getManagers(mockOrgData);
      expect(managers).toHaveLength(1);
      expect(managers[0].isManager).toBe(true);
    });

    it('getRegularDevelopers retourne uniquement les non-managers', () => {
      const devs = getRegularDevelopers(mockOrgData);
      expect(devs).toHaveLength(2);
      expect(devs.every(d => !d.isManager)).toBe(true);
    });

    it('getDeveloperById retourne le bon développeur', () => {
      const dev = getDeveloperById(mockOrgData, 'dev-1');
      expect(dev).toBeDefined();
      expect(dev.id).toBe('dev-1');
      expect(dev.firstName).toBe('Jean');
    });

    it('getDeveloperById retourne undefined si non trouvé', () => {
      const dev = getDeveloperById(mockOrgData, 'non-existent');
      expect(dev).toBeUndefined();
    });

    it('getDevelopersByCraft filtre par métier', () => {
      const cloudDevs = getDevelopersByCraft(mockOrgData, 'Cloud');
      expect(cloudDevs).toHaveLength(2);
      expect(cloudDevs.every(d => d.craft === 'Cloud')).toBe(true);
    });

    it('getDevelopersByManager filtre par manager', () => {
      const devs = getDevelopersByManager(mockOrgData, 'mgr-1');
      expect(devs).toHaveLength(2);
      expect(devs.every(d => d.managerId === 'mgr-1')).toBe(true);
    });

    it('getSquadById retourne la bonne squad', () => {
      const squad = getSquadById(mockOrgData, 'squad-1');
      expect(squad).toBeDefined();
      expect(squad.name).toBe('Squad Alpha');
    });

    it('getSquadMembers retourne les membres d\'une squad', () => {
      const members = getSquadMembers(mockOrgData, 'squad-1');
      expect(members).toHaveLength(2);
      expect(members.every(m => m.squadId === 'squad-1')).toBe(true);
    });
  });

  describe('addDeveloper', () => {
    it('ajoute un nouveau développeur avec un ID unique', () => {
      const newDev = {
        firstName: 'Carlos',
        lastName: 'Garcia',
        craft: 'Backend',
        seniority: 2,
        isManager: false,
        managerTimePercent: 0,
        isLeadDev: false,
        isTechLead: false,
        isScrumMaster: false,
        managerId: 'mgr-1',
        squadId: null,
      };

      const updatedData = addDeveloper(mockOrgData, newDev);

      expect(updatedData.developers).toHaveLength(4);
      const addedDev = updatedData.developers[3];
      expect(addedDev.id).toBeDefined();
      expect(addedDev.firstName).toBe('Carlos');
      expect(storage.storage.save).toHaveBeenCalled();
    });

    it('ajoute le développeur à la squad memberIds si assigné', () => {
      const newDev = {
        firstName: 'Carlos',
        lastName: 'Garcia',
        craft: 'Backend',
        seniority: 2,
        isManager: false,
        managerTimePercent: 0,
        isLeadDev: false,
        isTechLead: false,
        isScrumMaster: false,
        managerId: 'mgr-1',
        squadId: 'squad-1',
      };

      const updatedData = addDeveloper(mockOrgData, newDev);
      const squad = updatedData.squads.find(s => s.id === 'squad-1');
      
      expect(squad.memberIds).toHaveLength(3);
    });
  });

  describe('updateDeveloper', () => {
    it('met à jour les propriétés d\'un développeur', () => {
      const updates = {
        firstName: 'Jean-Updated',
        seniority: 4,
      };

      const updatedData = updateDeveloper(mockOrgData, 'dev-1', updates);
      const dev = updatedData.developers.find(d => d.id === 'dev-1');

      expect(dev.firstName).toBe('Jean-Updated');
      expect(dev.seniority).toBe(4);
      expect(dev.lastName).toBe('Dupont'); // Propriété non modifiée
      expect(storage.storage.save).toHaveBeenCalled();
    });

    it('met à jour les memberIds des squads lors du changement de squad', () => {
      // Créer une deuxième squad
      const dataWithTwoSquads = {
        ...mockOrgData,
        squads: [
          ...mockOrgData.squads,
          {
            id: 'squad-2',
            name: 'Squad Beta',
            trainId: 'train-1',
            memberIds: [],
          },
        ],
      };

      const updatedData = updateDeveloper(dataWithTwoSquads, 'dev-1', {
        squadId: 'squad-2',
      });

      const oldSquad = updatedData.squads.find(s => s.id === 'squad-1');
      const newSquad = updatedData.squads.find(s => s.id === 'squad-2');

      expect(oldSquad.memberIds).not.toContain('dev-1');
      expect(newSquad.memberIds).toContain('dev-1');
    });
  });

  describe('deleteDeveloper', () => {
    it('supprime un développeur', () => {
      const updatedData = deleteDeveloper(mockOrgData, 'dev-1');

      expect(updatedData.developers).toHaveLength(2);
      expect(updatedData.developers.find(d => d.id === 'dev-1')).toBeUndefined();
      expect(storage.storage.save).toHaveBeenCalled();
    });

    it('retire le développeur des memberIds de la squad', () => {
      const updatedData = deleteDeveloper(mockOrgData, 'dev-1');
      const squad = updatedData.squads.find(s => s.id === 'squad-1');

      expect(squad.memberIds).not.toContain('dev-1');
      expect(squad.memberIds).toHaveLength(1);
    });
  });

  describe('addSquad', () => {
    it('ajoute une nouvelle squad', () => {
      const newSquad = {
        name: 'Squad Beta',
        trainId: 'train-1',
        memberIds: [],
      };

      const updatedData = addSquad(mockOrgData, newSquad);

      expect(updatedData.squads).toHaveLength(2);
      const addedSquad = updatedData.squads[1];
      expect(addedSquad.id).toBeDefined();
      expect(addedSquad.name).toBe('Squad Beta');
      expect(updatedData.train.squadIds).toContain(addedSquad.id);
      expect(storage.storage.save).toHaveBeenCalled();
    });
  });

  describe('updateSquad', () => {
    it('met à jour les propriétés d\'une squad', () => {
      const updates = {
        name: 'Squad Alpha Renamed',
      };

      const updatedData = updateSquad(mockOrgData, 'squad-1', updates);
      const squad = updatedData.squads.find(s => s.id === 'squad-1');

      expect(squad.name).toBe('Squad Alpha Renamed');
      expect(storage.storage.save).toHaveBeenCalled();
    });
  });

  describe('deleteSquad', () => {
    it('supprime une squad', () => {
      const updatedData = deleteSquad(mockOrgData, 'squad-1');

      expect(updatedData.squads).toHaveLength(0);
      expect(updatedData.train.squadIds).not.toContain('squad-1');
      expect(storage.storage.save).toHaveBeenCalled();
    });

    it('retire la squad des développeurs', () => {
      const updatedData = deleteSquad(mockOrgData, 'squad-1');

      const dev1 = updatedData.developers.find(d => d.id === 'dev-1');
      const dev2 = updatedData.developers.find(d => d.id === 'dev-2');

      expect(dev1.squadId).toBeNull();
      expect(dev2.squadId).toBeNull();
    });
  });

  describe('updateDirector', () => {
    it('met à jour les informations du directeur', () => {
      const updates = {
        firstName: 'Marie-Updated',
      };

      const updatedData = updateDirector(mockOrgData, updates);

      expect(updatedData.director.firstName).toBe('Marie-Updated');
      expect(updatedData.director.lastName).toBe('Directeur');
      expect(storage.storage.save).toHaveBeenCalled();
    });
  });

  describe('updateRTE', () => {
    it('met à jour les informations du RTE', () => {
      const updates = {
        firstName: 'Sophie-Updated',
      };

      const updatedData = updateRTE(mockOrgData, updates);

      expect(updatedData.rte.firstName).toBe('Sophie-Updated');
      expect(updatedData.rte.lastName).toBe('RTE');
      expect(storage.storage.save).toHaveBeenCalled();
    });
  });

  describe('Cas limites', () => {
    it('getDeveloperById gère les ID null/undefined', () => {
      expect(getDeveloperById(mockOrgData, null)).toBeUndefined();
      expect(getDeveloperById(mockOrgData, undefined)).toBeUndefined();
    });

    it('getDevelopersByCraft retourne un tableau vide si aucun match', () => {
      const devs = getDevelopersByCraft(mockOrgData, 'NonExistentCraft');
      expect(devs).toEqual([]);
    });

    it('getSquadMembers retourne un tableau vide si squad vide', () => {
      const dataWithEmptySquad = {
        ...mockOrgData,
        squads: [
          ...mockOrgData.squads,
          {
            id: 'squad-empty',
            name: 'Empty Squad',
            trainId: 'train-1',
            memberIds: [],
          },
        ],
      };

      const members = getSquadMembers(dataWithEmptySquad, 'squad-empty');
      expect(members).toEqual([]);
    });
  });
});
