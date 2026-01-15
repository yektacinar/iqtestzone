'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/use-translations';
import { type Locale } from '@/lib/i18n';

interface UpsellConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoHome: () => void;
  locale: Locale;
}

export default function UpsellConfirmModal({ isOpen, onClose, onGoHome, locale }: UpsellConfirmModalProps) {
  const t = useTranslations(locale);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and ESC key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleTab = (e: KeyboardEvent) => {
      if (!modalRef.current) return;
      
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);
    
    // Focus first button
    setTimeout(() => {
      firstButtonRef.current?.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
    };
  }, [isOpen, onClose]);

  const handleViewPremium = () => {
    onClose();
    // Navigate to result page (premium results)
    const resultPath = `/${locale}/result`;
    router.push(resultPath);
  };

  if (!isOpen || !t) return null;

  const titleText = t.header?.upsellTitle || 'Before you leave…';
  const messageText = t.header?.upsellMessage || 'Would you like to review your Premium insights and detailed report?';
  const viewPremiumText = t.header?.viewPremiumResults || 'View Premium results';
  const goHomeText = t.header?.goToHome || 'Go to home';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upsell-confirm-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="upsell-confirm-title" className="text-lg font-semibold text-gray-900 mb-4">
          {titleText}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {messageText}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onGoHome}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
          >
            {goHomeText}
          </button>
          <button
            ref={firstButtonRef}
            onClick={handleViewPremium}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
          >
            {viewPremiumText}
          </button>
        </div>
      </div>
    </div>
  );
}
