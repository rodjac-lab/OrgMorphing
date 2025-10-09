/**
 * ZoomControls Component
 * 
 * Reusable zoom controls (+/-/reset)
 */

import React from 'react';

function ZoomControls({ zoom, onZoomIn, onZoomOut, onZoomReset }) {
  return (
    <div style={styles.container}>
      <button onClick={onZoomOut} style={styles.button} title="Zoom out">
        -
      </button>
      <button onClick={onZoomReset} style={styles.button} title="Reset zoom">
        {Math.round(zoom * 100)}%
      </button>
      <button onClick={onZoomIn} style={styles.button} title="Zoom in">
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
