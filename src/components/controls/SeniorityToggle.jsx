import React from 'react';
import { Award } from 'lucide-react';
import styles from './SeniorityToggle.module.css';

/**
 * SeniorityToggle - Switch moderne pour afficher/masquer les niveaux de séniorité
 *
 * Toggle animé style iOS/macOS avec label et icône
 *
 * @param {Object} props
 * @param {boolean} props.enabled - État du toggle (activé/désactivé)
 * @param {Function} props.onChange - Callback appelé lors du changement d'état
 * @returns {JSX.Element}
 */
function SeniorityToggle({ enabled, onChange }) {
  const handleKeyDown = (e) => {
    // Support clavier: Enter et Space
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(!enabled);
    }
  };

  return (
    <label className={styles.toggleContainer}>
      <Award size={16} className={styles.icon} aria-hidden="true" />
      <span className={styles.label} id="seniority-label">Séniorité</span>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-labelledby="seniority-label"
        aria-label={enabled ? "Masquer les niveaux de séniorité" : "Afficher les niveaux de séniorité"}
        className={`${styles.switch} ${enabled ? styles.enabled : ''}`}
        onClick={() => onChange(!enabled)}
        onKeyDown={handleKeyDown}
      >
        <span className={styles.slider} aria-hidden="true" />
      </button>
    </label>
  );
}

export default SeniorityToggle;
