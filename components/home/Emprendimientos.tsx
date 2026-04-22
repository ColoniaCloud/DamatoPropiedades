import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Development } from "@/lib/types";
import DevelopmentCard from "@/components/development/DevelopmentCard";

interface Props {
  developments: Development[];
}

export default function Emprendimientos({ developments }: Props) {
  if (!developments.length) return null;

  return (
    <section className="py-14 lg:py-20 bg-[#0c1b2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 lg:mb-12">
          <div>
            <span className="text-[#00b4d8] text-sm font-semibold uppercase tracking-widest">
              Proyectos en obra
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
              Emprendimientos
            </h2>
            <p className="text-white/60 mt-2 text-sm max-w-md">
              Invertí desde el pozo en nuestros desarrollos exclusivos en Villa Devoto y alrededores.
            </p>
          </div>
          <Link
            href="/emprendimientos"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-white/70 hover:text-[#00b4d8] transition-colors flex-shrink-0"
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developments.map((dev, i) => (
            <DevelopmentCard key={dev.id} development={dev} priority={i === 0} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/emprendimientos"
            className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
          >
            Ver todos los emprendimientos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
