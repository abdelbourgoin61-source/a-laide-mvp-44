import { Shield, Lock, CheckCircle } from 'lucide-react';

export function SecurityBadge() {
  return (
    <div className="flex items-center justify-center gap-6 py-8 bg-gradient-to-r from-slate-50 to-slate-100 border-y border-slate-200">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-green-600" />
        <span className="text-sm font-medium text-slate-700">
          Protégé par reCAPTCHA
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <Lock className="h-5 w-5 text-green-600" />
        <span className="text-sm font-medium text-slate-700">
          Connexion sécurisée SSL
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <span className="text-sm font-medium text-slate-700">
          Données protégées
        </span>
      </div>
    </div>
  );
}

interface SecurityFooterProps {
  compact?: boolean;
}

export function SecurityFooter({ compact = false }: SecurityFooterProps) {
  if (compact) {
    return (
      <div className="text-center py-3 text-xs text-slate-500">
        Ce site est protégé par reCAPTCHA. Les{' '}
        <a 
          href="https://policies.google.com/privacy" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#e63946] hover:underline"
        >
          Règles de confidentialité
        </a>
        {' '}et les{' '}
        <a 
          href="https://policies.google.com/terms" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#e63946] hover:underline"
        >
          Conditions d'utilisation
        </a>
        {' '}de Google s'appliquent.
      </div>
    );
  }
  
  return (
    <div className="border-t border-slate-200 bg-slate-50 py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Site sécurisé et protégé
              </p>
              <p className="text-xs text-slate-600">
                Vos données sont chiffrées et protégées
              </p>
            </div>
          </div>
          
          <div className="text-center md:text-right text-xs text-slate-500">
            Ce site est protégé par reCAPTCHA.
            <br />
            Les{' '}
            <a 
              href="https://policies.google.com/privacy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#e63946] hover:underline"
            >
              Règles de confidentialité
            </a>
            {' '}et{' '}
            <a 
              href="https://policies.google.com/terms" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#e63946] hover:underline"
            >
              Conditions d'utilisation
            </a>
            {' '}de Google s'appliquent.
          </div>
        </div>
      </div>
    </div>
  );
}
