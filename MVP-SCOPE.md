# 🎯 Scope MVP "À l'aide" - Timeline T1 2026

## ✅ **PHASE 1 - MVP (En cours)**

### **Authentification**
- ✅ Email/Password avec Supabase Auth
- ✅ Création de compte avec confirmation email
- ✅ reCAPTCHA pour sécurité
- ✅ Gestion des sessions
- ❌ Google OAuth → **PHASE 2**
- ❌ Apple OAuth → **PHASE 2**

### **Features Core**
- ✅ 65 composants React fonctionnels
- ✅ Données mock réalistes
- ✅ Design responsive (mobile + desktop)
- ✅ Géolocalisation
- ✅ Liste des services (urgence + utilitaires)
- ✅ Profils prestataires avec notes et avis
- ✅ Appel direct prestataire
- ✅ Interface 3 clics max

### **Backend**
- ✅ Supabase configuré (Project ID: `srzcqkssgjdrymiceqmy`)
- ✅ Base de données PostgreSQL
- ✅ Auth email/password
- ✅ KV Store pour données flexibles

---

## 🚀 **PHASE 2 - Améliorations Post-MVP**

### **Authentification Avancée**
- ⏳ Google OAuth
- ⏳ Apple OAuth (nécessite compte développeur Apple à 99$/an)
- ⏳ Authentification à deux facteurs (2FA)

### **Paiement & Facturation**
- ⏳ Intégration Stripe
- ⏳ Commission automatique 18%
- ⏳ Facturation automatique
- ⏳ Historique des paiements

### **Tracking & Notifications**
- ⏳ Tracking GPS en temps réel
- ⏳ Notifications push
- ⏳ ETA dynamique

### **Application Mobile**
- ⏳ Application iOS native
- ⏳ Application Android native
- ⏳ Deep linking
- ⏳ Notifications push natives

---

## 📝 **Décisions Techniques**

### **Pourquoi descoper Google/Apple OAuth ?**

1. **Timeline T1 2026** → Priorité au lancement rapide
2. **Email/password suffit** pour valider le concept MVP
3. **Complexité technique** :
   - Google OAuth : Nécessite configuration Google Cloud Console (15-30 min)
   - Apple OAuth : Nécessite compte développeur payant (99$/an) + configuration complexe
4. **Mobile en Phase 2** → OAuth plus pertinent avec les apps natives
5. **Focus sur la valeur** → Connexion rapide des utilisateurs avec les prestataires

### **Stack Technique Validée**
- ✅ React + Vite
- ✅ Tailwind CSS v4
- ✅ TypeScript
- ✅ Supabase (Auth + Database + Storage)
- ✅ Figma Make pour développement rapide

---

## 🔐 **Sécurité**

### **Mesures en place**
- ✅ `.gitignore` configuré pour protéger `.env`
- ✅ Variables d'environnement sécurisées
- ✅ reCAPTCHA pour prévenir les bots
- ✅ Validation des emails
- ✅ Hashing des mots de passe (Supabase)

### **À implémenter en Phase 2**
- ⏳ Rate limiting
- ⏳ 2FA
- ⏳ Audit logs
- ⏳ Monitoring des accès

---

## 📊 **Prochaines Étapes Immédiates**

1. ✅ ~~Corriger erreurs d'accessibilité (Sheet)~~
2. ✅ ~~Créer `.gitignore` et sécuriser `.env`~~
3. ✅ ~~Descoper Google/Apple OAuth~~
4. 🔄 **Tester l'authentification email/password end-to-end**
5. ⏳ Intégrer vraie géolocalisation (remplacer mock)
6. ⏳ Connecter vraies données prestataires depuis Supabase
7. ⏳ Tests utilisateurs alpha
8. ⏳ Déploiement sur Vercel/Netlify

---

## 🎯 **KPIs MVP**

### **Objectifs de validation**
- ⏳ 100 prestataires inscrits
- ⏳ 50 commandes complétées
- ⏳ < 30 secondes pour connexion utilisateur-prestataire
- ⏳ Taux de satisfaction > 4/5 étoiles
- ⏳ 80% des utilisateurs trouvent un prestataire en < 3 clics

---

**Dernière mise à jour** : 15 février 2026
**Statut** : 🟢 En cours - Sprint 5
