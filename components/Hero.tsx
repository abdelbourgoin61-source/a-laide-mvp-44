import { 
  Key, Wrench, Zap, Car, MapPin, Dog, Scissors, 
  ChefHat, Laptop, Search, TrendingUp, Paintbrush, Camera, Flower2
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';

interface HeroProps {
  onEmergencyClick: () => void;
}

const popularCategories = [
  { id: 'locksmith', name: 'Serrurier', icon: Key },
  { id: 'plumber', name: 'Plombier', icon: Wrench },
  { id: 'electrician', name: 'Électricien', icon: Zap },
  { id: 'breakdown', name: 'Dépannage', icon: Car },
  { id: 'dog-walker', name: 'Dog Walker', icon: Dog },
  { id: 'painter', name: 'Peinture', icon: Paintbrush },
  { id: 'photographer', name: 'Photographe', icon: Camera },
  { id: 'gardener', name: 'Jardinage', icon: Flower2 },
  { id: 'chef', name: 'Chef à domicile', icon: ChefHat },
  { id: 'computer', name: 'Informatique', icon: Laptop },
];

export function Hero({ onEmergencyClick }: HeroProps) {
  return (
    <div className="bg-white">
      {/* Search Hero Section */}
      <div className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-[#e63946] mb-4">
              Des milliers de services près de chez vous
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Trouvez rapidement un professionnel pour tous vos besoins
            </p>

            {/* Main Search Bar */}
            <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Que recherchez-vous ?"
                    className="h-14 text-lg border-2 border-gray-200"
                  />
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Où ?"
                      className="h-14 text-lg pl-12 border-2 border-gray-200"
                    />
                  </div>
                </div>
                <Button 
                  onClick={onEmergencyClick}
                  size="lg"
                  className="h-14 px-8 bg-[#e63946] hover:bg-[#c62e3a] text-white text-lg"
                >
                  <Search className="mr-2 h-6 w-6" />
                  Rechercher
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Catégories populaires
          </h2>
          <Button 
            variant="link" 
            className="text-[#e63946] hidden md:flex items-center gap-1"
            onClick={onEmergencyClick}
          >
            Voir tout
            <TrendingUp className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {popularCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="p-4 hover:shadow-xl transition-all cursor-pointer group border-2 hover:border-[#e63946]"
                onClick={onEmergencyClick}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-14 w-14 rounded-full bg-gray-100 group-hover:bg-[#e63946] flex items-center justify-center transition-all group-hover:scale-110">
                    <Icon className="h-7 w-7 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {category.name}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#e63946] mb-2">1000+</div>
              <div className="text-gray-600">Professionnels</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#e63946] mb-2">24/7</div>
              <div className="text-gray-600">Disponibilité</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#e63946] mb-2">4.8★</div>
              <div className="text-gray-600">Note moyenne</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#e63946] mb-2">30s</div>
              <div className="text-gray-600">Temps de réponse</div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
          Comment ça marche ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-[#e63946] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Choisissez un service</h3>
            <p className="text-gray-600">
              Parcourez nos catégories et sélectionnez le service dont vous avez besoin
            </p>
          </div>
          <div className="text-center">
            <div className="bg-[#e63946] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Contactez un professionnel</h3>
            <p className="text-gray-600">
              Consultez les profils et contactez directement le prestataire
            </p>
          </div>
          <div className="text-center">
            <div className="bg-[#e63946] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">C'est fait !</h3>
            <p className="text-gray-600">
              Le professionnel intervient et vous laissez un avis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
