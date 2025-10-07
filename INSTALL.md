# Instructions d'Installation

## Lot 0 : Setup & Architecture ✓

La structure du projet a été créée avec succès !

## Installation des dépendances

⚠️ **Important** : Le projet est sur Google Drive, ce qui peut causer des problèmes lors de l'installation des dépendances npm. Nous recommandons deux approches :

### Option 1 : Installation locale (Recommandée)
1. Copiez le projet dans un répertoire local (ex: `C:\dev\OrgMorphing`)
2. Exécutez les commandes suivantes :

```bash
# Installer les dépendances de base
npm install

# Installer les dépendances du projet
npm install framer-motion papaparse clsx lucide-react react-hot-toast date-fns
```

### Option 2 : Installation directe sur Google Drive
Si vous souhaitez garder le projet sur Google Drive, utilisez cette commande avec un timeout plus long :

```bash
# Installer toutes les dépendances en une fois
npm install --prefer-offline --no-audit --legacy-peer-deps

# Si cela échoue, installez les packages un par un
npm install framer-motion
npm install papaparse
npm install clsx
npm install lucide-react
npm install react-hot-toast
npm install date-fns
```

## Lancer le projet

Une fois les dépendances installées :

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## Structure créée

```
org-morphing-tool/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── cards/
│   │   ├── views/
│   │   ├── controls/
│   │   ├── forms/
│   │   └── common/
│   ├── data/
│   ├── services/
│   ├── utils/
│   ├── contexts/
│   ├── hooks/
│   ├── styles/
│   │   ├── variables.css    ✓ Système de design
│   │   └── globals.css       ✓ Reset CSS
│   ├── App.jsx               ✓ Composant principal
│   ├── App.css
│   └── main.jsx              ✓ Point d'entrée
├── .eslintrc.cjs             ✓ Configuration ESLint
├── .prettierrc               ✓ Configuration Prettier
├── .gitignore                ✓
├── index.html                ✓
├── package.json              ✓
├── vite.config.js            ✓
└── README.md
```

## Prochaines étapes

Une fois les dépendances installées et le projet lancé :
- ✅ Lot 0 complété
- ➡️ Commencer le Lot 1 : Data Model & Mock Data

## Dépendances installées

### Core
- React 18.3.1
- React DOM 18.3.1
- Vite 5.3.1

### À installer
- framer-motion : Animations et morphing
- papaparse : Import/Export CSV
- clsx : Gestion des classes CSS
- lucide-react : Icônes modernes
- react-hot-toast : Notifications
- date-fns : Manipulation de dates

### Dev Dependencies
- ESLint : Linting du code
- Prettier : Formatage du code
- @vitejs/plugin-react : Plugin React pour Vite
