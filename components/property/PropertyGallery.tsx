"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Expand, Play } from "lucide-react";
import type { PropertyPhoto } from "@/lib/types";
import { cn, isVideoUrl, getVideoEmbedUrl, isDirectVideoFile } from "@/lib/utils";

interface PropertyGalleryProps {
  photos: PropertyPhoto[];
  title: string;
}

export default function PropertyGallery({ photos, title }: PropertyGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!photos.length) {
    return (
      <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-[#5a5a6e] text-sm">Sin imágenes disponibles</p>
      </div>
    );
  }

  function prev() {
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  }

  function next() {
    setCurrent((c) => (c + 1) % photos.length);
  }

  const currentPhoto = photos[current];
  const currentIsVideo = isVideoUrl(currentPhoto.image);
  const currentEmbedUrl = currentIsVideo ? getVideoEmbedUrl(currentPhoto.image) : null;
  const currentIsDirectVideo = currentIsVideo && isDirectVideoFile(currentPhoto.image);

  return (
    <>
      {/* Main gallery */}
      <div className="relative">
        {/* Hero media */}
        <div className="relative aspect-video md:aspect-4/3 lg:aspect-video rounded-xl overflow-hidden bg-gray-900">
          {currentIsVideo ? (
            currentIsDirectVideo ? (
              <video
                src={currentPhoto.image}
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              <iframe
                src={currentEmbedUrl ?? currentPhoto.image}
                title={currentPhoto.description || title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            )
          ) : (
            <Image
              src={currentPhoto.image}
              alt={currentPhoto.description || title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
              className="object-cover"
              priority={current === 0}
            />
          )}

          {/* Controls */}
          {photos.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
                aria-label="Foto siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full z-10">
            {current + 1} / {photos.length}
          </div>

          {/* Expand button — only for images */}
          {!currentIsVideo && (
            <button
              onClick={() => setLightbox(true)}
              className="absolute top-3 right-3 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
              aria-label="Ver pantalla completa"
            >
              <Expand className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Thumbnails */}
        {photos.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {photos.slice(0, 10).map((photo, idx) => {
              const isVid = isVideoUrl(photo.image);
              return (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={cn(
                    "shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all relative",
                    current === idx
                      ? "border-[#1a5fb4]"
                      : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  {isVid ? (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <Image
                      src={photo.image}
                      alt={`Foto ${idx + 1}`}
                      width={64}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox — only for images */}
      {lightbox && !currentIsVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            onClick={() => setLightbox(false)}
            aria-label="Cerrar"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="relative w-full max-w-5xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <Image
                src={currentPhoto.image}
                alt={currentPhoto.description || title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {photos.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="absolute bottom-4 text-white/60 text-sm">
            {current + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
}
