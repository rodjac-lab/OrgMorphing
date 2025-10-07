# Plan de Développement - Outil de Visualisation Organisationnelle

## 🎯 Objectif du plan

Ce plan découpe le développement du MVP en **lots incrémentaux** permettant :
- Des livrables testables à chaque étape
- Un développement progressif sans blocage
- Une validation continue des fonctionnalités
- Une base solide pour les évolutions futures

---

## 📦 Lots de développement

### **Lot 0 : Setup & Architecture** 
**Durée estimée** : 0.5-1 jour  
**Priorité** : 🔴 Critique

#### Objectifs
- Initialiser le projet avec une structure propre
- Mettre en place l'environnement de développement
- Définir l'architecture technique

#### Tâches
1. **Setup projet**
   - Initialiser le projet (Vite + React ou HTML/JS selon choix)
   - Configuration ESLint + Prettier
   - Structure de dossiers
   - README initial avec instructions de setup

2. **Architecture de base**
   - Définir la structure des composants
   - Setup du système de design (variables CSS, couleurs)
   - Configuration du build

3. **État initial**
   - Setup du state management (React Context ou simple état local)
   - Structure du data model (types/interfaces)

#### Critères d'acceptation
- ✅ Projet buildable et lançable en dev
- ✅ Structure de dossiers claire et documentée
- ✅ Variables de design (couleurs métiers) définies
- ✅ Hot reload fonctionnel

#### Livrables
- Repo GitHub avec structure de base
- Documentation de setup dans README
- Système de design initialisé

---

### **Lot 1 : Data Model & Mock Data**
**Durée estimée** : 1 jour  
**Priorité** : 🔴 Critique  
**Dépendances** : Lot 0

#### Objectifs
- Implémenter le modèle de données complet
- Créer un jeu de données de test réaliste
- Mettre en place le système de stockage

#### Tâches
1. **Data Model**
   - Créer les types/interfaces pour Developer, Manager, Director, Squad, Train, RTE
   - Créer les utilitaires de manipulation des données
   - Validation des données (fonctions de validation)

2. **Mock Data**
   - Créer un dataset de test avec :
     - 1 directeur
     - 6 managers (Cloud x2, Mobile x2, Embarqué, Test auto, Infra)
     - 40-50 développeurs répartis
     - 8 squads
     - 1 RTE
   - Données cohérentes (relations manager/dev, squad/membres)

3. **Stockage local**
   - Implémentation LocalStorage ou IndexedDB
   - Fonctions CRUD de base (Create, Read, Update, Delete)
   - Initialisation avec mock data

#### Critères d'acceptation
- ✅ Modèle de données complet et typé
- ✅ Dataset de test chargé au premier lancement
- ✅ Données persistées en local
- ✅ Fonctions CRUD testables manuellement (via console)

#### Livrables
- Fichier de types/interfaces
- Mock data generator
- Système de persistance fonctionnel

---

### **Lot 2 : Composant Carte Développeur**
**Durée estimée** : 1-1.5 jours  
**Priorité** : 🔴 Critique  
**Dépendances** : Lot 1

#### Objectifs
- Créer le composant de base (carte développeur)
- Implémenter le système visuel (couleurs, pictogrammes)
- Rendre le composant réutilisable et configurable

#### Tâches
1. **Composant de base**
   - Créer le composant `DeveloperCard`
   - Props : developer data, position (x, y), afficher séniorité (boolean)
   - Styling moderne selon les specs du PRD

2. **Système visuel**
   - Barre de couleur métier (vertical, 3px, gauche)
   - Pictogrammes L, T, S selon les rôles
   - Gestion du nom des managers en couleur
   - Tooltip au hover montrant le métier

3. **Interactions**
   - Hover effects (élévation, scale)
   - Click handler (préparation pour édition future)
   - Animations subtiles

4. **Variants**
   - Carte développeur standard
   - Carte manager (nom en couleur, badge optionnel)
   - Carte directeur

#### Critères d'acceptation
- ✅ Carte s'affiche correctement avec toutes les informations
- ✅ Barre de couleur correspond au métier
- ✅ Pictogrammes affichés selon les rôles
- ✅ Hover effects fluides
- ✅ Design conforme au PRD (moderne, épuré)
- ✅ Responsive (adapté pour desktop et tablette)

#### Livrables
- Composant `DeveloperCard` réutilisable
- Storybook ou page de démo montrant toutes les variantes
- Documentation du composant

