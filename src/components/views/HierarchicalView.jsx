/**
 * HierarchicalView Component
 *
 * Displays the organizational hierarchy in 3 levels:
 * - Level 0: Director
 * - Level 1: Managers (grouped by craft)
 * - Level 2: Developers (under their managers)
 *
 * Includes connection lines between levels.
 * Zoom is controlled externally via props, with auto-zoom on mount.
 */

import React, { useMemo, useEffect, useRef } from 'react';
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
 * @property {number} [zoom=1] - Zoom level (0.5 to 1.5), controlled externally
 * @property {(zoom: number) => void} [onZoomChange] - Callback to update zoom level
 */

/**
 * HierarchicalView component with external zoom control and auto-zoom
 * @param {HierarchicalViewProps} props
 */
function HierarchicalView({ orgData, showSeniority = false, onPersonClick, zoom = 1, onZoomChange }) {
  const { director, developers } = orgData;
  const containerRef = useRef(null);
  const hasAutoZoomed = useRef(false);

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

  // Auto-zoom to fit content on mount
  useEffect(() => {
    if (!containerRef.current || hasAutoZoomed.current || !onZoomChange) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Calculate zoom to fit content with padding
    const zoomX = (containerWidth - 100) / dimensions.width;
    const zoomY = (containerHeight - 100) / dimensions.height;
    const optimalZoom = Math.min(zoomX, zoomY, 1); // Cap at 100%

    // Ensure zoom is within bounds (0.5 to 1.5)
    const boundedZoom = Math.max(0.5, Math.min(1.5, optimalZoom));

    // Only set if different from current zoom
    if (Math.abs(boundedZoom - zoom) > 0.01) {
      onZoomChange(boundedZoom);
    }

    hasAutoZoomed.current = true;
  }, [dimensions, zoom, onZoomChange]);

  // Separate managers and regular developers
  const managers = developers.filter(d => d.isManager);
  const regularDevs = developers.filter(d => !d.isManager);

  return (
    <div ref={containerRef} style={styles.container}>
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
