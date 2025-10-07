# Guidelines Techniques - Outil de Visualisation Organisationnelle

## 🎯 Objectifs des guidelines

Ces guidelines définissent les choix techniques, l'architecture, et les conventions pour garantir :
- **Simplicité** : Code maintenable et compréhensible
- **Modernité** : Stack à jour avec best practices actuelles
- **Esthétique** : Design soigné, animations fluides, UX premium
- **Évolutivité** : Architecture permettant d'ajouter facilement les features V2

---

## 🛠️ Stack Technologique

### Core Stack
- **Framework** : React 18+ avec Vite
- **Langage** : JavaScript (ou TypeScript si préférence forte)
- **Styling** : CSS Modules ou Styled Components
- **State Management** : React Context API + hooks (pas de Redux pour ce MVP)
- **Build Tool** : Vite (dev rapide, HMR performant)

### Librairies recommandées

#### Animation & Morphing
- **Framer Motion** : Pour le morphing et animations complexes
  - Alternatif : GSAP (si besoin de plus de contrôle)
  - Alternatif léger : React Spring

#### Data & CSV
- **PapaParse** : Parsing et génération CSV
- Alternative : xlsx (si besoin Excel natif)

#### UI Components
- **Lucide React** : Icônes modernes et légères
- **React Hot Toast** : Notifications/toasts élégants
- Alternative icônes : Heroicons

#### Utilities
- **clsx** ou **classnames** : Gestion conditionnelle des classes CSS
- **date-fns** : Manipulation de dates (pour timestamps export)

### Ce qu'on N'utilise PAS
- ❌ Pas de framework CSS lourd (Bootstrap, Material-UI) → Design custom
- ❌ Pas de state management complexe (Redux, Zustand) → trop pour ce projet
- ❌ Pas de backend ou API → tout en local
- ❌ Pas de testing framework dans le MVP (optionnel pour V2)

---

## 📁 Structure du Repository

```
org-morphing-tool/
├── public/
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   ├── DeveloperCard.jsx
│   │   │   ├── DeveloperCard.module.css
│   │   │   ├── ManagerCard.jsx
│   │   │   └── DirectorCard.jsx
│   │   │
│   │   ├── views/
│   │   │   ├── HierarchicalView.jsx
│   │   │   ├── HierarchicalView.module.css
│   │   │   ├── FunctionalView.jsx
│   │   │   ├── FunctionalView.module.css
│   │   │   └── SquadContainer.jsx
│   │   │
│   │   ├── controls/
│   │   │   ├── ControlsBar.jsx
│   │   │   ├── ViewToggle.jsx
│   │   │   ├── SeniorityToggle.jsx
│   │   │   └── ExportButtons.jsx
│   │   │
│   │   ├── forms/
│   │   │   ├── DeveloperForm.jsx
│   │   │   ├── SquadForm.jsx
│   │   │   └── ImportModal.jsx
│   │   │
│   │   └── common/
│   │       ├── Modal.jsx
│   │       ├── Button.jsx
│   │       ├── Tooltip.jsx
│   │       └── LoadingSpinner.jsx
│   │
│   ├── data/
│   │   ├── mockData.js
│   │   ├── types.js (ou types.ts si TypeScript)
│   │   └── validation.js
│   │
│   ├── services/
│   │   ├── storage.js (LocalStorage/IndexedDB)
│   │   ├── csvService.js (import/export CSV)
│   │   └── dataService.js (CRUD operations)
│   │
│   ├── utils/
│   │   ├── layoutCalculator.js (calcul positions hiérarchique)
│   │   ├── squadLayoutCalculator.js (calcul positions fonctionnelle)
│   │   ├── colorMapping.js (métier → couleur)
│   │   └── helpers.js (fonctions utilitaires)
│   │
│   ├── contexts/
│   │   └── AppContext.jsx (state global)
│   │
│   ├── hooks/
│   │   ├── useOrgData.js
│   │   ├── useViewToggle.js
│   │   └── useMorphing.js
│   │
│   ├── styles/
│   │   ├── variables.css (couleurs, espacements)
│   │   ├── globals.css (reset, base styles)
│   │   └── animations.css (keyframes réutilisables)
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── .gitignore
├── package.json
├── vite.config.js
├── README.md
├── PRD.md
├── DEVELOPMENT_PLAN.md
└── TECH_GUIDELINES.md
```

