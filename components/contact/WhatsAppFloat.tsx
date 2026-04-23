"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";

const WHATSAPP_NUMBER = "5491140931881";
const DEFAULT_MESSAGE = "Hola, me gustaría recibir más información sobre sus propiedades.";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.849L.057 23.571a.75.75 0 00.92.92l5.788-1.474A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.65-.497-5.176-1.367l-.371-.214-3.838.977.995-3.757-.234-.386A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [nearFooter, setNearFooter] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [open]);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNearFooter(entry.isIntersecting);
        if (entry.isIntersecting) setOpen(false);
      },
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  function handleSend() {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-transform duration-300 ease-in-out ${
        nearFooter ? "translate-x-[calc(100%+1.5rem)]" : "translate-x-0"
      }`}
    >
      {/* Chat modal */}
      {open && (
        <div className="w-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-in slide-in-from-bottom-4 fade-in duration-200">
          {/* WhatsApp header */}
          <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <WhatsAppIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">
                  D&apos;Amato Propiedades
                </p>
                <p className="text-white/70 text-xs">Respondemos a la brevedad</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat body */}
          <div className="bg-[#ECE5DD] px-4 py-4">
            {/* Bubble de bienvenida */}
            <div className="flex justify-start mb-3">
              <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%] shadow-sm">
                <p className="text-[#1a1a2e] text-sm leading-relaxed">
                  ¡Hola! 👋 ¿En qué podemos ayudarte?
                </p>
                <p className="text-[#999] text-[10px] text-right mt-1">
                  D&apos;Amato Propiedades
                </p>
              </div>
            </div>

            {/* Input del usuario */}
            <div className="flex justify-end">
              <div className="bg-[#DCF8C6] rounded-2xl rounded-tr-sm px-3 py-2 w-full shadow-sm">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={3}
                  className="w-full bg-transparent text-[#1a1a2e] text-sm resize-none focus:outline-none placeholder:text-[#999] leading-relaxed"
                  placeholder="Escribí tu mensaje..."
                />
                <p className="text-[#999] text-[10px] text-right">Tú</p>
              </div>
            </div>
          </div>

          {/* Send button */}
          <div className="bg-[#ECE5DD] px-4 pb-4">
            <button
              onClick={handleSend}
              className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4" />
              Abrir en WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir chat de WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
      >
        {open ? <X className="w-6 h-6" /> : <WhatsAppIcon className="w-7 h-7" />}
      </button>
    </div>
  );
}