---

### **Lot 3 : Vue Hiérarchique (Layout statique)**
**Durée estimée** : 1.5-2 jours  
**Priorité** : 🔴 Critique  
**Dépendances** : Lot 2

#### Objectifs
- Implémenter la vue hiérarchique complète
- Calculer les positions des cartes automatiquement
- Afficher les connexions hiérarchiques

#### Tâches
1. **Layout hiérarchique**
   - Algorithme de positionnement des cartes en arbre
   - 3 niveaux : Directeur (niveau 0) → Managers (niveau 1) → Devs (niveau 2)
   - Espacement et centrage automatiques
   - Gestion de plusieurs managers par métier

2. **Connexions visuelles**
   - Lignes reliant les niveaux hiérarchiques
   - Rendu SVG ou divs positionnées
   - Style subtil (lignes fines, couleur neutre)

3. **Composant container**
   - `HierarchicalView` component
   - Utilise `DeveloperCard` pour chaque personne
   - Calcul des positions basé sur les données
   - Gestion du viewport (scroll si nécessaire)

4. **Responsive**
   - Adaptation pour écrans moyens
   - Scroll vertical si trop de développeurs

#### Critères d'acceptation
- ✅ Tous les développeurs du mock data affichés
- ✅ Organisation en 3 niveaux claire
- ✅ Métiers regroupés par manager
- ✅ Plusieurs managers du même métier gérés correctement
- ✅ Connexions hiérarchiques visibles
- ✅ Pas de chevauchement de cartes
- ✅ Layout esthétique et équilibré

#### Livrables
- Composant `HierarchicalView`
- Algorithme de layout documenté
- Vue fonctionnelle avec mock data

---

### **Lot 4 : Vue Fonctionnelle (Layout statique)**
**Durée estimée** : 1.5-2 jours  
**Priorité** : 🔴 Critique  
**Dépendances** : Lot 2

#### Objectifs
- Implémenter la vue fonctionnelle (squads)
- Gérer la disposition adaptative (rangée unique vs grille)
- Afficher le RTE et les squads

#### Tâches
1. **Layout des squads**
   - Algorithme de disposition :
     - Si ≤ 8 squads → rangée unique
     - Si > 8 squads → grille multi-rangées (calcul automatique)
   - Chaque squad = container avec nom + cartes développeurs
   - Espacement et alignement

2. **Composant Squad**
   - `SquadContainer` component
   - Header avec nom de la squad (éditable en V2, statique pour MVP)
   - Liste des développeurs membres
   - Style : border subtil, background légèrement différent

3. **RTE Header**
   - Label "RTE: [Nom] - Train Cantal" au-dessus des squads
   - Style moderne et discret

4. **Composant container**
   - `FunctionalView` component
   - Utilise `SquadContainer` et `DeveloperCard`
   - Calcul automatique de la grille selon nombre de squads
   - Gestion du viewport

#### Critères d'acceptation
- ✅ Toutes les squads du mock data affichées
- ✅ Développeurs groupés correctement par squad
- ✅ Disposition adaptative (rangée vs grille) fonctionnelle
- ✅ RTE visible au-dessus avec nom du train
- ✅ Noms des squads affichés
- ✅ Layout esthétique et équilibré
- ✅ Pas de scroll horizontal

#### Livrables
- Composant `FunctionalView`
- Composant `SquadContainer`
- Algorithme de layout adaptatif documenté

---

### **Lot 5 : Morphing Animation**
**Durée estimée** : 2-3 jours  
**Priorité** : 🟠 Haute  
**Dépendances** : Lot 3, Lot 4

#### Objectifs
- Implémenter l'animation de morphing entre les deux vues
- Transitions fluides à 60fps
- Gestion de l'état de la vue active

#### Tâches
1. **Système de transition**
   - Calcul des positions initiales et finales pour chaque carte
   - Interpolation smooth entre les deux états
   - Timing : 0.8-1s avec easing naturel (cubic-bezier)
   - Utilisation de CSS transitions ou animations JS (GSAP, Framer Motion, ou web animations API)

2. **Gestion des connexions**
   - Fade out des connexions hiérarchiques
   - Fade in des groupements de squads
   - Timing coordonné avec le mouvement des cartes

3. **State management**
   - État global : `isHierarchical` (boolean)
   - Fonction `toggleView()` qui déclenche le morphing
   - Mémorisation de la vue active

