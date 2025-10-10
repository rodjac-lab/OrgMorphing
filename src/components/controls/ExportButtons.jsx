import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import styles from './ExportButtons.module.css';
import { exportToXLSX, exportTemplateXLSX } from '../../services/xlsxService.js';
import ImportButton from './ImportButton.jsx';
import ImportConfirmationModal from '../common/ImportConfirmationModal.jsx';
import { importFromXLSX } from '../../services/xlsxService.js';

/**
 * ExportButtons - Boutons d'export/import XLSX
 *
 * @param {Object} props
 * @param {Object} props.orgData - Données de l'organisation
 * @param {Function} props.onDataImported - Callback appelé après import réussi
 * @returns {JSX.Element}
 */
function ExportButtons({ orgData, onDataImported }) {
  const [isExporting, setIsExporting] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    summary: null,
    errors: null,
    importedData: null
  });

  const handleExportData = () => {
    setIsExporting(true);
    try {
      const result = exportToXLSX(orgData);
      console.log('Export XLSX réussi:', result);
      setTimeout(() => setIsExporting(false), 1000);
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      setIsExporting(false);
    }
  };

  const handleExportTemplate = () => {
    try {
      exportTemplateXLSX();
      console.log('Template XLSX exporté avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'export du template:', error);
    }
  };

  const handleFileSelect = async (file) => {
    try {
      const result = await importFromXLSX(file, orgData);

      // Ouvrir le modal avec le résumé
      setModalState({
        isOpen: true,
        summary: result.summary,
        errors: null,
        importedData: result.developers
      });
    } catch (error) {
      // Ouvrir le modal avec les erreurs
      setModalState({
        isOpen: true,
        summary: null,
        errors: error.errors || ['Erreur inconnue'],
        importedData: null
      });
    }
  };

  const handleConfirmImport = () => {
    if (modalState.importedData && onDataImported) {
      onDataImported(modalState.importedData);
    }
    setModalState({ isOpen: false, summary: null, errors: null, importedData: null });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, summary: null, errors: null, importedData: null });
  };

  return (
    <>
      <div className={styles.exportButtons}>
        <button
          className={styles.exportButton}
          onClick={handleExportData}
          disabled={isExporting}
          title="Exporter les données actuelles en Excel"
        >
          <Download size={16} />
          <span className={styles.label}>Exporter</span>
        </button>

        <button
          className={styles.templateButton}
          onClick={handleExportTemplate}
          title="Télécharger un template Excel vide avec exemples"
        >
          <FileText size={16} />
          <span className={styles.label}>Template</span>
        </button>

        <ImportButton onFileSelect={handleFileSelect} />
      </div>

      <ImportConfirmationModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmImport}
        summary={modalState.summary}
        errors={modalState.errors}
      />
    </>
  );
}

export default ExportButtons;
