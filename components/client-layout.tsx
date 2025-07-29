"use client";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { UserProvider } from "@/context/user-context";
import { GlobalUserGate } from "@/app/global-user-gate";
import { I18nProvider } from "@/i18n/provider";

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <I18nProvider>
        <UserProvider>
          <GlobalUserGate>{children}</GlobalUserGate>
        </UserProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}