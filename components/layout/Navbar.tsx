import { useState } from 'react';
import { Menu, X, User, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '../ui/sheet';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[var(--color-primary)]">
              À l'aide
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={() => handleNavigate('dashboard')}
              variant="ghost"
              className="text-base hover:text-[var(--color-primary)]"
            >
              Mes interventions
            </Button>
            <Button
              onClick={() => handleNavigate('auth')}
              variant="ghost"
              className="text-base hover:text-[var(--color-primary)]"
            >
              Devenir Prestataire
            </Button>
            <Button
              onClick={() => handleNavigate('auth')}
              variant="ghost"
              className="text-base gap-2"
            >
              <User className="h-5 w-5" />
              Connexion
            </Button>
            <Button
              onClick={() => handleNavigate('services')}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white gap-2 h-11 px-6"
            >
              <AlertCircle className="h-5 w-5" />
              Urgence
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 mt-8">
                {/* Logo in Mobile Menu */}
                <div className="flex items-center gap-2 pb-4 border-b">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-[var(--color-primary)]">
                    À l'aide
                  </span>
                </div>

                {/* Mobile Menu Items */}
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => handleNavigate('services')}
                    className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white h-14 text-lg gap-2"
                  >
                    <AlertCircle className="h-6 w-6" />
                    Urgence
                  </Button>
                  
                  <Button
                    onClick={() => handleNavigate('dashboard')}
                    variant="outline"
                    className="w-full h-12"
                  >
                    Mes interventions
                  </Button>
                  
                  <Button
                    onClick={() => handleNavigate('auth')}
                    variant="outline"
                    className="w-full h-12 gap-2"
                  >
                    <User className="h-5 w-5" />
                    Connexion
                  </Button>

                  <Button
                    onClick={() => handleNavigate('auth')}
                    variant="ghost"
                    className="w-full h-12"
                  >
                    Devenir Prestataire
                  </Button>
                </div>

                {/* Footer Info */}
                <div className="mt-auto pt-6 border-t text-sm text-gray-600">
                  <p className="mb-2">Besoin d'aide ?</p>
                  <Button
                    onClick={() => handleNavigate('support')}
                    variant="link"
                    className="h-auto p-0 text-[var(--color-primary)]"
                  >
                    Service Client 24/7
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
