import { useEffect, useRef } from "react";
import { XIcon } from "lucide-react";

function ImageLightbox({ src, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!src) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    // Capture phase so this wins over the chat header's Escape handler.
    window.addEventListener("keydown", onKey, true);
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = overflow;
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/90 p-4 animate-fade-in"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="icon-btn absolute right-3 top-3 bg-ink-800/80 text-mist-100 hover:bg-ink-700"
        aria-label="Close image"
      >
        <XIcon className="size-5" />
      </button>
      <img
        src={src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full rounded-lg object-contain shadow-pop"
      />
    </div>
  );
}

export default ImageLightbox;
