import { Menu, Plus, User, Bell, Search, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Input } from './ui/input';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onGoBack: () => void;
  canGoBack: boolean;
}

export function Header({ onNavigate, currentPage, onGoBack, canGoBack }: HeaderProps) {
  const menuItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'services', label: 'Toutes les annonces' },
    { id: 'invoices', label: 'Mes commandes' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Back Button & Logo */}
          <div className="flex items-center gap-3">
            {canGoBack && (
              <Button
                onClick={onGoBack}
                variant="ghost"
                size="sm"
                className="gap-2 text-gray-700 hover:text-[#e63946]"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Retour</span>
              </Button>
            )}
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#e63946]">
                <span className="text-xl font-bold text-white">A</span>
              </div>
              <span className="hidden sm:block text-2xl font-bold text-[#e63946]">À l'aide</span>
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Rechercher un service..."
                className="h-12 pl-4 pr-12 border-2 border-gray-200 focus:border-[#e63946] rounded-lg"
              />
              <Button 
                onClick={() => onNavigate('services')}
                size="sm"
                className="absolute right-1 top-1 h-10 bg-[#e63946] hover:bg-[#c62e3a]"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <Bell className="h-5 w-5" />
              <span className="hidden lg:inline">Notifications</span>
            </Button>
            <Button
              onClick={() => onNavigate('auth')}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <User className="h-5 w-5" />
              <span className="hidden lg:inline">Se connecter</span>
            </Button>
            <Button
              onClick={() => onNavigate('auth')}
              className="gap-2 bg-[#e63946] hover:bg-[#c62e3a] text-white"
            >
              <Plus className="h-5 w-5" />
              Déposer une annonce
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-4 mt-8">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`text-left py-3 text-base transition-colors hover:text-[#e63946] ${
                      currentPage === item.id ? 'text-[#e63946] font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  onClick={() => onNavigate('auth')}
                  variant="outline"
                  className="mt-4"
                >
                  <User className="h-4 w-4 mr-2" />
                  Se connecter
                </Button>
                <Button
                  onClick={() => onNavigate('auth')}
                  className="bg-[#e63946] hover:bg-[#c62e3a] text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Déposer une annonce
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Rechercher..."
              className="h-10 pl-4 pr-12 border-2 border-gray-200 focus:border-[#e63946] rounded-lg"
            />
            <Button 
              size="sm"
              className="absolute right-1 top-1 h-8 bg-[#e63946] hover:bg-[#c62e3a]"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
