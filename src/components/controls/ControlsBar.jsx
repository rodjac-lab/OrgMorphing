import React from 'react';
import styles from './ControlsBar.module.css';
import ViewToggle from './ViewToggle.jsx';
import SeniorityToggle from './SeniorityToggle.jsx';
import ZoomControls from '../common/ZoomControls.jsx';

/**
 * ControlsBar - Barre de contrôles principale de l'application
 *
 * Contient tous les contrôles de navigation et d'affichage:
 * - Basculement entre vues (hiérarchique/fonctionnelle)
 * - Toggle d'affichage de la séniorité
 * - Contrôles de zoom
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
  onZoomReset
}) {
  return (
    <div className={styles.controlsBar}>
      <div className={styles.leftSection}>
        <h1 className={styles.title}>Outil de Visualisation Organisationnelle</h1>
        <div className={styles.viewIndicator}>
          {currentView === 'hierarchical' && (
            <span className={styles.indicator}>🏢 Vue Hiérarchique</span>
          )}
          {currentView === 'functional' && (
            <span className={styles.indicator}>🎯 Vue Fonctionnelle</span>
          )}
        </div>
      </div>

      <div className={styles.rightSection}>
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
      </div>
    </div>
  );
}

export default ControlsBar;
