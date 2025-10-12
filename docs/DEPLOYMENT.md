# Guide de Déploiement

Ce guide décrit comment déployer l'Outil de Visualisation Organisationnelle en production.

---

## 📋 Table des Matières

1. [Vue d'Ensemble](#vue-densemble)
2. [Prérequis](#prérequis)
3. [Build de Production](#build-de-production)
4. [Options de Déploiement](#options-de-déploiement)
5. [Configuration](#configuration)
6. [Monitoring](#monitoring)
7. [Maintenance](#maintenance)

---

## Vue d'Ensemble

L'application est une **Single Page Application (SPA)** statique construite avec React et Vite. Elle peut être déployée sur n'importe quel serveur web ou service d'hébergement statique.

### Caractéristiques

- **Statique** : Pas de serveur backend requis
- **Client-side** : Toute la logique s'exécute dans le navigateur
- **Persistance locale** : Utilise LocalStorage (pas de base de données)
- **Léger** : ~150KB gzippé
- **Progressive** : Fonctionne hors ligne une fois chargée

---

## Prérequis

### Pour le Build

- **Node.js** 18+ et npm
- Accès au code source (Git)

### Pour l'Hébergement

- Un serveur web ou service d'hébergement statique
- Support HTTPS (recommandé)
- Support des Single Page Applications (configuration redirect)

---

## Build de Production

### 1. Cloner et Installer

```bash
# Cloner le repository
git clone https://github.com/votre-username/org-morphing-tool.git
cd org-morphing-tool

# Installer les dépendances
npm install
```

### 2. Build

```bash
# Build de production
npm run build
```

Cette commande :
- Compile le code React
- Minifie le JavaScript et le CSS
- Optimise les assets
- Génère un dossier `dist/` avec les fichiers de production

### 3. Vérifier le Build

```bash
# Preview du build en local
npm run preview
```

L'application sera accessible sur `http://localhost:4173`

### Contenu du Dossier dist/

```
dist/
├── index.html          # Point d'entrée
├── assets/
│   ├── index-[hash].js     # Bundle JavaScript
│   ├── index-[hash].css    # Bundle CSS
│   └── [autres assets]
└── vite.svg            # Favicon
```

---

## Options de Déploiement

### Option 1 : Vercel (Recommandé)

**Avantages** : Déploiement automatique, CDN global, HTTPS gratuit, zéro config

#### Via l'Interface Web

1. Connectez-vous sur [vercel.com](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez votre repository GitHub
4. Vercel détecte automatiquement Vite
5. Cliquez sur "Deploy"

#### Via la CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
cd org-morphing-tool
vercel

# Déployer en production
vercel --prod
```

**Configuration** : Aucune configuration requise, Vercel détecte automatiquement Vite.

### Option 2 : Netlify

**Avantages** : Simple, CDN global, HTTPS gratuit, redirects faciles

#### Via l'Interface Web

1. Connectez-vous sur [netlify.com](https://netlify.com)
2. "New site from Git"
3. Connectez votre repository
4. Configuration :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
5. Deploy

#### Fichier netlify.toml

Créez `netlify.toml` à la racine :

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3 : GitHub Pages

**Avantages** : Gratuit, intégré à GitHub

#### Configuration

1. Installer `gh-pages` :

```bash
npm install --save-dev gh-pages
```

2. Ajouter dans `package.json` :

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://votre-username.github.io/org-morphing-tool"
}
```

3. Mettre à jour `vite.config.js` :

```javascript
export default defineConfig({
  base: '/org-morphing-tool/',
  // ...
});
```

4. Déployer :

```bash
npm run deploy
```

### Option 4 : Serveur Web Traditionnel (Apache/Nginx)

#### Apache

Créer un fichier `.htaccess` dans le dossier `dist/` :

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Déployer :

```bash
# Copier le contenu de dist/ vers le serveur
scp -r dist/* user@server:/var/www/html/
```

#### Nginx

Configuration dans `/etc/nginx/sites-available/org-tool` :

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    root /var/www/org-tool;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache des assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Activer et redémarrer :

```bash
sudo ln -s /etc/nginx/sites-available/org-tool /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Option 5 : Docker

#### Dockerfile

Créer un `Dockerfile` :

```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

#### Build et Run

```bash
# Build l'image
docker build -t org-morphing-tool .

# Run le container
docker run -p 8080:80 org-morphing-tool

# Avec docker-compose
docker-compose up -d
```

#### docker-compose.yml

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

---

## Configuration

### Variables d'Environnement

Pour le MVP, aucune variable d'environnement n'est requise. Pour des configurations avancées (V2) :

Créer un fichier `.env.production` :

```env
VITE_APP_TITLE=Outil de Visualisation Organisationnelle
VITE_API_URL=https://api.example.com
```

Accès dans le code :

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

### Configuration Vite

Le fichier `vite.config.js` contient la configuration du build :

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Changer si déployé dans un sous-dossier
  build: {
    outDir: 'dist',
    sourcemap: false, // true pour debug en production
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
        },
      },
    },
  },
});
```

---

## Monitoring

### Métriques à Suivre

1. **Performance**
   - Time to First Byte (TTFB)
   - First Contentful Paint (FCP)
   - Time to Interactive (TTI)
   - Bundle size

2. **Erreurs**
   - Erreurs JavaScript
   - Network errors (failed requests)
   - Console warnings

3. **Usage**
   - Pages vues
   - Temps de session
   - Taux de rebond

### Outils Recommandés

#### Google Analytics

Ajouter dans `index.html` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Sentry (Error Tracking)

```bash
npm install @sentry/react
```

Dans `main.jsx` :

```javascript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: 'production',
  tracesSampleRate: 1.0,
});
```

### Lighthouse CI

Automatiser les audits de performance :

```bash
npm install -g @lhci/cli

# Run audit
lhci autorun
```

---

## Maintenance

### Mises à Jour

#### Dépendances

```bash
# Vérifier les mises à jour disponibles
npm outdated

# Mettre à jour (patch versions)
npm update

# Mettre à jour (minor/major versions)
npm install package@latest
```

#### Build et Redéploiement

```bash
# Pull des derniers changements
git pull origin main

# Installer les nouvelles dépendances
npm install

# Build
npm run build

# Déployer (selon la méthode choisie)
# Vercel : git push (auto-deploy)
# Netlify : git push (auto-deploy)
# Serveur : scp -r dist/* ...
```

### Backup

Les données sont stockées localement dans le navigateur (LocalStorage). Pour sauvegarder :

**Option 1 : Export régulier**
- Former les utilisateurs à exporter régulièrement leurs données en XLSX

**Option 2 : Script de backup (V2)**
- Implémenter une synchronisation cloud
- Backup automatique sur un serveur

### Monitoring des Erreurs

Consulter régulièrement :
- Console Vercel/Netlify pour les erreurs de build
- Sentry pour les erreurs runtime
- Google Analytics pour les métriques d'usage

### Performance

Optimisations continues :
- Analyser le bundle size : `npm run build -- --analyze`
- Utiliser Lighthouse pour identifier les optimisations
- Lazy-load les composants non critiques
- Optimiser les images

---

## Rollback

### Vercel/Netlify

Interface web :
1. Aller dans "Deployments"
2. Sélectionner un déploiement précédent
3. Cliquer sur "Promote to Production"

### Git + Rebuild

```bash
# Revenir à un commit précédent
git revert <commit-hash>
git push

# Ou checkout d'une version stable
git checkout v1.0.0
npm run build
# Redéployer
```

### Serveur Traditionnel

Garder des backups du dossier `dist/` :

```bash
# Avant chaque déploiement
cp -r /var/www/html /var/www/html.backup.$(date +%Y%m%d)

# Pour rollback
rm -rf /var/www/html
cp -r /var/www/html.backup.20251010 /var/www/html
```

---

## Checklist de Déploiement

Avant de déployer en production :

- [ ] Build de production réussi (`npm run build`)
- [ ] Preview testé localement (`npm run preview`)
- [ ] Tests passent (`npm test`)
- [ ] Aucun warning ESLint
- [ ] Performance Lighthouse > 90
- [ ] Testé sur Chrome, Firefox, Safari
- [ ] Testé sur mobile
- [ ] Documentation mise à jour
- [ ] Variables d'environnement configurées (si applicable)
- [ ] Monitoring en place (Analytics, Sentry)
- [ ] Backup de la version précédente
- [ ] Plan de rollback défini
- [ ] Équipe informée du déploiement

---

## Support

Pour toute question sur le déploiement :
- Consulter la [documentation Vite](https://vitejs.dev/guide/static-deploy.html)
- Ouvrir une [issue GitHub](https://github.com/votre-username/org-morphing-tool/issues)
- Contacter les mainteneurs

---

**Bon déploiement !** 🚀
