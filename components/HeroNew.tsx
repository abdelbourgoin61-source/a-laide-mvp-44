import { motion } from 'motion/react';
import { Key, Wrench, Zap, Flame, CheckCircle, Phone, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface HeroProps {
  onEmergencyClick: () => void;
}

// 4 services d'urgence principaux
const emergencyServices = [
  { 
    id: 'serrurier', 
    name: 'Serrurerie', 
    icon: Key,
    color: 'from-red-500 to-red-600',
    description: 'Porte claquée, clé cassée'
  },
  { 
    id: 'plombier', 
    name: 'Plomberie', 
    icon: Wrench,
    color: 'from-blue-500 to-blue-600',
    description: 'Fuite d\'eau, débouchage'
  },
  { 
    id: 'electricien', 
    name: 'Électricité', 
    icon: Zap,
    color: 'from-yellow-500 to-yellow-600',
    description: 'Panne de courant, disjoncteur'
  },
  { 
    id: 'chauffagiste', 
    name: 'Chauffage', 
    icon: Flame,
    color: 'from-orange-500 to-orange-600',
    description: 'Chaudière en panne'
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export function HeroNew({ onEmergencyClick }: HeroProps) {
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section - Panic Button */}
      <motion.div 
        className="container mx-auto px-4 py-12 md:py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Main Title */}
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gray-900">Une urgence ?</span>
            <br />
            <span className="text-[var(--color-primary)]">On arrive.</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Trouvez un professionnel vérifié en moins de <span className="font-semibold text-[var(--color-primary)]">30 secondes</span>
          </p>
        </motion.div>

        {/* Quick Search - 4 Emergency Buttons */}
        <motion.div 
          className="max-w-5xl mx-auto mb-16"
          variants={itemVariants}
        >
          <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-900 mb-6">
            Services d'urgence disponibles maintenant
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {emergencyServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className="relative overflow-hidden cursor-pointer border-2 border-gray-200 hover:border-[var(--color-primary)] transition-all h-full group shadow-lg hover:shadow-2xl"
                    onClick={onEmergencyClick}
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    
                    {/* Content */}
                    <div className="relative p-6 flex flex-col items-center text-center h-full min-h-[160px] justify-center">
                      <div className="mb-4 p-4 rounded-full bg-gray-100 group-hover:bg-white transition-colors">
                        <Icon className="h-8 w-8 md:h-10 md:w-10 text-[var(--color-primary)] group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {service.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button - All Services */}
          <motion.div 
            className="text-center mt-8"
            variants={itemVariants}
          >
            <Button
              onClick={onEmergencyClick}
              size="lg"
              className="h-14 px-8 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-lg hover:shadow-xl transition-all"
            >
              Voir tous les services
            </Button>
          </motion.div>
        </motion.div>

        {/* How it Works Section */}
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={itemVariants}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Comment ça marche ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <motion.div 
              className="text-center"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  1
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Choisissez
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Sélectionnez le service d'urgence dont vous avez besoin
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="text-center"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  2
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Appelez
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Contactez directement un professionnel disponible près de vous
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="text-center"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  3
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Payez
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Réglez le prestataire et laissez un avis après l'intervention
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-2">
                1000+
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Professionnels vérifiés
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-2">
                24/7
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Service disponible
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-2">
                4.8★
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Note moyenne
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-2">
                &lt;30s
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Temps de réponse
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
