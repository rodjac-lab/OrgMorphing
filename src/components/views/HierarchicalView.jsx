/**
 * HierarchicalView Component
 *
 * Displays the organizational hierarchy in 3 levels:
 * - Level 0: Director
 * - Level 1: Managers (grouped by craft)
 * - Level 2: Developers (under their managers)
 *
 * Includes connection lines between levels.
 */

import React, { useMemo, useState } from 'react';
import DeveloperCard from '../cards/DeveloperCard.jsx';
import ManagerCard from '../cards/ManagerCard.jsx';
import DirectorCard from '../cards/DirectorCard.jsx';
import {
  calculateHierarchicalLayout,
  calculateHierarchicalConnections,
  calculateHierarchicalDimensions,
} from '../../utils/layoutCalculator.js';

/**
 * @typedef {Object} HierarchicalViewProps
 * @property {import('../../data/types.js').OrganizationData} orgData - Organization data
 * @property {boolean} [showSeniority=false] - Whether to show seniority badges
 * @property {(person: any) => void} [onPersonClick] - Click handler for person cards
 */

/**
 * HierarchicalView component (REFACTORED with zoom)
 * @param {HierarchicalViewProps} props
 */
function HierarchicalView({ orgData, showSeniority = false, onPersonClick }) {
  const { director, developers } = orgData;
  const [zoom, setZoom] = useState(1); // Zoom level (0.5 to 1.5)

  // Calculate positions for all people
  const positions = useMemo(() => {
    return calculateHierarchicalLayout(director, developers);
  }, [director, developers]);

  // Calculate connection lines
  const connections = useMemo(() => {
    return calculateHierarchicalConnections(director, developers, positions);
  }, [director, developers, positions]);

  // Calculate total dimensions
  const dimensions = useMemo(() => {
    return calculateHierarchicalDimensions(positions);
  }, [positions]);

  // Separate managers and regular developers
  const managers = developers.filter(d => d.isManager);
  const regularDevs = developers.filter(d => !d.isManager);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleZoomReset = () => {
    setZoom(1);
  };

  return (
    <div style={styles.container}>
      {/* Zoom controls */}
      <div style={styles.zoomControls}>
        <button onClick={handleZoomOut} style={styles.zoomButton} title="Zoom out">
          -
        </button>
        <button onClick={handleZoomReset} style={styles.zoomButton} title="Reset zoom">
          {Math.round(zoom * 100)}%
        </button>
        <button onClick={handleZoomIn} style={styles.zoomButton} title="Zoom in">
          +
        </button>
      </div>

      {/* Zoomable content wrapper */}
      <div
        style={{
          ...styles.zoomWrapper,
          transform: `scale(${zoom})`,
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        <svg
          style={{
            ...styles.svg,
            width: dimensions.width,
            height: dimensions.height,
          }}
        >
          {/* Connection lines */}
          {connections.map((connection, index) => (
            <line
              key={index}
              x1={connection.x1}
              y1={connection.y1}
              x2={connection.x2}
              y2={connection.y2}
              stroke="var(--color-border)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.6"
            />
          ))}
        </svg>

        {/* Director card */}
        <div
          style={{
            ...styles.card,
            left: positions.get(director.id)?.x || 0,
            top: positions.get(director.id)?.y || 0,
          }}
        >
          <DirectorCard
            director={director}
            onClick={onPersonClick ? () => onPersonClick(director) : undefined}
          />
        </div>

        {/* Manager cards */}
        {managers.map(manager => {
          const pos = positions.get(manager.id);
          if (!pos) return null;

          return (
            <div
              key={manager.id}
              style={{
                ...styles.card,
                left: pos.x,
                top: pos.y,
              }}
            >
              <ManagerCard
                manager={manager}
                showSeniority={showSeniority}
                onClick={onPersonClick ? () => onPersonClick(manager) : undefined}
              />
            </div>
          );
        })}

        {/* Developer cards */}
        {regularDevs.map(dev => {
          const pos = positions.get(dev.id);
          if (!pos) return null;

          return (
            <div
              key={dev.id}
              style={{
                ...styles.card,
                left: pos.x,
                top: pos.y,
              }}
            >
              <DeveloperCard
                developer={dev}
                showSeniority={showSeniority}
                onClick={onPersonClick ? () => onPersonClick(dev) : undefined}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    minHeight: '600px',
    overflow: 'auto',
    background: 'var(--color-background)',
    padding: '24px',
  },
  zoomControls: {
    position: 'sticky',
    top: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
    display: 'flex',
    gap: '8px',
    background: 'white',
    padding: '8px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    width: 'fit-content',
    margin: '0 auto 16px',
  },
  zoomButton: {
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
  zoomWrapper: {
    position: 'relative',
    transformOrigin: 'top left',
    transition: 'transform 0.3s ease',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 0,
  },
  card: {
    position: 'absolute',
    zIndex: 1,
    transition: 'all var(--morphing-duration) cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export default HierarchicalView;
