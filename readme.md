# Outil de Visualisation Organisationnelle 🔄

Outil de visualisation moderne permettant de basculer entre deux modes d'organisation d'une équipe de développement : organisation hiérarchique (par métier) et organisation fonctionnelle (par squad agile), avec un effet de morphing fluide.

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![React](https://img.shields.io/badge/React-18+-blue)
![Vite](https://img.shields.io/badge/Vite-5+-purple)

---

## 🎯 Objectif

Visualiser la double organisation d'une équipe de 100+ développeurs :
- **Vue Hiérarchique** : Organisation par métier (Cloud, Mobile, Embarqué, Test auto, Infra)
- **Vue Fonctionnelle** : Organisation par squads agiles dans un train agile
- **Morphing fluide** : Transition animée entre les deux vues

## ✨ Fonctionnalités

### MVP (Version 1)
- 🔄 **Morphing** : Animation fluide entre vue hiérarchique et fonctionnelle
- 👥 **Cartes développeurs** : Visualisation moderne avec métier, rôles et séniorité
- 📊 **Vue hiérarchique** : 3 niveaux (Directeur → Managers → Développeurs)
- 🎯 **Vue fonctionnelle** : Squads organisées dans un train agile
- 📥 **Import CSV** : Chargement massif des données
- 📤 **Export CSV** : Template vide et export des données actuelles
- ✏️ **Édition in-app** : Ajout/modification/suppression de développeurs
- 🎨 **Design moderne** : Interface épurée inspirée d'Apple/Linear

### Version 2 (Future)
- 🚂 Multi-train (2 trains agiles)
- 📜 Historisation des compositions de squad
- 🔍 Recherche et filtres avancés
- 📈 Statistiques et analytics

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

### Scripts disponibles

```bash
npm run dev          # Lance le serveur de développement
npm run build        # Build de production
npm run preview      # Preview du build de production
npm run lint         # Lint du code (si configuré)
```

---

## 📁 Structure du Projet

```
org-morphing-tool/
├── src/
│   ├── components/      # Composants React
│   │   ├── cards/       # Cartes (développeurs, managers)
│   │   ├── views/       # Vues principales (hiérarchique, fonctionnelle)
│   │   ├── controls/    # Contrôles UI (toggles, boutons)
│   │   ├── forms/       # Formulaires d'édition
│   │   └── common/      # Composants réutilisables
│   ├── data/            # Mock data, types, validation
│   ├── services/        # Services (storage, CSV)
│   ├── utils/           # Utilitaires (layout, helpers)
│   ├── contexts/        # State management (React Context)
│   ├── hooks/           # Custom hooks
│   ├── styles/          # Styles globaux et variables CSS
│   ├── App.jsx          # Composant principal
│   └── main.jsx         # Point d'entrée
├── public/              # Assets statiques
├── PRD.md               # Product Requirements Document
├── DEVELOPMENT_PLAN.md  # Plan de développement
├── TECH_GUIDELINES.md   # Guidelines techniques
└── README.md            # Ce fichier
```

---

## 🛠️ Stack Technique

### Core
- **React 18+** : Framework UI
- **Vite** : Build tool et dev server
- **JavaScript** : Langage principal

### Librairies
- **Framer Motion** : Animations et morphing
- **PapaParse** : Parsing et génération CSV
- **Lucide React** : Icônes modernes
- **React Hot Toast** : Notifications
- **clsx** : Gestion des classes CSS
- **date-fns** : Manipulation de dates

### Styling
- **CSS Modules** : Styles scopés par composant
- **CSS Variables** : Système de design centralisé

---

## 📚 Documentation

- **[PRD.md](./PRD.md)** : Spécifications produit complètes
- **[DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md)** : Plan de développement en 11 lots
- **[TECH_GUIDELINES.md](./TECH_GUIDELINES.md)** : Guidelines techniques et conventions

---

## 🎨 Design Principles

- **Moderne et épuré** : Inspiration Apple, Linear, Notion
- **Animations fluides** : 60fps, transitions naturelles
- **Responsive** : Desktop prioritaire, adapté tablette/mobile
- **Accessibilité** : WCAG AA, navigation clavier

---

## 🔄 Workflow de Développement

### Développement par lots

Le développement suit le plan défini dans `DEVELOPMENT_PLAN.md` :

1. **Lot 0** : Setup & Architecture
2. **Lot 1** : Data Model & Mock Data
3. **Lot 2** : Composant Carte Développeur
4. **Lot 3** : Vue Hiérarchique
5. **Lot 4** : Vue Fonctionnelle
6. **Lot 5** : Morphing Animation
7. **Lot 6** : Navigation & UI Controls
8. **Lot 7** : Export CSV
9. **Lot 8** : Import CSV
10. **Lot 9** : Édition In-App
11. **Lot 10** : Polish & Responsive
12. **Lot 11** : Documentation & Tests

### Conventions

Voir `TECH_GUIDELINES.md` pour :
- Conventions de nommage
- Structure des composants
- Best practices React
- Guidelines de styling
- Gestion des données

---

## 💾 Gestion des Données

### Stockage
- **LocalStorage** pour le MVP (persistance locale)
- Format JSON structuré

### Import/Export CSV

#### Format CSV attendu
```csv
Nom,Prénom,Métier,Séniorité,LeadDev,TechLead,ScrumMaster,Manager,Squad
Dupont,Jean,Cloud,3,Non,Oui,Non,Martin Pierre,Squad Alpha
Chen,Alice,Mobile,4,Oui,Non,Non,Dubois Marie,Squad Beta
```

#### Métiers supportés
- Cloud
- Mobile
- Embarqué
- Test auto
- Infra

#### Niveaux de séniorité
- 1, 2, 3, 4

---

## 🤝 Contribution

### Pour commencer

1. Lire `PRD.md` pour comprendre le produit
2. Consulter `DEVELOPMENT_PLAN.md` pour voir l'avancement
3. Suivre les conventions de `TECH_GUIDELINES.md`

### Workflow Git

```bash
# Créer une branche pour un lot
git checkout -b lot-X-nom-du-lot

# Développer et tester

# Commit avec message clair
git commit -m "Lot X: Description de ce qui a été fait"

# Push et créer une PR
git push origin lot-X-nom-du-lot
```

### Messages de commit

Format : `Lot X: Description`

Exemples :
- `Lot 0: Setup initial du projet avec Vite et React`
- `Lot 2: Création du composant DeveloperCard`
- `Lot 5: Implémentation du morphing avec Framer Motion`

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
npm install framer-motion papaparse clsx lucide-react react-hot-toast date-fns
```

### Performance du morphing

- Vérifier que `will-change` est utilisé sur les éléments animés
- Utiliser `transform` et `opacity` uniquement (GPU-accelerated)
- Vérifier les devtools Performance pour identifier les bottlenecks

---

## 📊 État du Projet

### Lot actuel : **Lot 5 - Morphing Animation** ✅

### Checklist MVP
- [x] Lot 0: Setup & Architecture
- [x] Lot 1: Data Model & Mock Data
- [x] Lot 2: Composant Carte Développeur
- [x] Lot 3: Vue Hiérarchique
- [x] Lot 4: Vue Fonctionnelle
- [x] Lot 5: Morphing Animation
- [ ] Lot 6: Navigation & UI Controls
- [ ] Lot 7: Export CSV
- [ ] Lot 8: Import CSV
- [ ] Lot 9: Édition In-App
- [ ] Lot 10: Polish & Responsive
- [ ] Lot 11: Documentation & Tests

---

## 📝 License

[À définir]

---

## 👥 Équipe

Développé avec ❤️ pour visualiser l'organisation d'équipes agiles.

---

## 📞 Contact

Pour toute question ou suggestion, ouvrir une issue GitHub.

---

**Version** : 0.1.0 (MVP en développement)  
**Dernière mise à jour** : Octobre 2025