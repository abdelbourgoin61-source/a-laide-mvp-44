import { Phone, Star, MapPin, Clock, Facebook, Instagram, Linkedin, MessageSquare, Share2, Heart, Shield, Mail, Send, ArrowLeft, CheckCircle, Award, Calendar, Briefcase, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { mockProviders } from '../src/lib/mockData';

interface ProviderProfileProps {
  providerId: string;
  onBack: () => void;
}

// Mock reviews for realistic data
const mockReviews = [
  {
    id: '1',
    customer_name: 'Marie L.',
    rating: 5,
    comment: 'Intervention rapide et professionnelle. Le prestataire est arrivé en 20 minutes et a résolu mon problème immédiatement. Je recommande vivement !',
    service_type: 'Ouverture de porte',
    created_at: '2025-02-08T14:30:00Z'
  },
  {
    id: '2',
    customer_name: 'Thomas B.',
    rating: 5,
    comment: 'Très satisfait du service. Tarif transparent, pas de surprise sur la facture. Excellent travail !',
    service_type: 'Changement de serrure',
    created_at: '2025-02-05T10:15:00Z'
  },
  {
    id: '3',
    customer_name: 'Sophie D.',
    rating: 4,
    comment: 'Service professionnel, intervention efficace. Juste un petit délai d\'attente mais rien de grave.',
    service_type: 'Réparation urgente',
    created_at: '2025-02-01T16:45:00Z'
  },
  {
    id: '4',
    customer_name: 'Laurent M.',
    rating: 5,
    comment: 'Prestataire très sympathique et compétent. A pris le temps de m\'expliquer le problème et la réparation. Top !',
    service_type: 'Dépannage',
    created_at: '2025-01-28T09:20:00Z'
  }
];

export function ProviderProfile({ providerId, onBack }: ProviderProfileProps) {
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    loadProviderData();
  }, [providerId]);

  async function loadProviderData() {
    setLoading(true);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundProvider = mockProviders.find(p => p.id === providerId);
    setProvider(foundProvider);
    setReviews(mockReviews);
    
    setLoading(false);
  }

  const handleCall = () => {
    if (provider) {
      // In production, this would open the phone dialer
      window.location.href = `tel:+33612345678`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Skeleton */}
        <div className="bg-white border-b sticky top-16 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-8 w-48" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <div className="flex gap-6">
                  <Skeleton className="h-32 w-32 rounded-xl" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <Skeleton className="h-32 w-full" />
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Prestataire introuvable</h2>
          <p className="text-gray-600 mb-6">Ce prestataire n'existe pas ou n'est plus disponible.</p>
          <Button onClick={onBack} className="w-full">
            Retour à la recherche
          </Button>
        </Card>
      </div>
    );
  }

  const profile = provider.profiles;
  const fullName = `${profile.first_name} ${profile.last_name}`;
  const initials = `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
  const service = provider.provider_services[0]?.services;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Profil du prestataire
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pb-24 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Profile Header */}
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Photo de profil */}
                <div className="flex-shrink-0">
                  <Avatar className="h-32 w-32 border-4 border-gray-100">
                    <AvatarImage src={profile.avatar_url || undefined} alt={fullName} />
                    <AvatarFallback className="bg-[var(--color-primary)] text-white text-3xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Info */}
                <div className="flex-1">
                  {/* Name & Badges */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-1">
                        {fullName}
                      </h2>
                      {provider.company_name && (
                        <p className="text-lg text-gray-600 mb-2">{provider.company_name}</p>
                      )}
                      <div className="flex items-center gap-2 mb-3">
                        {provider.is_verified && (
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 gap-1">
                            <Shield className="h-3 w-3" />
                            Vérifié
                          </Badge>
                        )}
                        {service && (
                          <Badge variant="outline">
                            {service.name}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions icons - Desktop */}
                    <div className="hidden md:flex gap-2">
                      <Button size="sm" variant="outline">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-gray-700 mb-4">
                    <MapPin className="h-5 w-5 text-[var(--color-primary)]" />
                    <span className="font-medium">{provider.city} ({provider.postal_code})</span>
                  </div>

                  {/* Statistics Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Rating */}
                    <div className="bg-yellow-50 rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-2xl font-bold text-gray-900">
                          {provider.rating.toFixed(1)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {provider.review_count} avis
                      </div>
                    </div>

                    {/* Missions */}
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-2xl font-bold text-gray-900">
                          {provider.completed_missions}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        missions
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Award className="h-5 w-5 text-blue-600" />
                        <span className="text-2xl font-bold text-gray-900">
                          {provider.experience}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        ans d'exp.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Bio / Description */}
            {provider.bio && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-[var(--color-primary)]" />
                  À propos
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {provider.bio}
                </p>
              </Card>
            )}

            {/* Services & Pricing */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[var(--color-primary)]" />
                Services proposés
              </h3>
              
              <div className="space-y-3">
                {/* Main Service */}
                {service && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-[var(--color-primary)]">
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">{service.name}</div>
                      <div className="text-sm text-gray-600">{service.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[var(--color-primary)]">
                        {service.price_min}€ - {service.price_max}€
                      </div>
                      <div className="text-xs text-gray-500">Selon intervention</div>
                    </div>
                  </div>
                )}

                {/* Hourly Rate */}
                {provider.hourly_rate && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Tarif horaire</div>
                      <div className="text-sm text-gray-600">Main d'œuvre</div>
                    </div>
                    <div className="text-xl font-semibold text-gray-900">
                      {provider.hourly_rate}€/h
                    </div>
                  </div>
                )}

                {/* Intervention Fee */}
                {provider.intervention_fee > 0 && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Frais de déplacement</div>
                      <div className="text-sm text-gray-600">Zone {provider.city}</div>
                    </div>
                    <div className="text-xl font-semibold text-gray-900">
                      {provider.intervention_fee}€
                    </div>
                  </div>
                )}
              </div>

              {/* Verification Banner */}
              {provider.is_verified && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-blue-900 mb-1">
                        Profil vérifié par À l'aide
                      </div>
                      <div className="text-sm text-blue-700 space-y-1">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          <span>Identité vérifiée</span>
                        </div>
                        {provider.documents_verified && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>Diplômes et certifications validés</span>
                          </div>
                        )}
                        {provider.insurance_verified && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>Assurance professionnelle à jour</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Reviews Section */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="h-6 w-6 text-[var(--color-primary)]" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Avis clients ({reviews.length})
                </h3>
              </div>

              {reviews.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                  Aucun avis pour le moment
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-gray-200 text-gray-700">
                            {review.customer_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="font-semibold text-gray-900">
                                {review.customer_name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {new Date(review.created_at).toLocaleDateString('fr-FR', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-2">
                            {review.comment}
                          </p>
                          
                          <Badge variant="outline" className="text-xs">
                            {review.service_type}
                          </Badge>
                        </div>
                      </div>
                      
                      {index < reviews.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>

          {/* Sidebar - Desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 hidden lg:block"
          >
            <Card className="p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600 mb-2">À partir de</div>
                <div className="text-4xl font-bold text-[var(--color-primary)]">
                  {service ? `${service.price_min}€` : `${provider.hourly_rate}€/h`}
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <Button
                  onClick={handleCall}
                  size="lg"
                  className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white h-14 text-lg gap-2"
                >
                  <Phone className="h-5 w-5" />
                  APPELER MAINTENANT
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full h-12"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Envoyer un message
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Disponibilité</span>
                  <span className={`font-medium ${
                    provider.status === 'AVAILABLE' ? 'text-green-600' : 
                    provider.status === 'BUSY' ? 'text-orange-600' : 'text-gray-600'
                  }`}>
                    {provider.status === 'AVAILABLE' ? '✓ Disponible' : 
                     provider.status === 'BUSY' ? 'Occupé' : 'Hors ligne'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Temps de réponse</span>
                  <span className="font-medium text-green-600">~ 15 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Membre depuis</span>
                  <span className="font-medium">2024</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-xs text-gray-600 mb-2 font-medium">
                  💡 Conseil de sécurité
                </div>
                <div className="text-xs text-gray-700">
                  Ne versez jamais d'acompte avant d'avoir rencontré le professionnel et vérifié son identité.
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Fixed Call Button - Mobile Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <Button
          onClick={handleCall}
          size="lg"
          className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white h-16 text-xl gap-3"
        >
          <Phone className="h-6 w-6" />
          APPELER MAINTENANT
        </Button>
      </div>
    </div>
  );
}
