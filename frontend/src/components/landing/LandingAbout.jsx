import { MessageCircle, Heart, Shield, Mail } from "lucide-react";

export default function LandingAbout() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FAF9F7] border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-6 text-left">

            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight mb-5">
              Built for conversations, not algorithms.
            </h2>

            <p className="text-base text-slate-600 leading-relaxed mb-6">
              Modern messaging apps have become increasingly noisy — stuffed with algorithmic stories, payment feeds, and intrusive tracking. Chatify was conceived as an intentional antidote.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed mb-8">
              We focused on the foundational core of communication: delivering crisp messages instantly, protecting session privacy, and creating an interface that stays out of your way.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Crafted with care</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-slate-700" />
                <span>Zero advertising</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <span>100% focused on chat</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Team card */}
          <div id="contact" className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-left">
              <h3 className="text-lg font-semibold text-slate-900 mb-2 tracking-tight">
                Get in touch with the team
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Have questions about Chatify’s security architecture, self-hosting, or want to contribute to the open codebase?
              </p>

              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-900">Email Inquiries</div>
                    <div className="text-xs text-slate-500">Direct response within 24 hours</div>
                  </div>
                  <a
                    href="mailto:contact@chatify.dev"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-xs font-medium text-slate-800 transition-colors shadow-2xs"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-600" />
                    <span>Say Hello</span>
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-900">Source Code & Issues</div>
                    <div className="text-xs text-slate-500">GitHub open source repository</div>
                  </div>
                  <a
                    href="https://github.com/tanushreebobade/Chatify"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink-950 text-white text-xs font-medium hover:bg-ink-900 transition-colors shadow-2xs"
                  >
                    <span>View Repo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
