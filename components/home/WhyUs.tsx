import { ShieldCheck, Users, Briefcase, Zap } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Experiencia comprobada",
    description:
      "Más de 35 años en construcción e intermediación inmobiliaria en Villa Devoto y General San Martín.",
  },
  {
    icon: Users,
    title: "Asesoramiento personalizado",
    description:
      "Cada cliente recibe atención dedicada y guía experta en cada paso del proceso.",
  },
  {
    icon: Briefcase,
    title: "Gestión integral",
    description:
      "Desde la búsqueda hasta la escritura, nos ocupamos de cada detalle legal y administrativo.",
  },
  {
    icon: Zap,
    title: "Tecnología al servicio",
    description:
      "Herramientas digitales para que encuentres tu propiedad ideal desde cualquier dispositivo.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-14 lg:py-20 bg-[#f4f7fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealGroup className="text-center mb-10 lg:mb-14">
          <RevealItem>
            <span className="text-[#1a5fb4] text-sm font-semibold uppercase tracking-widest">
              ¿Por qué elegirnos?
            </span>
          </RevealItem>
          <RevealItem>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a1a2e] mt-2">
              La diferencia D&apos;Amato
            </h2>
          </RevealItem>
        </RevealGroup>

        <RevealGroup stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <RevealItem key={title} y={20}>
              <div className="bg-white rounded-xl p-6 border border-[#e2e4e8] hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#1a5fb4]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#1a5fb4]" />
                </div>
                <h3 className="font-semibold text-[#1a1a2e] mb-2">{title}</h3>
                <p className="text-sm text-[#5a5a6e] leading-relaxed">{description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
