import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import messages from './messages/es.json';

export function I18nProvider({ children }: { children: ReactNode }) {
  // Puedes parametrizar el locale en el futuro si lo necesitas
  return (
    <NextIntlClientProvider messages={messages} locale="es">
      {children}
    </NextIntlClientProvider>
  );
}
