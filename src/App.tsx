```typescript
import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/Footer';
import { HeroNew } from './components/HeroNew';
import { SearchPage } from './components/SearchPage';
import { ProviderList } from './components/ProviderList';
import { ProviderProfile } from './components/ProviderProfile';
import { Auth } from './components/Auth';
import { CustomerService } from './components/CustomerService';
import { Invoices } from './components/Invoices';
import { Dashboard } from './components/Dashboard';
import { SEO } from './components/SEO';
import { Toaster } from './components/ui/sonner';

type Page = 'home' | 'services' | 'providers' | 'profile' | 'auth' | 'support' | 'invoices' | 'dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [pageHistory, setPageHistory] = useState<Page[]>(['home']);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    setPageHistory(prev => [...prev, page as Page]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoBack = () => {
    if (pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop();
      const previousPage = newHistory[newHistory.length - 1];
      setPageHistory(newHistory);
      setCurrentPage(previousPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEmergencyClick = () => {
    setCurrentPage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setCurrentPage('providers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    setCurrentPage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <SEO />
            <HeroNew onEmergencyClick={handleEmergencyClick} />
          </>
        );
      
      case 'services':
        return (
          <>
            <SEO 
              title="Tous les services - À l'aide | Services d'urgence et à domicile"
              description="Découvrez tous nos services : urgences (serrurier, plombier, électricien), services à domicile (dog walker, babysitting, ménage, jardinage, coiffeur). Trouvez un professionnel près de chez vous en 30 secondes."
              keywords="services urgence, serrurier, plombier, électricien, dog walker, babysitting, ménage, jardinage, coiffeur à domicile, chef, informatique"
            />
            <SearchPage
              serviceId={selectedService}
              onProviderSelect={handleProviderSelect}
              onBack={() => handleNavigate('home')}
            />
          </>
        );
      
      case 'providers':
        return (
          <>
            <SEO 
              title="Professionnels disponibles - À l'aide"
              description="Trouvez les meilleurs professionnels locaux vérifiés et disponibles près de chez vous. Avis clients, tarifs transparents, réponse rapide garantie."
              keywords="professionnels locaux, prestataires vérifiés, services près de moi, avis clients"
            />
            <ProviderList
              serviceId={selectedService}
              onProviderSelect={handleProviderSelect}
              onBack={() => setCurrentPage('services')}
            />
          </>
        );
      
      case 'profile':
        return (
          <>
            <SEO 
              title="Profil du prestataire - À l'aide"
              description="Consultez le profil complet du prestataire : avis clients, tarifs, disponibilités, zone de service. Contactez directement votre professionnel."
            />
            <ProviderProfile
              providerId={selectedProvider}
              onBack={() => setCurrentPage('providers')}
            />
          </>
        );
      
      case 'auth':
        return (
          <>
            <SEO 
              title="Connexion / Inscription - À l'aide"
              description="Connectez-vous ou inscrivez-vous sur À l'aide pour accéder à tous nos services. Authentification rapide via Google, Apple ou email."
            />
            <Auth onBack={() => handleNavigate('home')} />
          </>
        );
      
      case 'support':
        return (
          <>
            <SEO 
              title="Service Client 24/7 - À l'aide | Support et Aide"
              description="Notre équipe de support est disponible 24h/24 et 7j/7 pour répondre à toutes vos questions. Contactez-nous par email, chat ou consultez notre FAQ."
              keywords="service client, support 24/7, aide, FAQ, contact, assistance"
            />
            <CustomerService onBack={() => handleNavigate('home')} />
          </>
        );
      
      case 'invoices':
        return (
          <>
            <SEO 
              title="Mes factures - À l'aide"
              description="Consultez et téléchargez vos factures. Système de facturation automatique avec génération de PDF pour tous vos services."
            />
            <Invoices onBack={() => handleNavigate('home')} />
          </>
        );
      
      case 'dashboard':
        return (
          <>
            <SEO 
              title="Tableau de bord - À l'aide"
              description="Accédez à votre tableau de bord pour suivre vos commandes, factures et historique de services."
            />
            <Dashboard 
              onBack={() => handleNavigate('home')}
              onViewProvider={handleProviderSelect}
            />
          </>
        );
      
      default:
        return (
          <>
            <SEO />
            <HeroNew onEmergencyClick={handleEmergencyClick} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar 
        onNavigate={handleNavigate} 
        currentPage={currentPage}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
      <Toaster position="top-center" />
    </div>
  );
}
```

---
