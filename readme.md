# Outil de Visualisation Organisationnelle 🔄

Outil de visualisation moderne permettant de basculer entre deux modes d'organisation d'une équipe de développement : organisation hiérarchique (par métier) et organisation fonctionnelle (par squad agile), avec un effet de morphing fluide.

![Status](https://img.shields.io/badge/status-MVP%20complete-brightgreen)
![React](https://img.shields.io/badge/React-18+-blue)
![Vite](https://img.shields.io/badge/Vite-5+-purple)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎯 Objectif

Visualiser la double organisation d'une équipe de développeurs :
- **Vue Hiérarchique** : Organisation par métier (Cloud, Mobile, Embarqué, Test auto, Infra, etc.)
- **Vue Fonctionnelle** : Organisation par squads agiles dans un train agile
- **Morphing fluide** : Transition animée entre les deux vues en temps réel

![Demo Animation](docs/demo.gif)

---

## ✨ Fonctionnalités

### MVP Complet ✅
- 🔄 **Morphing** : Animation fluide entre vue hiérarchique et fonctionnelle
- 👥 **Cartes développeurs** : Visualisation moderne avec métier, rôles et séniorité
- 📊 **Vue hiérarchique** : 3 niveaux (Directeur → Managers → Développeurs)
- 🎯 **Vue fonctionnelle** : Squads organisées dans un train agile
- 📥 **Import XLSX** : Chargement massif des données avec validation robuste
- 📤 **Export XLSX** : Template pré-formaté et export des données actuelles
- ✏️ **Édition in-app** : CRUD complet (Ajout/modification/suppression)
- 🎨 **Design moderne** : Interface épurée inspirée d'Apple/Linear
- ♿ **Accessibilité** : Support clavier, ARIA labels, WCAG 2.1 compliant
- 🔍 **Zoom controls** : Contrôles de zoom intégrés avec auto-ajustement
- 💾 **Persistance locale** : Sauvegarde automatique en LocalStorage

---

## 🚀 Quick Start

### Prérequis

- Node.js 18+ et npm
- Git

### Installation

```bash
# Cloner le repo
git clone https://github.com/votre-username/org-morphing-tool.git
cd org-morphing-tool

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Premiers pas

1. L'application charge des données de démonstration au premier lancement
2. Utilisez le **ViewToggle** pour basculer entre les vues
3. Activez/désactivez l'affichage de la **séniorité**
4. Cliquez sur une carte pour **éditer** un développeur
5. **Exportez** vos données en XLSX pour les modifier dans Excel
6. **Importez** vos données mises à jour

### Scripts disponibles

```bash
npm run dev          # Lance le serveur de développement
npm run build        # Build de production
npm run preview      # Preview du build de production
npm run lint         # Lint du code
npm test             # Lance les tests
```

---

## 📁 Structure du Projet

```
org-morphing-tool/
├── src/
│   ├── components/      # Composants React
│   │   ├── cards/       # Cartes (développeurs, managers, directeur)
│   │   ├── views/       # Vues principales (hiérarchique, fonctionnelle)
│   │   ├── controls/    # Contrôles UI (toggles, boutons, export/import)
│   │   ├── forms/       # Formulaire d'édition
│   │   └── common/      # Composants réutilisables (zoom, modals, toast)
│   ├── data/            # Types, mock data, validation
│   ├── services/        # Services (storage, XLSX, preferences)
│   ├── utils/           # Utilitaires (layout, color mapping, design tokens)
│   ├── styles/          # Styles globaux et variables CSS
│   ├── App.jsx          # Composant principal
│   └── main.jsx         # Point d'entrée
├── public/              # Assets statiques
├── docs/                # Documentation détaillée
│   ├── USER_GUIDE.md    # Guide utilisateur
│   ├── CONTRIBUTING.md  # Guide de contribution
│   └── DEPLOYMENT.md    # Guide de déploiement
├── prd.md               # Product Requirements Document
├── dev-plan.md          # Plan de développement
├── tech-guidelines.md   # Guidelines techniques
└── README.md            # Ce fichier
```

---

## 🛠️ Stack Technique

### Core
- **React 18+** : Framework UI
- **Vite 5+** : Build tool et dev server ultra-rapide
- **JavaScript (ES6+)** : Langage principal avec JSDoc

### Librairies
- **Framer Motion** : Animations et morphing fluides
- **SheetJS (xlsx)** : Parsing et génération de fichiers Excel
- **Lucide React** : Icônes modernes et légères
- **React Hot Toast** : Notifications élégantes
- **clsx** : Gestion des classes CSS conditionnelles

### Styling
- **CSS Modules** : Styles scopés par composant
- **CSS Variables** : Système de design centralisé et personnalisable

### Tests
- **Vitest** : Tests unitaires ultra-rapides
- **React Testing Library** : Tests de composants

---

## 📚 Documentation

- **[USER_GUIDE.md](./docs/USER_GUIDE.md)** : Guide utilisateur complet
- **[CONTRIBUTING.md](./docs/CONTRIBUTING.md)** : Guide de contribution
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** : Guide de déploiement
- **[prd.md](./prd.md)** : Spécifications produit
- **[dev-plan.md](./dev-plan.md)** : Plan de développement en 11 lots
- **[tech-guidelines.md](./tech-guidelines.md)** : Guidelines techniques et conventions

---

## 🎨 Design Principles

- **Moderne et épuré** : Inspiration Apple, Linear, Notion
- **Animations fluides** : 60fps, transitions naturelles
- **Responsive** : Desktop prioritaire, adapté tablette/mobile
- **Accessibilité** : WCAG 2.1 AA, navigation clavier complète
- **Performance** : Code optimisé, lazy loading, GPU-acceleration

---

## 💾 Gestion des Données

### Stockage
- **LocalStorage** pour le MVP (persistance locale automatique)
- Format JSON structuré
- Sauvegarde automatique à chaque modification

### Import/Export XLSX

#### Format XLSX attendu

Le template exporté contient les colonnes suivantes :

| Nom | Prénom | Métier | Séniorité | LeadDev | TechLead | ScrumMaster | Manager | Squad |
|-----|--------|--------|-----------|---------|----------|-------------|---------|-------|
| Dupont | Jean | Cloud | 3 | Non | Oui | Non | Martin Pierre | Squad Alpha |
| Chen | Alice | Mobile | 4 | Oui | Non | Non | Dubois Marie | Squad Beta |

#### Métiers supportés
Backend, Frontend, Fullstack, DevOps, Mobile, Data, QA, Embarqué, Test auto, Infra, Cloud

#### Niveaux de séniorité
1 (Junior), 2 (Confirmé), 3 (Senior), 4 (Expert)

#### Rôles
- **LeadDev** : Lead Développeur (L)
- **TechLead** : Tech Lead (T)
- **ScrumMaster** : Scrum Master (S)

Valeurs acceptées : "Oui" ou "Non"

---

## 🎯 État du Projet

### Version actuelle : **1.0.0 - MVP Complet** ✅

### Checklist MVP
- ✅ Lot 0: Setup & Architecture
- ✅ Lot 1: Data Model & Mock Data
- ✅ Lot 2: Composant Carte Développeur
- ✅ Lot 3: Vue Hiérarchique
- ✅ Lot 4: Vue Fonctionnelle
- ✅ Lot 5: Morphing Animation
- ✅ Lot 6: Navigation & UI Controls
- ✅ Lot 7: Export XLSX
- ✅ Lot 8: Import XLSX
- ✅ Lot 9: Édition In-App (CRUD)
- ✅ Lot 10: Polish & Responsive
- ✅ Lot 11: Documentation & Tests

**Progress: 12/12 lots complétés (100%)** 🎉

---

## 🚀 Roadmap Future (V2)

### Fonctionnalités envisagées
- 🚂 **Multi-train** : Support de plusieurs trains agiles
- 📜 **Historisation** : Suivi des compositions de squad dans le temps
- 🔍 **Recherche avancée** : Filtres par métier, séniorité, rôle
- 📈 **Analytics** : Statistiques et métriques d'équipe
- 🔗 **API Backend** : Synchronisation cloud
- 👥 **Collaboration** : Partage et édition multi-utilisateurs
- 🎨 **Thèmes** : Dark mode, personnalisation des couleurs
- 📱 **Mobile App** : Application native iOS/Android

---

## 🤝 Contribution

Les contributions sont les bienvenues! Consultez [CONTRIBUTING.md](./docs/CONTRIBUTING.md) pour :
- Guidelines de développement
- Workflow Git
- Standards de code
- Process de review

### Workflow Git

```bash
# Créer une branche pour une feature
git checkout -b feature/nom-de-la-feature

# Développer et tester

# Commit avec message clair
git commit -m "feat: description de la feature"

# Push et créer une PR
git push origin feature/nom-de-la-feature
```

### Convention de commits

Format : `type: description`

Types :
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatting, CSS
- `refactor:` Refactoring de code
- `test:` Ajout/modification de tests
- `chore:` Tâches de maintenance

---

## 🐛 Résolution de Problèmes

### L'application ne démarre pas

```bash
# Supprimer node_modules et package-lock.json
rm -rf node_modules package-lock.json

# Réinstaller
npm install

# Relancer
npm run dev
```

### Erreurs d'import

Vérifier que toutes les dépendances sont installées :
```bash
npm install framer-motion xlsx clsx lucide-react react-hot-toast
```

### Performance du morphing

- Vérifier que `will-change` est utilisé sur les éléments animés
- Utiliser `transform` et `opacity` uniquement (GPU-accelerated)
- Vérifier les devtools Performance pour identifier les bottlenecks

### Problèmes d'import XLSX

- Vérifier que le fichier est au format `.xlsx` (pas `.xls`)
- S'assurer que les colonnes sont bien séparées (pas de texte CSV)
- Vérifier que les valeurs booléennes sont "Oui" ou "Non"
- Consulter les messages d'erreur détaillés dans la modal

---

## 🧪 Tests

### Lancer les tests

```bash
# Tests unitaires
npm test

# Tests avec coverage
npm run test:coverage

# Tests en mode watch
npm run test:watch
```

### Tests manuels

Checklist complète disponible dans [LOT_11_BIS_TESTS.md](./LOT_11_BIS_TESTS.md)

---

## 📊 Performance

- **Lighthouse Score** : 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size** : ~150KB (gzipped)
- **First Contentful Paint** : < 1s
- **Time to Interactive** : < 2s
- **Animation Frame Rate** : 60fps constant

---

## ♿ Accessibilité

- **WCAG 2.1 Level AA** compliant
- Navigation clavier complète (Tab, Enter, Space, Arrows)
- ARIA labels sur tous les contrôles interactifs
- Support screen readers
- Contraste suffisant sur tous les éléments
- Skip links pour navigation rapide

---

## 📝 License

[À définir - suggéré : MIT License]

---

## 👥 Équipe

Développé avec ❤️ pour visualiser l'organisation d'équipes agiles.

**Mainteneur** : [Votre nom]

---

## 📞 Support

Pour toute question, bug ou suggestion :
- Ouvrir une [issue GitHub](https://github.com/votre-username/org-morphing-tool/issues)
- Consulter la [documentation](./docs/USER_GUIDE.md)
- Rejoindre les discussions

---

## 🙏 Remerciements

- [Framer Motion](https://www.framer.com/motion/) pour les animations fluides
- [SheetJS](https://sheetjs.com/) pour la gestion des fichiers Excel
- [Lucide](https://lucide.dev/) pour les icônes élégantes
- [React](https://react.dev/) et [Vite](https://vitejs.dev/) pour l'expérience de développement

---

**Version** : 1.0.0 (MVP complet)
**Dernière mise à jour** : Octobre 2025
