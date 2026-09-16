import { Zap, ShieldCheck, Radio, Image as ImageIcon } from "lucide-react";

export default function ProductHighlights() {
  const highlights = [
    {
      icon: Zap,
      title: "Real-time messaging",
      description: "Sub-50ms message sync powered by persistent Socket.IO websockets.",
    },
    {
      icon: ShieldCheck,
      title: "Secure authentication",
      description: "Encrypted JWT sessions stored in HTTP-only cookies with Arcjet shield.",
    },
    {
      icon: Radio,
      title: "Online presence",
      description: "Live connection heartbeats display accurate real-time user status.",
    },
    {
      icon: ImageIcon,
      title: "Media sharing",
      description: "Fast image uploads, inline compression, and responsive CDN delivery.",
    },
  ];

  return (
    <section className="border-y border-slate-200/80 bg-white py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex flex-col items-start ${index !== 0 ? "pt-6 sm:pt-0 sm:pl-6" : ""}`}
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 mb-3.5">
                  <Icon className="w-4 h-4 stroke-[2]" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
