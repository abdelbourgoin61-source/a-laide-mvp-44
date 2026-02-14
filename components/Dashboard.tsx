import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  Calendar, 
  Download, 
  Star, 
  Phone,
  MapPin,
  FileText,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { mockMissions } from '../src/lib/mockData';
import { toast } from 'sonner';

interface DashboardProps {
  onBack: () => void;
  onViewProvider: (providerId: string) => void;
}

export function Dashboard({ onBack, onViewProvider }: DashboardProps) {
  const [loading, setLoading] = useState(true);
  const [missions, setMissions] = useState<any[]>([]);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [selectedMission, setSelectedMission] = useState<any>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  useEffect(() => {
    loadMissions();
  }, []);

  async function loadMissions() {
    setLoading(true);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setMissions(mockMissions);
    setLoading(false);
  }

  const ongoingMissions = missions.filter(m => m.status === 'PENDING' || m.status === 'IN_PROGRESS');
  const completedMissions = missions.filter(m => m.status === 'COMPLETED');

  const handleDownloadInvoice = (mission: any) => {
    // Simulate PDF download
    toast.success(`Téléchargement de la facture #${mission.id} en cours...`);
    
    // In production, this would generate and download a real PDF
    console.log('Downloading invoice for mission:', mission.id);
  };

  const handleLeaveReview = (mission: any) => {
    setSelectedMission(mission);
    setReviewRating(5);
    setReviewComment('');
    setShowReviewDialog(true);
  };

  const handleSubmitReview = () => {
    if (!selectedMission) return;

    // In production, this would submit to Supabase
    toast.success('Merci pour votre avis ! Il sera publié sous peu.');
    
    // Update mission locally
    setMissions(missions.map(m => 
      m.id === selectedMission.id 
        ? { ...m, has_review: true }
        : m
    ));
    
    setShowReviewDialog(false);
    setSelectedMission(null);
  };

  const handleContactProvider = (mission: any) => {
    const provider = mission.provider;
    window.location.href = `tel:+33612345678`;
    toast.info(`Appel vers ${provider.profiles.first_name} ${provider.profiles.last_name}...`);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'PENDING':
        return {
          label: 'En attente',
          color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          icon: Clock
        };
      case 'IN_PROGRESS':
        return {
          label: 'En cours',
          color: 'bg-blue-100 text-blue-700 border-blue-200',
          icon: Loader2
        };
      case 'COMPLETED':
        return {
          label: 'Terminée',
          color: 'bg-green-100 text-green-700 border-green-200',
          icon: CheckCircle
        };
      default:
        return {
          label: status,
          color: 'bg-gray-100 text-gray-700 border-gray-200',
          icon: AlertCircle
        };
    }
  };

  const MissionCard = ({ mission, showActions = true }: { mission: any; showActions?: boolean }) => {
    const statusConfig = getStatusConfig(mission.status);
    const StatusIcon = statusConfig.icon;
    const provider = mission.provider;
    const service = mission.service;
    const providerName = `${provider.profiles.first_name} ${provider.profiles.last_name}`;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Provider Avatar */}
            <div className="flex-shrink-0">
              <Avatar className="h-16 w-16 cursor-pointer" onClick={() => onViewProvider(provider.id)}>
                <AvatarImage src={provider.profiles.avatar_url || undefined} alt={providerName} />
                <AvatarFallback className="bg-[var(--color-primary)] text-white">
                  {provider.profiles.first_name[0]}{provider.profiles.last_name[0]}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Mission Details */}
            <div className="flex-1 space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {mission.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">{service.name}</span>
                    <span>•</span>
                    <span className="cursor-pointer hover:text-[var(--color-primary)]" onClick={() => onViewProvider(provider.id)}>
                      {providerName}
                    </span>
                  </div>
                </div>
                
                <Badge className={`${statusConfig.color} border gap-1`}>
                  <StatusIcon className={`h-3 w-3 ${mission.status === 'IN_PROGRESS' ? 'animate-spin' : ''}`} />
                  {statusConfig.label}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-gray-700">
                {mission.description}
              </p>

              {/* Info */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  {new Date(mission.scheduled_at).toLocaleDateString('fr-FR', { 
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {provider.city}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Montant total :</span>
                <span className="text-2xl font-bold text-[var(--color-primary)]">
                  {mission.total_price}€
                </span>
              </div>

              {/* Actions */}
              {showActions && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {mission.status === 'COMPLETED' && (
                    <>
                      <Button
                        onClick={() => handleDownloadInvoice(mission)}
                        variant="outline"
                        className="gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Télécharger la facture
                      </Button>
                      
                      {!mission.has_review && (
                        <Button
                          onClick={() => handleLeaveReview(mission)}
                          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] gap-2"
                        >
                          <Star className="h-4 w-4" />
                          Laisser un avis
                        </Button>
                      )}
                      
                      {mission.has_review && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          ✓ Avis déjà laissé
                        </Badge>
                      )}
                    </>
                  )}

                  {(mission.status === 'PENDING' || mission.status === 'IN_PROGRESS') && (
                    <Button
                      onClick={() => handleContactProvider(mission)}
                      className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] gap-2"
                    >
                      <Phone className="h-4 w-4" />
                      Contacter le prestataire
                    </Button>
                  )}

                  <Button
                    onClick={() => onViewProvider(provider.id)}
                    variant="outline"
                  >
                    Voir le profil
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b sticky top-16 z-40">
          <div className="container mx-auto px-4 py-4">
            <Skeleton className="h-10 w-64" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="p-6">
                <div className="flex gap-6">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-gray-900">
              Mes interventions
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {ongoingMissions.length}
                </div>
                <div className="text-sm text-gray-600">
                  Mission{ongoingMissions.length > 1 ? 's' : ''} en cours
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {completedMissions.length}
                </div>
                <div className="text-sm text-gray-600">
                  Mission{completedMissions.length > 1 ? 's' : ''} terminée{completedMissions.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {completedMissions.length}
                </div>
                <div className="text-sm text-gray-600">
                  Facture{completedMissions.length > 1 ? 's' : ''} disponible{completedMissions.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="ongoing" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 h-auto">
            <TabsTrigger value="ongoing" className="gap-2 py-3">
              <Clock className="h-4 w-4" />
              En cours ({ongoingMissions.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2 py-3">
              <CheckCircle className="h-4 w-4" />
              Historique ({completedMissions.length})
            </TabsTrigger>
          </TabsList>

          {/* Ongoing Missions */}
          <TabsContent value="ongoing" className="space-y-4">
            {ongoingMissions.length === 0 ? (
              <Card className="p-12">
                <div className="text-center">
                  <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Aucune mission en cours
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Vous n'avez pas de mission planifiée ou en cours pour le moment.
                  </p>
                  <Button onClick={onBack} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]">
                    Trouver un professionnel
                  </Button>
                </div>
              </Card>
            ) : (
              ongoingMissions.map(mission => (
                <MissionCard key={mission.id} mission={mission} />
              ))
            )}
          </TabsContent>

          {/* Completed Missions */}
          <TabsContent value="history" className="space-y-4">
            {completedMissions.length === 0 ? (
              <Card className="p-12">
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Aucune mission terminée
                  </h3>
                  <p className="text-gray-600">
                    Vos missions terminées apparaîtront ici.
                  </p>
                </div>
              </Card>
            ) : (
              completedMissions.map(mission => (
                <MissionCard key={mission.id} mission={mission} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Laisser un avis</DialogTitle>
            <DialogDescription>
              Votre avis aide les autres utilisateurs à choisir le bon prestataire
            </DialogDescription>
          </DialogHeader>

          {selectedMission && (
            <div className="space-y-6 py-4">
              {/* Provider Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage 
                    src={selectedMission.provider.profiles.avatar_url || undefined} 
                    alt={`${selectedMission.provider.profiles.first_name} ${selectedMission.provider.profiles.last_name}`}
                  />
                  <AvatarFallback className="bg-[var(--color-primary)] text-white">
                    {selectedMission.provider.profiles.first_name[0]}{selectedMission.provider.profiles.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-gray-900">
                    {selectedMission.provider.profiles.first_name} {selectedMission.provider.profiles.last_name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {selectedMission.service.name}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <Label className="text-base font-semibold mb-3 block">Note</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setReviewRating(rating)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 cursor-pointer ${
                          rating <= reviewRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-lg font-semibold text-gray-900">
                    {reviewRating}/5
                  </span>
                </div>
              </div>

              {/* Comment */}
              <div>
                <Label htmlFor="review-comment" className="text-base font-semibold mb-3 block">
                  Votre commentaire
                </Label>
                <Textarea
                  id="review-comment"
                  placeholder="Décrivez votre expérience avec ce prestataire..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={5}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Minimum 20 caractères
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowReviewDialog(false)}
            >
              Annuler
            </Button>
            <Button
              onClick={handleSubmitReview}
              disabled={reviewComment.length < 20}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
            >
              Publier l'avis
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