4. **Optimisation performance**
   - Utilisation de `transform` et `opacity` (GPU-accelerated)
   - `will-change` pour préparer les animations
   - Debouncing si nécessaire

#### Critères d'acceptation
- ✅ Animation fluide à 60fps
- ✅ Toutes les cartes se déplacent correctement
- ✅ Durée de ~1s, sensation naturelle
- ✅ Connexions apparaissent/disparaissent avec timing approprié
- ✅ Pas de lag ou de saccades
- ✅ Bouton de toggle fonctionnel et responsive

#### Livrables
- Système de morphing complet
- Documentation de l'implémentation
- Tests de performance

---

### **Lot 6 : Navigation & UI Controls**
**Durée estimée** : 1 jour  
**Priorité** : 🟠 Haute  
**Dépendances** : Lot 5

#### Objectifs
- Créer l'interface de contrôle principale
- Bouton de bascule de vue
- Toggle d'affichage de la séniorité

#### Tâches
1. **Header/Controls bar**
   - Zone de contrôles en haut de la page
   - Design moderne, épuré
   - Sticky ou fixe selon le choix

2. **Bouton de bascule de vue**
   - Bouton principal "Vue Hiérarchique / Vue Fonctionnelle"
   - Indicateur de la vue active
   - Animation du bouton au clic
   - Keyboard accessible (Enter/Space)

3. **Toggle séniorité**
   - Switch/Toggle pour afficher/masquer les niveaux
   - État mémorisé en local
   - Application immédiate sur toutes les cartes

4. **Indicateurs visuels**
   - Titre de la page avec mode actuel
   - Breadcrumb ou indicateur subtil

#### Critères d'acceptation
- ✅ Bouton de bascule bien visible et accessible
- ✅ Toggle séniorité fonctionnel
- ✅ États mémorisés pendant la session
- ✅ Design cohérent avec le reste de l'app
- ✅ Responsive (adapté mobile/tablette)

#### Livrables
- Composant `ControlsBar`
- Composant `ViewToggle`
- Composant `SeniorityToggle`

---

### **Lot 7 : Export CSV**
**Durée estimée** : 1-1.5 jours  
**Priorité** : 🟠 Haute  
**Dépendances** : Lot 1

#### Objectifs
- Implémenter l'export CSV des données
- Générer un template vide pour première utilisation
- Format standardisé et compatible Excel

#### Tâches
1. **Export des données actuelles**
   - Bouton "Exporter CSV"
   - Transformation des données en format CSV
   - Headers : Nom, Prénom, Métier, Séniorité, LeadDev, TechLead, ScrumMaster, Manager, Squad
   - Génération du fichier et téléchargement

2. **Export template vide**
   - Bouton "Exporter Template CSV"
   - Fichier avec headers + 2-3 lignes d'exemple commentées
   - Instructions dans les premières lignes (commentaires CSV)

3. **Utilitaires**
   - Fonction de sérialisation des données
   - Fonction de génération de CSV conforme
   - Gestion des caractères spéciaux et encodage UTF-8

4. **UI**
   - Boutons dans la barre de contrôles
   - Feedback visuel au téléchargement (toast ou notification)

#### Critères d'acceptation
- ✅ Export CSV contient toutes les données actuelles
- ✅ Format CSV valide et lisible dans Excel/Numbers
- ✅ Template vide avec headers et exemples
- ✅ Encodage UTF-8 préservé (caractères accentués)
- ✅ Nom de fichier avec timestamp (ex: org_export_2025-10-07.csv)

#### Livrables
- Fonction `exportToCSV()`
- Fonction `exportTemplateCSV()`
- Boutons dans l'UI

---

### **Lot 8 : Import CSV**
**Durée estimée** : 2-2.5 jours  
**Priorité** : 🟠 Haute  
**Dépendances** : Lot 1, Lot 7

#### Objectifs
- Implémenter l'import CSV
- Validation robuste des données
- Gestion des erreurs avec messages clairs

#### Tâches
1. **Parsing CSV**
   - Bouton "Importer CSV" avec file picker
   - Parsing du fichier (librairie PapaParse ou native)
   - Détection de l'encodage

2. **Validation des données**
   - Vérification des headers obligatoires
   - Validation ligne par ligne :
     - Métier valide (dans la liste autorisée)
     - Séniorité valide (1-4)
     - Rôles valides (Oui/Non)
     - Manager existe (si spécifié)
     - Squad existe (si spécifié)
   - Collection des erreurs avec numéros de ligne

