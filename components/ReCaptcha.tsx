import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

interface ReCaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  size?: 'normal' | 'compact' | 'invisible';
  theme?: 'light' | 'dark';
}

export function ReCaptcha({ 
  onVerify, 
  onExpire, 
  onError,
  size = 'normal',
  theme = 'light'
}: ReCaptchaProps) {
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  
  // Clé de site publique reCAPTCHA (à remplacer par votre propre clé)
  const SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Clé de test Google

  useEffect(() => {
    // Charger le script reCAPTCHA
    const loadRecaptcha = () => {
      if (!document.querySelector('script[src*="recaptcha"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    };

    window.onRecaptchaLoad = () => {
      if (captchaRef.current && window.grecaptcha) {
        widgetIdRef.current = window.grecaptcha.render(captchaRef.current, {
          sitekey: SITE_KEY,
          callback: onVerify,
          'expired-callback': onExpire || (() => {}),
          'error-callback': onError || (() => {}),
          size: size,
          theme: theme
        });
      }
    };

    loadRecaptcha();

    // Si grecaptcha est déjà chargé
    if (window.grecaptcha && window.grecaptcha.render) {
      window.onRecaptchaLoad();
    }

    return () => {
      // Nettoyer le widget lors du démontage
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    };
  }, [onVerify, onExpire, onError, size, theme]);

  return (
    <div className="flex justify-center my-4">
      <div ref={captchaRef} />
    </div>
  );
}

// Hook personnalisé pour reCAPTCHA v3 (invisible)
export function useReCaptchaV3(action: string = 'submit') {
  const SITE_KEY_V3 = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Clé de test Google v3

  useEffect(() => {
    if (!document.querySelector('script[src*="recaptcha/api.js?render="]')) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY_V3}`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const executeRecaptcha = async (): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!window.grecaptcha || !window.grecaptcha.execute) {
        console.error('reCAPTCHA non chargé');
        resolve(null);
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(SITE_KEY_V3, { action }).then((token: string) => {
          resolve(token);
        });
      });
    });
  };

  return { executeRecaptcha };
}
