import { Link } from "react-router";
import { MessageSquare, Github } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 sm:py-16 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-100">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-ink-950 flex items-center justify-center shadow-xs border border-ink-800">
                <svg viewBox="0 0 64 64" fill="none" className="w-5 h-5">
                  <path
                    d="M32 14c-10.5 0-19 7.4-19 16.5 0 4.3 1.9 8.2 5 11.1L15.5 50l10.4-4.3c1.9.5 4 .8 6.1.8 10.5 0 19-7.4 19-16.5S42.5 14 32 14Z"
                    fill="#3FD1E3"
                  />
                  <circle cx="24.5" cy="30.5" r="2.6" fill="#0E1822" />
                  <circle cx="32" cy="30.5" r="2.6" fill="#0E1822" />
                  <circle cx="39.5" cy="30.5" r="2.6" fill="#0E1822" />
                </svg>
              </div>
              <span className="text-base font-semibold tracking-tight text-slate-900">
                Chatify
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 max-w-sm mb-4">
              Real-time messaging built with React, Socket.IO, and modern zero-trust security. Fast, secure, and private by design.
            </p>
            <div className="text-[11px] text-slate-400 font-mono">
              v1.0.0
            </div>
          </div>

          {/* Links Column 1: Product */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3.5">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a href="#features" className="hover:text-slate-950 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-slate-950 transition-colors">
                  Security Architecture
                </a>
              </li>
              <li>
                <Link to="/login" className="hover:text-slate-950 transition-colors">
                  Web Application
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Resources & Legal */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3.5">
              Resources & About
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a href="#about" className="hover:text-slate-950 transition-colors">
                  About Chatify
                </a>
              </li>
              <li>
                <a href="mailto:contact@chatify.dev" className="hover:text-slate-950 transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/tanushreebobade/Chatify"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-slate-950 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li className="pt-2 flex items-center gap-3 text-slate-500">
                <a href="#privacy" className="hover:text-slate-800 transition-colors">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="#terms" className="hover:text-slate-800 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Chatify. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>Designed with human care for private communication.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