3. **Traitement des données**
   - Création/mise à jour des entités
   - Gestion des relations (N-1 manager, squad)
   - Détection des changements (ajouts, modifs, suppressions)

4. **UI de feedback**
   - Modal de confirmation avant import
   - Affichage du résumé : X ajouts, Y modifications, Z erreurs
   - Liste des erreurs avec numéros de ligne si problèmes
   - Possibilité d'annuler

5. **Post-import**
   - Sauvegarde en local
   - Mise à jour de la vue active
   - Toast de succès

#### Critères d'acceptation
- ✅ Import CSV fonctionnel avec données valides
- ✅ Validation robuste avec messages d'erreur clairs
- ✅ Gestion des erreurs sans crash
- ✅ Résumé des changements avant application
- ✅ Données correctement persistées
- ✅ Vues mises à jour après import

#### Livrables
- Fonction `importFromCSV()`
- Module de validation
- UI d'import avec feedback

---

### **Lot 9 : Édition In-App (Basique)**
**Durée estimée** : 2-3 jours  
**Priorité** : 🟡 Moyenne  
**Dépendances** : Lot 1, Lot 2

#### Objectifs
- Permettre l'édition basique des données dans l'interface
- Ajout/modification/suppression de développeurs
- Interface simple et fonctionnelle (pas de drag & drop)

#### Tâches
1. **Formulaire développeur**
   - Modal/Sidebar avec formulaire
   - Champs : Nom, Prénom, Métier (select), Séniorité (1-4), Rôles (checkboxes), Manager (select), Squad (select)
   - Validation côté client
   - Actions : Sauvegarder, Annuler

2. **Actions CRUD**
   - Bouton "Ajouter un développeur" dans les contrôles
   - Clic sur une carte → Édition
   - Bouton supprimer (avec confirmation)
   - Mise à jour immédiate des vues

3. **Gestion des managers et squads**
   - Formulaire similaire pour ajouter/éditer managers
   - Formulaire pour créer/renommer squads
   - Gestion du directeur (édition nom)

4. **Persistance**
   - Sauvegarde automatique en local après chaque modification

#### Critères d'acceptation
- ✅ Ajout de développeur fonctionnel
- ✅ Édition d'un développeur existant fonctionnelle
- ✅ Suppression avec confirmation
- ✅ Validation des données saisies
- ✅ Vues mises à jour immédiatement
- ✅ Données persistées en local

#### Livrables
- Composant `DeveloperForm`
- Modal/Sidebar d'édition
- Fonctions CRUD dans l'UI

---

### **Lot 10 : Polish & Responsive**
**Durée estimée** : 1.5-2 jours  
**Priorité** : 🟡 Moyenne  
**Dépendances** : Tous les lots précédents

#### Objectifs
- Finaliser le design et l'expérience utilisateur
- Optimiser le responsive (mobile/tablette)
- Corriger les bugs visuels

#### Tâches
1. **Design polish**
   - Revoir tous les espacements, paddings, margins
   - Affiner les couleurs et contrastes
   - Micro-animations additionnelles (loading states, etc.)
   - Hover states cohérents partout

2. **Responsive**
   - Adaptation mobile (cartes plus petites, layout vertical)
   - Adaptation tablette (grille optimisée)
   - Menu hamburger si nécessaire
   - Gestion du morphing sur petit écran

3. **Performance**
   - Optimisation du rendering (React.memo, virtualization si nécessaire)
   - Lazy loading si applicable
   - Réduction de la taille du bundle

4. **Accessibilité**
   - Contraste WCAG AA minimum
   - Navigation au clavier complète
   - Screen reader friendly (ARIA labels)
   - Focus indicators visibles

5. **Error handling**
   - Messages d'erreur user-friendly
   - États de chargement (spinners, skeletons)
   - Gestion des cas limites

#### Critères d'acceptation
- ✅ Design cohérent et moderne sur tous les écrans
- ✅ Responsive de 320px à 1920px+
- ✅ Animations fluides sur tous les devices
- ✅ Performance optimale (Lighthouse > 90)
- ✅ Accessibilité WCAG AA
- ✅ Pas de bug visuel majeur

#### Livrables
- Application finalisée et polie
- Documentation des optimisations
- Tests sur différents devices/navigateurs

---

### **Lot 11 : Documentation & Tests**
**Durée estimée** : 1-1.5 jours  
**Priorité** : 🟡 Moyenne  
**Dépendances** : Lot 10

