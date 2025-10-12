# Guide Utilisateur - Outil de Visualisation Organisationnelle

**Version** : 1.0.0  
**Date** : Octobre 2025

---

## 📖 Table des Matières

1. [Introduction](#introduction)
2. [Démarrage Rapide](#démarrage-rapide)
3. [Interface Utilisateur](#interface-utilisateur)
4. [Fonctionnalités Principales](#fonctionnalités-principales)
5. [Import/Export de Données](#importexport-de-données)
6. [Édition des Développeurs](#édition-des-développeurs)
7. [Navigation et Contrôles](#navigation-et-contrôles)
8. [Astuces et Raccourcis](#astuces-et-raccourcis)
9. [FAQ](#faq)
10. [Dépannage](#dépannage)

---

## Introduction

### Qu'est-ce que l'Outil de Visualisation Organisationnelle ?

Cet outil permet de visualiser l'organisation d'une équipe de développement sous deux angles différents :

- **Vue Hiérarchique** : Organisation par métier (Cloud, Mobile, Embarqué, etc.) avec la hiérarchie Directeur → Managers → Développeurs
- **Vue Fonctionnelle** : Organisation par squads agiles dans un train agile

L'outil offre une **transition animée fluide** (morphing) entre ces deux vues, permettant de comprendre rapidement comment les développeurs sont organisés selon ces deux perspectives.

### Cas d'usage

- Visualiser la structure organisationnelle d'une équipe
- Comprendre les doubles appartenances (métier + squad)
- Planifier les compositions de squads
- Communiquer l'organisation à l'équipe
- Onboarding des nouveaux membres

---

## Démarrage Rapide

### Première Utilisation

1. **Lancez l'application** dans votre navigateur
2. Au premier lancement, des **données de démonstration** sont chargées automatiquement
3. Explorez les deux vues en cliquant sur le toggle "Hiérarchique / Fonctionnelle"
4. Testez les différentes fonctionnalités (zoom, séniorité, édition)

### Charger Vos Données

Deux options pour charger vos propres données :

**Option 1 : Import XLSX (recommandé)**
1. Cliquez sur "Exporter Template" pour télécharger un fichier Excel pré-formaté
2. Remplissez le template dans Excel avec vos données
3. Cliquez sur "Importer" et sélectionnez votre fichier
4. Vérifiez le résumé et confirmez l'import

**Option 2 : Édition In-App**
1. Cliquez sur le bouton "Ajouter" pour créer un nouveau développeur
2. Remplissez le formulaire
3. Répétez pour chaque membre de l'équipe

---

## Interface Utilisateur

### Barre de Contrôles (Header)

La barre en haut de l'écran contient tous les contrôles principaux :

```
┌─────────────────────────────────────────────────────────────────┐
│ Outil de Visualisation Organisationnelle                        │
│                                                                   │
│ [Ajouter] [Hiér./Fonc.] [Séniorité ○] [+/-] [Exporter] [Import] │
└─────────────────────────────────────────────────────────────────┘
```

#### Boutons et Contrôles

| Contrôle | Description | Raccourci |
|----------|-------------|-----------|
| **Ajouter** | Ouvre le formulaire pour créer un nouveau développeur | - |
| **Hiérarchique / Fonctionnelle** | Bascule entre les deux vues | - |
| **Séniorité** | Affiche/masque les niveaux de séniorité (1-4) | - |
| **Zoom +/-** | Agrandit ou réduit la vue | Ctrl + / Ctrl - |
| **Exporter Données** | Télécharge les données actuelles en XLSX | - |
| **Exporter Template** | Télécharge un template vide pré-formaté | - |
| **Importer** | Importe des données depuis un fichier XLSX | - |

### Zone de Visualisation

La zone principale affiche les cartes des développeurs organisées selon la vue active.

#### Cartes Développeur

Chaque carte affiche :
- **Nom et Prénom**
- **Métier** (barre de couleur à gauche)
- **Rôles** : Pictogrammes L (Lead Dev), T (Tech Lead), S (Scrum Master)
- **Séniorité** (optionnelle) : Niveau 1-4
- **Manager** (vue hiérarchique)
- **Squad** (vue fonctionnelle)

**Exemple de carte :**
```
┌──────────────────────┐
│█ Jean Dupont         │  ← Barre bleue = Cloud
│  Cloud Developer     │
│  ⭐⭐⭐              │  ← Séniorité 3
│  [L] [T]             │  ← Lead Dev + Tech Lead
│  Manager: Pierre M.  │
└──────────────────────┘
```

### Couleurs des Métiers

| Métier | Couleur |
|--------|---------|
| Cloud | 🔵 Bleu |
| Mobile | 🟢 Vert |
| Embarqué | 🔴 Rouge |
| Test auto | 🟡 Jaune |
| Infra | 🟣 Violet |
| Backend | 🔵 Bleu ciel |
| Frontend | 🟠 Orange |
| Fullstack | 🟡 Jaune-vert |

---

## Fonctionnalités Principales

### 1. Morphing entre Vues

Le morphing est l'animation fluide qui s'exécute lors du passage d'une vue à l'autre.

**Comment l'utiliser :**
1. Cliquez sur le toggle "Hiérarchique / Fonctionnelle"
2. Observez les cartes se déplacer de manière fluide vers leur nouvelle position
3. L'animation dure environ 1 seconde

**Conseils :**
- Attendez la fin de l'animation avant d'interagir avec les cartes
- Le morphing fonctionne sur tous les navigateurs modernes
- Sur mobile, l'animation est optimisée pour maintenir 60fps

### 2. Vue Hiérarchique

Organisation en 3 niveaux :

```
                    [Directeur]
                         |
        ┌────────────────┼────────────────┐
        │                │                │
   [Manager 1]      [Manager 2]      [Manager 3]
        |                |                |
    ┌───┼───┐        ┌───┼───┐        ┌───┼───┐
   [D] [D] [D]      [D] [D] [D]      [D] [D] [D]
```

**Caractéristiques :**
- Les managers sont groupés par métier
- Les connexions visuelles (lignes) montrent les relations hiérarchiques
- Le nom du manager est affiché sur chaque carte développeur

### 3. Vue Fonctionnelle

Organisation par squads dans un train agile :

```
RTE: [Nom] - Train Cantal

┌─ Squad Alpha ──┐  ┌─ Squad Beta ───┐  ┌─ Squad Gamma ──┐
│ [Dev] [Dev]    │  │ [Dev] [Dev]    │  │ [Dev] [Dev]    │
│ [Dev] [Dev]    │  │ [Dev] [Dev]    │  │ [Dev] [Dev]    │
└────────────────┘  └────────────────┘  └────────────────┘
```

**Caractéristiques :**
- Chaque squad est dans un container avec son nom
- Le RTE (Release Train Engineer) est affiché en haut
- Layout adaptatif : rangée unique si ≤ 8 squads, grille sinon

### 4. Affichage de la Séniorité

Le toggle "Séniorité" permet d'afficher ou masquer les niveaux :

- **Niveau 1** : ⭐ (Junior)
- **Niveau 2** : ⭐⭐ (Confirmé)
- **Niveau 3** : ⭐⭐⭐ (Senior)
- **Niveau 4** : ⭐⭐⭐⭐ (Expert)

**État persisté** : Votre préférence est sauvegardée en local et restaurée à chaque visite.

### 5. Zoom

Les contrôles de zoom permettent d'ajuster la taille de la visualisation :

- **Zoom +** : Agrandit la vue
- **Zoom -** : Réduit la vue
- **Reset** : Revient au zoom par défaut
- **Auto-zoom** : La vue s'ajuste automatiquement au chargement

**Niveaux de zoom** : 50% à 150% par paliers de 10%

---

## Import/Export de Données

### Export de Données

#### Exporter les Données Actuelles

1. Cliquez sur **"Exporter Données"**
2. Un fichier XLSX est téléchargé : `org_export_YYYY-MM-DD.xlsx`
3. Ouvrez-le dans Excel/LibreOffice pour le modifier

**Contenu du fichier :**
- Tous les développeurs actuellement dans l'application
- Format avec colonnes séparées (pas de CSV)
- Encodage UTF-8 pour les caractères accentués

#### Exporter un Template Vide

1. Cliquez sur **"Exporter Template"**
2. Un fichier `org_template.xlsx` est téléchargé
3. Il contient :
   - Les en-têtes de colonnes
   - 3 lignes d'exemples
   - Un onglet "Instructions" avec la documentation

### Import de Données

#### Préparer Votre Fichier

**Format attendu :**

| Nom | Prénom | Métier | Séniorité | LeadDev | TechLead | ScrumMaster | Manager | Squad |
|-----|--------|--------|-----------|---------|----------|-------------|---------|-------|
| Dupont | Jean | Cloud | 3 | Non | Oui | Non | Martin Pierre | Squad Alpha |

**Règles de validation :**

1. **Métier** : Backend, Frontend, Fullstack, DevOps, Mobile, Data, QA, Embarqué, Test auto, Infra, Cloud
2. **Séniorité** : 1, 2, 3 ou 4
3. **Rôles** : "Oui" ou "Non" (insensible à la casse)
4. **Manager** : Nom complet (Prénom Nom)
5. **Squad** : Nom de la squad (optionnel)

#### Procédure d'Import

1. Cliquez sur **"Importer"**
2. Sélectionnez votre fichier `.xlsx`
3. **Attendez la validation** (quelques secondes)
4. Une modal s'affiche avec :
   - ✅ Résumé : X développeurs à importer
   - ❌ Liste des erreurs (si présentes)
5. **Corrigez les erreurs** si nécessaire et réessayez
6. Si tout est OK, cliquez sur **"Confirmer l'import"**
7. Les données sont importées et la vue se met à jour

**Comportement de l'import :**
- Les **managers** et le **directeur** sont **conservés** (pas remplacés)
- Les **développeurs** sont **remplacés** par les nouvelles données
- Les **squads** sont créées automatiquement si elles n'existent pas

#### Messages d'Erreur Courants

| Erreur | Cause | Solution |
|--------|-------|----------|
| "Métier invalide" | Métier non reconnu | Vérifiez l'orthographe et utilisez la liste autorisée |
| "Séniorité doit être 1-4" | Valeur hors limite | Utilisez 1, 2, 3 ou 4 |
| "Valeur booléenne attendue" | Rôle mal formaté | Utilisez "Oui" ou "Non" |
| "Manager introuvable" | Manager n'existe pas | Créez d'abord le manager ou corrigez le nom |

---

## Édition des Développeurs

### Ajouter un Développeur

1. Cliquez sur le bouton **"Ajouter"** dans la barre de contrôles
2. Le formulaire s'ouvre
3. Remplissez tous les champs :
   - **Nom** et **Prénom** (obligatoires)
   - **Métier** (sélection dans la liste)
   - **Séniorité** (1-4)
   - **Rôles** : Cochez L, T ou S si applicable
   - **Manager** (sélection dans la liste)
   - **Squad** (optionnel)
4. Cliquez sur **"Créer"**
5. Le nouveau développeur apparaît immédiatement dans les vues

### Modifier un Développeur

1. **Cliquez sur la carte** du développeur à modifier
2. Le formulaire s'ouvre, pré-rempli avec ses informations
3. Modifiez les champs souhaités
4. Cliquez sur **"Enregistrer"**
5. Les modifications sont appliquées immédiatement

### Supprimer un Développeur

1. Cliquez sur la carte du développeur
2. Dans le formulaire, cliquez sur **"Supprimer"** (bouton rouge en bas)
3. Une confirmation apparaît : **"Êtes-vous sûr ?"**
4. Cliquez sur **"Oui"** pour confirmer
5. Le développeur est supprimé et disparaît des vues

### Annuler les Modifications

- Cliquez sur **"Annuler"** ou appuyez sur **Échap**
- Le formulaire se ferme sans sauvegarder

---

## Navigation et Contrôles

### Navigation Clavier

L'application est entièrement accessible au clavier :

| Touche | Action |
|--------|--------|
| **Tab** | Naviguer entre les contrôles |
| **Shift + Tab** | Naviguer en arrière |
| **Enter / Space** | Activer un bouton ou toggle |
| **Échap** | Fermer un modal/formulaire |
| **Flèche Gauche/Droite** | Basculer entre les vues (sur ViewToggle) |
| **Ctrl +** | Zoom avant |
| **Ctrl -** | Zoom arrière |

### Support Screen Reader

- Tous les boutons ont des labels ARIA descriptifs
- Les icônes décoratives sont masquées (`aria-hidden="true"`)
- Les changements d'état sont annoncés
- Le skip link permet d'aller directement au contenu principal

### Focus et Accessibilité

- Les indicateurs de focus sont visibles sur tous les éléments interactifs
- L'ordre de tabulation est logique
- Contraste WCAG 2.1 AA respecté

---

## Astuces et Raccourcis

### Astuces

1. **Auto-zoom** : Les vues s'ajustent automatiquement au chargement pour afficher tout le contenu
2. **Persistance** : Toutes vos modifications sont sauvegardées automatiquement en local
3. **Hover Effects** : Survolez les cartes pour voir une élévation subtile
4. **Template Pré-formaté** : Utilisez le template exporté pour éviter les erreurs de format
5. **Squad Optionnelle** : Un développeur peut ne pas avoir de squad (utile pendant la composition)

### Workflow Recommandé

**Setup Initial :**
1. Exportez le template
2. Remplissez-le dans Excel avec votre équipe
3. Importez-le dans l'application

**Mise à Jour :**
1. Exportez les données actuelles
2. Modifiez dans Excel
3. Réimportez

**Ajustements Rapides :**
- Utilisez l'édition in-app pour des modifications ponctuelles
- Cliquez directement sur une carte pour l'éditer

---

## FAQ

### Questions Générales

**Q : Mes données sont-elles sauvegardées automatiquement ?**  
R : Oui, toutes les modifications sont automatiquement sauvegardées en local (LocalStorage). Vos données persistent entre les sessions.

**Q : Puis-je utiliser l'application hors ligne ?**  
R : Oui, une fois chargée, l'application fonctionne entièrement hors ligne.

**Q : Combien de développeurs puis-je gérer ?**  
R : L'application est optimisée pour 100+ développeurs. Les performances restent excellentes même avec des équipes importantes.

### Import/Export

**Q : Puis-je utiliser un fichier CSV ?**  
R : Non, l'application utilise uniquement le format XLSX (Excel). Le CSV a été remplacé par XLSX pour une meilleure compatibilité et éviter les problèmes de séparateurs.

**Q : Pourquoi mon import échoue ?**  
R : Vérifiez :
- Le format du fichier (doit être `.xlsx`)
- L'orthographe des métiers
- Les valeurs de séniorité (1-4)
- Les booléens ("Oui" ou "Non")
- Consultez les messages d'erreur détaillés dans la modal

**Q : L'import remplace-t-il tout ?**  
R : Non, l'import **conserve** les managers et le directeur, et **remplace** uniquement les développeurs.

### Visualisation

**Q : Pourquoi certaines cartes se chevauchent ?**  
R : Cela ne devrait pas arriver. Utilisez le zoom pour vérifier, et signalez un bug si le problème persiste.

**Q : Puis-je personnaliser les couleurs ?**  
R : Non dans la version actuelle (MVP). Cette fonctionnalité est prévue pour la V2.

**Q : Comment voir les statistiques de mon équipe ?**  
R : Pas encore disponible dans le MVP. Prévu pour la V2 avec des analytics avancées.

---

## Dépannage

### Problèmes Courants

#### L'application ne charge pas

**Solution :**
1. Vérifiez votre connexion internet (premier chargement)
2. Videz le cache du navigateur
3. Utilisez un navigateur moderne (Chrome, Firefox, Safari, Edge)
4. Vérifiez la console pour les erreurs JavaScript

#### Les données ne se sauvegardent pas

**Causes possibles :**
- LocalStorage désactivé dans le navigateur
- Mode navigation privée activé
- Quota de stockage dépassé (rare)

**Solution :**
1. Vérifiez les paramètres de votre navigateur
2. Autorisez le stockage local pour ce site
3. Quittez le mode navigation privée

#### L'import XLSX échoue toujours

**Solution :**
1. Téléchargez à nouveau le template
2. Copiez vos données dans le nouveau template
3. Ne modifiez pas les en-têtes de colonnes
4. Vérifiez qu'il n'y a pas de lignes vides
5. Sauvegardez au format `.xlsx` (pas `.xls` ou `.csv`)

#### Le morphing est saccadé

**Solution :**
1. Fermez les autres onglets du navigateur
2. Désactivez les extensions qui peuvent ralentir
3. Mettez à jour votre navigateur
4. Sur des équipes très grandes (200+), le morphing peut être plus lourd

#### Les cartes sont trop petites/grandes

**Solution :**
- Utilisez les contrôles de zoom (+/-)
- Le zoom est persisté, donc n'hésitez pas à ajuster selon vos préférences

---

## Support et Contact

Pour toute question, bug ou suggestion :

- **GitHub Issues** : [Ouvrir une issue](https://github.com/votre-username/org-morphing-tool/issues)
- **Documentation** : Consultez le README.md et les autres guides
- **Email** : [votre-email@example.com]

---

**Bon usage de l'Outil de Visualisation Organisationnelle !** 🎉
