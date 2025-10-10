import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import styles from './ExportButtons.module.css';
import { exportToCSV, exportTemplateCSV } from '../../services/csvService.js';

/**
 * ExportButtons - Boutons d'export CSV
 *
 * Permet d'exporter les données actuelles ou un template vide
 *
 * @param {Object} props
 * @param {Object} props.orgData - Données de l'organisation à exporter
 * @returns {JSX.Element}
 */
function ExportButtons({ orgData }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportData = () => {
    setIsExporting(true);
    try {
      const result = exportToCSV(orgData);
      // Feedback visuel temporaire (on pourrait ajouter un toast plus tard)
      console.log('Export réussi:', result);
      setTimeout(() => setIsExporting(false), 1000);
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      setIsExporting(false);
    }
  };

  const handleExportTemplate = () => {
    try {
      exportTemplateCSV();
      console.log('Template exporté avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'export du template:', error);
    }
  };

  return (
    <div className={styles.exportButtons}>
      <button
        className={styles.exportButton}
        onClick={handleExportData}
        disabled={isExporting}
        title="Exporter les données actuelles en CSV"
      >
        <Download size={16} />
        <span className={styles.label}>Exporter</span>
      </button>

      <button
        className={styles.templateButton}
        onClick={handleExportTemplate}
        title="Télécharger un template CSV vide avec exemples"
      >
        <FileText size={16} />
        <span className={styles.label}>Template</span>
      </button>
    </div>
  );
}

export default ExportButtons;
