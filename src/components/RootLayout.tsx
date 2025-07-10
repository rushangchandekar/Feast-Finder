import { Helmet } from 'react-helmet-async';
import './globals.css';
import { Toaster } from '../components/ui/toaster';
import { ThemeProvider } from '../components/theme-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Helmet>
        <title>Fridge Feast</title>
        <meta
          name="description"
          content="Generate delicious recipes from what's in your fridge!"
        />
        {/* Load Google Fonts directly */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist&family=Geist+Mono&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className="antialiased bg-background text-foreground min-h-full">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </div>
    </>
  );
}
