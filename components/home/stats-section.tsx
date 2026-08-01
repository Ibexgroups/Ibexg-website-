import { StatCounter } from "@/components/shared/stat-counter";
import { STATS } from "@/lib/constants";

export function StatsSection() {
  return (
    <section className="relative bg-navy py-16 md:py-20" aria-label="Company highlights">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          {STATS.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={stat.label}
              display={stat.display}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
