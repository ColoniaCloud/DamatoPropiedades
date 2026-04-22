import type { Metadata } from "next";
import { ShieldCheck, Target, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros | D'Amato Propiedades",
  description:
    "Más de 35 años de experiencia en construcción e intermediación inmobiliaria en Villa Devoto, CABA y General San Martín. Conocé nuestra misión, visión y valores.",
};

const VALUES = ["Compromiso", "Integridad", "Profesionalismo"];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/hero-nosotros.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="absolute inset-0 bg-[#0c1b2e]/60" />
        <div className="relative z-10 text-center px-4">
          <span className="text-[#00b4d8] text-sm font-semibold uppercase tracking-widest">
            Quiénes somos
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
            D&apos;Amato Propiedades
          </h1>
          <p className="text-white/70 mt-3 max-w-xl mx-auto leading-relaxed">
            Más de 35 años de experiencia en el rubro de la construcción y la
            intermediación en la compra y venta de propiedades.
          </p>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      </div>


{/* Description */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none text-[#5a5a6e] leading-relaxed">
          <p className="text-lg text-[#1a1a2e] leading-relaxed">
            Con más de 35 años de experiencia en el rubro de la construcción y
            la intermediación en la compra y venta de propiedades en el barrio
            de <strong className="text-[#1a5fb4]">Villa Devoto, Capital Federal</strong> y
            en la localidad de{" "}
            <strong className="text-[#1a5fb4]">General San Martín</strong>, le
            ofrecemos nuestros servicios de tasaciones, venta, informes y
            asesoramiento sobre inversiones en desarrollos inmobiliarios.
          </p>
        </div>

        {/* Mission / Vision / Values */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Misión */}
          <div className="bg-white rounded-2xl border border-[#e2e4e8] p-8 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#1a5fb4]/10 flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-[#1a5fb4]" />
            </div>
            <h2 className="font-display text-xl font-bold text-[#1a1a2e] mb-3">
              Misión
            </h2>
            <p className="text-sm text-[#5a5a6e] leading-relaxed">
              Brindar un servicio profesional y responsable de intermediación en
              la compra, venta y alquiler de inmuebles, buscando satisfacer al
              cliente atendiendo, comprendiendo y trabajando sobre sus
              necesidades inmobiliarias específicas, y aportando valor a los
              inversores en bienes raíces.
            </p>
          </div>

          {/* Visión */}
          <div className="bg-white rounded-2xl border border-[#e2e4e8] p-8 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#1a5fb4]/10 flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-[#1a5fb4]" />
            </div>
            <h2 className="font-display text-xl font-bold text-[#1a1a2e] mb-3">
              Visión
            </h2>
            <p className="text-sm text-[#5a5a6e] leading-relaxed">
              Ser una empresa líder en servicios inmobiliarios, referente
              absoluto de profesionalismo y atención personalizada.
            </p>
          </div>

          {/* Valores */}
          <div className="bg-white rounded-2xl border border-[#e2e4e8] p-8 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#1a5fb4]/10 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6 text-[#1a5fb4]" />
            </div>
            <h2 className="font-display text-xl font-bold text-[#1a1a2e] mb-3">
              Valores
            </h2>
            <ul className="space-y-2">
              {VALUES.map((v) => (
                <li key={v} className="flex items-center gap-3 text-sm text-[#5a5a6e]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b4d8] flex-shrink-0" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
