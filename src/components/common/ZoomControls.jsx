/**
 * ZoomControls Component
 * 
 * Reusable zoom controls (+/-/reset)
 */

import React from 'react';

function ZoomControls({ zoom, onZoomIn, onZoomOut, onZoomReset }) {
  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div style={styles.container} role="group" aria-label="Contrôles de zoom">
      <button
        onClick={onZoomOut}
        onKeyDown={(e) => handleKeyDown(e, onZoomOut)}
        style={styles.button}
        aria-label="Dézoomer"
        disabled={zoom <= 0.5}
      >
        -
      </button>
      <button
        onClick={onZoomReset}
        onKeyDown={(e) => handleKeyDown(e, onZoomReset)}
        style={styles.button}
        aria-label={`Réinitialiser le zoom, actuellement à ${Math.round(zoom * 100)}%`}
      >
        {Math.round(zoom * 100)}%
      </button>
      <button
        onClick={onZoomIn}
        onKeyDown={(e) => handleKeyDown(e, onZoomIn)}
        style={styles.button}
        aria-label="Zoomer"
        disabled={zoom >= 1.5}
      >
        +
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '8px',
    background: 'white',
    padding: '8px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '8px 16px',
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-text-primary)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    minWidth: '40px',
  },
};

export default ZoomControls;
