import React from 'react';
import { Building2, Users } from 'lucide-react';
import styles from './ViewToggle.module.css';

/**
 * ViewToggle - Bouton de bascule entre vue hiérarchique et fonctionnelle
 *
 * Design moderne avec animation de slide, style segmented control (iOS/macOS)
 *
 * @param {Object} props
 * @param {string} props.currentView - Vue active ('hierarchical' ou 'functional')
 * @param {Function} props.onViewChange - Callback appelé lors du changement de vue
 * @returns {JSX.Element}
 */
function ViewToggle({ currentView, onViewChange }) {
  return (
    <div className={styles.viewToggle} role="tablist" aria-label="Sélection de vue">
      <button
        className={`${styles.toggleButton} ${currentView === 'hierarchical' ? styles.active : ''}`}
        onClick={() => onViewChange('hierarchical')}
        role="tab"
        aria-selected={currentView === 'hierarchical'}
        aria-label="Vue hiérarchique"
      >
        <Building2 size={16} />
        <span>Hiérarchique</span>
      </button>

      <button
        className={`${styles.toggleButton} ${currentView === 'functional' ? styles.active : ''}`}
        onClick={() => onViewChange('functional')}
        role="tab"
        aria-selected={currentView === 'functional'}
        aria-label="Vue fonctionnelle"
      >
        <Users size={16} />
        <span>Fonctionnelle</span>
      </button>

      {/* Indicateur de slide */}
      <div
        className={styles.activeIndicator}
        style={{
          transform: currentView === 'functional' ? 'translateX(100%)' : 'translateX(0)'
        }}
      />
    </div>
  );
}

export default ViewToggle;
