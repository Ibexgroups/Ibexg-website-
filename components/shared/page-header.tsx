interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export function PageHeader({
  title,
  subtitle,
  backgroundImage = "https://images.unsplash.com/photo-1574263867129-91466a5fef45?w=1920&q=80",
}: PageHeaderProps) {
  return (
    <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-navy">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-navy/80" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/60"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
