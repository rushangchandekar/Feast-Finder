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
        <title>Feast Finder</title>
        <meta
          name="description"
          content="Generate delicious recipes from what's in your fridge!"
        />
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" 
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist&family=Geist+Mono&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className="antialiased bg-background text-foreground min-h-screen w-full overflow-x-hidden">
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