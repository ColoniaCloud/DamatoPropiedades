"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface ContactFormProps {
  propertyId?: number;
  propertyRef?: string;
  propertyAddress?: string;
  initialMessage?: string;
}

export default function ContactForm({
  propertyId,
  propertyRef,
  propertyAddress,
  initialMessage,
}: ContactFormProps) {
  const defaultMessage = initialMessage
    ?? (propertyRef && propertyAddress
      ? `Hola, me interesa la propiedad ${propertyRef} en ${propertyAddress}. ¿Podrían darme más información?`
      : "Hola, me gustaría recibir información sobre sus propiedades.");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: defaultMessage,
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ...(propertyId ? { properties: [propertyId] } : {}),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Error al enviar el mensaje.");
      } else {
        setSent(true);
        toast.success("¡Mensaje enviado! Te contactaremos pronto.");
      }
    } catch {
      toast.error("Error al enviar el mensaje. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-6 h-6 text-[#10b981]" />
        </div>
        <h3 className="font-semibold text-[#1a1a2e] text-lg mb-2">
          ¡Mensaje enviado!
        </h3>
        <p className="text-[#5a5a6e] text-sm">
          Te contactaremos a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#1a1a2e] mb-1">
          Nombre *
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Tu nombre"
          className="w-full border border-[#e2e4e8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fb4] min-h-[44px]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1a1a2e] mb-1">
          Email *
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="tu@email.com"
          className="w-full border border-[#e2e4e8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fb4] min-h-[44px]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1a1a2e] mb-1">
          Teléfono *
        </label>
        <input
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="11 5555-0000"
          className="w-full border border-[#e2e4e8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fb4] min-h-[44px]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1a1a2e] mb-1">
          Mensaje
        </label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={4}
          className="w-full border border-[#e2e4e8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5fb4] resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#1a5fb4] hover:bg-[#0e3d7a] disabled:opacity-60 text-white font-semibold py-3.5 rounded-lg text-sm transition-colors min-h-[44px] flex items-center justify-center gap-2"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            Enviar consulta
          </>
        )}
      </button>
    </form>
  );
}
