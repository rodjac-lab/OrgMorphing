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
  const handleKeyDown = (e, view) => {
    // Support clavier: Enter et Space
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onViewChange(view);
    }
    // Support navigation avec flèches
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const newView = view === 'hierarchical' ? 'functional' : 'hierarchical';
      onViewChange(newView);
    }
  };

  return (
    <div className={styles.viewToggle} role="tablist" aria-label="Sélection de vue">
      <button
        className={`${styles.toggleButton} ${currentView === 'hierarchical' ? styles.active : ''}`}
        onClick={() => onViewChange('hierarchical')}
        onKeyDown={(e) => handleKeyDown(e, 'hierarchical')}
        role="tab"
        aria-selected={currentView === 'hierarchical'}
        aria-controls="view-panel"
        aria-label="Vue hiérarchique - Organisation par métier"
        tabIndex={currentView === 'hierarchical' ? 0 : -1}
      >
        <Building2 size={16} aria-hidden="true" />
        <span>Hiérarchique</span>
      </button>

      <button
        className={`${styles.toggleButton} ${currentView === 'functional' ? styles.active : ''}`}
        onClick={() => onViewChange('functional')}
        onKeyDown={(e) => handleKeyDown(e, 'functional')}
        role="tab"
        aria-selected={currentView === 'functional'}
        aria-controls="view-panel"
        aria-label="Vue fonctionnelle - Organisation par squad"
        tabIndex={currentView === 'functional' ? 0 : -1}
      >
        <Users size={16} aria-hidden="true" />
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
