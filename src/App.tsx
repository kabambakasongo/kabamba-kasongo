import { useEffect } from 'react';
import { Background } from '@/components/layout/Background';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Services } from '@/components/sections/Services';
import { Experience } from '@/components/sections/Experience';
import { Process } from '@/components/sections/Process';
import { GithubSection } from '@/components/sections/Github';
import { Contact } from '@/components/sections/Contact';
import { useTheme } from '@/hooks/useTheme';
import { seo } from '@/config/site';
import { applySeo } from '@/utils/seo';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    applySeo({
      title: seo.title,
      description: seo.description,
      path: '/',
      image: '/og-image.svg',
    });
  }, []);

  // Les donnees structurees JSON-LD sont injectees dans index.html au build
  // (une seule entite "Person" par page, avec l'URL publique reelle).

  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <a
        href="#contenu"
        className="glass-strong focus:text-ink sr-only rounded-lg focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
      >
        Aller au contenu principal
      </a>

      <Background />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main id="contenu" className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        <Process />
        <GithubSection />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
