"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/Icons";


const WHATSAPP_NUMBER = "5491140931881";
const DEFAULT_MESSAGE = "Hola, me gustaría recibir más información sobre sus propiedades.";



export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [nearFooter, setNearFooter] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 100);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-300 ease-in-out ${
        nearFooter ? "translate-x-[calc(100%+1.5rem)]" : "translate-x-0"
      } ${!scrolled ? "max-lg:opacity-0 max-lg:pointer-events-none max-lg:translate-y-4" : ""}`}
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
