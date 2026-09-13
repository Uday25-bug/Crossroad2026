import fs from "fs";
import path from "path";

/**
 * getVenueImages
 * -------------------------------------------------------------
 * Server-side only (uses Node's fs — do NOT import this into a
 * "use client" file directly; call it from a server component
 * like app/page.tsx and pass the result down as a prop).
 *
 * Reads every image file actually sitting in
 * /public/images/venue/, in whatever names they already have
 * (IMG_1747.jpg, my-photo.png, etc.) — no renaming required.
 *
 * Filters out:
 *  - non-image files
 *  - duplicate exports like "IMG_1754_(copy).jpg" or "IMG_1754 (1).jpg"
 *
 * Sorts alphabetically/numerically so the order is stable between
 * builds (iPhone filenames like IMG_1747, IMG_1748... already sort
 * correctly this way).
 */

export interface VenueImage {
  src: string;
  alt: string;
}

const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|avif)$/i;
const DUPLICATE_PATTERN = /_\(copy\)|\(\d+\)|-copy\b/i;

export function getVenueImages(): VenueImage[] {
  const venueDir = path.join(process.cwd(), "public", "images", "venue");

  let files: string[] = [];
  try {
    files = fs.readdirSync(venueDir);
  } catch {
    // Folder doesn't exist yet or is unreadable — return empty,
    // VenueGallery will fall back to its placeholder list.
    return [];
  }

  return files
    .filter((f) => IMAGE_EXTENSIONS.test(f))
    .filter((f) => !DUPLICATE_PATTERN.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f, i) => ({
      src: `/images/venue/${f}`,
      alt: `The venue, view ${i + 1}`,
    }));
}
