import { Link } from "react-router";
import { ArrowRight, MessageSquare, Check } from "lucide-react";

export default function LandingCTA() {

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-[#FAF9F7] border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-ink-950 p-8 sm:p-12 lg:p-16 border border-ink-800 shadow-xl overflow-hidden text-center">
          {/* Subtle Chatify Product Background Wireframe */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="w-[800px] h-[500px] rounded-2xl border border-white p-6 space-y-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white" />
                <div className="w-3 h-3 rounded-full bg-white" />
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
              <div className="grid grid-cols-12 gap-4 h-full">
                <div className="col-span-4 border-r border-white/40 h-full" />
                <div className="col-span-8 space-y-3">
                  <div className="w-3/5 h-10 rounded-xl bg-white/30" />
                  <div className="w-2/5 h-10 rounded-xl bg-white/30 ml-auto" />
                  <div className="w-1/2 h-10 rounded-xl bg-white/30" />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-800 border border-ink-700 text-xs font-medium text-mist-300 mb-6">
              <MessageSquare className="w-3.5 h-3.5 text-lagoon-400" />
              <span>Free and open communication</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight mb-4">
              Your conversations deserve a better home.
            </h2>

            <p className="text-base sm:text-lg text-mist-300 leading-relaxed max-w-lg mx-auto mb-8">
              Start chatting with Chatify today. Fast, private, and real-time.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-lagoon-500 hover:bg-lagoon-400 text-ink-950 font-semibold text-sm transition-all shadow-sm group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 text-ink-950 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-mist-500">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-live" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-live" />
                <span>Instant account setup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-live" />
                <span>Full desktop & mobile access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
