import { Phone, Star, MapPin, Clock, Heart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { providers } from '../lib/data';

interface ProviderListProps {
  serviceId: string;
  onProviderSelect: (providerId: string) => void;
  onBack: () => void;
}

export function ProviderList({ serviceId, onProviderSelect, onBack }: ProviderListProps) {
  const filteredProviders = providers.filter(p => 
    p.services.includes(serviceId)
  );

  const handleCallNow = (providerId: string, phone: string, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Appel en cours vers ${phone}...`);
    onProviderSelect(providerId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={onBack} className="hover:text-[#ef8175]">
              Annonces
            </button>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {filteredProviders.length} professionnels disponibles
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Professionnels disponibles
          </h1>
          <p className="text-gray-600">
            {filteredProviders.length} annonces près de chez vous
          </p>
        </div>

        {filteredProviders.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-600 mb-4">
              Aucune annonce disponible pour ce service pour le moment.
            </p>
            <Button 
              onClick={onBack}
              className="bg-[#ef8175] hover:bg-[#d66b5f]"
            >
              Retour aux annonces
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredProviders.map((provider) => (
              <Card 
                key={provider.id} 
                className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group border-2 hover:border-[#e63946]"
                onClick={() => onProviderSelect(provider.id)}
              >
                <div className="flex gap-4 p-4">
                  {/* Provider Photo */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={provider.photo}
                        alt={provider.name}
                        className="w-32 h-32 rounded-lg object-cover"
                      />
                      <button 
                        className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-lg hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Ajouté aux favoris!');
                        }}
                      >
                        <Heart className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Provider Info */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#e63946] mb-1">
                          {provider.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {provider.profession}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-sm text-gray-900">
                          {provider.rating}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {provider.description}
                    </p>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="h-3 w-3 text-[#e63946]" />
                        <span className="truncate">{provider.serviceArea}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="h-3 w-3 text-[#e63946]" />
                        <span className="truncate">{provider.availability}</span>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div>
                        <div className="text-xs text-gray-500">À partir de</div>
                        <div className="text-lg font-bold text-[#e63946]">
                          {provider.priceRange.split(' - ')[0]}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={(e) => handleCallNow(provider.id, provider.phone, e)}
                          size="sm"
                          className="bg-[#e63946] hover:bg-[#c62e3a] text-white"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Appeler
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onProviderSelect(provider.id);
                          }}
                          size="sm"
                          variant="outline"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Voir
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Footer */}
                <div className="bg-gray-50 px-4 py-2 flex items-center justify-between text-xs text-gray-600 border-t">
                  <span>{provider.reviewCount} avis</span>
                  <span>Publié il y a 2 jours</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
