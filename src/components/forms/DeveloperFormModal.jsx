import { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import styles from './DeveloperFormModal.module.css';

const VALID_CRAFTS = ['Cloud', 'Mobile', 'Embarqué', 'Test auto', 'Infra', 'Backend', 'Frontend', 'Fullstack', 'DevOps', 'Data', 'QA'];
const SENIORITY_LEVELS = [
  { value: 1, label: 'Junior' },
  { value: 2, label: 'Confirmé' },
  { value: 3, label: 'Senior' },
  { value: 4, label: 'Expert' }
];

/**
 * Modal de formulaire pour créer/éditer un développeur
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal ouvert ou fermé
 * @param {Function} props.onClose - Callback de fermeture
 * @param {Function} props.onSave - Callback de sauvegarde (developer) => void
 * @param {Function} props.onDelete - Callback de suppression (developerId) => void
 * @param {Object} props.developer - Développeur à éditer (null pour création)
 * @param {Array} props.managers - Liste des managers disponibles
 * @param {Array} props.squads - Liste des squads disponibles
 */
export default function DeveloperFormModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  developer,
  managers,
  squads
}) {
  const isEditMode = !!developer;

  // État du formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    craft: 'Backend',
    seniority: 2,
    isLeadDev: false,
    isTechLead: false,
    isScrumMaster: false,
    managerId: '',
    squadId: ''
  });

  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Initialiser le formulaire avec les données du développeur en mode édition
  useEffect(() => {
    if (developer) {
      setFormData({
        firstName: developer.firstName || '',
        lastName: developer.lastName || '',
        craft: developer.craft || 'Backend',
        seniority: developer.seniority || 2,
        isLeadDev: developer.isLeadDev || false,
        isTechLead: developer.isTechLead || false,
        isScrumMaster: developer.isScrumMaster || false,
        managerId: developer.managerId || '',
        squadId: developer.squadId || ''
      });
    } else {
      // Reset pour mode création
      setFormData({
        firstName: '',
        lastName: '',
        craft: 'Cloud',
        seniority: 2,
        isLeadDev: false,
        isTechLead: false,
        isScrumMaster: false,
        managerId: managers[0]?.id || '',
        squadId: squads[0]?.id || ''
      });
    }
    setErrors({});
    setShowDeleteConfirm(false);
  }, [developer, managers, squads, isOpen]);

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    if (!VALID_CRAFTS.includes(formData.craft)) {
      newErrors.craft = 'Métier invalide';
    }

    if (formData.seniority < 1 || formData.seniority > 4) {
      newErrors.seniority = 'La séniorité doit être entre 1 et 4';
    }

    if (!formData.managerId) {
      newErrors.managerId = 'Veuillez sélectionner un manager';
    }

    // Squad est optionnelle (certains développeurs/managers ne sont pas rattachés à une squad)

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const developerData = {
      ...formData,
      id: developer?.id || `dev-${Date.now()}`,
      isManager: false
    };

    onSave(developerData);
    onClose();
  };

  const handleDelete = () => {
    if (developer?.id) {
      onDelete(developer.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isEditMode ? 'Éditer le développeur' : 'Ajouter un développeur'}
          </h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            type="button"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            {/* Nom */}
            <div className={styles.formGroup}>
              <label htmlFor="lastName" className={styles.label}>
                Nom <span className={styles.required}>*</span>
              </label>
              <input
                id="lastName"
                type="text"
                className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Dupont"
              />
              {errors.lastName && (
                <span className={styles.errorText}>{errors.lastName}</span>
              )}
            </div>

            {/* Prénom */}
            <div className={styles.formGroup}>
              <label htmlFor="firstName" className={styles.label}>
                Prénom <span className={styles.required}>*</span>
              </label>
              <input
                id="firstName"
                type="text"
                className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="Jean"
              />
              {errors.firstName && (
                <span className={styles.errorText}>{errors.firstName}</span>
              )}
            </div>

            {/* Métier */}
            <div className={styles.formGroup}>
              <label htmlFor="craft" className={styles.label}>
                Métier <span className={styles.required}>*</span>
              </label>
              <select
                id="craft"
                className={`${styles.select} ${errors.craft ? styles.inputError : ''}`}
                value={formData.craft}
                onChange={(e) => handleChange('craft', e.target.value)}
              >
                {VALID_CRAFTS.map(craft => (
                  <option key={craft} value={craft}>{craft}</option>
                ))}
              </select>
              {errors.craft && (
                <span className={styles.errorText}>{errors.craft}</span>
              )}
            </div>

            {/* Séniorité */}
            <div className={styles.formGroup}>
              <label htmlFor="seniority" className={styles.label}>
                Séniorité <span className={styles.required}>*</span>
              </label>
              <select
                id="seniority"
                className={`${styles.select} ${errors.seniority ? styles.inputError : ''}`}
                value={formData.seniority}
                onChange={(e) => handleChange('seniority', parseInt(e.target.value))}
              >
                {SENIORITY_LEVELS.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.value} - {level.label}
                  </option>
                ))}
              </select>
              {errors.seniority && (
                <span className={styles.errorText}>{errors.seniority}</span>
              )}
            </div>

            {/* Manager */}
            <div className={styles.formGroup}>
              <label htmlFor="managerId" className={styles.label}>
                Manager <span className={styles.required}>*</span>
              </label>
              <select
                id="managerId"
                className={`${styles.select} ${errors.managerId ? styles.inputError : ''}`}
                value={formData.managerId}
                onChange={(e) => handleChange('managerId', e.target.value)}
              >
                <option value="">-- Sélectionner --</option>
                {managers.map(manager => (
                  <option key={manager.id} value={manager.id}>
                    {manager.firstName} {manager.lastName} ({manager.craft})
                  </option>
                ))}
              </select>
              {errors.managerId && (
                <span className={styles.errorText}>{errors.managerId}</span>
              )}
            </div>

            {/* Squad */}
            <div className={styles.formGroup}>
              <label htmlFor="squadId" className={styles.label}>
                Squad <span className={styles.required}>*</span>
              </label>
              <select
                id="squadId"
                className={`${styles.select} ${errors.squadId ? styles.inputError : ''}`}
                value={formData.squadId}
                onChange={(e) => handleChange('squadId', e.target.value)}
              >
                <option value="">-- Sélectionner --</option>
                {squads.map(squad => (
                  <option key={squad.id} value={squad.id}>
                    {squad.name}
                  </option>
                ))}
              </select>
              {errors.squadId && (
                <span className={styles.errorText}>{errors.squadId}</span>
              )}
            </div>
          </div>

          {/* Rôles */}
          <div className={styles.rolesSection}>
            <label className={styles.label}>Rôles spéciaux</label>
            <div className={styles.checkboxGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.isLeadDev}
                  onChange={(e) => handleChange('isLeadDev', e.target.checked)}
                />
                <span>Lead Dev</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.isTechLead}
                  onChange={(e) => handleChange('isTechLead', e.target.checked)}
                />
                <span>Tech Lead</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.isScrumMaster}
                  onChange={(e) => handleChange('isScrumMaster', e.target.checked)}
                />
                <span>Scrum Master</span>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <div className={styles.leftActions}>
              {isEditMode && !showDeleteConfirm && (
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 size={16} />
                  Supprimer
                </button>
              )}
              {showDeleteConfirm && (
                <div className={styles.deleteConfirm}>
                  <span>Confirmer la suppression ?</span>
                  <button
                    type="button"
                    className={styles.confirmDeleteButton}
                    onClick={handleDelete}
                  >
                    Oui
                  </button>
                  <button
                    type="button"
                    className={styles.cancelDeleteButton}
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Non
                  </button>
                </div>
              )}
            </div>
            <div className={styles.rightActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={onClose}
              >
                Annuler
              </button>
              <button type="submit" className={styles.saveButton}>
                <Save size={16} />
                {isEditMode ? 'Enregistrer' : 'Créer'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
