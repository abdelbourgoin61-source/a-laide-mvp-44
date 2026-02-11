// Mock data for the Help platform

export interface Service {
  id: string;
  name: string;
  icon: string;
  category: 'emergency' | 'utility';
}

export interface Provider {
  id: string;
  name: string;
  profession: string;
  photo: string;
  description: string;
  priceRange: string;
  serviceArea: string;
  availability: string;
  rating: number;
  reviewCount: number;
  services: string[];
  phone: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface Review {
  id: string;
  providerId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  serviceType: string;
}

export interface Invoice {
  id: string;
  providerId: string;
  providerName: string;
  customerName: string;
  serviceType: string;
  date: string;
  totalAmount: number;
  platformCommission: number;
  providerAmount: number;
  status: 'paid' | 'pending' | 'unpaid';
}

export const services: Service[] = [
  // Emergency Services
  { id: 'locksmith', name: 'Locksmith', icon: 'Key', category: 'emergency' },
  { id: 'plumber', name: 'Plumber', icon: 'Wrench', category: 'emergency' },
  { id: 'electrician', name: 'Electrician', icon: 'Zap', category: 'emergency' },
  { id: 'breakdown', name: 'Night Breakdown', icon: 'Car', category: 'emergency' },
  { id: 'isolation', name: 'Isolated Area Help', icon: 'MapPin', category: 'emergency' },
  
  // Utility Services
  { id: 'dog-walker', name: 'Dog Walker', icon: 'Dog', category: 'utility' },
  { id: 'dog-trainer', name: 'Dog Trainer', icon: 'Bone', category: 'utility' },
  { id: 'pet-daycare', name: 'Pet Daycare', icon: 'Home', category: 'utility' },
  { id: 'babysitting', name: 'Babysitting', icon: 'Baby', category: 'utility' },
  { id: 'household', name: 'Household Cleaning', icon: 'Sparkles', category: 'utility' },
  { id: 'gardening', name: 'Gardening', icon: 'Flower2', category: 'utility' },
  { id: 'hairdresser', name: 'Home Hairdressing', icon: 'Scissors', category: 'utility' },
  { id: 'chef', name: 'Private Chef', icon: 'ChefHat', category: 'utility' },
  { id: 'computer', name: 'Computer Services', icon: 'Laptop', category: 'utility' },
  { id: 'trainer', name: 'Personal Trainer', icon: 'Dumbbell', category: 'utility' },
  { id: 'tutor', name: 'Private Lessons', icon: 'GraduationCap', category: 'utility' },
  { id: 'photographer', name: 'Photographer', icon: 'Camera', category: 'utility' },
  { id: 'painting', name: 'Painting / DIY', icon: 'Paintbrush', category: 'utility' },
  { id: 'other', name: 'Other Services', icon: 'MoreHorizontal', category: 'utility' },
];

export const providers: Provider[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    profession: 'Serrurier',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    description: 'Service de serrurerie d\'urgence 24/7. Spécialisé dans les dépannages maison et voiture. Intervention rapide en 15 minutes.',
    priceRange: '50€ - 150€',
    serviceArea: 'Paris & Ile-de-France',
    availability: '24/7',
    rating: 4.8,
    reviewCount: 142,
    services: ['locksmith'],
    phone: '+33 6 12 34 56 78',
    socialMedia: {
      facebook: 'https://facebook.com/jeandupont',
      instagram: 'https://instagram.com/jeandupont'
    }
  },
  {
    id: '2',
    name: 'Marie Martin',
    profession: 'Plombière',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    description: 'Plombière experte avec 15 ans d\'expérience. Réparations d\'urgence, installations et maintenance.',
    priceRange: '60€ - 200€',
    serviceArea: 'Paris',
    availability: 'Lun-Dim 7h-22h',
    rating: 4.9,
    reviewCount: 256,
    services: ['plumber'],
    phone: '+33 6 23 45 67 89',
  },
  {
    id: '3',
    name: 'Thomas Bernard',
    profession: 'Électricien',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    description: 'Électricien certifié disponible pour urgences. Réparations électriques, installations et inspections de sécurité.',
    priceRange: '70€ - 180€',
    serviceArea: 'Paris & banlieue',
    availability: '24/7',
    rating: 4.7,
    reviewCount: 189,
    services: ['electrician'],
    phone: '+33 6 34 56 78 90',
  },
  {
    id: '4',
    name: 'Sophie Laurent',
    profession: 'Promenade de chiens',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    description: 'Promeneuse de chiens professionnelle et passionnée d\'animaux. Promenades individuelles ou en groupe. Disponible matin et soir.',
    priceRange: '15€ - 30€ par promenade',
    serviceArea: 'Paris 15e-16e',
    availability: 'Lun-Ven 8h-18h',
    rating: 5.0,
    reviewCount: 98,
    services: ['dog-walker', 'pet-daycare'],
    phone: '+33 6 45 67 89 01',
    socialMedia: {
      instagram: 'https://instagram.com/sophiedogwalker'
    }
  },
  {
    id: '5',
    name: 'Lucas Petit',
    profession: 'Technicien Informatique',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    description: 'Support IT et réparation d\'ordinateurs. Suppression de virus, upgrades matériel, configuration réseau.',
    priceRange: '40€ - 120€',
    serviceArea: 'Paris & Ile-de-France',
    availability: 'Lun-Sam 9h-19h',
    rating: 4.6,
    reviewCount: 134,
    services: ['computer'],
    phone: '+33 6 56 78 90 12',
  },
  {
    id: '6',
    name: 'Emma Dubois',
    profession: 'Coiffeuse à domicile',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    description: 'Coiffeuse mobile apportant la qualité du salon chez vous. Coupes, colorations et coiffures.',
    priceRange: '30€ - 100€',
    serviceArea: 'Paris',
    availability: 'Mar-Sam 10h-20h',
    rating: 4.9,
    reviewCount: 167,
    services: ['hairdresser'],
    phone: '+33 6 67 89 01 23',
  },
  {
    id: '7',
    name: 'Pierre Moreau',
    profession: 'Plombier urgence',
    photo: 'https://images.unsplash.com/photo-1604118600242-e7a6d23ec3a9?w=400',
    description: 'Expert en dépannage plomberie 24/7. Fuites, débouchage, installation chauffe-eau. Intervention rapide garantie.',
    priceRange: '55€ - 180€',
    serviceArea: 'Paris & Banlieue Nord',
    availability: '24/7',
    rating: 4.8,
    reviewCount: 203,
    services: ['plumber'],
    phone: '+33 6 78 90 12 34',
  },
  {
    id: '8',
    name: 'Camille Rousseau',
    profession: 'Baby-sitter certifiée',
    photo: 'https://images.unsplash.com/photo-1576761525241-e5c3b8202cf8?w=400',
    description: 'Baby-sitter diplômée avec 8 ans d\'expérience. Garde d\'enfants de tous âges, aide aux devoirs, activités ludiques.',
    priceRange: '12€ - 20€/heure',
    serviceArea: 'Paris Centre',
    availability: 'Lun-Dim 7h-23h',
    rating: 5.0,
    reviewCount: 156,
    services: ['babysitting'],
    phone: '+33 6 89 01 23 45',
    socialMedia: {
      facebook: 'https://facebook.com/camillebabysitter'
    }
  },
  {
    id: '9',
    name: 'Antoine Lefevre',
    profession: 'Chef à domicile',
    photo: 'https://images.unsplash.com/photo-1759521296013-559479e2a891?w=400',
    description: 'Chef cuisinier professionnel pour événements et repas à domicile. Cuisine française, italienne et fusion.',
    priceRange: '80€ - 250€',
    serviceArea: 'Paris & Proche Banlieue',
    availability: 'Mer-Dim sur réservation',
    rating: 4.9,
    reviewCount: 87,
    services: ['chef'],
    phone: '+33 6 90 12 34 56',
    socialMedia: {
      instagram: 'https://instagram.com/chefantoine',
      facebook: 'https://facebook.com/chefantoine'
    }
  },
  {
    id: '10',
    name: 'Isabelle Blanc',
    profession: 'Aide-ménagère',
    photo: 'https://images.unsplash.com/photo-1736939666660-d4c776e0532c?w=400',
    description: 'Service de ménage professionnel. Nettoyage régulier ou ponctuel, repassage, vitres. Produits écologiques disponibles.',
    priceRange: '25€ - 45€/heure',
    serviceArea: 'Paris Ouest',
    availability: 'Lun-Ven 8h-17h',
    rating: 4.7,
    reviewCount: 124,
    services: ['household'],
    phone: '+33 6 01 23 45 67',
  },
  {
    id: '11',
    name: 'Julien Faure',
    profession: 'Jardinier paysagiste',
    photo: 'https://images.unsplash.com/photo-1759497860802-9cba5782b455?w=400',
    description: 'Paysagiste expert en entretien de jardins. Taille, tonte, plantation, création d\'espaces verts. Devis gratuit.',
    priceRange: '35€ - 90€/heure',
    serviceArea: 'Paris & Banlieue Sud',
    availability: 'Mar-Sam 8h-18h',
    rating: 4.8,
    reviewCount: 95,
    services: ['gardening'],
    phone: '+33 6 12 34 56 89',
  },
  {
    id: '12',
    name: 'Léa Mercier',
    profession: 'Coach sportif personnel',
    photo: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400',
    description: 'Coach sportive diplômée. Programmes personnalisés, à domicile ou en extérieur. Remise en forme, musculation, cardio.',
    priceRange: '45€ - 80€/séance',
    serviceArea: 'Paris',
    availability: 'Lun-Sam 6h-21h',
    rating: 5.0,
    reviewCount: 142,
    services: ['trainer'],
    phone: '+33 6 23 45 67 90',
    socialMedia: {
      instagram: 'https://instagram.com/leacoach'
    }
  },
  {
    id: '13',
    name: 'Marc Girard',
    profession: 'Photographe professionnel',
    photo: 'https://images.unsplash.com/photo-1548118800-202c80cd31d3?w=400',
    description: 'Photographe spécialisé en événements, portraits et photos de famille. Matériel professionnel, retouches incluses.',
    priceRange: '150€ - 500€',
    serviceArea: 'Ile-de-France',
    availability: 'Sur rendez-vous',
    rating: 4.9,
    reviewCount: 78,
    services: ['photographer'],
    phone: '+33 6 34 56 78 01',
    socialMedia: {
      instagram: 'https://instagram.com/marcphoto',
      facebook: 'https://facebook.com/marcgirardphoto'
    }
  },
  {
    id: '14',
    name: 'Nathalie Dubois',
    profession: 'Professeur particulier',
    photo: 'https://images.unsplash.com/photo-1758685848001-0396a85ba84f?w=400',
    description: 'Enseignante diplômée proposant cours particuliers. Maths, français, anglais. Primaire au lycée. Préparation examens.',
    priceRange: '25€ - 50€/heure',
    serviceArea: 'Paris & Est',
    availability: 'Lun-Sam 14h-20h',
    rating: 4.9,
    reviewCount: 165,
    services: ['tutor'],
    phone: '+33 6 45 67 89 12',
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    providerId: '1',
    customerName: 'Pierre L.',
    rating: 5,
    comment: 'Arrivé en 12 minutes ! Très professionnel et a résolu mon problème de serrure rapidement. Hautement recommandé !',
    date: '2026-01-25',
    serviceType: 'Serrurier d\'urgence'
  },
  {
    id: '2',
    providerId: '1',
    customerName: 'Anne M.',
    rating: 5,
    comment: 'Excellent service, prix justes. Jean était très serviable et a tout expliqué clairement.',
    date: '2026-01-20',
    serviceType: 'Remplacement de serrure'
  },
  {
    id: '3',
    providerId: '2',
    customerName: 'Marc D.',
    rating: 5,
    comment: 'Marie a réparé notre fuite de tuyau d\'urgence à 21h. Excellent travail et prix très raisonnable.',
    date: '2026-01-22',
    serviceType: 'Réparation d\'urgence'
  },
  {
    id: '4',
    providerId: '4',
    customerName: 'Julie R.',
    rating: 5,
    comment: 'Sophie est incroyable avec notre chien Max ! Il adore ses promenades et revient toujours heureux.',
    date: '2026-01-26',
    serviceType: 'Promenade de chien'
  },
];

export const invoices: Invoice[] = [
  {
    id: 'INV-2026-001',
    providerId: '1',
    providerName: 'Jean Dupont',
    customerName: 'Pierre Laurent',
    serviceType: 'Emergency Locksmith',
    date: '2026-01-25',
    totalAmount: 120,
    platformCommission: 21.6,
    providerAmount: 98.4,
    status: 'paid'
  },
  {
    id: 'INV-2026-002',
    providerId: '2',
    providerName: 'Marie Martin',
    customerName: 'Marc Dubois',
    serviceType: 'Emergency Plumbing',
    date: '2026-01-22',
    totalAmount: 180,
    platformCommission: 32.4,
    providerAmount: 147.6,
    status: 'paid'
  },
  {
    id: 'INV-2026-003',
    providerId: '4',
    providerName: 'Sophie Laurent',
    customerName: 'Julie Richard',
    serviceType: 'Dog Walking - Weekly Package',
    date: '2026-01-20',
    totalAmount: 100,
    platformCommission: 18,
    providerAmount: 82,
    status: 'pending'
  },
];
