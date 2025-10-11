/**
 * Tests pour layoutCalculator
 * 
 * Tests des calculs complexes de positionnement hiérarchique
 */

import { describe, it, expect } from 'vitest';
import {
  calculateHierarchicalLayout,
  calculateHierarchicalConnections,
  calculateHierarchicalDimensions,
} from './layoutCalculator';

describe('layoutCalculator', () => {
  const mockDirector = {
    id: 'dir-1',
    firstName: 'Marie',
    lastName: 'Directeur',
  };

  const mockManagers = [
    {
      id: 'mgr-cloud-1',
      craft: 'Cloud',
      isManager: true,
    },
    {
      id: 'mgr-mobile-1',
      craft: 'Mobile',
      isManager: true,
    },
  ];

  const mockDevelopers = [
    {
      id: 'dev-1',
      craft: 'Cloud',
      isManager: false,
      managerId: 'mgr-cloud-1',
    },
    {
      id: 'dev-2',
      craft: 'Cloud',
      isManager: false,
      managerId: 'mgr-cloud-1',
    },
    {
      id: 'dev-3',
      craft: 'Mobile',
      isManager: false,
      managerId: 'mgr-mobile-1',
    },
  ];

  const allDevelopers = [...mockManagers, ...mockDevelopers];

  describe('calculateHierarchicalLayout', () => {
    it('calcule les positions pour tous les individus', () => {
      const positions = calculateHierarchicalLayout(mockDirector, allDevelopers);

      // Vérifier que tous ont une position
      expect(positions.has(mockDirector.id)).toBe(true);
      expect(positions.has('mgr-cloud-1')).toBe(true);
      expect(positions.has('mgr-mobile-1')).toBe(true);
      expect(positions.has('dev-1')).toBe(true);
      expect(positions.has('dev-2')).toBe(true);
      expect(positions.has('dev-3')).toBe(true);
    });

    it('positionne le directeur en haut', () => {
      const positions = calculateHierarchicalLayout(mockDirector, allDevelopers);
      const dirPos = positions.get(mockDirector.id);

      expect(dirPos.y).toBe(50); // Y fixe défini dans le code
    });

    it('positionne les managers au niveau 1', () => {
      const positions = calculateHierarchicalLayout(mockDirector, allDevelopers);
      
      const mgr1Pos = positions.get('mgr-cloud-1');
      const mgr2Pos = positions.get('mgr-mobile-1');
      const dirPos = positions.get(mockDirector.id);

      // Les managers doivent être en dessous du directeur
      expect(mgr1Pos.y).toBeGreaterThan(dirPos.y);
      expect(mgr2Pos.y).toBeGreaterThan(dirPos.y);
      
      // Les managers du même niveau doivent avoir le même Y
      expect(mgr1Pos.y).toBe(mgr2Pos.y);
    });

    it('positionne les développeurs au niveau 2', () => {
      const positions = calculateHierarchicalLayout(mockDirector, allDevelopers);
      
      const dev1Pos = positions.get('dev-1');
      const mgr1Pos = positions.get('mgr-cloud-1');

      // Les devs doivent être en dessous de leur manager
      expect(dev1Pos.y).toBeGreaterThan(mgr1Pos.y);
    });

    it('groupe les managers par craft', () => {
      const positions = calculateHierarchicalLayout(mockDirector, allDevelopers);
      
      const mgrCloud = positions.get('mgr-cloud-1');
      const mgrMobile = positions.get('mgr-mobile-1');

      // Les managers de crafts différents doivent être séparés horizontalement
      expect(mgrCloud.x).not.toBe(mgrMobile.x);
    });

    it('aligne les développeurs sous leur manager', () => {
      const positions = calculateHierarchicalLayout(mockDirector, allDevelopers);
      
      const mgrPos = positions.get('mgr-cloud-1');
      const dev1Pos = positions.get('dev-1');
      const dev2Pos = positions.get('dev-2');

      // Les devs doivent être alignés verticalement avec leur manager
      expect(dev1Pos.x).toBe(mgrPos.x);
      expect(dev2Pos.x).toBe(mgrPos.x);
      
      // Les devs doivent être espacés verticalement
      expect(dev2Pos.y).toBeGreaterThan(dev1Pos.y);
    });

    it('gère le cas d\'un seul manager', () => {
      const singleManager = [mockManagers[0]];
      const positions = calculateHierarchicalLayout(mockDirector, singleManager);

      expect(positions.size).toBe(2); // Directeur + 1 manager
      expect(positions.has(mockDirector.id)).toBe(true);
      expect(positions.has('mgr-cloud-1')).toBe(true);
    });

    it('gère le cas sans développeurs', () => {
      const positions = calculateHierarchicalLayout(mockDirector, mockManagers);

      expect(positions.size).toBe(3); // Directeur + 2 managers
      expect(positions.has('dev-1')).toBe(false);
    });

    it('retourne des coordonnées valides (nombres positifs)', () => {
      const positions = calculateHierarchicalLayout(mockDirector, allDevelopers);

      positions.forEach((pos, id) => {
        expect(pos.x).toBeGreaterThanOrEqual(0);
        expect(pos.y).toBeGreaterThanOrEqual(0);
        expect(Number.isFinite(pos.x)).toBe(true);
        expect(Number.isFinite(pos.y)).toBe(true);
      });
    });
  });

  describe('calculateHierarchicalConnections', () => {
    it('crée des connexions entre directeur et managers', () => {
      const positions = calculateHierarchicalLayout(mockDirector, allDevelopers);
      const connections = calculateHierarchicalConnections(
        mockDirector,
        allDevelopers,
        positions
      );

      // Doit y avoir au moins des connexions pour la structure T
      expect(connections.length).toBeGreaterThan(0);
    });

    it('crée des connexions entre managers et développeurs', () => {
      const positions = calculateHierarchicalLayout(mockDirector, allDevelopers);
      const connections = calculateHierarchicalConnections(
        mockDirector,
        allDevelopers,
        positions
      );

      // Vérifier qu'il y a des connexions (au moins 3: dir->horizontal, horizontale, mgr->dev)
      expect(connections.length).toBeGreaterThanOrEqual(3);
    });

    it('génère des connexions avec des coordonnées valides', () => {
      const positions = calculateHierarchicalLayout(mockDirector, allDevelopers);
      const connections = calculateHierarchicalConnections(
        mockDirector,
        allDevelopers,
        positions
      );

      connections.forEach((conn) => {
        expect(conn.type).toBe('line');
        expect(Number.isFinite(conn.x1)).toBe(true);
        expect(Number.isFinite(conn.y1)).toBe(true);
        expect(Number.isFinite(conn.x2)).toBe(true);
        expect(Number.isFinite(conn.y2)).toBe(true);
      });
    });

    it('retourne un tableau vide si pas de positions', () => {
      const emptyPositions = new Map();
      const connections = calculateHierarchicalConnections(
        mockDirector,
        allDevelopers,
        emptyPositions
      );

      expect(connections).toEqual([]);
    });

    it('gère le cas sans managers', () => {
      const positions = new Map();
      positions.set(mockDirector.id, { x: 100, y: 50 });

      const connections = calculateHierarchicalConnections(
        mockDirector,
        [],
        positions
      );

      // Pas de managers = pas de connexions
      expect(connections.length).toBe(0);
    });
  });

  describe('calculateHierarchicalDimensions', () => {
    it('calcule les dimensions totales nécessaires', () => {
      const positions = calculateHierarchicalLayout(mockDirector, allDevelopers);
      const dimensions = calculateHierarchicalDimensions(positions);

      expect(dimensions.width).toBeGreaterThan(0);
      expect(dimensions.height).toBeGreaterThan(0);
      expect(Number.isFinite(dimensions.width)).toBe(true);
      expect(Number.isFinite(dimensions.height)).toBe(true);
    });

    it('inclut du padding dans les dimensions', () => {
      const positions = new Map();
      positions.set('test-1', { x: 0, y: 0 });

      const dimensions = calculateHierarchicalDimensions(positions);

      // Devrait avoir du padding (100px + card width/height)
      expect(dimensions.width).toBeGreaterThan(240); // Card width
      expect(dimensions.height).toBeGreaterThan(70); // Card height
    });

    it('gère une map vide', () => {
      const emptyPositions = new Map();
      const dimensions = calculateHierarchicalDimensions(emptyPositions);

      // Devrait retourner les minimums (padding)
      expect(dimensions.width).toBe(100);
      expect(dimensions.height).toBe(100);
    });

    it('adapte les dimensions au nombre de personnes', () => {
      const smallLayout = calculateHierarchicalLayout(mockDirector, mockManagers);
      const largeLayout = calculateHierarchicalLayout(mockDirector, allDevelopers);

      const smallDimensions = calculateHierarchicalDimensions(smallLayout);
      const largeDimensions = calculateHierarchicalDimensions(largeLayout);

      // Le layout avec plus de personnes devrait être plus grand
      expect(largeDimensions.height).toBeGreaterThanOrEqual(smallDimensions.height);
    });
  });

  describe('Cas limites et edge cases', () => {
    it('gère les métiers avec caractères spéciaux', () => {
      const specialCraftManager = {
        id: 'mgr-test',
        craft: 'Test auto',
        isManager: true,
      };

      const positions = calculateHierarchicalLayout(
        mockDirector,
        [specialCraftManager]
      );

      expect(positions.has('mgr-test')).toBe(true);
    });

    it('gère beaucoup de développeurs sous un manager', () => {
      const manyDevs = Array.from({ length: 20 }, (_, i) => ({
        id: `dev-${i}`,
        craft: 'Cloud',
        isManager: false,
        managerId: 'mgr-cloud-1',
      }));

      const positions = calculateHierarchicalLayout(
        mockDirector,
        [...mockManagers, ...manyDevs]
      );

      // Tous les devs doivent avoir une position
      manyDevs.forEach(dev => {
        expect(positions.has(dev.id)).toBe(true);
      });
    });

    it('gère plusieurs managers du même craft', () => {
      const multipleCloudManagers = [
        { id: 'mgr-cloud-1', craft: 'Cloud', isManager: true },
        { id: 'mgr-cloud-2', craft: 'Cloud', isManager: true },
      ];

      const positions = calculateHierarchicalLayout(
        mockDirector,
        multipleCloudManagers
      );

      const mgr1Pos = positions.get('mgr-cloud-1');
      const mgr2Pos = positions.get('mgr-cloud-2');

      // Doivent être au même niveau Y
      expect(mgr1Pos.y).toBe(mgr2Pos.y);
      
      // Doivent être séparés horizontalement
      expect(mgr1Pos.x).not.toBe(mgr2Pos.x);
    });
  });

  describe('Intégration complète', () => {
    it('calcule un layout complet cohérent', () => {
      // Test d'intégration: layout + connections + dimensions
      const positions = calculateHierarchicalLayout(mockDirector, allDevelopers);
      const connections = calculateHierarchicalConnections(
        mockDirector,
        allDevelopers,
        positions
      );
      const dimensions = calculateHierarchicalDimensions(positions);

      // Vérifications de cohérence
      expect(positions.size).toBe(6); // 1 dir + 2 mgr + 3 dev
      expect(connections.length).toBeGreaterThan(0);
      expect(dimensions.width).toBeGreaterThan(0);
      expect(dimensions.height).toBeGreaterThan(0);

      // Les connexions doivent référencer des positions existantes
      const allX = Array.from(positions.values()).map(p => p.x);
      const allY = Array.from(positions.values()).map(p => p.y);

      connections.forEach(conn => {
        // Les coords de connexion doivent être dans la plage des positions
        expect(conn.x1).toBeGreaterThanOrEqual(Math.min(...allX) - 200);
        expect(conn.x1).toBeLessThanOrEqual(Math.max(...allX) + 200);
      });
    });
  });
});
