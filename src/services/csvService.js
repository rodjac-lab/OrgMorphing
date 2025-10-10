/**
 * Service de gestion des exports/imports CSV
 *
 * Permet d'exporter et d'importer les données organisationnelles au format CSV
 * Compatible avec Excel, Numbers, Google Sheets
 */

import Papa from 'papaparse';

/**
 * Télécharge un fichier CSV
 * @param {string} content - Contenu CSV
 * @param {string} filename - Nom du fichier
 */
function downloadCSV(content, filename) {
  // Ajouter BOM UTF-8 pour support Excel des caractères accentués
  const BOM = '\ufeff';
  const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8;' });
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
 * @param {string} managerId - ID du manager
 * @param {Array} developers - Liste de tous les développeurs
 * @returns {string} Nom complet du manager
 */
function findManagerName(managerId, developers) {
  if (!managerId) return '';
  const manager = developers.find(d => d.id === managerId);
  return manager ? `${manager.firstName} ${manager.lastName}` : '';
}

/**
 * Trouve le nom d'une squad par son ID
 * @param {string} squadId - ID de la squad
 * @param {Array} squads - Liste de toutes les squads
 * @returns {string} Nom de la squad
 */
function findSquadName(squadId, squads) {
  if (!squadId) return '';
  const squad = squads.find(s => s.id === squadId);
  return squad ? squad.name : '';
}

/**
 * Exporte les données organisationnelles actuelles en CSV
 *
 * @param {Object} orgData - Données de l'organisation
 * @param {Array} orgData.developers - Liste des développeurs et managers
 * @param {Array} orgData.squads - Liste des squads
 * @returns {void}
 */
export function exportToCSV(orgData) {
  const { developers, squads } = orgData;

  // Transformer les données en format CSV
  const rows = developers
    .filter(dev => !dev.isManager) // Exporter uniquement les développeurs (pas les managers dans cette version)
    .map(dev => ({
      Nom: dev.lastName,
      Prénom: dev.firstName,
      Métier: dev.craft,
      Séniorité: dev.seniority,
      LeadDev: dev.isLeadDev ? 'Oui' : 'Non',
      TechLead: dev.isTechLead ? 'Oui' : 'Non',
      ScrumMaster: dev.isScrumMaster ? 'Oui' : 'Non',
      Manager: findManagerName(dev.managerId, developers),
      Squad: findSquadName(dev.squadId, squads)
    }));

  // Générer le CSV avec PapaParse
  const csv = Papa.unparse(rows, {
    header: true,
    delimiter: ',',
    newline: '\r\n' // Windows-style pour meilleure compatibilité Excel
  });

  // Générer le nom de fichier avec timestamp
  const timestamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const filename = `org_export_${timestamp}.csv`;

  // Télécharger
  downloadCSV(csv, filename);

  console.log(`✅ Export CSV réussi: ${rows.length} développeurs exportés`);
  return { success: true, count: rows.length, filename };
}

/**
 * Exporte un template CSV vide avec exemples
 *
 * Utilisé pour la première saisie ou comme référence de format
 *
 * @returns {void}
 */
export function exportTemplateCSV() {
  // Template avec 3 exemples commentés
  const template = [
    {
      Nom: 'Dupont',
      Prénom: 'Jean',
      Métier: 'Cloud',
      Séniorité: '3',
      LeadDev: 'Non',
      TechLead: 'Oui',
      ScrumMaster: 'Non',
      Manager: 'Martin Pierre',
      Squad: 'Squad Alpha'
    },
    {
      Nom: 'Chen',
      Prénom: 'Alice',
      Métier: 'Mobile',
      Séniorité: '4',
      LeadDev: 'Oui',
      TechLead: 'Non',
      ScrumMaster: 'Non',
      Manager: 'Dubois Marie',
      Squad: 'Squad Beta'
    },
    {
      Nom: 'Garcia',
      Prénom: 'Carlos',
      Métier: 'Embarqué',
      Séniorité: '2',
      LeadDev: 'Non',
      TechLead: 'Non',
      ScrumMaster: 'Oui',
      Manager: 'Laurent Sophie',
      Squad: 'Squad Gamma'
    }
  ];

  // Générer le CSV
  const csv = Papa.unparse(template, {
    header: true,
    delimiter: ',',
    newline: '\r\n'
  });

  // Ajouter des commentaires en haut (préfixés par #)
  const instructions = `# Template CSV - Outil de Visualisation Organisationnelle
#
# Instructions:
# - Métier: Cloud | Mobile | Embarqué | Test auto | Infra
# - Séniorité: 1 | 2 | 3 | 4
# - LeadDev, TechLead, ScrumMaster: Oui | Non
# - Manager: Prénom Nom du manager
# - Squad: Nom de la squad
#
# Supprimez ces lignes de commentaires avant d'importer
# Vous pouvez modifier les exemples ci-dessous ou les supprimer et ajouter vos propres lignes
#
`;

  const csvWithInstructions = instructions + csv;

  // Télécharger
  downloadCSV(csvWithInstructions, 'org_template.csv');

  console.log('✅ Template CSV téléchargé');
  return { success: true };
}

/**
 * Exporte toutes les données (développeurs + managers + squads)
 * Version complète pour backup
 *
 * @param {Object} orgData - Données complètes
 * @returns {void}
 */
export function exportFullDataCSV(orgData) {
  const { developers, squads, director, rte } = orgData;

  // Tous les développeurs et managers
  const rows = developers.map(dev => ({
    Nom: dev.lastName,
    Prénom: dev.firstName,
    Métier: dev.craft,
    Séniorité: dev.seniority,
    IsManager: dev.isManager ? 'Oui' : 'Non',
    ManagerTimePercent: dev.isManager ? dev.managerTimePercent : '0',
    LeadDev: dev.isLeadDev ? 'Oui' : 'Non',
    TechLead: dev.isTechLead ? 'Oui' : 'Non',
    ScrumMaster: dev.isScrumMaster ? 'Oui' : 'Non',
    Manager: findManagerName(dev.managerId, developers),
    Squad: findSquadName(dev.squadId, squads)
  }));

  const csv = Papa.unparse(rows, {
    header: true,
    delimiter: ',',
    newline: '\r\n'
  });

  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `org_full_backup_${timestamp}.csv`;

  downloadCSV(csv, filename);

  console.log(`✅ Export complet réussi: ${rows.length} personnes exportées`);
  return { success: true, count: rows.length, filename };
}

export default {
  exportToCSV,
  exportTemplateCSV,
  exportFullDataCSV
};
