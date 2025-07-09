// components/theme-provider.tsx
'use client';

import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
