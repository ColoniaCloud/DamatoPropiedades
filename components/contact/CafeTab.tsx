"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, X, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function CafeTab() {
  const [tabVisible, setTabVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("Hola, me gustaría agendar una reunión");

  const firstInputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          tags: ["Agendá un café", "Web D'Amato"],
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setTimeout(() => {
        setOpen(false);
        setStatus("idle");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("Hola, me gustaría agendar una reunión");
      }, 2000);
    } catch {
      setStatus("error");
    }
  }

  if (!tabVisible) return null;

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Slide panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full z-50 w-full sm:w-[380px] bg-[#0c1b2e] flex flex-col shadow-2xl"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  ¿Hablamos?
                </h2>
                <p className="text-white/60 text-sm mt-0.5">
                  Dejanos tus datos y te contactamos
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
                  <CheckCircle className="w-14 h-14 text-[#00b4d8]" />
                  <p className="text-white font-semibold text-lg">¡Mensaje enviado!</p>
                  <p className="text-white/60 text-sm">Nos ponemos en contacto a la brevedad.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">
                      Nombre <span className="text-[#00b4d8]">*</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8] focus:border-transparent min-h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">
                      Email <span className="text-[#00b4d8]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8] focus:border-transparent min-h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">
                      Teléfono <span className="text-[#00b4d8]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="11 1234-5678"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8] focus:border-transparent min-h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">
                      Mensaje
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8] focus:border-transparent resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      Ocurrió un error. Intentá de nuevo.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 bg-[#00b4d8] hover:bg-[#0096b8] disabled:opacity-60 text-white font-semibold py-3.5 rounded-lg text-sm transition-colors min-h-11"
                  >
                    {status === "loading" ? (
                      <span className="animate-pulse">Enviando…</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab — hidden when panel is open */}
      <AnimatePresence>
        {!open && (
          <motion.div
            key="tab"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center"
          >
            {/* Hide button */}
            <button
              onClick={() => setTabVisible(false)}
              aria-label="Ocultar solapa"
              className="w-full flex items-center justify-center bg-[#0c1b2e]/80 hover:bg-[#1a5fb4] backdrop-blur-md border-l border-t border-white/20 rounded-tl-xl px-2.5 py-2 text-white/70 hover:text-white transition-all duration-300 shadow-lg"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Main tab button */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Agendá un café"
              className="group flex flex-col items-center gap-2 bg-[#0c1b2e]/80 hover:bg-[#1a5fb4] backdrop-blur-md border-l border-b border-white/20 rounded-bl-xl px-2.5 py-4 text-white transition-all duration-300 shadow-lg min-w-[44px]"
            >
              {/* Text — hidden on mobile */}
              <span
                className="hidden sm:block text-[11px] font-semibold tracking-wider whitespace-nowrap leading-none"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Agendá un café
              </span>
              <CalendarDays className="w-5 h-5 shrink-0" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
