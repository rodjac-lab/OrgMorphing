/**
 * Toast Configuration
 *
 * Configuration centralisée pour react-hot-toast
 * avec des styles modernes et cohérents
 */

import toast from 'react-hot-toast';

// Configuration par défaut des toasts
export const toastConfig = {
  duration: 3000,
  position: 'top-right',

  // Styles par défaut
  style: {
    background: '#FFFFFF',
    color: '#1F2937',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08)',
    fontSize: '14px',
    fontWeight: '500',
    maxWidth: '400px',
  },

  // Styles pour le succès
  success: {
    iconTheme: {
      primary: '#10B981',
      secondary: '#FFFFFF',
    },
    style: {
      border: '1px solid #10B981',
    },
  },

  // Styles pour l'erreur
  error: {
    iconTheme: {
      primary: '#EF4444',
      secondary: '#FFFFFF',
    },
    style: {
      border: '1px solid #EF4444',
    },
  },

  // Styles pour le loading
  loading: {
    iconTheme: {
      primary: '#3B82F6',
      secondary: '#FFFFFF',
    },
  },
};

/**
 * Toast de succès personnalisé
 */
export const showSuccess = (message, options = {}) => {
  return toast.success(message, {
    ...toastConfig,
    ...toastConfig.success,
    ...options,
  });
};

/**
 * Toast d'erreur personnalisé
 */
export const showError = (message, options = {}) => {
  return toast.error(message, {
    ...toastConfig,
    ...toastConfig.error,
    ...options,
  });
};

/**
 * Toast de chargement personnalisé
 */
export const showLoading = (message, options = {}) => {
  return toast.loading(message, {
    ...toastConfig,
    ...toastConfig.loading,
    ...options,
  });
};

/**
 * Toast custom avec icône personnalisée
 */
export const showCustom = (message, icon, options = {}) => {
  return toast(message, {
    ...toastConfig,
    icon,
    ...options,
  });
};

/**
 * Toast de promesse (avec loading → success/error)
 */
export const showPromise = (promise, messages, options = {}) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading || 'Chargement...',
      success: messages.success || 'Succès !',
      error: messages.error || 'Erreur',
    },
    {
      ...toastConfig,
      ...options,
    }
  );
};

/**
 * Dismiss tous les toasts
 */
export const dismissAll = () => {
  toast.dismiss();
};

/**
 * Dismiss un toast spécifique
 */
export const dismiss = (toastId) => {
  toast.dismiss(toastId);
};

// Export par défaut
export default {
  success: showSuccess,
  error: showError,
  loading: showLoading,
  custom: showCustom,
  promise: showPromise,
  dismiss,
  dismissAll,
};
