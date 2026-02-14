import { Phone, Mail, MapPin, Shield, FileText } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t bg-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#e63946]">
                <span className="text-xl font-bold text-white">A</span>
              </div>
              <span className="text-2xl font-bold text-[#e63946]">À l'aide</span>
            </div>
            <p className="text-sm text-gray-600">
              La plateforme n°1 pour trouver des professionnels près de chez vous. Services d'urgence et à domicile disponibles 24/7.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="text-sm text-gray-600 hover:text-[#e63946] transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')}
                  className="text-sm text-gray-600 hover:text-[#e63946] transition-colors"
                >
                  Toutes les annonces
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('support')}
                  className="text-sm text-gray-600 hover:text-[#e63946] transition-colors"
                >
                  Service client
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('invoices')}
                  className="text-sm text-gray-600 hover:text-[#e63946] transition-colors"
                >
                  Mes commandes
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Informations légales</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-sm text-gray-600 hover:text-[#e63946] transition-colors flex items-center gap-2">
                  <FileText className="h-3 w-3" />
                  Conditions générales
                </button>
              </li>
              <li>
                <button className="text-sm text-gray-600 hover:text-[#e63946] transition-colors flex items-center gap-2">
                  <Shield className="h-3 w-3" />
                  Politique de confidentialité
                </button>
              </li>
              <li>
                <button className="text-sm text-gray-600 hover:text-[#e63946] transition-colors">
                  Mentions légales
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600 flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#e63946]" />
                Support 24/7
              </li>
              <li className="text-sm text-gray-600 flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#e63946]" />
                contact@alaide.fr
              </li>
              <li className="text-sm text-gray-600 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#e63946]" />
                Paris, France
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              © 2026 À l'aide. Tous droits réservés.
            </p>
            <p className="text-sm text-gray-600">
              Commission plateforme : 18% sur tous les services
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
