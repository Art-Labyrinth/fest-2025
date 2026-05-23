import React from 'react';
import { useTranslation } from 'react-i18next';
import { card, input, btnPrimary, btnSecondary } from './styles';

interface PasswordResetCardProps {
  mode: 'request' | 'confirm';
  email: string;
  requestLoading: boolean;
  requestError: string;
  requestSuccess: string;
  onEmailChange: (value: string) => void;
  onRequestSubmit: (event: React.FormEvent) => void;
  tokenValidationLoading: boolean;
  tokenValid: boolean;
  tokenValidationError: string;
  newPassword: string;
  confirmPassword: string;
  confirmLoading: boolean;
  confirmError: string;
  confirmSuccess: string;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onConfirmSubmit: (event: React.FormEvent) => void;
  onBackToLogin: () => void;
}

export default function PasswordResetCard({
  mode,
  email,
  requestLoading,
  requestError,
  requestSuccess,
  onEmailChange,
  onRequestSubmit,
  tokenValidationLoading,
  tokenValid,
  tokenValidationError,
  newPassword,
  confirmPassword,
  confirmLoading,
  confirmError,
  confirmSuccess,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onConfirmSubmit,
  onBackToLogin,
}: PasswordResetCardProps) {
  const { t } = useTranslation();

  return (
    <main className="min-h-[calc(100vh-130px)] px-5 md:px-12 py-16 font-deledda text-brown flex items-center justify-center">
      <div className={card}>
        <h1 className="text-2xl sm:text-3xl font-bold font-roca mb-6 text-center">{t('contribute.reset_password_title')}</h1>

        {mode === 'request' ? (
          <>
            <p className="text-center text-brown/50 mb-6">{t('contribute.reset_password_request_description')}</p>
            <form onSubmit={onRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">{t('contribute.email')}</label>
                <input
                  type="email"
                  required
                  className={input}
                  value={email}
                  onChange={event => onEmailChange(event.target.value)}
                />
              </div>

              {requestError && <p className="text-red-600 text-sm">{requestError}</p>}
              {requestSuccess && <p className="text-green-700 text-sm">{requestSuccess}</p>}

              <button type="submit" className={`${btnPrimary} w-full`} disabled={requestLoading}>
                {requestLoading ? t('contribute.loading') : t('contribute.reset_password_send_link')}
              </button>
              <button type="button" className={`${btnSecondary} w-full`} onClick={onBackToLogin}>
                {t('contribute.back_to_login')}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-center text-brown/50 mb-6">{t('contribute.reset_password_confirm_description')}</p>

            {tokenValidationLoading && <p className="text-center text-brown/50 mb-4">{t('contribute.loading')}</p>}

            {!tokenValidationLoading && tokenValidationError && (
              <>
                <p className="text-red-600 text-sm mb-4">{tokenValidationError}</p>
                <button type="button" className={`${btnSecondary} w-full`} onClick={onBackToLogin}>
                  {t('contribute.back_to_login')}
                </button>
              </>
            )}

            {!tokenValidationLoading && !tokenValidationError && !tokenValid && (
              <>
                <p className="text-red-600 text-sm mb-4">{t('contribute.reset_password_token_invalid')}</p>
                <button type="button" className={`${btnSecondary} w-full`} onClick={onBackToLogin}>
                  {t('contribute.back_to_login')}
                </button>
              </>
            )}

            {!tokenValidationLoading && tokenValid && (
              <form onSubmit={onConfirmSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">{t('contribute.new_password')}</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    className={input}
                    value={newPassword}
                    onChange={event => onNewPasswordChange(event.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">{t('contribute.repeat_password')}</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    className={input}
                    value={confirmPassword}
                    onChange={event => onConfirmPasswordChange(event.target.value)}
                  />
                </div>

                {confirmError && <p className="text-red-600 text-sm">{confirmError}</p>}
                {confirmSuccess && <p className="text-green-700 text-sm">{confirmSuccess}</p>}

                <button type="submit" className={`${btnPrimary} w-full`} disabled={confirmLoading || Boolean(confirmSuccess)}>
                  {confirmLoading ? t('contribute.loading') : t('contribute.reset_password_confirm_button')}
                </button>
                <button type="button" className={`${btnSecondary} w-full`} onClick={onBackToLogin}>
                  {t('contribute.back_to_login')}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </main>
  );
}
