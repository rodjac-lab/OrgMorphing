/**
 * AnimatedCard - Wrapper pour cartes avec animation stagger
 *
 * Ajoute des animations d'entrée progressives avec délais calculés
 * pour créer un effet de vague élégant lors du morphing
 */

import React from 'react';
import { motion } from 'framer-motion';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu de la carte
 * @param {string} props.layoutId - ID unique pour le morphing layoutId
 * @param {Object} props.position - Position {x, y} de la carte
 * @param {number} [props.delay=0] - Délai avant animation (en secondes)
 * @param {Object} [props.style] - Styles additionnels
 * @param {Function} [props.onClick] - Handler de clic
 */
function AnimatedCard({
  children,
  layoutId,
  position,
  delay = 0,
  style = {},
  onClick
}) {
  return (
    <motion.div
      layoutId={layoutId}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        zIndex: 1,
        ...style,
      }}
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      transition={{
        layout: {
          duration: 0.8,
          ease: [0.43, 0.13, 0.23, 0.96],
          delay: delay,
        },
        opacity: {
          duration: 0.3,
          delay: delay,
        },
        scale: {
          duration: 0.4,
          ease: [0.34, 1.56, 0.64, 1],
          delay: delay,
        }
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedCard;
