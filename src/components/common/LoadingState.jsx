/**
 * LoadingState Component
 *
 * Skeleton screen élégant pour le chargement initial de l'application
 * Utilise des animations fluides et un design moderne
 */

import React from 'react';
import styles from './LoadingState.module.css';

function LoadingState() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Logo/Icon animé */}
        <div className={styles.iconWrapper}>
          <div className={styles.iconPulse}></div>
          <svg
            className={styles.icon}
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="var(--craft-cloud)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset="0"
              className={styles.circle}
            />
            <path
              d="M24 8v8M24 32v8M8 24h8M32 24h8"
              stroke="var(--craft-cloud)"
              strokeWidth="3"
              strokeLinecap="round"
              className={styles.cross}
            />
          </svg>
        </div>

        {/* Texte de chargement */}
        <div className={styles.textWrapper}>
          <h2 className={styles.title}>Organisation Loading...</h2>
          <p className={styles.subtitle}>Préparation de votre organigramme</p>
        </div>

        {/* Barre de progression */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>

        {/* Skeleton cards (mini preview) */}
        <div className={styles.skeletonPreview}>
          <div className={`${styles.skeletonCard} ${styles.delay1}`}></div>
          <div className={`${styles.skeletonCard} ${styles.delay2}`}></div>
          <div className={`${styles.skeletonCard} ${styles.delay3}`}></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingState;
