import type { Metadata } from 'next';
import '../globals.css';
import { getLocaleFromParams, getTranslations, type Locale } from '@/lib/i18n';
import LanguageSelect from '@/components/LanguageSelect';
import StandardHeader from '@/components/StandardHeader';
import QuizHeader from '@/components/QuizHeader';
import HeaderSelector from '@/components/HeaderSelector';
import Footer from '@/components/Footer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> | { locale: string } }): Promise<Metadata> {
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
  const locale = getLocaleFromParams(resolvedParams);
  const t = await getTranslations(locale);
  
  return {
    title: t.meta.title,
    description: t.meta.description,
    icons: {
      icon: '/icon.svg',
      shortcut: '/icon.svg',
      apple: '/icon.svg',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
  const locale = getLocaleFromParams(resolvedParams);

  return (
    <>
      {/* Header selector - conditionally renders StandardHeader or QuizHeader based on route */}
      <HeaderSelector locale={locale} />
      {/* Language Switcher - Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelect currentLocale={locale} />
      </div>
      {children}
      <Footer />
    </>
  );
}
