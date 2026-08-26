import * as React from "react";
import { cn } from "../../lib/utils";

export interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: {
    regular: string;
    gradient: string;
  };
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  bottomImage?: {
    light: string;
    dark: string;
  };
  gridOptions?: {
    angle?: number;
    cellSize?: number;
    opacity?: number;
    lightLineColor?: string;
    darkLineColor?: string;
  };
}

export const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.45,
  lightLineColor = "rgba(14, 165, 233, 0.2)",
  darkLineColor = "rgba(0, 229, 255, 0.15)",
}: {
  angle?: number;
  cellSize?: number;
  opacity?: number;
  lightLineColor?: string;
  darkLineColor?: string;
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px] inset-0",
        `opacity-[var(--opacity)]`,
      )}
      style={gridStyles}
      aria-hidden="true"
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-[#050507]" />
    </div>
  );
};

const ChevronRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title = "⚡ ATX 3.1 & PCIe 5.1 Verified",
      subtitle = {
        regular: "Precision PC Power & ",
        gradient: "Transient Sizing Engine",
      },
      description = "Simulate real-world continuous loads, sub-millisecond GPU transient power spikes, and lifecycle electricity costs with lab-grade precision.",
      ctaText = "Calculate PSU Sizing →",
      ctaHref = "/psu-calculator",
      secondaryCtaText = "Launch PC Builder",
      secondaryCtaHref = "/pc-builder",
      bottomImage,
      gridOptions,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative overflow-hidden", className)} ref={ref} {...props}>
        {/* Ambient Top Glow */}
        <div 
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-[0] h-[500px] w-screen max-w-7xl bg-cyan-500/5 dark:bg-cyan-500/10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,229,255,0.15),transparent_70%)]" 
          aria-hidden="true"
        />

        <section className="relative max-w-full mx-auto z-1">
          <RetroGrid {...gridOptions} />

          <div className="max-w-screen-xl z-10 mx-auto px-4 py-20 gap-12 md:px-8 text-center">
            <div className="space-y-6 max-w-3xl mx-auto text-center">
              {title && (
                <a
                  href="/guides/atx-3-1-vs-3-0-power-supply-guide"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-700 dark:text-cyan-400 group mx-auto px-4 py-1.5 bg-cyan-500/10 dark:bg-cyan-500/10 border border-cyan-500/20 rounded-full w-fit hover:border-cyan-500/40 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 outline-none"
                >
                  <span>{title}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: 'balance' }}>
                {subtitle.regular}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-300">
                  {subtitle.gradient}
                </span>
              </h1>

              <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed" style={{ textWrap: 'pretty' }}>
                {description}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a
                  href={ctaHref}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-sm bg-cyan-500 text-slate-950 hover:bg-cyan-400 active:scale-[0.98] shadow-lg shadow-cyan-500/25 transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
                >
                  {ctaText}
                </a>

                {secondaryCtaText && (
                  <a
                    href={secondaryCtaHref}
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                  >
                    {secondaryCtaText}
                  </a>
                )}
              </div>
            </div>

            {bottomImage && (
              <div className="mt-16 mx-auto max-w-5xl relative z-10">
                <img
                  src={bottomImage.light}
                  className="w-full shadow-2xl rounded-2xl border border-slate-200 dark:hidden"
                  alt="PSUCheck Power Analytics & Workbench"
                  width={1200}
                  height={675}
                  loading="eager"
                  fetchPriority="high"
                />
                <img
                  src={bottomImage.dark}
                  className="hidden w-full shadow-2xl rounded-2xl border border-slate-800 dark:block"
                  alt="PSUCheck Power Analytics & Workbench"
                  width={1200}
                  height={675}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            )}
          </div>
        </section>
      </div>
    );
  },
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
