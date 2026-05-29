import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { getDevelopments } from "@/lib/tokko";
import DevelopmentCard from "@/components/development/DevelopmentCard";

export const metadata: Metadata = {
  title: "Emprendimientos en pozo",
  description:
    "Conocé los emprendimientos en construcción de D'Amato Propiedades " +
    "en Villa Devoto. Unidades desde el pozo con entrega programada.",
};

export const revalidate = 300;

export default async function EmprendimientosPage() {
  let developments = await getDevelopments().catch(() => []);
  developments = developments.filter((d) => d.display_on_web);

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="bg-[#0c1b2e] pt-28 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#00b4d8] text-sm font-semibold uppercase tracking-widest">
            Proyectos en obra
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
            Emprendimientos
          </h1>
          <p className="text-white/60 mt-2 text-sm">
            {developments.length > 0
              ? `${developments.length} proyecto${developments.length !== 1 ? "s" : ""} en desarrollo`
              : "Próximamente nuevos proyectos"}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {developments.length === 0 ? (
          <div className="text-center py-20">
            <Building2 className="w-12 h-12 text-[#c0c4cc] mx-auto mb-4" />
            <p className="text-[#5a5a6e]">No hay emprendimientos disponibles en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developments.map((dev, i) => (
              <DevelopmentCard key={dev.id} development={dev} priority={i < 2} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
