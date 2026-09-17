import { Laptop, Tablet, Smartphone, Check } from "lucide-react";

export default function FeatureResponsive() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F7] border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">

          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight mb-4">
            Chat wherever you are.
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            Chatify fluidly adapts across desktop monitors, laptops, tablets, and smartphones without sacrificing speed, battery life, or layout ergonomics.
          </p>
        </div>

        {/* Multi-Device Mockup Composition */}
        <div className="relative max-w-4xl mx-auto">
          {/* Desktop Frame (Base) */}
          <div className="rounded-2xl bg-ink-950 p-2 sm:p-3 shadow-2xl border border-ink-700/80">
            {/* Window header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-ink-800 mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <span className="text-[11px] font-mono text-mist-500">Desktop Web App</span>
              <div className="w-8" />
            </div>

            {/* Desktop App Preview */}
            <div className="grid grid-cols-12 h-[340px] sm:h-[380px] rounded-xl overflow-hidden bg-ink-900 border border-ink-800">
              {/* Sidebar */}
              <div className="hidden md:flex md:col-span-4 flex-col border-r border-ink-700/60 bg-ink-800/80 p-3 text-left">
                <div className="text-xs font-semibold text-mist-100 mb-3 flex items-center justify-between">
                  <span>Chatify</span>
                  <span className="w-2 h-2 rounded-full bg-live" />
                </div>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-ink-700/60 text-xs text-mist-100">
                    <div className="font-medium">Tanushree Bobade</div>
                    <div className="text-[10px] text-mist-400">See you at 6!</div>
                  </div>
                  <div className="p-2 rounded-lg hover:bg-ink-700/30 text-xs text-mist-400">
                    <div className="font-medium text-mist-300">Rohit Sharma</div>
                    <div className="text-[10px] text-mist-500">Sent design specs</div>
                  </div>
                  <div className="p-2 rounded-lg hover:bg-ink-700/30 text-xs text-mist-400">
                    <div className="font-medium text-mist-300">Riya Verma</div>
                    <div className="text-[10px] text-mist-500">3 unread messages</div>
                  </div>
                </div>
              </div>

              {/* Chat Canvas */}
              <div className="col-span-12 md:col-span-8 flex flex-col justify-between p-4 text-left">
                <div className="space-y-3">
                  <div className="flex justify-start">
                    <div className="bg-ink-700 text-mist-100 px-3 py-1.5 rounded-2xl rounded-bl-xs text-xs max-w-[75%] border border-ink-600/50">
                      I am testing the new responsive breakpoints.
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-lagoon-700 text-white px-3 py-1.5 rounded-2xl rounded-br-xs text-xs max-w-[75%]">
                      The single-column transition on mobile is seamless!
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-ink-700 text-mist-100 px-3 py-1.5 rounded-2xl rounded-bl-xs text-xs max-w-[75%] border border-ink-600/50">
                      Touch targets and virtual keyboards resize the viewport automatically.
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-ink-800 text-[11px] text-mist-500 flex items-center justify-between">
                  <span>Interactive-widget: resizes-content enabled</span>
                  <span className="text-lagoon-300">Fluid flexbox architecture</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Mobile Smartphone Mockup (Overlaid on Bottom-Right) */}
          <div className="hidden sm:block absolute -bottom-8 -right-6 lg:-right-10 w-64 rounded-3xl bg-ink-950 p-2.5 shadow-2xl border-2 border-slate-700/60 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Phone speaker notch */}
            <div className="w-16 h-3 bg-ink-800 rounded-full mx-auto mb-2" />

            {/* Mobile Screen */}
            <div className="h-80 rounded-2xl bg-ink-900 p-3 flex flex-col justify-between border border-ink-800 text-left">
              <div>
                {/* Mobile Chat Header */}
                <div className="flex items-center gap-2 pb-2 border-b border-ink-700/60 mb-3">
                  <div className="w-6 h-6 rounded-full bg-lagoon-600/30 flex items-center justify-center text-[10px] font-bold text-lagoon-200">
                    TB
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-mist-100">Tanushree Bobade</div>
                    <div className="text-[9px] text-live">Online</div>
                  </div>
                </div>

                {/* Mobile Messages */}
                <div className="space-y-2">
                  <div className="flex justify-start">
                    <div className="bg-ink-700 text-mist-100 p-2 rounded-xl rounded-bl-xs text-[10px] max-w-[85%] border border-ink-600/40">
                      Are you on mobile right now?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-lagoon-700 text-white p-2 rounded-xl rounded-br-xs text-[10px] max-w-[85%]">
                      Yes! Fits like a native app.
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Input */}
              <div className="pt-2 border-t border-ink-800 flex items-center gap-1.5">
                <input
                  type="text"
                  readOnly
                  placeholder="Message..."
                  className="flex-1 bg-ink-800 text-mist-100 text-[10px] px-2 py-1.5 rounded-lg border border-ink-700 focus:outline-none"
                />
                <div className="w-6 h-6 rounded-md bg-lagoon-500 flex items-center justify-center text-ink-950 font-bold text-[10px]">
                  ↑
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16 text-left">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm mb-1">
              <Laptop className="w-4 h-4 text-slate-700" />
              <span>Desktop & Web</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Full two-column workspace with active conversation switching, keyboard shortcuts, and desktop audio chimes.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm mb-1">
              <Tablet className="w-4 h-4 text-slate-700" />
              <span>Tablet Optimized</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Adaptive sidebar collapse and generous touch targets tailored for iPadOS and Android tablets.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm mb-1">
              <Smartphone className="w-4 h-4 text-slate-700" />
              <span>Mobile First</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Fast single-view stack with bottom-safe area padding and virtual keyboard auto-resize support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