### Explications de la structure

#### `/components`
Tous les composants React, organisés par fonctionnalité :
- **cards/** : Composants de cartes (dev, manager, directeur)
- **views/** : Les deux vues principales (hiérarchique, fonctionnelle)
- **controls/** : Barre de contrôles et toggles
- **forms/** : Formulaires d'édition et modal d'import
- **common/** : Composants réutilisables (Modal, Button, etc.)

#### `/data`
Données et types :
- **mockData.js** : Dataset de test initial
- **types.js** : Définition des types/interfaces
- **validation.js** : Fonctions de validation

#### `/services`
Logique métier et services :
- **storage.js** : Persistance locale (LocalStorage/IndexedDB)
- **csvService.js** : Import/export CSV
- **dataService.js** : Operations CRUD sur les données

#### `/utils`
Fonctions utilitaires pures :
- **layoutCalculator.js** : Calcul des positions pour vue hiérarchique
- **squadLayoutCalculator.js** : Calcul des positions pour vue fonctionnelle
- **colorMapping.js** : Mapping métier ↔ couleur
- **helpers.js** : Utilitaires divers

#### `/contexts`
State management global avec React Context

#### `/hooks`
Custom hooks réutilisables

#### `/styles`
Styles globaux et variables CSS

---

## 🎨 Conventions de Design & Styling

### Système de Design (Variables CSS)

Créer un fichier `styles/variables.css` avec :

```css
:root {
  /* Couleurs des métiers */
  --craft-cloud: #3B82F6;
  --craft-mobile: #10B981;
  --craft-embedded: #EF4444;
  --craft-test-auto: #F59E0B;
  --craft-infra: #8B5CF6;
  
  /* Couleurs UI */
  --color-background: #FFFFFF;
  --color-surface: #FAFAFA;
  --color-border: #E5E7EB;
  --color-text-primary: #1F2937;
  --color-text-secondary: #6B7280;
  
  /* Espacements */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;
  --spacing-2xl: 32px;
  
  /* Cartes */
  --card-width: 150px;
  --card-height: 65px;
  --card-border-radius: 10px;
  --card-padding: 12px;
  --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  --card-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.12);
  
  /* Animations */
  --transition-fast: 0.2s ease;
  --transition-medium: 0.4s ease;
  --transition-slow: 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  --morphing-duration: 1s;
  
  /* Typographie */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
  --font-size-sm: 12px;
  --font-size-base: 14px;
  --font-size-lg: 16px;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
}
```

### Principes de Styling

**Modernité et Épure**
- Fond blanc ou gris très clair
- Ombres subtiles (pas de drop-shadow lourdes)
- Border-radius modérés (8-12px)
- Espacements généreux
- Typographie claire et hiérarchisée

**Animations**
- Transitions fluides (0.2-0.4s pour interactions, 0.8-1s pour morphing)
- Utiliser `transform` et `opacity` (GPU-accelerated)
- Easing naturel : `cubic-bezier(0.4, 0, 0.2, 1)`
- `will-change` pour préparer les animations coûteuses

**Hover States**
- Élévation légère : `translateY(-2px)`
- Scale subtil : `scale(1.02)`
- Shadow plus marquée
- Transition rapide (0.2s)

**Responsive**
- Desktop-first, puis adaptation mobile/tablette
- Breakpoints : 768px (tablet), 1024px (desktop), 1440px (large)
- Media queries dans les CSS Modules

---

## 💻 Conventions de Code

### Nommage

**Composants**
- PascalCase : `DeveloperCard.jsx`
- Props : camelCase
- Handlers : `handleClick`, `handleSubmit`

**Fichiers**
- Composants : PascalCase (`DeveloperCard.jsx`)
- Utilitaires : camelCase (`layoutCalculator.js`)
- Styles : PascalCase.module.css (`DeveloperCard.module.css`)

**Variables et fonctions**
- camelCase : `const isHierarchical = true`
- Constantes : UPPER_SNAKE_CASE : `const MAX_SQUAD_SIZE = 9`
- Fonctions pures : verbes explicites (`calculatePosition`, `validateDeveloper`)

### Structure d'un Composant

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ComponentName.module.css';
import clsx from 'clsx';

/**
 * ComponentName - Description courte
 * 
 * @param {Object} props
 * @param {Type} props.propName - Description
 * @returns {JSX.Element}
 */
function ComponentName({ propName, optionalProp = defaultValue }) {
  // 1. Hooks
  const [state, setState] = useState(initialValue);
  
  // 2. Derived values
  const computedValue = useMemo(() => {
    return expensiveCalculation(propName);
  }, [propName]);
  
  // 3. Handlers
  const handleAction = () => {
    // Logic
  };
  
  // 4. Effects
  useEffect(() => {
    // Side effects
  }, [dependency]);
  
  // 5. Render
  return (
    <div className={clsx(styles.container, optionalProp && styles.active)}>
      {/* JSX */}
    </div>
  );
}

export default ComponentName;
```

