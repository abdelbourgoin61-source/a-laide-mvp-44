import { 
  Key, Wrench, Zap, Car, MapPin, Dog, Bone, Home, 
  Baby, Sparkles, Flower2, Scissors, ChefHat, Laptop,
  Dumbbell, GraduationCap, Camera, Paintbrush, MoreHorizontal,
  AlertCircle, Filter, SlidersHorizontal
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { services } from '../lib/data';
import { useEffect, useState } from 'react';

interface ServiceSelectionProps {
  onServiceSelect: (serviceId: string) => void;
  onBack: () => void;
}

const iconMap: Record<string, any> = {
  Key, Wrench, Zap, Car, MapPin, Dog, Bone, Home,
  Baby, Sparkles, Flower2, Scissors, ChefHat, Laptop,
  Dumbbell, GraduationCap, Camera, Paintbrush, MoreHorizontal
};

export function ServiceSelection({ onServiceSelect, onBack }: ServiceSelectionProps) {
  const [location, setLocation] = useState<string>('');
  const [isLocating, setIsLocating] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);

  useEffect(() => {
    setIsLocating(true);
    setTimeout(() => {
      setLocation('Paris, Île-de-France');
      setIsLocating(false);
    }, 1000);
  }, []);

  const emergencyServices = services.filter(s => s.category === 'emergency');
  const utilityServices = services.filter(s => s.category === 'utility');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={onBack} className="hover:text-[#ef8175]">
              Accueil
            </button>
            <span>/</span>
            <span className="text-gray-900 font-medium">Toutes les annonces</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="h-5 w-5 text-[#e63946]" />
                <h3 className="font-semibold text-gray-900">Filtres</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Localisation
                  </label>
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <MapPin className="h-4 w-4 text-[#e63946]" />
                    <span>{isLocating ? 'Détection...' : location}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Type de service
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-[#e63946]" defaultChecked />
                      Services d'urgence
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-[#e63946]" defaultChecked />
                      Services à domicile
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Prix
                  </label>
                  <div className="space-y-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={2000}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>{priceRange[0]}€</span>
                      <span>{priceRange[1]}€</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Disponibilité
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-[#e63946]" />
                      24/7
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-[#e63946]" />
                      Disponible maintenant
                    </label>
                  </div>
                </div>

                <Button className="w-full bg-[#e63946] hover:bg-[#c62e3a]">
                  Appliquer les filtres
                </Button>
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Toutes les annonces ({emergencyServices.length + utilityServices.length})
              </h1>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Trier par
              </Button>
            </div>

            {/* Emergency Services */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <AlertCircle className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Services d'urgence
                </h2>
                <Badge variant="destructive" className="ml-2">24/7</Badge>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {emergencyServices.map((service) => {
                  const Icon = iconMap[service.icon];
                  return (
                    <Card
                      key={service.id}
                      className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group border-2 hover:border-[#ff6e14]"
                      onClick={() => onServiceSelect(service.id)}
                    >
                      <div className="aspect-square bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                        <Icon className="h-16 w-16 text-white" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#ff6e14]">
                          {service.name}
                        </h3>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Dès 50€</span>
                          <Badge variant="outline" className="text-xs">Urgence</Badge>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Utility Services */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Services à domicile
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {utilityServices.map((service) => {
                  const Icon = iconMap[service.icon];
                  return (
                    <Card
                      key={service.id}
                      className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group border-2 hover:border-[#ff6e14]"
                      onClick={() => onServiceSelect(service.id)}
                    >
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Icon className="h-16 w-16 text-gray-700" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#ff6e14]">
                          {service.name}
                        </h3>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Dès 15€</span>
                          <span className="text-[#ff6e14] font-medium">Voir →</span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
