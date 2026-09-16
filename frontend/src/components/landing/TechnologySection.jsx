import { Code2, Server, Database, Radio, Layers, Image as ImageIcon, Mail, ShieldAlert, Cpu } from "lucide-react";

export default function TechnologySection() {
  const technologies = [
    {
      name: "React 19",
      role: "Client Interface",
      detail: "Concurrent rendering and lightweight component state with zero boilerplate.",
      icon: Code2,
    },
    {
      name: "Socket.IO",
      role: "Real-time Transport",
      detail: "Full-duplex WebSocket communication with automated fallback and reconnection.",
      icon: Radio,
    },
    {
      name: "Node.js & Express",
      role: "Backend Services",
      detail: "High-throughput asynchronous REST API cluster with CORS security filters.",
      icon: Server,
    },
    {
      name: "MongoDB & Mongoose",
      role: "Persistent Storage",
      detail: "Flexible document datastore indexed for instant message queries and user lookups.",
      icon: Database,
    },
    {
      name: "Zustand",
      role: "State Management",
      detail: "Minimalist, unopinionated client store providing instant state synchronization.",
      icon: Layers,
    },
    {
      name: "Cloudinary",
      role: "Media CDN",
      detail: "High-fidelity image optimization, WebP compression, and edge CDN delivery.",
      icon: ImageIcon,
    },
    {
      name: "Arcjet",
      role: "Bot & Rate Defense",
      detail: "Intelligent application security guarding authentication endpoints from brute force.",
      icon: ShieldAlert,
    },
    {
      name: "Resend",
      role: "Transactional Email",
      detail: "Modern developer-first delivery for user onboarding and password verifications.",
      icon: Mail,
    },
    {
      name: "Tailwind CSS",
      role: "Design System",
      detail: "Utility-first typography and bespoke ink-and-lagoon color token consistency.",
      icon: Cpu,
    },
  ];

  return (
    <section id="technology" className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 mb-4">
            <Cpu className="w-3.5 h-3.5 text-slate-600" />
            <span>Under the Hood</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight mb-4">
            Built with modern technology.
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            Chatify leverages an industry-proven stack chosen specifically for performance, reliability, and security at scale.
          </p>
        </div>

        {/* Understated Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className="p-5 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 transition-colors text-left"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-medium">
                    {tech.role}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1 tracking-tight">
                  {tech.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {tech.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
