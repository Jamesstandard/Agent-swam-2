'use client';

import React, { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { SettingsDrawerEnhanced } from './modals/settings-drawer-enhanced';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <SettingsDrawerEnhanced />
      <Toaster position="bottom-right" richColors />
    </>
  );
}