### Bonnes Pratiques

**React**
- Composants fonctionnels uniquement (pas de classes)
- Hooks pour state et side effects
- PropTypes ou TypeScript pour validation (optionnel)
- Décomposer en petits composants réutilisables
- Éviter les composants > 200 lignes

**Performance**
- `useMemo` pour calculs coûteux
- `useCallback` pour handlers passés en props
- `React.memo` pour composants réaffichés souvent (ex: DeveloperCard)
- Éviter les fonctions anonymes dans le render

**Code Quality**
- Un seul export par fichier (sauf utils)
- Commentaires pour logique complexe uniquement
- Fonctions pures quand possible
- DRY (Don't Repeat Yourself)

---

## 🗃️ Gestion des Données

### Data Model (types.js)

```javascript
/**
 * @typedef {Object} Developer
 * @property {string} id - UUID unique
 * @property {string} firstName
 * @property {string} lastName
 * @property {'Cloud'|'Mobile'|'Embarqué'|'Test auto'|'Infra'} craft
 * @property {1|2|3|4} seniority
 * @property {boolean} isLeadDev
 * @property {boolean} isTechLead
 * @property {boolean} isScrumMaster
 * @property {string|null} managerId - ID du manager N-1
 * @property {string|null} squadId - ID de la squad
 * @property {boolean} isManager - Est un manager métier
 * @property {0|50|100} managerTimePercent - % temps management
 */

/**
 * @typedef {Object} Squad
 * @property {string} id
 * @property {string} name
 * @property {string} trainId
 * @property {string[]} memberIds
 */

/**
 * @typedef {Object} Train
 * @property {string} id
 * @property {string} name - Ex: "Cantal"
 * @property {string} rteId
 * @property {string[]} squadIds
 */

/**
 * @typedef {Object} RTE
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} title - "RTE"
 * @property {string} trainId
 */

/**
 * @typedef {Object} Director
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} title - "Directeur de l'Engineering"
 * @property {boolean} isDirector - true
 */
```

### Stockage Local

**Utiliser LocalStorage pour MVP** (simple et suffisant pour <1MB de données)

```javascript
// services/storage.js

const STORAGE_KEY = 'org_morphing_data';

export const storage = {
  // Sauvegarder toutes les données
  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
  
  // Charger toutes les données
  load() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },
  
  // Effacer
  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
```

**Structure des données sauvegardées**
```javascript
{
  version: '1.0',
  lastUpdated: timestamp,
  director: { /* Director object */ },
  developers: [ /* array of Developer */ ],
  squads: [ /* array of Squad */ ],
  train: { /* Train object */ },
  rte: { /* RTE object */ }
}
```

---

## 🎬 Animation & Morphing

### Implémentation avec Framer Motion

**Principe** : Utiliser `layoutId` pour le morphing automatique

```jsx
import { motion, AnimatePresence } from 'framer-motion';

function DeveloperCard({ developer, position, isHierarchical }) {
  return (
    <motion.div
      layoutId={developer.id} // Key pour le morphing
      initial={{ opacity: 0 }}
      animate={{ 
        x: position.x,
        y: position.y,
        opacity: 1
      }}
      transition={{ 
        duration: 1,
        ease: [0.4, 0, 0.2, 1] // cubic-bezier
      }}
      whileHover={{ scale: 1.02, y: position.y - 2 }}
      className={styles.card}
    >
      {/* Card content */}
    </motion.div>
  );
}
```

### Stratégie de Morphing

1. **État global** : `isHierarchical` (boolean)
2. **Calcul des positions** : 
   - Vue hiérarchique → `layoutCalculator.js`
   - Vue fonctionnelle → `squadLayoutCalculator.js`
3. **Framer Motion** gère l'interpolation automatiquement via `layoutId`
4. **Connexions** : Fade in/out avec transition synchronisée

---

## 🔧 Utilitaires Clés

### Layout Calculator (Hiérarchique)

```javascript
// utils/layoutCalculator.js

export function calculateHierarchicalLayout(developers, managers, director) {
  const positions = new Map();
  const LEVEL_HEIGHT = 150;
  const CARD_SPACING = 20;
  
  // Niveau 0 : Directeur (centré)
  positions.set(director.id, { x: centerX, y: 50 });
  
  // Niveau 1 : Managers (répartis horizontalement)
  // Groupés par métier, plusieurs managers du même métier côte à côte
  
  // Niveau 2 : Développeurs (sous leurs managers)
  
  return positions; // Map<developerId, {x, y}>
}
```

### Layout Calculator (Fonctionnel)

```javascript
// utils/squadLayoutCalculator.js

export function calculateFunctionalLayout(squads, squadMembers) {
  const positions = new Map();
  const SQUAD_WIDTH = 180;
  const SQUAD_SPACING = 30;
  const CARD_HEIGHT = 70;
  const CARD_SPACING = 10;
  
  const totalSquads = squads.length;
  const useGrid = totalSquads > 8;
  
  if (useGrid) {
    // Grille multi-rangées
    const cols = Math.ceil(Math.sqrt(totalSquads));
    // Calcul positions en grille
  } else {
    // Rangée unique
    // Calcul positions horizontales
  }
  
  return {
    squadPositions: Map<squadId, {x, y}>,
    memberPositions: Map<developerId, {x, y}>
  };
}
```

### Validation CSV

```javascript
// data/validation.js

const VALID_CRAFTS = ['Cloud', 'Mobile', 'Embarqué', 'Test auto', 'Infra'];
const VALID_SENIORITY = [1, 2, 3, 4];
const VALID_BOOLEAN = ['Oui', 'Non', 'oui', 'non', 'OUI', 'NON'];

export function validateDeveloperRow(row, lineNumber) {
  const errors = [];
  
  // Vérification Nom/Prénom
  if (!row.Nom || !row.Prénom) {
    errors.push(`Ligne ${lineNumber}: Nom ou Prénom manquant`);
  }
  
  // Vérification Métier
  if (!VALID_CRAFTS.includes(row.Métier)) {
    errors.push(`Ligne ${lineNumber}: Métier invalide (${row.Métier})`);
  }
  
  // Vérification Séniorité
  const seniority = parseInt(row.Séniorité);
  if (!VALID_SENIORITY.includes(seniority)) {
    errors.push(`Ligne ${lineNumber}: Séniorité invalide (${row.Séniorité})`);
  }
  
  // Etc.
  
  return errors;
}
```

---

## 📦 CSV Service

### Export

```javascript
// services/csvService.js
import Papa from 'papaparse';

export function exportToCSV(data) {
  const rows = data.developers.map(dev => ({
    Nom: dev.lastName,
    Prénom: dev.firstName,
    Métier: dev.craft,
    Séniorité: dev.seniority,
    LeadDev: dev.isLeadDev ? 'Oui' : 'Non',
    TechLead: dev.isTechLead ? 'Oui' : 'Non',
    ScrumMaster: dev.isScrumMaster ? 'Oui' : 'Non',
    Manager: findManagerName(dev.managerId, data.developers),
    Squad: findSquadName(dev.squadId, data.squads)
  }));
  
  const csv = Papa.unparse(rows);
  downloadCSV(csv, `org_export_${timestamp}.csv`);
}

export function exportTemplateCSV() {
  const template = [
    {
      Nom: 'Dupont',
      Prénom: 'Jean',
      Métier: 'Cloud',
      Séniorité: '3',
      LeadDev: 'Non',
      TechLead: 'Oui',
      ScrumMaster: 'Non',
      Manager: 'Martin Pierre',
      Squad: 'Squad Alpha'
    },
    // 1-2 exemples supplémentaires
  ];
  
  const csv = Papa.unparse(template);
  downloadCSV(csv, 'org_template.csv');
}

function downloadCSV(content, filename) {
  const blob = new Blob(['\ufeff' + content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
```

### Import

```javascript
export function importFromCSV(file, existingData) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const { data, errors } = results;
        
        // Validation
        const validationErrors = [];
        data.forEach((row, index) => {
          const rowErrors = validateDeveloperRow(row, index + 2);
          validationErrors.push(...rowErrors);
        });
        
        if (validationErrors.length > 0) {
          reject({ errors: validationErrors });
          return;
        }
        
        // Transformation en objets Developer
        const developers = data.map(transformRowToDeveloper);
        
        resolve({
          developers,
          summary: {
            added: /* calcul */,
            modified: /* calcul */,
            removed: /* calcul */
          }
        });
      },
      error: (error) => reject(error)
    });
  });
}
```

---

## 🎨 Exemple de Composant Card

```jsx
// components/cards/DeveloperCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './DeveloperCard.module.css';
import { getCraftColor } from '@/utils/colorMapping';

function DeveloperCard({ 
  developer, 
  position, 
  showSeniority, 
  onClick 
}) {
  const craftColor = getCraftColor(developer.craft);
  
  return (
    <motion.div
      layoutId={developer.id}
      className={styles.card}
      style={{ 
        '--craft-color': craftColor,
        left: position.x,
        top: position.y
      }}
      animate={{ 
        x: position.x, 
        y: position.y 
      }}
      transition={{ 
        duration: 1, 
        ease: [0.4, 0, 0.2, 1] 
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      onClick={() => onClick(developer)}
      title={developer.craft}
    >
      <div className={styles.craftBar} />
      
      <div className={styles.content}>
        <div className={styles.name}>
          {developer.firstName} {developer.lastName}
        </div>
        
        <div className={styles.badges}>
          {developer.isLeadDev && <span className={styles.badge}>L</span>}
          {developer.isTechLead && <span className={styles.badge}>T</span>}
          {developer.isScrumMaster && <span className={styles.badge}>S</span>}
          {showSeniority && (
            <span className={styles.seniority}>{developer.seniority}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default React.memo(DeveloperCard);
```

```css
/* components/cards/DeveloperCard.module.css */
.card {
  position: absolute;
  width: var(--card-width);
  height: var(--card-height);
  background: var(--color-surface);
  border-radius: var(--card-border-radius);
  padding: var(--card-padding);
  box-shadow: var(--card-shadow);
  cursor: pointer;
  transition: box-shadow var(--transition-fast);
  display: flex;
  align-items: center;
}

.card:hover {
  box-shadow: var(--card-shadow-hover);
}

.craftBar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--craft-color);
  border-radius: var(--card-border-radius) 0 0 var(--card-border-radius);
}

.content {
  flex: 1;
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.badges {
  display: flex;
  gap: 3px;
  align-self: flex-end;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: var(--color-text-secondary);
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: var(--font-weight-semibold);
}

.seniority {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: var(--craft-color);
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: var(--font-weight-semibold);
}
```

---

## 🤖 Instructions pour l'IA (Claude Code)

### Processus de développement

1. **Lire attentivement** le PRD et le Development Plan
2. **Suivre l'ordre des lots** : Ne pas sauter d'étapes
3. **Respecter la structure du repo** définie ci-dessus
4. **Utiliser les librairies recommandées** (Framer Motion, PapaParse, etc.)
5. **Appliquer les conventions de code** définies
6. **Tester après chaque lot** : S'assurer que le code fonctionne avant de passer au suivant
7. **Commenter le code complexe** uniquement (pas de sur-commentaires)
8. **Créer des commits atomiques** avec messages clairs

### Commandes importantes

```bash
# Installation
npm create vite@latest org-morphing-tool -- --template react
cd org-morphing-tool
npm install

# Dépendances
npm install framer-motion papaparse clsx lucide-react react-hot-toast date-fns

# Développement
npm run dev

# Build
npm run build
```

### Checklist par lot

Après chaque lot :
- [ ] Code fonctionnel sans erreurs console
- [ ] Design conforme au PRD (moderne, épuré)
- [ ] Responsive testé (desktop minimum)
- [ ] Commit avec message descriptif
- [ ] README mis à jour si nécessaire

### Pièges à éviter

❌ **Ne pas** créer de backend ou d'API  
❌ **Ne pas** sur-complexifier l'architecture  
❌ **Ne pas** utiliser des librairies non listées sans demander  
❌ **Ne pas** négliger les animations (c'est une feature clé)  
❌ **Ne pas** copier du code sans comprendre  
❌ **Ne pas** ignorer les cas limites (validation, erreurs)

### Quand demander de l'aide

Si incertain sur :
- Choix d'architecture non couvert par ces guidelines
- Interprétation d'une feature du PRD
- Performance (si lag visible)
- Compatibilité navigateur pour une feature avancée

---

## 📚 Ressources

### Documentation officielle
- [React](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite](https://vitejs.dev)
- [PapaParse](https://www.papaparse.com)

### Inspiration Design
- [Linear](https://linear.app) - Animations et UX
- [Notion](https://notion.so) - Interface épurée
- [Figma](https://figma.com) - Organisation visuelle
- [Apple Design Resources](https://developer.apple.com/design/resources/)

### CSS & Animations
- [CSS Tricks - Animations](https://css-tricks.com/almanac/properties/a/animation/)
- [Cubic Bezier](https://cubic-bezier.com) - Tester les easings
- [Can I Use](https://caniuse.com) - Support navigateurs

---

## ✅ Critères de Qualité

### Code
- ✅ Lisible et maintenable
- ✅ Composants < 200 lignes
- ✅ Fonctions pures quand possible
- ✅ Pas de duplication (DRY)
- ✅ Nommage explicite

### Performance
- ✅ 60fps sur les animations
- ✅ Temps de chargement < 2s
- ✅ Pas de lag sur le morphing
- ✅ Bundle size raisonnable (< 500KB gzipped)

### UX/UI
- ✅ Design moderne et épuré (Apple-like)
- ✅ Animations fluides et naturelles
- ✅ Feedback visuel sur toutes les actions
- ✅ Pas de flash ou saut visuel
- ✅ Responsive desktop/tablette

### Données
- ✅ Validation robuste à l'import
- ✅ Messages d'erreur clairs
- ✅ Persistance fiable en local
- ✅ Export/import sans perte de données

---

**Version** : 1.0  
**Date** : Octobre 2025  
**Statut** : Guidelines initiales