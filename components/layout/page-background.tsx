/**
 * Soft ivory atmosphere with warm charcoal + gold light.
 */
export function PageBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ivory"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(20, 24, 32, 0.05) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(212, 175, 55, 0.07) 0%, transparent 45%)",
        }}
      />
    </div>
  );
}
