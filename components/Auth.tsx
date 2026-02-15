import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
// Separator removed - descoped Google/Apple OAuth to Phase 2
import { Checkbox } from './ui/checkbox';
import { ReCaptcha } from './ReCaptcha';
import { SecurityFooter } from './SecurityBadge';
import { useAuth } from '../src/contexts/AuthContext';
import { toast } from 'sonner@2.0.3';

interface AuthProps {
  onBack: () => void;
  onSuccess?: () => void;
}

export function Auth({ onBack, onSuccess }: AuthProps) {
  const { signIn, signUp } = useAuth(); // Removed signInWithGoogle, signInWithApple - descoped to Phase 2
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
    
    // TEMPORAIRE : reCAPTCHA désactivé pour tests MVP
    // TODO : Réactiver en production
    /*
    if (!captchaToken) {
      toast.error('Veuillez vérifier que vous êtes humain en cochant le reCAPTCHA');
      return;
    }
    */
    
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

  // OAuth handlers removed - descoped to Phase 2

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
          {/* 
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12"
              onClick={handleGoogleAuth}
              disabled={isLoading}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12"
              onClick={handleAppleAuth}
              disabled={isLoading}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Continue with Apple
            </Button>
          </div>

          <div className="relative mb-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-slate-500">
              or
            </span>
          </div>
          */}

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

            {/* reCAPTCHA - TEMPORAIREMENT CACHÉ POUR TESTS MVP */}
            {/* TODO : Réactiver en production */}
            {/*
            <ReCaptcha
              onVerify={handleCaptchaVerify}
              onExpire={handleCaptchaExpire}
              size="normal"
              theme="light"
            />
            */}

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
