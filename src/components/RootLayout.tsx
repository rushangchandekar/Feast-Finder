import React from 'react';
import { Helmet } from 'react-helmet-async';
import "../globals.css";
import { Toaster } from './ui/toaster';
import { ThemeProvider } from './theme-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Helmet>
        <title>FeastFinder — Discover Delicious Recipes</title>
        <meta
          name="description"
          content="FeastFinder helps you discover, cook, and enjoy recipes from around the world. Try our AI-powered SmartChef to generate recipes from your ingredients."
        />
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" 
        />
      </Helmet>
      <div className="antialiased bg-background text-foreground min-h-screen w-full overflow-x-hidden" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        <ThemeProvider>
          <main className="w-full overflow-x-hidden">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </div>
    </>
  );
}