import { useState } from 'react';
import { Mail, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ReCaptcha } from './ReCaptcha';
import { SecurityFooter } from './SecurityBadge';

interface CustomerServiceProps {
  onBack: () => void;
}

const faqs = [
  {
    id: '1',
    question: 'Combien de temps faut-il pour obtenir de l\'aide ?',
    answer: 'La plupart des prestataires répondent en 15-30 minutes. Les services d\'urgence sont disponibles 24h/24 et 7j/7.'
  },
  {
    id: '2',
    question: 'Tous les prestataires sont-ils vérifiés ?',
    answer: 'Oui, tous les prestataires font l\'objet de vérifications approfondies des antécédents avant de rejoindre notre plateforme.'
  },
  {
    id: '3',
    question: 'Comment fonctionnent les prix ?',
    answer: 'Les prix sont fixés par chaque prestataire. Notre plateforme prend une commission de 18% sur toutes les transactions.'
  },
  {
    id: '4',
    question: 'Que se passe-t-il si je ne suis pas satisfait du service ?',
    answer: 'Contactez notre équipe de support dans les 24 heures. Nous travaillerons avec vous et le prestataire pour résoudre tout problème.'
  },
  {
    id: '5',
    question: 'Puis-je annuler une réservation ?',
    answer: 'Oui, mais les politiques d\'annulation varient selon les prestataires. Vérifiez les conditions du prestataire avant de réserver.'
  },
  {
    id: '6',
    question: 'Comment laisser un avis ?',
    answer: 'Après l\'achèvement du service, vous recevrez un e-mail vous invitant à noter et évaluer votre prestataire.'
  }
];

export function CustomerService({ onBack }: CustomerServiceProps) {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      alert('Veuillez vérifier que vous êtes humain en cochant le reCAPTCHA');
      return;
    }
    
    alert('Votre message a été envoyé ! Notre équipe de support vous répondra dans les 24 heures.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setCaptchaToken(null);
  };

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          ← Retour
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Service Client
          </h1>
          <p className="text-slate-600">
            Nous sommes là pour vous aider 24h/24 et 7j/7. Contactez-nous à tout moment.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <Card className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="h-12 w-12 rounded-full bg-[#fff5f0] flex items-center justify-center">
                <Mail className="h-6 w-6 text-[#e63946]" />
              </div>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Support par email</h3>
            <p className="text-sm text-slate-600 mb-3">Réponse sous 24h</p>
            <a href="mailto:support@help.com" className="text-[#e63946] font-medium hover:underline">
              support@help.fr
            </a>
          </Card>

          <Card className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="h-12 w-12 rounded-full bg-[#fff5f0] flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-[#e63946]" />
              </div>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Chat en direct</h3>
            <p className="text-sm text-slate-600 mb-3">Assistance immédiate</p>
            <button className="text-[#e63946] font-medium hover:underline">
              Démarrer le chat
            </button>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Questions Fréquemment Posées
          </h2>
          
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-medium text-slate-900 text-left">
                    {faq.question}
                  </span>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                    <p className="text-slate-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Contact Form */}
        <Card className="p-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Envoyez-nous un message
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Votre nom</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jean Dupont"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vous@exemple.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Sujet</Label>
              <Select 
                value={formData.subject}
                onValueChange={(value) => setFormData({ ...formData, subject: value })}
                required
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Sélectionnez un sujet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Demande générale</SelectItem>
                  <SelectItem value="provider">Problème avec un prestataire</SelectItem>
                  <SelectItem value="payment">Question sur le paiement</SelectItem>
                  <SelectItem value="technical">Support technique</SelectItem>
                  <SelectItem value="complaint">Réclamation</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Dites-nous comment nous pouvons vous aider..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="min-h-[150px]"
                required
              />
            </div>

            <ReCaptcha
              onVerify={handleCaptchaVerify}
              onExpire={handleCaptchaExpire}
            />

            <Button
              type="submit"
              className="w-full md:w-auto h-12 px-8 bg-[#fda4af] hover:bg-[#fb7185] text-white"
            >
              Envoyer le message
            </Button>
          </form>
        </Card>
      </div>
      <SecurityFooter />
    </div>
  );
}
