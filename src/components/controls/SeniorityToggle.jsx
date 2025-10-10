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
  return (
    <label className={styles.toggleContainer}>
      <Award size={16} className={styles.icon} />
      <span className={styles.label}>Séniorité</span>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label="Afficher la séniorité"
        className={`${styles.switch} ${enabled ? styles.enabled : ''}`}
        onClick={() => onChange(!enabled)}
      >
        <span className={styles.slider} />
      </button>
    </label>
  );
}

export default SeniorityToggle;
