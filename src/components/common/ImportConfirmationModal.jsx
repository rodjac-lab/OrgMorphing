import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import styles from './ImportConfirmationModal.module.css';

/**
 * ImportConfirmationModal - Modal de confirmation d'import
 *
 * Affiche un résumé des changements avant d'importer les données
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal ouvert/fermé
 * @param {Function} props.onClose - Callback pour fermer
 * @param {Function} props.onConfirm - Callback pour confirmer l'import
 * @param {Object} props.summary - Résumé des changements
 * @param {Array} props.errors - Liste des erreurs de validation
 * @returns {JSX.Element}
 */
function ImportConfirmationModal({ isOpen, onClose, onConfirm, summary, errors = [] }) {
  if (!isOpen) return null;

  const hasErrors = errors && errors.length > 0;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            {hasErrors ? 'Erreurs de validation' : 'Confirmer l\'import'}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {hasErrors ? (
            // Erreurs
            <div className={styles.errorsSection}>
              <div className={styles.errorIcon}>
                <AlertCircle size={48} color="#EF4444" />
              </div>
              <p className={styles.errorMessage}>
                Le fichier contient des erreurs qui doivent être corrigées avant l'import.
              </p>
              <div className={styles.errorList}>
                {errors.slice(0, 10).map((error, index) => (
                  <div key={index} className={styles.errorItem}>
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                ))}
                {errors.length > 10 && (
                  <p className={styles.moreErrors}>
                    ... et {errors.length - 10} autre(s) erreur(s)
                  </p>
                )}
              </div>
            </div>
          ) : (
            // Résumé
            <div className={styles.summarySection}>
              <div className={styles.successIcon}>
                <CheckCircle size={48} color="#10B981" />
              </div>
              <p className={styles.summaryMessage}>
                Le fichier a été validé avec succès. Voici les changements qui seront appliqués :
              </p>
              <div className={styles.stats}>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>{summary?.total || 0}</div>
                  <div className={styles.statLabel}>Développeurs total</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>{summary?.added || 0}</div>
                  <div className={styles.statLabel}>Nouveaux</div>
                </div>
              </div>
              <div className={styles.warning}>
                <AlertCircle size={16} />
                <span>Cette action remplacera les données actuelles.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose}>
            {hasErrors ? 'Fermer' : 'Annuler'}
          </button>
          {!hasErrors && (
            <button className={styles.confirmButton} onClick={onConfirm}>
              Confirmer l'import
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImportConfirmationModal;
