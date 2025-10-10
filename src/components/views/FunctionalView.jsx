/**
 * FunctionalView Component
 *
 * Displays the functional organization view:
 * - RTE header with train name
 * - Squads in adaptive layout (single row if ≤8 squads, grid otherwise)
 * - Each squad shows its members
 * Zoom is controlled externally via props, with auto-zoom on mount.
 */

import React, { useMemo, useEffect, useRef } from 'react';
import SquadContainer from './SquadContainer.jsx';

/**
 * @typedef {Object} FunctionalViewProps
 * @property {import('../../data/types.js').OrganizationData} orgData - Organization data
 * @property {boolean} [showSeniority=false] - Whether to show seniority badges
 * @property {(person: any) => void} [onPersonClick] - Click handler for person cards
 * @property {number} [zoom=1] - Zoom level (0.5 to 1.5), controlled externally
 * @property {(zoom: number) => void} [onZoomChange] - Callback to update zoom level
 * @property {string} [staggerStrategy] - Stagger strategy for morphing animation
 */

/**
 * FunctionalView component with external zoom control and auto-zoom
 * @param {FunctionalViewProps} props
 */
function FunctionalView({ orgData, showSeniority = false, onPersonClick, zoom = 1, onZoomChange, staggerStrategy }) {
  const { rte, squads, developers } = orgData;
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const hasAutoZoomed = useRef(false);

  // Group developers by squad
  const developersBySquad = useMemo(() => {
    const grouped = {};

    squads.forEach(squad => {
      grouped[squad.id] = [];
    });

    developers.forEach(dev => {
      if (dev.squadId && grouped[dev.squadId]) {
        grouped[dev.squadId].push(dev);
      }
    });

    return grouped;
  }, [squads, developers]);

  // Calculate layout: single row if ≤8 squads, grid otherwise
  const layoutStyle = useMemo(() => {
    const squadCount = squads.length;

    if (squadCount <= 8) {
      // Single row layout
      return {
        display: 'flex',
        flexDirection: 'row',
        gap: '24px',
        flexWrap: 'nowrap',
        padding: '24px',
      };
    } else {
      // Grid layout for many squads
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
        gap: '24px',
        padding: '24px',
      };
    }
  }, [squads.length]);

  // Auto-zoom to fit content on mount
  useEffect(() => {
    if (!containerRef.current || !contentRef.current || hasAutoZoomed.current || !onZoomChange) return;

    // Wait for content to render
    setTimeout(() => {
      if (!containerRef.current || !contentRef.current) return;

      const container = containerRef.current;
      const content = contentRef.current;
      
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const contentWidth = content.scrollWidth;
      const contentHeight = content.scrollHeight;

      // Calculate zoom to fit content with padding
      const zoomX = (containerWidth - 100) / contentWidth;
      const zoomY = (containerHeight - 100) / contentHeight;
      const optimalZoom = Math.min(zoomX, zoomY, 1); // Cap at 100%

      // Ensure zoom is within bounds (0.5 to 1.5)
      const boundedZoom = Math.max(0.5, Math.min(1.5, optimalZoom));

      // Only set if different from current zoom
      if (Math.abs(boundedZoom - zoom) > 0.01) {
        onZoomChange(boundedZoom);
      }

      hasAutoZoomed.current = true;
    }, 100);
  }, [squads, zoom, onZoomChange]);

  return (
    <div ref={containerRef} style={styles.container}>
      {/* Zoomable content */}
      <div
        ref={contentRef}
        style={{
          ...styles.zoomWrapper,
          transform: `scale(${zoom})`,
        }}
      >
        {/* RTE Header */}
        {rte && (
          <div style={styles.rteHeader}>
            <div style={styles.rteLabel}>RTE</div>
            <div style={styles.rteInfo}>
              <span style={styles.rteName}>
                {rte.firstName} {rte.lastName}
              </span>
              <span style={styles.trainName}>Train {rte.trainName}</span>
            </div>
          </div>
        )}

        {/* Squads container */}
        <div style={layoutStyle}>
          {squads.map((squad, squadIndex) => {
            // Calculate global card offset for this squad
            let globalCardOffset = 0;
            for (let i = 0; i < squadIndex; i++) {
              globalCardOffset += (developersBySquad[squads[i].id] || []).length;
            }

            return (
              <SquadContainer
                key={squad.id}
                squad={squad}
                members={developersBySquad[squad.id] || []}
                showSeniority={showSeniority}
                onPersonClick={onPersonClick}
                squadIndex={squadIndex}
                globalCardOffset={globalCardOffset}
                staggerStrategy={staggerStrategy}
              />
            );
          })}
        </div>

        {/* Empty state if no squads */}
        {squads.length === 0 && (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>Aucune squad définie</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    minHeight: '600px',
    background: 'var(--color-background)',
    overflow: 'auto',
  },
  zoomWrapper: {
    transformOrigin: 'top left',
    transition: 'transform 0.3s ease',
  },
  rteHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px 24px',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.08))',
    borderBottom: '2px solid var(--color-border)',
  },
  rteLabel: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: '6px 12px',
    background: 'white',
    borderRadius: '6px',
    border: '1px solid var(--color-border)',
  },
  rteInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  rteName: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-text-primary)',
  },
  trainName: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-text-secondary)',
    padding: '4px 12px',
    background: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '12px',
  },
  emptyState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
  },
  emptyText: {
    fontSize: 'var(--font-size-lg)',
    color: 'var(--color-text-secondary)',
  },
};

export default FunctionalView;
