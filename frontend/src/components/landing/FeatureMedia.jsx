import { useState } from "react";
import { Image as ImageIcon, Maximize2, CheckCheck, UploadCloud, Eye, Sparkles } from "lucide-react";

export default function FeatureMedia() {
  const [activeImageZoom, setActiveImageZoom] = useState(false);

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Realistic Chatify Media Preview Container */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-ink-950 p-2 sm:p-3 shadow-lg border border-ink-700/80 max-w-lg mx-auto lg:mx-0">
              <div className="rounded-xl bg-ink-900 border border-ink-800 p-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-ink-700/60 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-lagoon-600/30 border border-lagoon-500/40 flex items-center justify-center text-xs font-semibold text-lagoon-200">
                      TB
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-semibold text-mist-100">Tanushree Bobade</div>
                      <div className="text-[10px] text-mist-500">Shared media via Cloudinary CDN</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-ink-800 text-mist-400 px-2 py-0.5 rounded border border-ink-700">
                    Encrypted asset
                  </span>
                </div>

                {/* Messages with Media */}
                <div className="space-y-3.5 text-left">
                  {/* Message 1 */}
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-bl-xs bg-ink-700 text-mist-100 p-3 border border-ink-600/50 text-xs">
                      <p>Check out this photo from yesterday&apos;s sunset 🌅</p>
                    </div>
                  </div>

                  {/* Message 2 with Image */}
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-bl-xs bg-ink-700 text-mist-100 p-1.5 border border-ink-600/50 text-xs">
                      <div className="relative group overflow-hidden rounded-xl">
                        <img
                          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop"
                          alt="Coastal landscape preview"
                          className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-102"
                          loading="lazy"
                        />
                        <button
                          type="button"
                          onClick={() => setActiveImageZoom(!activeImageZoom)}
                          className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-ink-950/80 hover:bg-ink-950 text-white backdrop-blur-xs transition-colors flex items-center gap-1 text-[11px]"
                          aria-label="View full image"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between px-2 pt-2 pb-1 text-[10px] text-mist-500">
                        <span>Original: 2.4 MB • Optimized: 184 KB</span>
                        <span>11:42 AM</span>
                      </div>
                    </div>
                  </div>

                  {/* Reply */}
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-br-xs bg-lagoon-700 text-white px-3.5 py-2 text-xs">
                      <p>Crisp clarity! The compression preserved every detail 👌</p>
                      <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-lagoon-200/80">
                        <span>11:43 AM</span>
                        <CheckCheck className="w-3 h-3 text-lagoon-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-5 text-left">

            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight mb-5">
              More than just text.
            </h2>

            <p className="text-base text-slate-600 leading-relaxed mb-6">
              Words only tell half the story. Chatify lets you send rich images and snapshots seamlessly. Integrated with Cloudinary's intelligent image delivery pipeline, uploads are optimized for both crystal clarity and low mobile data usage.
            </p>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <UploadCloud className="w-4 h-4 text-slate-700 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-xs">Direct Cloudinary upload</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Images are securely transmitted and transformed at the cloud edge without overloading application memory.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-slate-700 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-xs">Dynamic format delivery</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Browsers receive WebP and AVIF formats automatically, delivering sharp images in half the file weight.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Eye className="w-4 h-4 text-slate-700 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-xs">Built-in lightbox inspection</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Clicking any sent photo opens an uncluttered high-resolution modal with smooth zoom controls.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
