import React from 'react';
import { useTranslation } from 'react-i18next';
import { card, input, btnPrimary } from './styles';

interface AuthCardProps {
  authMode: 'login' | 'register';
  authEmail: string;
  authPassword: string;
  authName: string;
  authError: string;
  authLoading: boolean;
  onAuthModeChange: (mode: 'login' | 'register') => void;
  onAuthEmailChange: (value: string) => void;
  onAuthPasswordChange: (value: string) => void;
  onAuthNameChange: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}

export default function AuthCard({
  authMode,
  authEmail,
  authPassword,
  authName,
  authError,
  authLoading,
  onAuthModeChange,
  onAuthEmailChange,
  onAuthPasswordChange,
  onAuthNameChange,
  onSubmit,
}: AuthCardProps) {
  const { t } = useTranslation();

  return (
    <main className="min-h-[calc(100vh-130px)] px-5 md:px-12 py-16 font-deledda text-brown flex items-center justify-center">
      <div className={card}>
        <h1 className="text-2xl sm:text-3xl font-bold font-roca mb-6 text-center">{t('contribute.title')}</h1>
        <p className="text-center text-brown/50 mb-6">{t('contribute.description.no_auth')}</p>
        <div className="flex rounded-lg overflow-hidden border border-brown/20 mb-6">
          {(['login', 'register'] as const).map(mode => (
            <button
              key={mode}
              type="button"
              className={`flex-1 py-2 text-sm font-bold transition-colors cursor-pointer ${authMode === mode ? 'bg-brown text-orange-150' : 'text-brown hover:bg-brown/10'}`}
              onClick={() => onAuthModeChange(mode)}
            >
              {t(`contribute.${mode}`)}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">{t('contribute.email')}</label>
            <input type="email" required className={input} value={authEmail} onChange={event => onAuthEmailChange(event.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">{t('contribute.password')}</label>
            <input type="password" required minLength={8} className={input} value={authPassword} onChange={event => onAuthPasswordChange(event.target.value)} />
          </div>
          {authMode === 'register' && (
            <div>
              <label className="block text-sm font-bold mb-1">
                {t('contribute.name')} <span className="font-normal text-brown/50">({t('contribute.optional')})</span>
              </label>
              <input type="text" className={input} value={authName} onChange={event => onAuthNameChange(event.target.value)} />
            </div>
          )}
          {authError && <p className="text-red-600 text-sm">{authError}</p>}
          <button type="submit" className={`${btnPrimary} w-full`} disabled={authLoading}>
            {authLoading ? t('contribute.loading') : t(`contribute.submit_${authMode}`)}
          </button>
        </form>
      </div>
    </main>
  );
}