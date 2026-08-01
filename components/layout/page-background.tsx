/**
 * Subtle page atmosphere only — no watermark logo behind content.
 * Keeps the site clean and readable with solid white sections.
 */
export function PageBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#F8FAFC]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(11, 31, 58, 0.06) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(212, 175, 55, 0.05) 0%, transparent 45%)",
        }}
      />
    </div>
  );
}
