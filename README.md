# RendezVous Pro - Plateforme de Réservation de Rendez-vous

Une plateforme moderne et intuitive pour la réservation de rendez-vous avec des professionnels (médecins, avocats, centres de beauté, etc.) avec support multilingue (Français, Anglais, Arabe).

## 🌟 Fonctionnalités

- **Interface moderne et responsive** avec design élégant
- **Support multilingue** : Français, Anglais, Arabe
- **Recherche et filtrage** des professionnels
- **Système de réservation** en temps réel
- **Gestion des créneaux horaires** disponibles
- **API REST complète** pour l'intégration
- **Animations fluides** et UX optimisée
- **Système de notation** et avis
- **Interface d'administration** pour les professionnels

## 🚀 Technologies Utilisées

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Font Awesome pour les icônes
- Google Fonts (Poppins)
- Animations CSS et JavaScript
- LocalStorage pour la persistance des données

### Backend
- Node.js avec Express.js
- API REST complète
- Middleware de sécurité (Helmet, CORS)
- Rate limiting pour la protection
- Validation des données
- Gestion d'erreurs robuste

## 📦 Installation

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd rendezvous-pro
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```
Éditez le fichier `.env` avec vos configurations :
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secret-key
```

4. **Démarrer le serveur**
```bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
```

5. **Accéder à l'application**
- Frontend : http://localhost:3000
- API : http://localhost:3000/api
- Health check : http://localhost:3000/api/health

## 🎯 Utilisation

### Interface Utilisateur

1. **Accueil** : Page d'accueil avec recherche et présentation des services
2. **Services** : Catégories de professionnels disponibles
3. **Professionnels** : Liste des professionnels avec filtres
4. **Réservation** : Formulaire de réservation avec validation

### Fonctionnalités Clés

#### Recherche et Filtrage
- Recherche par nom, spécialité ou localisation
- Filtrage par catégorie (médecins, avocats, etc.)
- Tri par notation

#### Système de Réservation
- Sélection de date et heure
- Vérification de disponibilité en temps réel
- Confirmation par email (à implémenter)
- Gestion des annulations

#### Support Multilingue
- Français (langue par défaut)
- Anglais
- Arabe (avec support RTL)

## 🔧 API Endpoints

### Professionnels
- `GET /api/providers` - Liste des professionnels
- `GET /api/providers/:id` - Détails d'un professionnel
- `GET /api/providers/:id/availability` - Créneaux disponibles

### Réservations
- `POST /api/bookings` - Créer une réservation
- `GET /api/bookings` - Liste des réservations
- `GET /api/bookings/:id` - Détails d'une réservation
- `PATCH /api/bookings/:id` - Mettre à jour le statut

### Utilitaires
- `GET /api/health` - Statut de l'API

## 📱 Fonctionnalités Avancées

### Frontend
- **Design responsive** : Compatible mobile, tablette, desktop
- **Animations fluides** : Transitions CSS et JavaScript
- **Accessibilité** : Support des lecteurs d'écran
- **Performance** : Chargement optimisé des ressources

### Backend
- **Sécurité** : Helmet, CORS, rate limiting
- **Validation** : Vérification des données d'entrée
- **Gestion d'erreurs** : Messages d'erreur clairs
- **Logging** : Morgan pour les logs HTTP

## 🎨 Personnalisation

### Couleurs et Thème
Les couleurs principales sont définies dans `styles.css` :
- Primaire : `#667eea` (bleu)
- Secondaire : `#764ba2` (violet)
- Accent : `#ffd700` (or)

### Ajout de Nouvelles Langues
1. Ajouter les traductions dans `script.js`
2. Créer le bouton de langue dans `index.html`
3. Ajouter les styles RTL si nécessaire

### Ajout de Nouvelles Catégories
1. Ajouter la catégorie dans les données
2. Créer l'icône correspondante
3. Mettre à jour les filtres

## 🔒 Sécurité

- **Validation des données** côté serveur
- **Protection CSRF** (à implémenter)
- **Rate limiting** pour prévenir les abus
- **Headers de sécurité** avec Helmet
- **Validation des entrées** utilisateur

## 📊 Performance

- **Optimisation des images** (à implémenter)
- **Minification CSS/JS** (à implémenter)
- **Lazy loading** des composants
- **Cache des ressources statiques**

## 🚀 Déploiement

### Production
1. Configurer les variables d'environnement
2. Installer les dépendances : `npm install --production`
3. Démarrer le serveur : `npm start`

### Docker (à implémenter)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 TODO

- [ ] Intégration base de données (PostgreSQL/MongoDB)
- [ ] Système d'authentification JWT
- [ ] Notifications email/SMS
- [ ] Dashboard administrateur
- [ ] Système de paiement
- [ ] Tests unitaires et d'intégration
- [ ] Documentation API complète
- [ ] Optimisation SEO
- [ ] PWA (Progressive Web App)
- [ ] Intégration Google Maps
- [ ] Système de commentaires et avis

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support :
- Email : contact@rendezvouspro.fr
- Téléphone : +33 1 23 45 67 89

---

**RendezVous Pro** - Votre plateforme de confiance pour la réservation de rendez-vous en ligne. 