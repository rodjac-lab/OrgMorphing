/**
 * ManagerCard Component
 *
 * Wrapper around DeveloperCard for managers
 * - Name displayed in craft color
 * - Optional "Manager" badge
 */

import React from 'react';
import DeveloperCard from './DeveloperCard.jsx';

/**
 * @typedef {Object} ManagerCardProps
 * @property {import('../../data/types.js').Developer} manager - Manager data (isManager should be true)
 * @property {boolean} [showSeniority=false] - Whether to show seniority badge
 * @property {string[]} [tags=[]] - Additional tags
 * @property {string} [avatarUrl] - Optional avatar image URL
 * @property {() => void} [onClick] - Click handler
 */

/**
 * ManagerCard component
 * @param {ManagerCardProps} props
 */
function ManagerCard(props) {
  // ManagerCard is just DeveloperCard with isManager=true
  // The DeveloperCard already handles the colored name and "Manager X" title
  return <DeveloperCard {...props} developer={props.manager} />;
}

export default ManagerCard;
