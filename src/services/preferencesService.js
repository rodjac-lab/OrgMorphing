/**
 * Service de gestion des préférences utilisateur
 *
 * Persiste les préférences dans LocalStorage pour mémoriser les choix de l'utilisateur
 * entre les sessions (vue active, affichage séniorité, zoom)
 */

const PREFERENCES_KEY = 'org_morphing_preferences';

const DEFAULT_PREFERENCES = {
  currentView: 'hierarchical', // 'hierarchical' | 'functional'
  showSeniority: false,
  zoom: 1
};

/**
 * Charge les préférences depuis LocalStorage
 * @returns {Object} Préférences de l'utilisateur
 */
export function loadPreferences() {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (!stored) {
      return { ...DEFAULT_PREFERENCES };
    }

    const preferences = JSON.parse(stored);

    // Merge avec les valeurs par défaut pour gérer les nouvelles préférences
    return {
      ...DEFAULT_PREFERENCES,
      ...preferences
    };
  } catch (error) {
    console.warn('Erreur lors du chargement des préférences:', error);
    return { ...DEFAULT_PREFERENCES };
  }
}

/**
 * Sauvegarde les préférences dans LocalStorage
 * @param {Object} preferences - Préférences à sauvegarder
 */
export function savePreferences(preferences) {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn('Erreur lors de la sauvegarde des préférences:', error);
  }
}

/**
 * Sauvegarde une préférence spécifique
 * @param {string} key - Clé de la préférence
 * @param {*} value - Valeur à sauvegarder
 */
export function savePreference(key, value) {
  const current = loadPreferences();
  savePreferences({
    ...current,
    [key]: value
  });
}

/**
 * Récupère une préférence spécifique
 * @param {string} key - Clé de la préférence
 * @returns {*} Valeur de la préférence
 */
export function getPreference(key) {
  const preferences = loadPreferences();
  return preferences[key];
}

/**
 * Réinitialise les préférences aux valeurs par défaut
 */
export function resetPreferences() {
  try {
    localStorage.removeItem(PREFERENCES_KEY);
  } catch (error) {
    console.warn('Erreur lors de la réinitialisation des préférences:', error);
  }
}

/**
 * Hook personnalisé pour utiliser les préférences dans un composant React
 * (à utiliser avec useState et useEffect)
 */
export const preferencesService = {
  load: loadPreferences,
  save: savePreferences,
  saveOne: savePreference,
  getOne: getPreference,
  reset: resetPreferences,
  defaults: DEFAULT_PREFERENCES
};

export default preferencesService;
