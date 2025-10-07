# PRD - Outil de Visualisation Organisationnelle

## 📋 Vue d'ensemble

### Vision
Créer un outil de visualisation dynamique et moderne permettant de représenter et basculer entre deux modes d'organisation d'une équipe de développement : l'organisation hiérarchique (par métier) et l'organisation fonctionnelle (par squad agile). L'accent est mis sur un design épuré, tech et premium, avec des animations fluides type Apple/Linear.

### Objectifs
- Rendre visible la double organisation (hiérarchique et fonctionnelle) de l'équipe
- Faciliter la compréhension des rôles et responsabilités de chaque développeur
- Permettre une gestion simple et fluide des données d'organisation
- Offrir une expérience visuelle engageante avec un effet de morphing entre les deux vues

---

## 🎯 Contexte organisationnel

### Principe de la double organisation

L'équipe de développement (100+ personnes) fonctionne selon deux axes complémentaires :

#### 1. Organisation Hiérarchique (par métier)
- **Structure** : 3 niveaux hiérarchiques
  - Directeur de l'Engineering
  - Managers métiers (un ou plusieurs par métier selon la taille des équipes)
  - Développeurs
- **Métiers** : Cloud, Embarqué, Mobile, Test auto, Infra (extensible à d'autres métiers)
- **Note** : Un métier peut avoir plusieurs managers (ex: 2 managers Cloud si l'équipe Cloud est très importante)
- **Responsabilités** : 
  - Gestion RH et reporting
  - Plans de montée en compétences
  - Communautés de pratique
  - Formations métier

#### 2. Organisation Fonctionnelle (par squad)
- **Structure** : Train Agile "Cantal" avec ~15 squads
- **Cycle** : Incréments de 9 semaines (3 sprints de 3 semaines)
- **Taille des squads** : 3 à 9 développeurs (moyenne 6)
- **Composition** : Mono-métier ou multi-métiers selon les features
- **Animation** : Release Train Engineer (RTE)
- **Travail quotidien** : Les développeurs travaillent au sein de leur squad pendant l'incrément

#### Particularités
- **Managers métiers** : Peuvent être à 100% management OU 50% management + 50% développement en squad
- **Tech Leads** : Rôle hybride avec 50% d'expertise transversale + 50% de production en squad
- **Flexibilité** : Les développeurs peuvent rester plusieurs incréments dans la même squad selon les besoins

---

## 👥 Personas

### Persona 1 : Directeur de l'Engineering
**Besoins :**
- Vision globale de l'organisation
- Compréhension rapide de la répartition des compétences
- Identification des experts et leads

### Persona 2 : Manager métier
**Besoins :**
- Vue de son équipe métier
- Suivi des développeurs (où ils sont assignés)
- Gestion des compétences et montée en compétence

### Persona 3 : RTE (Release Train Engineer)
**Besoins :**
- Vue claire de la composition des squads
- Identification des rôles clés (Lead Dev, Scrum Master)
- Équilibre des compétences entre squads

### Persona 4 : Développeur
**Besoins :**
- Comprendre sa position dans les deux organisations
- Identifier ses collègues de métier et de squad
- Voir qui sont les experts et leads

---

## ✨ Features

### 🎯 MVP (Version 1)

#### F1 - Visualisation hiérarchique
**Description :** Affichage de l'organigramme hiérarchique classique par métier

**Éléments visuels :**
- 3 niveaux : Directeur → Managers métiers → Développeurs
- Carte pour chaque personne contenant :
  - Nom et prénom
  - Rôle/titre
  - Barre de couleur verticale à gauche (couleur du métier)
  - Pictogrammes à droite : L (Lead Dev), T (Tech Lead), S (Scrum Master)
- Nom des managers écrit dans la couleur de leur métier
- Connexions hiérarchiques entre les niveaux

#### F2 - Visualisation fonctionnelle (squads)
**Description :** Affichage des squads du train agile

**Éléments visuels :**
- Label "Train Cantal" avec le nom du RTE au-dessus
- Squads disposées en :
  - Rangée unique si ≤ 8 squads
  - Grille multi-rangées si > 8 squads
- Chaque squad affiche :
  - Nom de la squad (éditable)
  - Cartes des développeurs membres avec mêmes attributs visuels que vue hiérarchique
- Regroupement visuel des développeurs par squad

#### F3 - Morphing entre les deux vues
**Description :** Animation fluide de transition entre vue hiérarchique et vue fonctionnelle

**Comportement :**
- Transition douce (0.8-1s) avec courbe d'animation naturelle
- Repositionnement progressif des cartes développeurs
- Redessinage des connexions/regroupements
- Bouton de bascule clairement identifié

#### F4 - Système d'attributs visuels
**Description :** Représentation visuelle des caractéristiques de chaque développeur

**Attributs :**
- **Métier** : Barre de couleur verticale à gauche de la carte
  - Cloud : Bleu
  - Mobile : Vert
  - Embarqué : Rouge
  - Test auto : Jaune
  - Infra : Violet
  - Extensible à d'autres métiers/couleurs
- **Séniorité** : Niveaux 1, 2, 3, 4 (affichage optionnel via toggle)
- **Rôles** : Pictogrammes à droite de la carte
  - L = Lead Dev
  - T = Tech Lead
  - S = Scrum Master
  - Cumul possible (plusieurs pictogrammes)

#### F5 - Gestion des données (Interface)
**Description :** Interface simple de saisie et modification des données

**Fonctionnalités :**
- Ajout/suppression de développeurs
- Modification des attributs (métier, séniorité, rôles)
- Assignation à un manager métier (N-1)
- Assignation à une squad
- Édition du nom des squads
- Assignation/changement du RTE

#### F6 - Import/Export CSV
**Description :** Gestion massive des données via fichiers CSV/Excel

**Format CSV :**
```csv
Nom,Prénom,Métier,Séniorité,LeadDev,TechLead,ScrumMaster,Manager,Squad
Dupont,Jean,Cloud,3,Oui,Non,Non,Martin Pierre,Squad Alpha
Chen,Alice,Mobile,4,Non,Oui,Non,Dubois Marie,Squad Beta
...
```

**Fonctionnalités :**
- **Export CSV** :
  - Export des données actuelles pour édition externe
  - Export d'un template vide (première utilisation) avec headers et exemples commentés
  - Permet d'avoir un format de saisie propre et standardisé
  - Facilite la saisie initiale de 100+ développeurs dans Excel/Numbers
- **Import CSV** :
  - Import pour saisie massive ou mise à jour
  - Validation des données à l'import
  - Détection des changements (ajouts, modifications, suppressions)
  - Messages d'erreur clairs en cas de problème avec numéro de ligne
- **Workflow typique** :
  1. Premier export → Template CSV vide
  2. Remplissage dans Excel
  3. Import → Peuplement de l'application
  4. Export régulier → Édition/ajustements
  5. Réimport → Mise à jour

#### F7 - Vue par défaut et navigation
**Description :** Interface utilisateur de base

**Comportement :**
- Chargement par défaut : Vue hiérarchique
- Bouton de bascule bien visible
- Indicateur de la vue active
- Design responsive (desktop prioritaire, mobile adapté)

#### F8 - Toggle niveau de séniorité
**Description :** Affichage optionnel du niveau de séniorité

**Comportement :**
- Bouton toggle pour afficher/masquer les niveaux
- Quand activé : pictogramme avec chiffre 1-4 visible sur chaque carte
- État mémorisé pendant la session

---

### 🚀 Version 2 (Future)

#### F9 - Multi-train (2 trains)
**Description :** Gestion de deux trains agiles avec deux RTEs

**Fonctionnalités :**
- Nom de train éditable (ex: Train Cantal, Train Auvergne)
- Assignation RTE par train
- Vue fonctionnelle montrant les deux trains côte à côte ou en rangées
- Morphing adapté pour gérer les deux trains

#### F10 - Historisation
**Description :** Conservation de l'historique des compositions de squad

**Fonctionnalités :**
- Sauvegarde automatique à chaque changement d'incrément
- Navigation temporelle (voir composition passée)
- Comparaison entre incréments
- Export de l'historique

#### F11 - Recherche et filtres
**Description :** Outils de recherche et filtrage avancés

**Fonctionnalités :**
- Recherche par nom de développeur
- Filtres par :
  - Métier
  - Squad
  - Niveau de séniorité
  - Rôles (Lead Dev, Tech Lead, Scrum Master)
- Highlight des résultats de recherche dans les vues

#### F12 - Statistiques et analytics
**Description :** Tableaux de bord et métriques

**Fonctionnalités :**
- Répartition par métier
- Distribution de séniorité
- Équilibre des squads
- Taux d'occupation des managers
- Identification des goulets d'étranglement

---

## 🎨 Spécifications visuelles

### Principes de design

**Vision esthétique** : Design moderne, tech, épuré et premium - inspiration Apple, Linear, Notion, Figma.

**À éviter :**
- ❌ Organigrammes RH classiques et vieillis (style PowerPoint années 2000)
- ❌ Interface trop technique type terminal/CLI
- ❌ Surcharge visuelle et décorations inutiles

**À privilégier :**
- ✅ Interface épurée et spacieuse (beaucoup de blanc)
- ✅ Micro-animations fluides et purposeful
- ✅ Palette de couleurs moderne et harmonieuse
- ✅ Typographie soignée (system fonts ou Inter/SF Pro)
- ✅ Effets subtils : ombres douces, glassmorphism optionnel, hover states délicats
- ✅ Transitions naturelles (ease-in-out, cubic-bezier)
- ✅ Contraste élevé pour la lisibilité
- ✅ Iconographie minimaliste (Lucide, Heroicons, ou SF Symbols style)

**Références visuelles :**
- Linear (gestion de projets) - animations fluides
- Notion (organisation) - design épuré
- Apple Design - attention aux détails
- Figma (collaboration) - interface moderne et fonctionnelle

### Design système

#### Couleurs des métiers
| Métier | Couleur | Hex |
|--------|---------|-----|
| Cloud | Bleu | #3B82F6 |
| Mobile | Vert | #10B981 |
| Embarqué | Rouge | #EF4444 |
| Test auto | Jaune | #F59E0B |
| Infra | Violet | #8B5CF6 |

#### Cartes développeurs
```
┌─────────────────────────┐
│█                     LTS│  ← Barre métier (gauche) + Pictogrammes (droite)
│█  Jean Dupont          │  ← Nom uniquement
│█                        │
└─────────────────────────┘
```

**Rationale :** Le métier est déjà indiqué par la couleur de la barre verticale. Enlever le texte "Développeur [Métier]" permet de gagner de l'espace et rend les cartes plus compactes et modernes.

**Spécifications :**
- Largeur : 140-160px (réduite grâce à la suppression du métier)
- Hauteur : 60-70px (plus compacte)
- Padding : 12px
- Border-radius : 10px
- Background : Blanc ou gris très clair (#FAFAFA)
- Shadow : Subtile (0 2px 8px rgba(0,0,0,0.06))
- Hover : Légère élévation + scale(1.02) + shadow plus marquée
- Transition : all 0.2s ease
- Barre métier : 3px de large, hauteur totale de la carte, border-radius à gauche
- Pictogrammes : 18x18px, alignés à droite avec espacement de 3px
- Tooltip au hover : Affiche le métier complet si nécessaire

#### Managers métiers
- Nom affiché dans la couleur du métier (au lieu du noir standard)
- Même format de carte que les développeurs (compact, moderne)
- Badge subtil "Manager" ou icône 👤 pour différenciation
- Optionnel : Border fine dans la couleur du métier
- Si le manager est aussi développeur (50/50), il apparaît aussi dans une squad en vue fonctionnelle

#### Typographie
- **Nom complet** : Font-weight 500-600, taille 14px, couleur #1F2937 (ou couleur métier pour les managers)
- **Pictogrammes** : Font monospace bold ou icônes SVG, 18px
- **Labels et UI** : Font-weight 400-500, taille 13-14px
- **Police recommandée** : System font stack (SF Pro sur macOS/iOS, Segoe UI sur Windows) ou Inter/Poppins pour un rendu cross-platform homogène

### Layouts

#### Vue hiérarchique
```
                [Directeur Engineering]
                           |
        ┌──────────┬───────┴───────┬──────────┬──────────┐
    [Manager]  [Manager]  [Manager]  [Manager]  [Manager]
     Cloud     Mobile    Embarqué   Test auto   Infra
        |          |          |          |          |
     [Devs]     [Devs]     [Devs]     [Devs]     [Devs]
```

#### Vue fonctionnelle (≤8 squads)
```
        RTE: [Nom du RTE] - Train Cantal
        
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Squad 1 │ │Squad 2 │ │Squad 3 │ │Squad 4 │ │Squad 5 │
├────────┤ ├────────┤ ├────────┤ ├────────┤ ├────────┤
│ [Dev]  │ │ [Dev]  │ │ [Dev]  │ │ [Dev]  │ │ [Dev]  │
│ [Dev]  │ │ [Dev]  │ │ [Dev]  │ │ [Dev]  │ │ [Dev]  │
│ [Dev]  │ │ [Dev]  │ │ [Dev]  │ │ [Dev]  │ │ [Dev]  │
└────────┘ └────────┘ └────────┘ └────────┘ └────────┘
```

#### Vue fonctionnelle (>8 squads)
```
        RTE: [Nom du RTE] - Train Cantal
        
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Squad 1 │ │Squad 2 │ │Squad 3 │ │Squad 4 │ │Squad 5 │ │Squad 6 │ │Squad 7 │ │Squad 8 │
└────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘

┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Squad 9 │ │Squad 10│ │Squad 11│ │Squad 12│ │Squad 13│ │Squad 14│ │Squad 15│
└────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘
```

---

## 💾 Data Model

### Developer
```javascript
{
  id: "uuid",
  firstName: "Jean",
  lastName: "Dupont",
  craft: "Cloud", // Cloud | Mobile | Embarqué | Test auto | Infra
  seniority: 3, // 1 | 2 | 3 | 4
  isLeadDev: false,
  isTechLead: true,
  isScrumMaster: false,
  managerId: "manager-uuid", // N-1
  squadId: "squad-uuid",
  isManager: false,
  managerTimePercent: 0 // 0, 50, or 100 (si isManager = true)
}
```

### Manager
```javascript
{
  id: "uuid",
  firstName: "Pierre",
  lastName: "Martin",
  craft: "Cloud",
  seniority: 4,
  isLeadDev: false,
  isTechLead: false,
  isScrumMaster: false,
  managerId: "director-uuid", // N-1 = Directeur
  squadId: "squad-uuid" | null, // null si 100% manager
  isManager: true,
  managerTimePercent: 50 // 50 or 100
}
```

### Director
```javascript
{
  id: "uuid",
  firstName: "Marie",
  lastName: "Dubois",
  title: "Directeur de l'Engineering",
  isDirector: true
}
```

### Squad
```javascript
{
  id: "uuid",
  name: "Squad Alpha",
  trainId: "train-uuid",
  memberIds: ["dev-uuid-1", "dev-uuid-2", ...]
}
```

### Train
```javascript
{
  id: "uuid",
  name: "Cantal",
  rteId: "rte-uuid",
  squadIds: ["squad-uuid-1", "squad-uuid-2", ...]
}
```

### RTE (Release Train Engineer)
```javascript
{
  id: "uuid",
  firstName: "Sophie",
  lastName: "Laurent",
  title: "RTE",
  trainId: "train-uuid"
}
```

---

## 🔄 User Flows

### Flow 1 : Première utilisation
1. L'utilisateur ouvre l'application
2. Vue hiérarchique s'affiche par défaut (vide si première fois)
3. L'utilisateur clique sur "Importer des données"
4. Upload d'un fichier CSV
5. Validation et chargement des données
6. Affichage de l'organigramme hiérarchique peuplé
7. L'utilisateur clique sur "Basculer vers vue fonctionnelle"
8. Animation de morphing
9. Affichage de la vue fonctionnelle avec les squads

### Flow 2 : Ajout manuel d'un développeur
1. L'utilisateur est en vue hiérarchique ou fonctionnelle
2. Clique sur "Ajouter un développeur"
3. Formulaire s'ouvre :
   - Nom, Prénom
   - Métier (dropdown)
   - Séniorité (1-4)
   - Rôles : Lead Dev / Tech Lead / Scrum Master (checkboxes)
   - Manager N-1 (dropdown)
   - Squad (dropdown)
4. Validation
5. Nouvelle carte apparaît dans les deux vues

### Flow 3 : Modification d'assignation de squad
1. L'utilisateur est en vue fonctionnelle
2. Clique sur une carte développeur
3. Modal/panel s'ouvre avec les infos
4. Change la squad dans le dropdown
5. Validation
6. La carte se déplace visuellement (animation) vers la nouvelle squad

### Flow 4 : Export pour édition massive
1. L'utilisateur clique sur "Exporter CSV"
2. Fichier téléchargé
3. Édition dans Excel (changements de squad, ajout de nouveaux devs, etc.)
4. Sauvegarde du fichier
5. Retour à l'app, clic sur "Importer CSV"
6. Upload du fichier modifié
7. Validation et confirmation des changements
8. Mise à jour des vues avec animation

---

## 🛠️ Contraintes techniques

### Performance
- Affichage fluide avec 100+ cartes
- Animation de morphing à 60fps minimum
- Temps de chargement < 2s pour l'import CSV

### Compatibilité
- Navigateurs modernes (Chrome, Firefox, Safari, Edge - 2 dernières versions)
- Responsive : Desktop prioritaire, tablette/mobile adaptés
- Pas de dépendance à Internet (possible utilisation offline après chargement initial)

### Accessibilité
- Contraste suffisant pour les couleurs
- Textes lisibles (minimum 12px)
- Navigation au clavier possible
- Attributs ARIA pour les lecteurs d'écran

### Données
- Stockage local (LocalStorage ou IndexedDB) pour persistance
- Validation stricte à l'import CSV
- Gestion des erreurs avec messages clairs
- Backup automatique avant import

---

## 📊 Success Metrics

### MVP
- ✅ 100% des développeurs peuvent être saisis et affichés
- ✅ Morphing fluide entre les deux vues (< 1s)
- ✅ Import CSV fonctionnel avec 100+ lignes
- ✅ 0 bug bloquant sur les fonctionnalités core
- ✅ Adoption par 100% des managers métiers et RTE

### V2
- ✅ Historisation de 6+ incréments
- ✅ Recherche avec résultats < 500ms
- ✅ Support de 2 trains sans dégradation de performance

---

## 📝 Notes et décisions

### Décisions de design
- **Design moderne et tech** : Inspiration Apple/Linear/Notion - interface épurée, animations fluides, pas d'organigramme RH classique
- **Cartes compactes** : Métier indiqué uniquement par la couleur, pas de texte redondant sous le nom
- **Pas de scroll horizontal** : Préférence pour une grille multi-rangées si trop de squads
- **Morphing prioritaire** : L'effet visuel est central à l'expérience
- **Édition hybride** : CSV pour masse, interface pour ajustements ponctuels
- **Vue par défaut hiérarchique** : C'est la vue de référence RH
- **Plusieurs managers par métier** : Scalabilité pour grandes équipes (ex: 2+ managers Cloud)

### Questions ouvertes / À décider plus tard
- [ ] Noms exacts des niveaux de séniorité (1-4 pour le moment)
- [ ] Couleurs additionnelles si nouveaux métiers
- [ ] Représentation visuelle optimale des Tech Leads (50% transverse)
- [ ] Format exact du pictogramme de séniorité quand toggle activé
- [ ] Gestion de la suppression : soft delete ou hard delete ?
- [ ] Design final des cartes : glassmorphism, ombres, effets au hover (à affiner en développement)
- [ ] Micro-animations exactes : durées, easings, séquences (à tester et ajuster)

### Évolutions potentielles (Post-V2)
- Drag & drop pour réorganiser les squads
- Vue calendrier des incréments
- Notifications de changements
- Intégration avec LDAP/AD pour import automatique
- Export PDF de l'organigramme
- Mode présentation (plein écran, masquage des contrôles)
- Thèmes de couleurs personnalisables

---

## 🗓️ Roadmap indicative

### Phase 1 - MVP (Priorité haute)
- F1 : Visualisation hiérarchique
- F2 : Visualisation fonctionnelle
- F3 : Morphing
- F4 : Système d'attributs visuels
- F5 : Gestion des données (Interface)
- F6 : Import/Export CSV
- F7 : Vue par défaut et navigation
- F8 : Toggle niveau de séniorité

**Durée estimée** : À déterminer selon capacité dev

### Phase 2 - Améliorations (Priorité moyenne)
- F9 : Multi-train (2 trains)
- F10 : Historisation
- F11 : Recherche et filtres

**Durée estimée** : À déterminer

### Phase 3 - Analytics (Priorité basse)
- F12 : Statistiques et analytics
- Évolutions futures selon feedback utilisateurs

---

## 🤝 Contributeurs et feedback

Ce document est vivant et sera amendé au fur et à mesure du développement du projet.

Pour toute question ou suggestion, créer une issue GitHub ou contacter l'équipe produit.

---

**Version** : 1.0  
**Date** : Octobre 2025  
**Statut** : Draft initial
