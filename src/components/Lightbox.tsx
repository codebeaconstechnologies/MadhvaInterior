import { useEffect, useRef } from "react";
import { ProjectImage } from "../data/projects";
import "./Lightbox.css";

interface LightboxProps {
  images: ProjectImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % images.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + images.length) % images.length);
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button");
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [index, images.length, onClose, onNavigate]);

  const image = images[index];

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}: ${image.alt}`}
      ref={dialogRef}
    >
      <button className="lightbox__backdrop" aria-label="Close image viewer" onClick={onClose} />
      <div className="lightbox__stage">
        <img src={image.src} alt={image.alt} />
      </div>

      <button ref={closeRef} className="lightbox__close" onClick={onClose} aria-label="Close image viewer">
        Close ✕
      </button>

      {images.length > 1 && (
        <>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => onNavigate((index - 1 + images.length) % images.length)}
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={() => onNavigate((index + 1) % images.length)}
            aria-label="Next image"
          >
            →
          </button>
          <p className="lightbox__count">
            {index + 1} / {images.length}
          </p>
        </>
      )}
    </div>
  );
}
