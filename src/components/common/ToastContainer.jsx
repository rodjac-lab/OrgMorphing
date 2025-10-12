/**
 * ToastContainer Component
 *
 * Wrapper pour react-hot-toast avec animations personnalisées
 */

import React from 'react';
import { Toaster } from 'react-hot-toast';

function ToastContainer() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      containerStyle={{
        top: 80, // En dessous de la ControlsBar
      }}
      toastOptions={{
        // Accessibilité
        role: 'status',
        ariaLive: 'polite',

        // Durée par défaut
        duration: 3000,

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

        // Succès
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#10B981',
            secondary: '#FFFFFF',
          },
          style: {
            border: '1px solid #10B981',
          },
        },

        // Erreur
        error: {
          duration: 4000,
          iconTheme: {
            primary: '#EF4444',
            secondary: '#FFFFFF',
          },
          style: {
            border: '1px solid #EF4444',
          },
        },

        // Loading
        loading: {
          iconTheme: {
            primary: '#3B82F6',
            secondary: '#FFFFFF',
          },
          style: {
            border: '1px solid #3B82F6',
          },
        },
      }}
    />
  );
}

export default ToastContainer;
