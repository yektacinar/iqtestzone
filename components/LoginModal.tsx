'use client';

import { useState } from 'react';
import { useTranslations } from '@/lib/use-translations';
import { type Locale } from '@/lib/i18n';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  locale: Locale;
}

export default function LoginModal({ isOpen, onClose, onSuccess, locale }: LoginModalProps) {
  const t = useTranslations(locale);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: data.message || 'Magic link sent! Check your email.',
        });
        
        // In development, if token is returned, auto-verify
        if (data.token && process.env.NODE_ENV === 'development') {
          setTimeout(async () => {
            const verifyResponse = await fetch(`/api/auth/verify?token=${data.token}`);
            if (verifyResponse.ok) {
              onSuccess();
              onClose();
            }
          }, 500);
        }
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Failed to send magic link',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t.auth?.loginTitle || 'Sign In to Continue'}
        </h2>
        <p className="text-gray-600 mb-6">
          {t.auth?.loginDescription || 'Enter your email to receive a magic link. No password needed.'}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t.auth?.emailLabel || 'Email'}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder={t.auth?.emailPlaceholder || 'your@email.com'}
            />
          </div>

          {message && (
            <div
              className={`mb-4 p-3 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              {t.auth?.cancel || 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {loading
                ? t.auth?.sending || 'Sending...'
                : t.auth?.sendLink || 'Send Magic Link'}
            </button>
          </div>
        </form>

        {process.env.NODE_ENV === 'development' && (
          <p className="mt-4 text-xs text-gray-500 text-center">
            Development mode: Check console for magic link
          </p>
        )}
      </div>
    </div>
  );
}
