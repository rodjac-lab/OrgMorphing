import React from 'react';
import { UserPlus } from 'lucide-react';
import styles from './ControlsBar.module.css';
import ViewToggle from './ViewToggle.jsx';
import SeniorityToggle from './SeniorityToggle.jsx';
import ZoomControls from '../common/ZoomControls.jsx';
import ExportButtons from './ExportButtons.jsx';

/**
 * ControlsBar - Barre de contrôles principale de l'application
 *
 * Contient tous les contrôles de navigation et d'affichage:
 * - Basculement entre vues (hiérarchique/fonctionnelle)
 * - Toggle d'affichage de la séniorité
 * - Contrôles de zoom
 * - Boutons d'export/import XLSX
 *
 * @param {Object} props
 * @param {string} props.currentView - Vue active ('hierarchical' ou 'functional')
 * @param {Function} props.onViewChange - Callback pour changer de vue
 * @param {boolean} props.showSeniority - État du toggle séniorité
 * @param {Function} props.onSeniorityToggle - Callback pour le toggle séniorité
 * @param {number} props.zoom - Niveau de zoom actuel
 * @param {Function} props.onZoomIn - Callback pour zoomer
 * @param {Function} props.onZoomOut - Callback pour dézoomer
 * @param {Function} props.onZoomReset - Callback pour réinitialiser le zoom
 * @param {Object} props.orgData - Données de l'organisation
 * @param {Function} props.onDataImported - Callback après import réussi
 * @param {Function} props.onAddDeveloper - Callback pour ajouter un développeur
 * @returns {JSX.Element}
 */
function ControlsBar({
  currentView,
  onViewChange,
  showSeniority,
  onSeniorityToggle,
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  orgData,
  onDataImported,
  onAddDeveloper
}) {
  return (
    <header className={styles.controlsBar} role="banner">
      {/* Skip link pour navigation rapide */}
      <a href="#main-content" className={styles.skipLink}>
        Aller au contenu principal
      </a>

      <div className={styles.leftSection}>
        <h1 className={styles.title}>Outil de Visualisation Organisationnelle</h1>
      </div>

      <nav className={styles.rightSection} aria-label="Navigation principale">
        <button
          className={styles.addButton}
          onClick={onAddDeveloper}
          aria-label="Ajouter un nouveau développeur"
        >
          <UserPlus size={18} aria-hidden="true" />
          <span>Ajouter</span>
        </button>

        <div className={styles.divider} />

        <ViewToggle
          currentView={currentView}
          onViewChange={onViewChange}
        />

        <div className={styles.divider} />

        <SeniorityToggle
          enabled={showSeniority}
          onChange={onSeniorityToggle}
        />

        <div className={styles.divider} />

        <ZoomControls
          zoom={zoom}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onZoomReset={onZoomReset}
        />

        <div className={styles.divider} />

        <ExportButtons orgData={orgData} onDataImported={onDataImported} />
      </nav>
    </header>
  );
}

export default ControlsBar;
