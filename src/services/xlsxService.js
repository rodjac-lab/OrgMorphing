/**
 * Service de gestion des imports/exports XLSX
 *
 * Permet d'exporter et d'importer les données organisationnelles au format Excel natif
 * Utilise la librairie xlsx (SheetJS) pour manipulation des fichiers Excel
 */

import * as XLSX from 'xlsx';

/**
 * Télécharge un fichier XLSX
 * @param {Object} workbook - Workbook XLSX
 * @param {string} filename - Nom du fichier
 */
function downloadXLSX(workbook, filename) {
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Trouve le nom d'un manager par son ID
 */
function findManagerName(managerId, developers) {
  if (!managerId) return '';
  const manager = developers.find(d => d.id === managerId);
  return manager ? `${manager.firstName} ${manager.lastName}` : '';
}

/**
 * Trouve le nom d'une squad par son ID
 */
function findSquadName(squadId, squads) {
  if (!squadId) return '';
  const squad = squads.find(s => s.id === squadId);
  return squad ? squad.name : '';
}

/**
 * Exporte les données organisationnelles en XLSX
 *
 * @param {Object} orgData - Données de l'organisation
 * @returns {Object} Résultat de l'export
 */
export function exportToXLSX(orgData) {
  const { developers, squads } = orgData;

  // Préparer les données
  const data = developers
    .filter(dev => !dev.isManager)
    .map(dev => ({
      'Nom': dev.lastName,
      'Prénom': dev.firstName,
      'Métier': dev.craft,
      'Séniorité': dev.seniority,
      'Lead Dev': dev.isLeadDev ? 'Oui' : 'Non',
      'Tech Lead': dev.isTechLead ? 'Oui' : 'Non',
      'Scrum Master': dev.isScrumMaster ? 'Oui' : 'Non',
      'Manager': findManagerName(dev.managerId, developers),
      'Squad': findSquadName(dev.squadId, squads)
    }));

  // Créer le workbook et la feuille
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Développeurs');

  // Définir la largeur des colonnes
  const colWidths = [
    { wch: 15 }, // Nom
    { wch: 15 }, // Prénom
    { wch: 12 }, // Métier
    { wch: 10 }, // Séniorité
    { wch: 10 }, // Lead Dev
    { wch: 10 }, // Tech Lead
    { wch: 13 }, // Scrum Master
    { wch: 20 }, // Manager
    { wch: 15 }  // Squad
  ];
  ws['!cols'] = colWidths;

  // Générer le nom de fichier avec timestamp
  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `org_export_${timestamp}.xlsx`;

  // Télécharger
  downloadXLSX(wb, filename);

  console.log(`✅ Export XLSX réussi: ${data.length} développeurs exportés`);
  return { success: true, count: data.length, filename };
}

/**
 * Exporte un template XLSX vide avec exemples et formatage
 *
 * @returns {Object} Résultat de l'export
 */
export function exportTemplateXLSX() {
  // Données d'exemple
  const template = [
    {
      'Nom': 'Dupont',
      'Prénom': 'Jean',
      'Métier': 'Cloud',
      'Séniorité': 3,
      'Lead Dev': 'Non',
      'Tech Lead': 'Oui',
      'Scrum Master': 'Non',
      'Manager': 'Martin Pierre',
      'Squad': 'Squad Alpha'
    },
    {
      'Nom': 'Chen',
      'Prénom': 'Alice',
      'Métier': 'Mobile',
      'Séniorité': 4,
      'Lead Dev': 'Oui',
      'Tech Lead': 'Non',
      'Scrum Master': 'Non',
      'Manager': 'Dubois Marie',
      'Squad': 'Squad Beta'
    },
    {
      'Nom': 'Garcia',
      'Prénom': 'Carlos',
      'Métier': 'Embarqué',
      'Séniorité': 2,
      'Lead Dev': 'Non',
      'Tech Lead': 'Non',
      'Scrum Master': 'Oui',
      'Manager': 'Laurent Sophie',
      'Squad': 'Squad Gamma'
    }
  ];

  // Créer la feuille principale
  const ws = XLSX.utils.json_to_sheet(template);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Développeurs');

  // Définir la largeur des colonnes
  const colWidths = [
    { wch: 15 }, // Nom
    { wch: 15 }, // Prénom
    { wch: 12 }, // Métier
    { wch: 10 }, // Séniorité
    { wch: 10 }, // Lead Dev
    { wch: 10 }, // Tech Lead
    { wch: 13 }, // Scrum Master
    { wch: 20 }, // Manager
    { wch: 15 }  // Squad
  ];
  ws['!cols'] = colWidths;

  // Créer une feuille d'instructions
  const instructions = [
    { 'Instructions': 'Outil de Visualisation Organisationnelle - Template' },
    { 'Instructions': '' },
    { 'Instructions': 'Comment utiliser ce template:' },
    { 'Instructions': '1. Remplissez la feuille "Développeurs" avec vos données' },
    { 'Instructions': '2. Vous pouvez supprimer les exemples et ajouter vos lignes' },
    { 'Instructions': '3. Sauvegardez le fichier' },
    { 'Instructions': '4. Importez-le dans l\'application' },
    { 'Instructions': '' },
    { 'Instructions': 'Valeurs acceptées:' },
    { 'Instructions': '- Métier: Cloud | Mobile | Embarqué | Test auto | Infra' },
    { 'Instructions': '- Séniorité: 1 | 2 | 3 | 4' },
    { 'Instructions': '- Lead Dev, Tech Lead, Scrum Master: Oui | Non' },
    { 'Instructions': '- Manager: Prénom Nom du manager' },
    { 'Instructions': '- Squad: Nom de la squad' }
  ];

  const wsInstructions = XLSX.utils.json_to_sheet(instructions);
  wsInstructions['!cols'] = [{ wch: 70 }];
  XLSX.utils.book_append_sheet(wb, wsInstructions, 'Instructions');

  // Télécharger
  downloadXLSX(wb, 'org_template.xlsx');

  console.log('✅ Template XLSX téléchargé');
  return { success: true };
}

/**
 * Valide une ligne de données importée
 *
 * @param {Object} row - Ligne de données
 * @param {number} lineNumber - Numéro de ligne
 * @returns {Array} Liste des erreurs trouvées
 */
function validateRow(row, lineNumber) {
  const errors = [];
  const VALID_CRAFTS = ['Cloud', 'Mobile', 'Embarqué', 'Test auto', 'Infra'];
  const VALID_SENIORITY = [1, 2, 3, 4, '1', '2', '3', '4'];
  const VALID_BOOLEAN = ['Oui', 'Non', 'oui', 'non', 'OUI', 'NON'];

  // Vérification des champs obligatoires
  if (!row['Nom'] || !row['Prénom']) {
    errors.push(`Ligne ${lineNumber}: Nom ou Prénom manquant`);
  }

  // Vérification Métier
  if (!row['Métier'] || !VALID_CRAFTS.includes(row['Métier'])) {
    errors.push(`Ligne ${lineNumber}: Métier invalide ou manquant (${row['Métier'] || 'vide'}). Valeurs acceptées: ${VALID_CRAFTS.join(', ')}`);
  }

  // Vérification Séniorité
  const seniority = parseInt(row['Séniorité']);
  if (!VALID_SENIORITY.includes(row['Séniorité']) && !VALID_SENIORITY.includes(seniority)) {
    errors.push(`Ligne ${lineNumber}: Séniorité invalide (${row['Séniorité']}). Valeurs acceptées: 1, 2, 3, 4`);
  }

  // Vérification booléens
  ['Lead Dev', 'Tech Lead', 'Scrum Master'].forEach(field => {
    if (row[field] && !VALID_BOOLEAN.includes(row[field])) {
      errors.push(`Ligne ${lineNumber}: ${field} invalide (${row[field]}). Valeurs acceptées: Oui, Non`);
    }
  });

  return errors;
}

/**
 * Importe des données depuis un fichier XLSX
 *
 * @param {File} file - Fichier XLSX à importer
 * @param {Object} existingData - Données existantes pour comparaison
 * @returns {Promise} Résultat de l'import avec validation
 */
export function importFromXLSX(file, existingData) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Lire la première feuille
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convertir en JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length === 0) {
          reject({ errors: ['Le fichier est vide ou mal formaté'] });
          return;
        }

        // Validation des données
        const validationErrors = [];
        jsonData.forEach((row, index) => {
          const rowErrors = validateRow(row, index + 2); // +2 car ligne 1 = headers
          validationErrors.push(...rowErrors);
        });

        if (validationErrors.length > 0) {
          reject({ errors: validationErrors });
          return;
        }

        // Transformation en objets Developer
        const developers = jsonData.map(row => ({
          id: crypto.randomUUID(), // Générer un nouvel ID
          firstName: row['Prénom'],
          lastName: row['Nom'],
          craft: row['Métier'],
          seniority: parseInt(row['Séniorité']),
          isLeadDev: row['Lead Dev']?.toLowerCase() === 'oui',
          isTechLead: row['Tech Lead']?.toLowerCase() === 'oui',
          isScrumMaster: row['Scrum Master']?.toLowerCase() === 'oui',
          managerName: row['Manager'] || '', // Nom texte, à résoudre plus tard
          squadName: row['Squad'] || '', // Nom texte, à résoudre plus tard
          isManager: false,
          managerTimePercent: 0
        }));

        // Calculer les changements
        const summary = {
          total: developers.length,
          added: developers.length, // Pour l'instant, tous sont nouveaux
          modified: 0,
          errors: 0
        };

        resolve({
          developers,
          summary,
          success: true
        });

      } catch (error) {
        reject({ errors: [`Erreur lors de la lecture du fichier: ${error.message}`] });
      }
    };

    reader.onerror = () => {
      reject({ errors: ['Erreur lors de la lecture du fichier'] });
    };

    reader.readAsArrayBuffer(file);
  });
}

export default {
  exportToXLSX,
  exportTemplateXLSX,
  importFromXLSX
};
