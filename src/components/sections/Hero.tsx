import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, Download, Github, MapPin, Sparkles } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Marquee } from '@/components/ui/Marquee';
import { Monogram } from '@/components/ui/Monogram';
import { useRotatingWord } from '@/hooks/useRotatingWord';
import { profile, hasCv } from '@/config/profile';
import { coreTechnologies } from '@/data/skills';

const rotatingWords = ['des applications web', 'des plateformes SaaS', 'des solutions métier'];

const codeLines: { tokens: { text: string; color: string }[] }[] = [
  {
    tokens: [
      { text: 'class', color: 'text-brand' },
      { text: ' ', color: '' },
      { text: 'FullStackEngineer', color: 'text-accent' },
      { text: ':', color: '' },
    ],
  },
  {
    tokens: [
      { text: '  stack', color: 'text-ink-muted' },
      { text: ' = [', color: '' },
    ],
  },
  {
    tokens: [
      { text: "    'React'", color: 'text-emerald-400' },
      { text: ',', color: '' },
    ],
  },
  {
    tokens: [
      { text: "    'TypeScript'", color: 'text-emerald-400' },
      { text: ',', color: '' },
    ],
  },
  {
    tokens: [
      { text: "    'Django'", color: 'text-emerald-400' },
      { text: ',', color: '' },
    ],
  },
  {
    tokens: [
      { text: "    'PostgreSQL'", color: 'text-emerald-400' },
      { text: ',', color: '' },
    ],
  },
  {
    tokens: [
      { text: "    'PyQt6'", color: 'text-emerald-400' },
      { text: ',', color: '' },
    ],
  },
  {
    tokens: [
      { text: "    'Docker'", color: 'text-emerald-400' },
      { text: ',', color: '' },
    ],
  },
  { tokens: [{ text: '  ]', color: '' }] },
  {
    tokens: [
      { text: '  build', color: 'text-brand' },
      { text: '(', color: '' },
      { text: 'target', color: 'text-ink-muted' },
      { text: ':', color: '' },
      { text: "'production'", color: 'text-emerald-400' },
      { text: ')', color: '' },
    ],
  },
];

export function Hero() {
  const { word, reducedMotion } = useRotatingWord(rotatingWords);
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* Colonne texte */}
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="border-line bg-surface/60 text-ink-muted inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs backdrop-blur"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {profile.availability}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-ink mt-6 text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="font-display block">{profile.firstName}</span>
              <span className="text-gradient font-display block">{profile.lastName}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2"
            >
              <span className="font-display text-ink text-lg font-semibold sm:text-2xl">
                {profile.roleFr}
              </span>
              <span aria-hidden className="text-ink-subtle">
                ·
              </span>
              <span className="text-brand relative flex h-7 items-center font-mono text-sm sm:text-base">
                <span className="sr-only">Je conçois et développe des applications web</span>
                <motion.span
                  key={word}
                  aria-hidden
                  initial={reducedMotion ? false : { y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="block overflow-hidden"
                >
                  {word}
                </motion.span>
                <span
                  aria-hidden
                  className="animate-blink bg-brand ml-0.5 inline-block h-4 w-0.5 motion-reduce:animate-none"
                />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-ink-muted mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
            >
              {profile.heroIntro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <ButtonLink
                href="#projets"
                size="lg"
                iconEnd={<ArrowDownRight aria-hidden className="size-4" />}
              >
                Voir mes projets
              </ButtonLink>

              <ButtonLink
                href="#contact"
                size="lg"
                variant="secondary"
                iconEnd={<ArrowRight aria-hidden className="size-4" />}
              >
                Me contacter
              </ButtonLink>

              {hasCv && (
                <ButtonLink
                  href={profile.cvUrl}
                  size="lg"
                  variant="outline"
                  iconStart={<Download aria-hidden className="size-4" />}
                >
                  Télécharger mon CV
                </ButtonLink>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="text-ink-subtle mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
            >
              <span className="inline-flex items-center gap-2">
                <MapPin aria-hidden className="text-brand size-4" />
                Based in {profile.locationShort} {profile.countryCode}
              </span>
              <span className="inline-flex items-center gap-2">
                <Github aria-hidden className="size-4" />
                Open source friendly
              </span>
            </motion.p>
          </div>

          {/* Colonne visuelle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative">
              {/* Halo derriere le portrait */}
              <div
                aria-hidden
                className="animate-halo from-brand/25 to-accent/20 absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br via-transparent blur-2xl motion-reduce:animate-none"
              />

              {/* Portrait */}
              <div className="border-line bg-surface relative overflow-hidden rounded-[2rem] border shadow-2xl shadow-black/20">
                <div className="grid-backdrop absolute inset-0 opacity-30" />
                {photoFailed ? (
                  <div className="grid aspect-square place-items-center">
                    <Monogram size="lg" className="size-32 text-4xl" />
                  </div>
                ) : (
                  <img
                    src={profile.photo}
                    alt={`Portrait de ${profile.name}, ${profile.roleFr}`}
                    width={800}
                    height={800}
                    loading="eager"
                    decoding="async"
                    onError={() => setPhotoFailed(true)}
                    className="aspect-square w-full object-cover"
                  />
                )}
                <div
                  aria-hidden
                  className="from-canvas/85 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                />
                <div className="absolute bottom-0 left-0 flex w-full items-end justify-between gap-3 p-5">
                  <div>
                    <p className="text-brand font-mono text-[0.65rem] tracking-[0.22em] uppercase">
                      Full-Stack
                    </p>
                    <p className="font-display text-ink text-lg font-semibold">Kolwezi, RDC</p>
                  </div>
                  <span className="border-line bg-surface/80 text-brand grid size-9 place-items-center rounded-full border">
                    <Sparkles aria-hidden className="size-4" />
                  </span>
                </div>
              </div>

              {/* Panneau "code" flottant */}
              <div
                aria-hidden
                className="glass-strong animate-float border-line absolute -bottom-8 -left-4 hidden w-64 rounded-2xl border p-4 shadow-xl shadow-black/20 sm:block lg:-left-10"
              >
                <div className="mb-3 flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-rose-400/80" />
                  <span className="size-2.5 rounded-full bg-amber-400/80" />
                  <span className="size-2.5 rounded-full bg-emerald-400/80" />
                  <span className="text-ink-subtle ml-2 font-mono text-[0.6rem]">stack.ts</span>
                </div>
                <pre className="overflow-hidden font-mono text-[0.7rem] leading-relaxed">
                  {codeLines.map((line, index) => (
                    <span key={index} className="block">
                      {line.tokens.map((token, tokenIndex) => (
                        <span key={tokenIndex} className={token.color}>
                          {token.text}
                        </span>
                      ))}
                    </span>
                  ))}
                </pre>
              </div>

              {/* Badge flotant */}
              <div className="glass-strong border-line absolute -top-4 -right-2 hidden items-center gap-2 rounded-full border px-4 py-2 shadow-lg shadow-black/10 sm:flex lg:-right-6">
                <span className="bg-brand size-2 rounded-full" />
                <span className="text-ink-muted font-mono text-xs">React · Django · Qt</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bandeau de technologies */}
        <div className="mt-16 lg:mt-24">
          <p className="text-ink-subtle mb-4 font-mono text-[0.65rem] tracking-[0.24em] uppercase">
            Stack technique
          </p>
          <Marquee items={coreTechnologies} duration={44} />
        </div>
      </div>
    </section>
  );
}
