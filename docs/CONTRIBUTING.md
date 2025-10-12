# Guide de Contribution

Merci de votre intérêt pour contribuer à l'Outil de Visualisation Organisationnelle ! Ce guide vous aidera à démarrer.

---

## 📋 Table des Matières

1. [Code de Conduite](#code-de-conduite)
2. [Comment Contribuer](#comment-contribuer)
3. [Configuration de l'Environnement](#configuration-de-lenvironnement)
4. [Workflow de Développement](#workflow-de-développement)
5. [Standards de Code](#standards-de-code)
6. [Tests](#tests)
7. [Documentation](#documentation)
8. [Process de Review](#process-de-review)

---

## Code de Conduite

### Nos Engagements

Dans l'intérêt de favoriser un environnement ouvert et accueillant, nous nous engageons à faire de la participation à notre projet une expérience exempte de harcèlement pour tout le monde.

### Comportements Attendus

- Utiliser un langage accueillant et inclusif
- Respecter les différents points de vue et expériences
- Accepter les critiques constructives avec grâce
- Se concentrer sur ce qui est le mieux pour la communauté
- Faire preuve d'empathie envers les autres membres

### Comportements Inacceptables

- Harcèlement, commentaires insultants ou dénigrants
- Trolling, commentaires offensants
- Attaques personnelles ou politiques
- Publication d'informations privées sans permission

---

## Comment Contribuer

### Types de Contributions

Nous acceptons plusieurs types de contributions :

#### 🐛 Rapports de Bugs

Si vous trouvez un bug :
1. Vérifiez qu'il n'a pas déjà été signalé dans les [Issues](https://github.com/votre-username/org-morphing-tool/issues)
2. Ouvrez une nouvelle issue avec le template "Bug Report"
3. Décrivez le problème clairement :
   - Étapes pour reproduire
   - Comportement attendu vs observé
   - Captures d'écran si applicable
   - Environnement (navigateur, OS, version)

#### ✨ Suggestions de Fonctionnalités

Pour proposer une nouvelle fonctionnalité :
1. Vérifiez la [roadmap](../README.md#roadmap-future-v2) et les issues existantes
2. Ouvrez une issue avec le template "Feature Request"
3. Décrivez :
   - Le problème que cela résout
   - La solution proposée
   - Des alternatives envisagées

#### 📝 Améliorations de Documentation

La documentation peut toujours être améliorée :
- Corrections de typos
- Clarifications
- Nouveaux exemples
- Traductions

#### 💻 Contributions de Code

Vous pouvez contribuer du code pour :
- Corriger des bugs
- Implémenter de nouvelles fonctionnalités
- Améliorer les performances
- Refactoring

---

## Configuration de l'Environnement

### Prérequis

- **Node.js** 18+ et npm
- **Git**
- Un éditeur de code (VS Code recommandé)
- Un navigateur moderne pour les tests

### Installation

```bash
# 1. Forker le repository sur GitHub

# 2. Cloner votre fork
git clone https://github.com/votre-username/org-morphing-tool.git
cd org-morphing-tool

# 3. Ajouter le repo upstream
git remote add upstream https://github.com/original-username/org-morphing-tool.git

# 4. Installer les dépendances
npm install

# 5. Lancer l'application en mode dev
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Extensions VS Code Recommandées

- **ESLint** : Linting JavaScript
- **Prettier** : Formatage de code
- **ES7+ React/Redux/React-Native snippets** : Snippets React

---

## Workflow de Développement

### 1. Créer une Branche

Toujours créer une branche pour votre travail :

```bash
# Mettre à jour main
git checkout main
git pull upstream main

# Créer une branche
git checkout -b feature/nom-de-la-feature
# ou
git checkout -b fix/nom-du-bug
```

**Convention de nommage des branches :**
- `feature/description` : Nouvelle fonctionnalité
- `fix/description` : Correction de bug
- `docs/description` : Documentation
- `refactor/description` : Refactoring
- `test/description` : Ajout/modification de tests

### 2. Développer

Suivez les [Standards de Code](#standards-de-code) et les [Guidelines Techniques](../tech-guidelines.md).

```bash
# Développer votre feature
# Tester manuellement dans le navigateur
# Vérifier qu'aucun warning ESLint n'apparaît
```

### 3. Commiter

Utilisez des commits atomiques et des messages clairs :

```bash
git add .
git commit -m "feat: ajouter le support du drag & drop"
```

**Convention de commit :**

Format : `type: description courte`

**Types :**
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation uniquement
- `style:` Formatage, point-virgules manquants, etc. (pas de changement de code)
- `refactor:` Refactoring (ni nouvelle fonctionnalité ni bug fix)
- `perf:` Amélioration de performance
- `test:` Ajout/modification de tests
- `chore:` Modifications des outils, configuration, etc.

**Exemples :**
```
feat: add dark mode support
fix: resolve morphing animation glitch on Safari
docs: update installation instructions in README
refactor: simplify layout calculation algorithm
test: add unit tests for validation service
```

### 4. Tester

Avant de pousser :

```bash
# Linter
npm run lint

# Build de production (vérifier qu'il n'y a pas d'erreurs)
npm run build

# Tests unitaires
npm test
```

**Tests manuels :**
- Testez votre fonctionnalité dans Chrome, Firefox et Safari
- Vérifiez le responsive (desktop, tablette, mobile)
- Testez la navigation clavier
- Vérifiez qu'aucune régression n'a été introduite

### 5. Pousser et Créer une Pull Request

```bash
# Pousser vers votre fork
git push origin feature/nom-de-la-feature

# Sur GitHub, créer une Pull Request vers le repo upstream
```

**Template de PR :**

```markdown
## Description
[Décrivez les changements apportés]

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Checklist
- [ ] Le code suit les conventions du projet
- [ ] J'ai commenté les parties complexes
- [ ] J'ai mis à jour la documentation
- [ ] Mes changements ne génèrent pas de warnings
- [ ] J'ai ajouté des tests si applicable
- [ ] Tous les tests passent
- [ ] J'ai testé sur Chrome, Firefox et Safari

## Captures d'écran (si applicable)
[Ajouter des captures d'écran ou GIFs]
```

---

## Standards de Code

### Architecture

Respectez la structure du projet :

```
src/
├── components/
│   ├── cards/          # Composants de cartes
│   ├── views/          # Vues principales
│   ├── controls/       # Contrôles UI
│   ├── forms/          # Formulaires
│   └── common/         # Composants réutilisables
├── data/               # Types et données
├── services/           # Services (API, storage)
├── utils/              # Fonctions utilitaires
└── styles/             # Styles globaux
```

### Conventions de Nommage

#### Fichiers

- **Composants React** : PascalCase + `.jsx` (ex: `DeveloperCard.jsx`)
- **Styles CSS Modules** : PascalCase + `.module.css` (ex: `DeveloperCard.module.css`)
- **Services** : camelCase + `.js` (ex: `dataService.js`)
- **Utilitaires** : camelCase + `.js` (ex: `layoutCalculator.js`)

#### Variables et Fonctions

```javascript
// Variables : camelCase
const userName = 'John';
const isActive = true;

// Constantes : UPPER_SNAKE_CASE
const MAX_DEVELOPERS = 200;
const API_ENDPOINT = 'https://api.example.com';

// Fonctions : camelCase, verbe d'action
function calculatePosition(card) { ... }
function isValidMetier(metier) { ... }

// Composants React : PascalCase
function DeveloperCard({ developer }) { ... }

// Hooks personnalisés : camelCase, préfixe "use"
function useLocalStorage(key) { ... }
```

### Style de Code

#### JavaScript/React

```javascript
// ✅ Bon
function DeveloperCard({ developer, showSeniority, onClick }) {
  const { firstName, lastName, metier, seniority } = developer;

  const handleClick = () => {
    onClick(developer.id);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <h3>{`${firstName} ${lastName}`}</h3>
      <p>{metier}</p>
      {showSeniority && <span>{seniority}</span>}
    </div>
  );
}

// ❌ Mauvais
function DeveloperCard(props) {
  return (
    <div className={styles.card} onClick={() => props.onClick(props.developer.id)}>
      <h3>{props.developer.firstName + ' ' + props.developer.lastName}</h3>
      <p>{props.developer.metier}</p>
      {props.showSeniority ? <span>{props.developer.seniority}</span> : null}
    </div>
  );
}
```

#### Destructuring

Toujours destructurer les props et les objets :

```javascript
// ✅ Bon
const { firstName, lastName, metier } = developer;

// ❌ Mauvais
const firstName = developer.firstName;
const lastName = developer.lastName;
```

#### PropTypes / JSDoc

Documenter les composants avec JSDoc :

```javascript
/**
 * Carte d'affichage d'un développeur
 * @param {Object} props
 * @param {Developer} props.developer - Les données du développeur
 * @param {boolean} props.showSeniority - Afficher la séniorité
 * @param {Function} props.onClick - Callback au clic
 * @returns {JSX.Element}
 */
function DeveloperCard({ developer, showSeniority, onClick }) {
  // ...
}
```

#### CSS Modules

```css
/* ✅ Bon : BEM-like, classes descriptives */
.card {
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
}

.card__header {
  font-size: var(--font-size-lg);
}

.card--highlighted {
  border: 2px solid var(--color-primary);
}

/* ❌ Mauvais : classes génériques, valeurs hardcodées */
.item {
  padding: 12px;
  border-radius: 8px;
}
```

#### Variables CSS

Utiliser les variables définies dans `variables.css` :

```css
/* ✅ Bon */
.card {
  padding: var(--spacing-md);
  color: var(--color-text);
  transition: transform var(--transition-fast);
}

/* ❌ Mauvais */
.card {
  padding: 12px;
  color: #333;
  transition: transform 0.2s;
}
```

### Performance

#### React.memo

Utiliser `React.memo` pour les composants purs :

```javascript
import { memo } from 'react';

const DeveloperCard = memo(function DeveloperCard({ developer }) {
  // ...
});

export default DeveloperCard;
```

#### useCallback et useMemo

Optimiser les re-renders :

```javascript
const handleClick = useCallback(() => {
  onDeveloperClick(developer.id);
}, [developer.id, onDeveloperClick]);

const computedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
```

---

## Tests

### Tests Unitaires

Nous utilisons **Vitest** et **React Testing Library**.

#### Structure

```
src/
├── components/
│   └── cards/
│       ├── DeveloperCard.jsx
│       └── DeveloperCard.test.jsx
```

#### Exemple de Test

```javascript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DeveloperCard from './DeveloperCard';

describe('DeveloperCard', () => {
  const mockDeveloper = {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    metier: 'Cloud',
    seniority: 3,
  };

  it('renders developer name', () => {
    render(<DeveloperCard developer={mockDeveloper} />);
    expect(screen.getByText('Jean Dupont')).toBeInTheDocument();
  });

  it('renders seniority when showSeniority is true', () => {
    render(<DeveloperCard developer={mockDeveloper} showSeniority />);
    expect(screen.getByText('⭐⭐⭐')).toBeInTheDocument();
  });

  it('does not render seniority when showSeniority is false', () => {
    render(<DeveloperCard developer={mockDeveloper} showSeniority={false} />);
    expect(screen.queryByText('⭐⭐⭐')).not.toBeInTheDocument();
  });
});
```

#### Lancer les Tests

```bash
# Tous les tests
npm test

# Tests en mode watch
npm run test:watch

# Tests avec coverage
npm run test:coverage
```

### Tests Manuels

Checklist avant de soumettre une PR :

- [ ] Fonctionnalité testée sur Chrome
- [ ] Fonctionnalité testée sur Firefox
- [ ] Fonctionnalité testée sur Safari
- [ ] Navigation clavier testée
- [ ] Responsive testé (desktop, tablette, mobile)
- [ ] Pas de warning dans la console
- [ ] Pas de régression sur les fonctionnalités existantes

---

## Documentation

### Commenter le Code

#### Quand Commenter

- Fonctions complexes ou algorithmes non triviaux
- Comportements non évidents
- Workarounds ou hacks temporaires
- Décisions architecturales importantes

#### Comment Commenter

```javascript
// ✅ Bon : explique le "pourquoi"
// On utilise setTimeout pour éviter un race condition avec le state update
setTimeout(() => setData(newData), 0);

// ❌ Mauvais : explique le "quoi" (redondant)
// Assigne newData à data
const data = newData;
```

#### JSDoc pour les Fonctions Publiques

```javascript
/**
 * Calcule la position d'une carte dans la vue hiérarchique
 * @param {Developer} developer - Le développeur
 * @param {number} level - Le niveau hiérarchique (0, 1 ou 2)
 * @param {number} index - L'index dans le niveau
 * @returns {{ x: number, y: number }} Les coordonnées x,y
 */
function calculateCardPosition(developer, level, index) {
  // ...
}
```

### Mettre à Jour la Documentation

Si votre PR modifie :
- Une fonctionnalité existante → Mettre à jour `USER_GUIDE.md`
- L'API publique → Mettre à jour le README
- L'architecture → Mettre à jour `tech-guidelines.md`

---

## Process de Review

### Timeline

- Les mainteneurs s'efforcent de répondre dans les **48h ouvrées**
- Les PRs simples (bug fixes, docs) sont généralement approuvées rapidement
- Les PRs complexes (nouvelles features) peuvent nécessiter plusieurs itérations

### Critères de Review

Les reviewers vérifient :

1. **Fonctionnalité** : La PR résout-elle le problème ?
2. **Tests** : La PR inclut-elle des tests appropriés ?
3. **Performance** : Y a-t-il des impacts sur les performances ?
4. **Code Quality** : Le code respecte-t-il les standards ?
5. **Documentation** : La documentation est-elle à jour ?
6. **Breaking Changes** : Y a-t-il des changements cassants ?

### Répondre aux Commentaires

- Répondez à tous les commentaires (même un simple "Done" ou "Fixed")
- Si vous n'êtes pas d'accord, expliquez votre point de vue poliment
- Marquez les conversations comme "resolved" une fois traitées
- Pushez les corrections dans la même branche

### Merge

Une fois approuvée, votre PR sera mergée par un mainteneur. Merci pour votre contribution ! 🎉

---

## Questions ?

Si vous avez des questions :
- Ouvrez une [Discussion GitHub](https://github.com/votre-username/org-morphing-tool/discussions)
- Contactez les mainteneurs

---

**Merci de contribuer à l'Outil de Visualisation Organisationnelle !** ❤️
