import { Star, MapPin, Shield, CheckCircle, Phone } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ProviderCardProps {
  provider: any; // Will be properly typed later
  onContact: (providerId: string) => void;
  onViewProfile: (providerId: string) => void;
}

export function ProviderCard({ provider, onContact, onViewProfile }: ProviderCardProps) {
  const profile = provider.profiles;
  const fullName = profile 
    ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() 
    : 'Prestataire';
  
  const initials = fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  const statusConfig = {
    AVAILABLE: { label: 'Disponible maintenant', color: 'bg-green-500', textColor: 'text-green-700' },
    BUSY: { label: 'Occupé', color: 'bg-orange-500', textColor: 'text-orange-700' },
    OFFLINE: { label: 'Hors ligne', color: 'bg-gray-400', textColor: 'text-gray-700' }
  };

  const status = statusConfig[provider.status as keyof typeof statusConfig];

  return (
    <Card className="p-6 hover:shadow-xl transition-all border-2 hover:border-[var(--color-primary)] cursor-pointer">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar & Status */}
        <div className="flex-shrink-0">
          <div className="relative">
            <Avatar className="h-20 w-20 md:h-24 md:w-24">
              <AvatarImage src={profile?.avatar_url || undefined} alt={fullName} />
              <AvatarFallback className="bg-[var(--color-primary)] text-white text-xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            {/* Status Indicator */}
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${status.color} rounded-full border-4 border-white`} />
          </div>
        </div>

        {/* Provider Info */}
        <div className="flex-1 min-w-0">
          {/* Name & Badges */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {fullName}
              </h3>
              {provider.company_name && (
                <p className="text-sm text-gray-600">{provider.company_name}</p>
              )}
            </div>
            
            {/* Verification Badge */}
            {provider.is_verified && (
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 gap-1">
                <Shield className="h-3 w-3" />
                Vérifié
              </Badge>
            )}
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">
                {provider.rating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-600">
                ({provider.review_count} avis)
              </span>
            </div>
            
            <div className="h-4 w-px bg-gray-300" />
            
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-600" />
              {provider.completed_missions} missions
            </div>
          </div>

          {/* Location & Status */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {provider.city && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                {provider.city} ({provider.postal_code})
              </div>
            )}
            
            <Badge variant="outline" className={`${status.textColor} border-current`}>
              {status.label}
            </Badge>
          </div>

          {/* Bio */}
          {provider.bio && (
            <p className="text-sm text-gray-700 mb-4 line-clamp-2">
              {provider.bio}
            </p>
          )}

          {/* Price */}
          {provider.hourly_rate && (
            <div className="mb-4">
              <span className="text-sm text-gray-600">Tarif horaire : </span>
              <span className="text-lg font-semibold text-[var(--color-primary)]">
                {provider.hourly_rate}€/h
              </span>
              {provider.intervention_fee && (
                <span className="text-sm text-gray-600 ml-2">
                  + {provider.intervention_fee}€ déplacement
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => onContact(provider.id)}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white gap-2 flex-1 md:flex-initial min-w-[140px]"
              disabled={provider.status === 'OFFLINE'}
            >
              <Phone className="h-4 w-4" />
              Contacter
            </Button>
            
            <Button
              onClick={() => onViewProfile(provider.id)}
              variant="outline"
              className="flex-1 md:flex-initial min-w-[140px]"
            >
              Voir le profil
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
