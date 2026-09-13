"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

/**
 * VenueGallery
 * -------------------------------------------------------------
 * Auto-playing slideshow of the venue. Clicking any slide (or the
 * "View all photos" button) opens a full-screen lightbox with all
 * images, arrow/keyboard navigation, and a thumbnail strip.
 *
 * SETUP:
 * 1. Drop this file at components/sections/venue-gallery.tsx
 * 2. Drop venue-loader.ts (server-side helper) alongside it — it
 *    reads whatever image files actually exist in
 *    /public/images/venue/ so you never need to rename 40 files
 *    by hand or keep this file in sync with the folder.
 * 3. In app/page.tsx (a server component), do:
 *      import { VenueGallery } from "@/components/sections/venue-gallery";
 *      import { getVenueImages } from "@/components/sections/venue-loader";
 *      ...
 *      <VenueGallery images={getVenueImages()} />
 *
 *    If you'd rather hardcode the list yourself instead of using
 *    venue-loader.ts, just pass images={[{src: "...", alt: "..."}, ...]}
 *    directly, or omit the prop entirely to fall back to the
 *    placeholder list below.
 */

interface VenueImage {
  src: string;
  alt: string;
}

// Fallback used only if no `images` prop is passed in.
const FALLBACK_IMAGES: VenueImage[] = Array.from({ length: 40 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: `/images/venue/venue-${n}.jpg`,
    alt: `The venue, view ${i + 1}`,
  };
});

const AUTOPLAY_MS = 4500;

export function VenueGallery({ images }: { images?: VenueImage[] }) {
  const VENUE_IMAGES = images && images.length > 0 ? images : FALLBACK_IMAGES;
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // --- Slideshow autoplay ---
  useEffect(() => {
    if (paused || lightboxOpen) return;
    timerRef.current = setInterval(() => {
      setSlide((s) => (s + 1) % VENUE_IMAGES.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, lightboxOpen]);

  const imageCount = VENUE_IMAGES.length;

  const goTo = useCallback((i: number) => {
    setSlide(((i % imageCount) + imageCount) % imageCount);
  }, [imageCount]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const lightboxGoTo = useCallback((i: number) => {
    setLightboxIndex(((i % imageCount) + imageCount) % imageCount);
  }, [imageCount]);

  // --- Keyboard nav inside lightbox ---
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") lightboxGoTo(lightboxIndex + 1);
      if (e.key === "ArrowLeft") lightboxGoTo(lightboxIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, lightboxIndex, closeLightbox, lightboxGoTo]);

  return (
    <section
      id="venue"
      className="relative py-24 px-6"
      style={{ background: "linear-gradient(180deg, #0b1030 0%, #060814 100%)" }}
    >
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p
          className="tracking-[0.25em] text-sm mb-3"
          style={{ color: "#c9a24b" }}
        >
          Where the evening unfolds
        </p>
        <h2
          className="text-4xl md:text-5xl font-serif"
          style={{ color: "#f4e6c1" }}
        >
          The Venue
        </h2>
      </div>

      {/* --- Slideshow --- */}
      <div
        className="relative max-w-3xl mx-auto rounded-lg overflow-hidden border"
        style={{ borderColor: "rgba(201,162,75,0.4)" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button
          type="button"
          onClick={() => openLightbox(slide)}
          className="group relative block w-full aspect-[16/9] cursor-zoom-in"
          aria-label="Open full venue gallery"
        >
          {VENUE_IMAGES.map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
              style={{ opacity: i === slide ? 1 : 0 }}
            />
          ))}

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ background: "rgba(6,8,20,0.45)" }}
          >
            <span
              className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm tracking-wide"
              style={{ borderColor: "#c9a24b", color: "#f4e6c1", background: "rgba(6,8,20,0.6)" }}
            >
              <Expand className="w-4 h-4" />
              View all photos
            </span>
          </div>
        </button>

        {/* Prev / next */}
        <button
          type="button"
          onClick={() => goTo(slide - 1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors"
          style={{ background: "rgba(6,8,20,0.55)", color: "#f4e6c1" }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => goTo(slide + 1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors"
          style={{ background: "rgba(6,8,20,0.55)", color: "#f4e6c1" }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {VENUE_IMAGES.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
              onClick={() => goTo(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === slide ? "18px" : "6px",
                background: i === slide ? "#c9a24b" : "rgba(244,230,193,0.4)",
              }}
            />
          ))}
        </div>
      </div>

      {/* --- Lightbox: all images --- */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: "rgba(4,5,12,0.96)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Venue photo gallery"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close gallery"
            className="absolute top-5 right-5 p-2 rounded-full z-10"
            style={{ background: "rgba(201,162,75,0.15)", color: "#f4e6c1" }}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Main large image */}
          <div
            className="flex-1 flex items-center justify-center px-6 md:px-20 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => lightboxGoTo(lightboxIndex - 1)}
              aria-label="Previous photo"
              className="absolute left-2 md:left-6 p-2 rounded-full"
              style={{ background: "rgba(201,162,75,0.15)", color: "#f4e6c1" }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={VENUE_IMAGES[lightboxIndex].src}
              alt={VENUE_IMAGES[lightboxIndex].alt}
              className="max-h-[70vh] max-w-full object-contain rounded-md border"
              style={{ borderColor: "rgba(201,162,75,0.4)" }}
            />

            <button
              type="button"
              onClick={() => lightboxGoTo(lightboxIndex + 1)}
              aria-label="Next photo"
              className="absolute right-2 md:right-6 p-2 rounded-full"
              style={{ background: "rgba(201,162,75,0.15)", color: "#f4e6c1" }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <p className="text-center text-sm pb-2" style={{ color: "#c9a24b" }}>
            {lightboxIndex + 1} / {VENUE_IMAGES.length}
          </p>

          {/* Thumbnail strip — all 15 images */}
          <div
            className="flex gap-2 overflow-x-auto px-4 pb-5"
            onClick={(e) => e.stopPropagation()}
          >
            {VENUE_IMAGES.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`View photo ${i + 1}`}
                className="shrink-0 rounded overflow-hidden border-2 transition-opacity"
                style={{
                  borderColor: i === lightboxIndex ? "#c9a24b" : "transparent",
                  opacity: i === lightboxIndex ? 1 : 0.55,
                  width: "84px",
                  height: "56px",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