#### Objectifs
- Documenter le code et l'architecture
- Tests de base (manuels ou automatisés selon le temps)
- Guide utilisateur

#### Tâches
1. **Documentation technique**
   - README complet :
     - Description du projet
     - Installation et setup
     - Scripts disponibles
     - Architecture et structure
   - Commentaires dans le code (fonctions complexes)
   - Documentation des composants principaux

2. **Guide utilisateur**
   - Documentation dans l'app (tooltip, help, etc.) ou fichier séparé
   - Workflow : Import CSV → Visualisation → Édition → Export
   - FAQ basique

3. **Tests manuels**
   - Checklist de test de tous les user flows
   - Tests sur différents navigateurs
   - Tests avec datasets de tailles variées (10 devs, 50 devs, 100+ devs)

4. **Tests automatisés (optionnel selon temps)**
   - Tests unitaires des fonctions critiques (validation, parsing)
   - Tests d'intégration basiques

#### Critères d'acceptation
- ✅ README complet et à jour
- ✅ Code commenté pour les parties complexes
- ✅ Guide utilisateur disponible
- ✅ Checklist de test complète et validée
- ✅ Application testée sur Chrome, Firefox, Safari

#### Livrables
- Documentation complète
- Checklist de test
- Guide utilisateur

---

## 📊 Résumé et Durée Totale

| Lot | Nom | Durée estimée | Priorité |
|-----|-----|---------------|----------|
| 0 | Setup & Architecture | 0.5-1 jour | 🔴 Critique |
| 1 | Data Model & Mock Data | 1 jour | 🔴 Critique |
| 2 | Composant Carte Développeur | 1-1.5 jours | 🔴 Critique |
| 3 | Vue Hiérarchique | 1.5-2 jours | 🔴 Critique |
| 4 | Vue Fonctionnelle | 1.5-2 jours | 🔴 Critique |
| 5 | Morphing Animation | 2-3 jours | 🟠 Haute |
| 6 | Navigation & UI Controls | 1 jour | 🟠 Haute |
| 7 | Export CSV | 1-1.5 jours | 🟠 Haute |
| 8 | Import CSV | 2-2.5 jours | 🟠 Haute |
| 9 | Édition In-App | 2-3 jours | 🟡 Moyenne |
| 10 | Polish & Responsive | 1.5-2 jours | 🟡 Moyenne |
| 11 | Documentation & Tests | 1-1.5 jours | 🟡 Moyenne |

**Durée totale estimée** : 16-23 jours (selon complexité et imprévus)

---

## 🎯 Stratégie de développement

### Approche recommandée

**Phase 1 : Fondations (Lots 0-2)** 
Établir les bases solides : setup, data, composants de base.  
**Objectif** : Avoir des cartes développeurs affichables.

**Phase 2 : Visualisations (Lots 3-4)**
Créer les deux vues statiques.  
**Objectif** : Voir les deux organisations complètes.

**Phase 3 : Morphing (Lot 5)**
Implémenter la feature centrale : l'animation de transition.  
**Objectif** : Transition fluide entre les vues.

**Phase 4 : Interactions (Lots 6-9)**
Ajouter les contrôles, import/export, édition.  
**Objectif** : Application fonctionnelle et utilisable.

**Phase 5 : Finitions (Lots 10-11)**
Polish, responsive, documentation.  
**Objectif** : Produit finalisé et livrable.

### Points d'attention

⚠️ **Le morphing (Lot 5)** est la feature la plus complexe techniquement. Prévoir du temps de test et d'ajustement.

⚠️ **L'import CSV (Lot 8)** nécessite une validation robuste. Ne pas sous-estimer les cas limites.

⚠️ **Le responsive (Lot 10)** peut révéler des problèmes d'architecture. Tester régulièrement sur mobile pendant le dev.

### Validation continue

Après chaque lot :
- ✅ Test manuel des fonctionnalités développées
- ✅ Commit et push sur GitHub
- ✅ Validation avec le product owner (toi)
- ✅ Ajustements si nécessaire avant de passer au lot suivant

---

## 🚀 Prochaines étapes

1. **Créer le repo GitHub** ✅ (en cours)
2. **Rédiger les guidelines techniques** → Prochaine étape
3. **Commencer le Lot 0** avec Claude Code
4. **Développement itératif** lot par lot

---

**Version** : 1.0  
**Date** : Octobre 2025  
**Statut** : Plan initial