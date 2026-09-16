import { ShieldCheck, Lock, Cookie, KeyRound, Activity, Check } from "lucide-react";

export default function FeatureSecurity() {
  const securityFeatures = [
    {
      icon: Cookie,
      title: "Protected Sessions",
      description: "Secure browser session cookies keep your login token safe from third-party scripts and unauthorized access.",
    },
    {
      icon: KeyRound,
      title: "Encrypted Credentials",
      description: "Passwords are salted and cryptographically hashed before saving. Your raw password is never stored or visible.",
    },
    {
      icon: Lock,
      title: "Verified Connections",
      description: "Every message and API call is verified against a secure signature to ensure only authenticated users participate.",
    },
    {
      icon: Activity,
      title: "Spam & Abuse Shield",
      description: "Automated rate limiting and bot detection actively shield authentication endpoints against brute-force attacks.",
    },
  ];

  return (
    <section id="security" className="py-20 sm:py-28 bg-[#FAF9F7] border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Security Narrative */}
          <div className="lg:col-span-6 text-left">

            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight mb-5">
              Private conversations. Secure by design.
            </h2>

            <p className="text-base text-slate-600 leading-relaxed mb-8">
              Privacy isn’t an afterthought in Chatify. Every message transmission, login handshake, and data storage layer is built around proven security standards to keep your personal chats safe.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {securityFeatures.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                    <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center text-slate-800 mb-2.5">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-xs font-semibold text-slate-900 tracking-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Clean Product Security Card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-ink-950 p-2 sm:p-3 shadow-lg border border-ink-700/80">
              <div className="rounded-xl bg-ink-900 border border-ink-800 p-6 text-left">
                <div className="flex items-center justify-between pb-4 border-b border-ink-800 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-mist-100">Security & Privacy Guarantee</h3>
                      <p className="text-[10px] text-mist-400">Active safeguards across all endpoints</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-2.5 py-0.5 rounded-full font-medium">
                    ACTIVE
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="p-3.5 rounded-lg bg-ink-800/60 border border-ink-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-mist-100">Session Isolation</div>
                        <div className="text-[11px] text-mist-400">Browser cookies protected against script leakage</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-mist-400 font-mono">ENFORCED</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-ink-800/60 border border-ink-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-mist-100">Account Privacy</div>
                        <div className="text-[11px] text-mist-400">Zero raw passwords saved anywhere on disk</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-mist-400 font-mono">VERIFIED</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-ink-800/60 border border-ink-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-mist-100">Anti-Spam Shield</div>
                        <div className="text-[11px] text-mist-400">Automated bot detection & rate limiting</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-mist-400 font-mono">ENABLED</span>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-ink-800 flex items-center justify-between text-[11px] text-mist-400">
                  <span>Cryptographic signature verification</span>
                  <span className="text-emerald-400 font-medium">100% Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
