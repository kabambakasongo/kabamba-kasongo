/**
 * Fond global : halos de degrade, trame de points et ligne de grade.
 * purement decoratif, masque aux lecteurs d'ecran.
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-canvas absolute inset-0" />

      <div className="grid-backdrop animate-grid-pan mask-fade-b absolute inset-0 opacity-40" />

      <div className="animate-halo bg-brand/18 absolute -top-40 -left-32 size-[38rem] rounded-full blur-[120px] motion-reduce:animate-none" />
      <div
        className="animate-halo bg-accent/12 absolute top-1/3 -right-40 size-[34rem] rounded-full blur-[130px] motion-reduce:animate-none"
        style={{ animationDelay: '1.6s' }}
      />
      <div
        className="animate-float bg-brand/10 absolute bottom-0 left-1/3 size-[28rem] rounded-full blur-[120px] motion-reduce:animate-none"
        style={{ animationDelay: '0.8s' }}
      />

      <div className="via-brand/40 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
    </div>
  );
}
