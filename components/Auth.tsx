import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { ReCaptcha } from './ReCaptcha';
import { SecurityFooter } from './SecurityBadge';
import { useAuth } from '../src/contexts/AuthContext';
import { toast } from 'sonner';

interface AuthProps {
  onBack: () => void;
  onSuccess?: () => void;
}

export function Auth({ onBack, onSuccess }: AuthProps) {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      toast.error('Veuillez vérifier que vous êtes humain en cochant le reCAPTCHA');
      return;
    }
    
    if (isSignUp && !acceptTerms) {
      toast.error('Veuillez accepter les Conditions d\'utilisation et la Politique de confidentialité');
      return;
    }

    setIsLoading(true);
    
    try {
      if (isSignUp) {
        await signUp(email, password, name);
        toast.success('Compte créé avec succès ! Vérifiez votre email pour confirmer votre compte.');
      } else {
        await signIn(email, password);
        toast.success('Connexion réussie !');
      }
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-md">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          ← Back
        </Button>

        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-slate-600">
              {isSignUp 
                ? 'Sign up to access all services' 
                : 'Sign in to your account'
              }
            </p>
          </div>

          {/* Social Auth - DESCOPED TO PHASE 2 */}
          {/* Google/Apple OAuth will be configured in Phase 2 after MVP validation */}

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm text-slate-600 leading-tight">
                  I accept the{' '}
                  <button type="button" className="text-[#fda4af] hover:underline">
                    Terms of Use
                  </button>
                  {' '}and{' '}
                  <button type="button" className="text-[#fda4af] hover:underline">
                    Privacy Policy
                  </button>
                </label>
              </div>
            )}

            {!isSignUp && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-[#fda4af] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* reCAPTCHA */}
            <ReCaptcha
              onVerify={handleCaptchaVerify}
              onExpire={handleCaptchaExpire}
              size="normal"
              theme="light"
            />

            <Button
              type="submit"
              className="w-full h-12 bg-[#e63946] hover:bg-[#c62e3a] text-white"
              disabled={isLoading}
            >
              {isSignUp ? 'Créer mon compte' : 'Se connecter'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#fda4af] hover:underline font-medium"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </Card>
        <SecurityFooter />
      </div>
    </div>
  );
}
