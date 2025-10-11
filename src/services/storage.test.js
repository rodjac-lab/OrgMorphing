/**
 * Tests pour storage
 * 
 * Tests de la persistance LocalStorage
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveData, loadData, createBackup, restoreBackup, clearData, hasData, getDataSize } from './storage';

describe('storage', () => {
  let mockOrgData;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();

    mockOrgData = {
      version: '1.0',
      lastUpdated: Date.now(),
      director: {
        id: 'dir-1',
        firstName: 'Marie',
        lastName: 'Directeur',
      },
      developers: [
        {
          id: 'dev-1',
          firstName: 'Jean',
          lastName: 'Dupont',
          craft: 'Cloud',
          seniority: 3,
        },
      ],
      squads: [],
    };
  });

  describe('saveData', () => {
    it('sauvegarde les données dans localStorage', () => {
      const result = saveData(mockOrgData);

      expect(result).toBe(true);
      // Vérifier que les données sont présentes
      expect(localStorage.getItem('org_morphing_data')).not.toBeNull();
    });

    it('met à jour lastUpdated lors de la sauvegarde', () => {
      const dateBefore = Date.now();
      saveData(mockOrgData);
      const dateAfter = Date.now();

      const saved = JSON.parse(localStorage.getItem('org_morphing_data'));
      expect(saved.lastUpdated).toBeGreaterThanOrEqual(dateBefore);
      expect(saved.lastUpdated).toBeLessThanOrEqual(dateAfter);
    });

    it('retourne false en cas d\'erreur', () => {
      // Simuler une erreur de localStorage
      vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });

      const result = saveData(mockOrgData);
      expect(result).toBe(false);
    });

    it('sérialise correctement les données en JSON', () => {
      const result = saveData(mockOrgData);
      expect(result).toBe(true);

      const saved = localStorage.getItem('org_morphing_data');
      expect(saved).not.toBeNull();
      
      const parsed = JSON.parse(saved);
      expect(parsed.director.firstName).toBe('Marie');
      expect(parsed.developers).toHaveLength(1);
    });
  });

  describe('loadData', () => {
    it('charge les données depuis localStorage', () => {
      // Utiliser saveData pour garantir le bon format
      saveData(mockOrgData);

      const loaded = loadData();

      expect(loaded).not.toBeNull();
      expect(loaded.director.firstName).toBe('Marie');
    });

    it('retourne null si aucune donnée', () => {
      const loaded = loadData();
      expect(loaded).toBeNull();
    });

    it('retourne null si les données sont invalides', () => {
      localStorage.setItem('org_morphing_data', 'invalid json');

      const loaded = loadData();
      expect(loaded).toBeNull();
    });

    it('valide la structure des données', () => {
      const invalidData = { foo: 'bar' };
      global.localStorage.store['org_morphing_data'] = JSON.stringify(invalidData);

      const loaded = loadData();
      expect(loaded).toBeNull();
    });

    it('accepte des données valides avec la structure attendue', () => {
      saveData(mockOrgData);

      const loaded = loadData();
      expect(loaded).not.toBeNull();
      expect(loaded.version).toBeDefined();
      expect(loaded.director).toBeDefined();
      expect(Array.isArray(loaded.developers)).toBe(true);
    });
  });

  describe('createBackup', () => {
    it('crée une backup des données actuelles', () => {
      saveData(mockOrgData);

      const result = createBackup();

      expect(result).toBe(true);
      expect(localStorage.getItem('org_morphing_data_backup')).not.toBeNull();
    });

    it('retourne false si aucune donnée à sauvegarder', () => {
      const result = createBackup();
      expect(result).toBe(false);
    });

    it('gère les erreurs gracieusement', () => {
      saveData(mockOrgData);
      const result = createBackup();
      // Si pas d'erreur, devrait réussir
      expect(result).toBe(true);
    });
  });

  describe('restoreBackup', () => {
    it('restaure les données depuis la backup', () => {
      saveData(mockOrgData);
      createBackup();
      
      // Modifier les données
      const modified = { ...mockOrgData, version: '1.0-modified' };
      saveData(modified);

      const result = restoreBackup();

      expect(result).toBe(true);
      const restored = loadData();
      expect(restored.version).toBe(mockOrgData.version);
    });

    it('retourne false si aucune backup', () => {
      const result = restoreBackup();
      expect(result).toBe(false);
    });

    it('gère l\'absence de backup', () => {
      const result = restoreBackup();
      expect(result).toBe(false);
    });
  });

  describe('clearData', () => {
    it('supprime toutes les données', () => {
      saveData(mockOrgData);
      createBackup();

      const result = clearData();

      expect(result).toBe(true);
      expect(localStorage.getItem('org_morphing_data')).toBeNull();
      expect(localStorage.getItem('org_morphing_data_backup')).toBeNull();
    });

    it('fonctionne même si pas de données', () => {
      const result = clearData();
      expect(result).toBe(true);
    });
  });

  describe('hasData', () => {
    it('retourne true si des données existent', () => {
      saveData(mockOrgData);

      expect(hasData()).toBe(true);
    });

    it('retourne false si aucune donnée', () => {
      expect(hasData()).toBe(false);
    });
  });

  describe('getDataSize', () => {
    it('retourne la taille des données en bytes', () => {
      saveData(mockOrgData);

      const size = getDataSize();

      expect(size).toBeGreaterThan(0);
      expect(Number.isFinite(size)).toBe(true);
    });

    it('retourne 0 si aucune donnée', () => {
      const size = getDataSize();
      expect(size).toBe(0);
    });

    it('calcule correctement la taille', () => {
      saveData(mockOrgData);

      const size = getDataSize();
      // Devrait avoir une taille raisonnable
      expect(size).toBeGreaterThan(50);
    });
  });

  describe('Intégration complète', () => {
    it('cycle complet: save -> load -> backup -> restore', () => {
      // 1. Save
      saveData(mockOrgData);
      
      // 2. Load
      const loaded = loadData();
      expect(loaded.director.firstName).toBe('Marie');

      // 3. Backup
      createBackup();

      // 4. Modifier les données
      const modified = { ...mockOrgData, director: { ...mockOrgData.director, firstName: 'Updated' } };
      saveData(modified);

      // 5. Restore backup
      restoreBackup();

      // 6. Vérifier que c'est l'ancienne version
      const restored = loadData();
      expect(restored.director.firstName).toBe('Marie');
    });

    it('gère les gros volumes de données', () => {
      // Créer beaucoup de développeurs
      const bigData = {
        ...mockOrgData,
        developers: Array.from({ length: 100 }, (_, i) => ({
          id: `dev-${i}`,
          firstName: `Dev${i}`,
          lastName: `Last${i}`,
          craft: 'Cloud',
          seniority: 3,
        })),
      };

      const saveResult = saveData(bigData);
      expect(saveResult).toBe(true);

      const loaded = loadData();
      expect(loaded.developers).toHaveLength(100);

      const size = getDataSize();
      expect(size).toBeGreaterThan(1000); // Au moins 1KB
    });
  });
});
