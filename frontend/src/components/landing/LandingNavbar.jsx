import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Menu, X, ArrowRight, MessageSquare } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const authUser = useAuthStore((s) => s.authUser);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Security", href: "#security" },
    { label: "About", href: "#about" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
          : "bg-white/80 backdrop-blur-sm border-b border-slate-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500 rounded-lg p-1 -ml-1"
          >
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
            <span className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
              Chatify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500 rounded py-1 px-1.5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {authUser ? (
              <Link
                to="/chat"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ink-900 hover:bg-ink-800 text-white text-sm font-medium transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-lagoon-400" />
                <span>Open Chat</span>
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500 rounded-lg"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-ink-950 hover:bg-ink-900 text-white text-sm font-medium transition-colors shadow-xs group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            {authUser && (
              <Link
                to="/chat"
                className="px-3 py-1.5 rounded-lg bg-ink-900 text-white text-xs font-medium"
              >
                Open Chat
              </Link>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200/80 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {authUser ? (
              <Link
                to="/chat"
                className="w-full text-center px-4 py-2.5 rounded-lg bg-ink-900 text-white text-sm font-medium"
              >
                Go to Conversations
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="w-full text-center px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 text-sm font-medium hover:bg-slate-50"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="w-full text-center px-4 py-2.5 rounded-lg bg-ink-950 text-white text-sm font-medium hover:bg-ink-900"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
