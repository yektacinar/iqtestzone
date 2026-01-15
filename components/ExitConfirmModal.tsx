'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from '@/lib/use-translations';
import { type Locale } from '@/lib/i18n';

interface ExitConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  locale: Locale;
}

export default function ExitConfirmModal({ isOpen, onClose, onConfirm, locale }: ExitConfirmModalProps) {
  const t = useTranslations(locale);
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

  if (!isOpen) return null;

  // Use translations if available, otherwise use fallback English text
  const headerText = t?.header?.exitConfirmTitle || 'Leave the test?';
  const continueText = t?.header?.continueTest || 'Continue test';
  const leaveText = t?.header?.leave || 'Leave';
  const bodyText = t?.header?.exitConfirmMessage || 'Your test is still in progress. Are you sure you want to leave?';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-confirm-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="exit-confirm-title" className="text-lg font-semibold text-gray-900 mb-4">
          {headerText}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {bodyText}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            ref={firstButtonRef}
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
          >
            {continueText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
          >
            {leaveText}
          </button>
        </div>
      </div>
    </div>
  );
}
