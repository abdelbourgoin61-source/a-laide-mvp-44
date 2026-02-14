import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, Filter, MapPin, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ProviderCard } from './ProviderCard';
import { getAllProviders, getServices, isSupabaseConfigured } from '../src/lib/supabase';
import { toast } from 'sonner';

interface SearchPageProps {
  serviceId?: string;
  onBack: () => void;
  onProviderSelect: (providerId: string) => void;
}

export function SearchPage({ serviceId, onBack, onProviderSelect }: SearchPageProps) {
  const [providers, setProviders] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<string | undefined>(serviceId);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, [selectedService]);

  async function loadData() {
    setLoading(true);
    try {
      // Load services
      const servicesData = await getServices();
      setServices(servicesData || []);

      // Load providers
      const providersData = await getAllProviders(selectedService);
      setProviders(providersData || []);
      
      if (!providersData || providersData.length === 0) {
        toast.info('Aucun prestataire disponible pour ce service');
      }
    } catch (error: any) {
      console.error('Error loading data:', error);
      toast.error('Erreur lors du chargement des données: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleContact = (providerId: string) => {
    // For MVP, just show the profile
    // In real app, this would open phone dialer or chat
    onProviderSelect(providerId);
    toast.success('Ouverture du profil du prestataire...');
  };

  const filteredProviders = providers.filter(provider => {
    // Search filter
    const profile = provider.profiles;
    const fullName = `${profile?.first_name || ''} ${profile?.last_name || ''}`.toLowerCase();
    const matchesSearch = !searchQuery || 
      fullName.includes(searchQuery.toLowerCase()) ||
      provider.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.city?.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === 'all' || provider.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const emergencyServices = services.filter(s => s.category === 'EMERGENCY');
  const homeServices = services.filter(s => s.category === 'HOME');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              Trouver un professionnel
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher par nom, ville..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            
            {/* Status Filter */}
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
                size="sm"
              >
                Tous
              </Button>
              <Button
                variant={statusFilter === 'AVAILABLE' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('AVAILABLE')}
                size="sm"
                className={statusFilter === 'AVAILABLE' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                Disponibles
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Service Filter Pills */}
        {services.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtrer par service</h2>
            
            {/* Emergency Services */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">🚨 Services d'urgence</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={!selectedService ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedService(undefined)}
                >
                  Tous les services
                </Badge>
                {emergencyServices.map(service => (
                  <Badge
                    key={service.id}
                    variant={selectedService === service.slug ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedService(service.slug)}
                  >
                    {service.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Home Services */}
            {homeServices.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">🏠 Services à domicile</h3>
                <div className="flex flex-wrap gap-2">
                  {homeServices.map(service => (
                    <Badge
                      key={service.id}
                      variant={selectedService === service.slug ? 'default' : 'outline'}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => setSelectedService(service.slug)}
                    >
                      {service.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredProviders.length}</span> 
            {' '}professionnel{filteredProviders.length > 1 ? 's' : ''} trouvé{filteredProviders.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-[var(--color-primary)] mb-4" />
            <p className="text-gray-600">Chargement des prestataires...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProviders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Card className="p-8 max-w-md mx-auto">
              <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun prestataire trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                Nous n'avons pas trouvé de professionnel correspondant à vos critères.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-900 font-medium mb-2">
                  Besoin d'aide immédiate ?
                </p>
                <p className="text-sm text-blue-700">
                  Contactez notre service client disponible 24h/24 et 7j/7
                </p>
                <Button
                  variant="outline"
                  className="mt-3 w-full"
                  onClick={() => {
                    window.location.href = 'tel:+33123456789';
                  }}
                >
                  Appeler le support : 01 23 45 67 89
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Provider Cards */}
        {!loading && filteredProviders.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {filteredProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProviderCard
                  provider={provider}
                  onContact={handleContact}
                  onViewProfile={onProviderSelect}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
