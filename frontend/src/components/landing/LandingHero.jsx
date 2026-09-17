import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, Search, Check, CheckCheck, Paperclip, Send, Smile, Phone, MoreVertical, Image as ImageIcon } from "lucide-react";

export default function LandingHero() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Tanushree", text: "Hey, are we still meeting at 6?", time: "5:48 PM", isMine: false },
    { id: 2, sender: "You", text: "Yep! I'll be there in 10 minutes.", time: "5:50 PM", isMine: true },
    { id: 3, sender: "Tanushree", text: "Perfect 👍", time: "5:51 PM", isMine: false },
    {
      id: 4,
      sender: "Tanushree",
      text: "I grabbed us a table near the window.",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop",
      time: "5:52 PM",
      isMine: false,
    },
  ]);

  const [isTyping, setIsTyping] = useState(true);

  // Subtle interactive live-feel: Toggle typing indicator
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTyping((prev) => !prev);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32 bg-[#FAF9F7]">
      {/* Subtle architectural grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(#0E1822 1px, transparent 1px), radial-gradient(#0E1822 1px, #FAF9F7 1px)",
          backgroundSize: "32px 32px",
          backgroundPosition: "0 0, 16px 16px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold text-slate-900 tracking-tight leading-[1.15] mb-6">
              Connect. Chat. <br />
              <span className="text-slate-800 font-normal">Stay in the moment.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg mb-8">
              Chatify is a fast, secure and real-time messaging platform designed to make conversations simple.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-ink-950 hover:bg-ink-900 text-white text-sm font-medium transition-all shadow-sm hover:shadow group"
              >
                <span>Start Chatting</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white/80 hover:bg-white text-slate-800 text-sm font-medium transition-colors"
              >
                Explore Features
              </a>
            </div>
          </div>

          {/* Right Column: Realistic Chatify Product Mockup */}
          <div className="lg:col-span-7">
            <div className="relative mx-auto w-full max-w-[620px] rounded-2xl bg-ink-950 p-2 sm:p-3 shadow-[0_20px_60px_-15px_rgba(14,24,34,0.35)] border border-ink-700/80">
              {/* Window Title Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-ink-800/80 mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <div className="text-[11px] font-mono text-mist-500 tracking-wide">chatify.app</div>
                <div className="w-10" />
              </div>

              {/* Main Application Container */}
              <div className="grid grid-cols-12 h-[460px] sm:h-[490px] rounded-xl overflow-hidden bg-ink-900 border border-ink-800">
                {/* Contact Sidebar (35% width on sm) */}
                <div className="hidden sm:flex sm:col-span-5 flex-col border-r border-ink-700/60 bg-ink-800/80">
                  {/* Sidebar Header */}
                  <div className="p-3.5 border-b border-ink-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-full bg-ink-700 flex items-center justify-center text-xs font-semibold text-mist-100 border border-ink-600">
                        RS
                        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-live ring-2 ring-ink-800" />
                      </div>
                      <div className="text-left leading-tight">
                        <div className="text-xs font-semibold text-mist-100">Rohit Sharma</div>
                        <div className="text-[10px] text-mist-500">Online</div>
                      </div>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="p-2.5 border-b border-ink-700/40">
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-ink-900/90 border border-ink-700/80 text-xs text-mist-500">
                      <Search className="w-3.5 h-3.5" />
                      <span>Search conversations...</span>
                    </div>
                  </div>

                  {/* Conversations List */}
                  <div className="flex-1 overflow-y-auto divide-y divide-ink-700/30">
                    {/* Active Conversation */}
                    <div className="p-3 bg-ink-700/50 flex items-center gap-3 cursor-pointer">
                      <div className="relative w-9 h-9 rounded-full bg-lagoon-600/30 border border-lagoon-500/40 flex items-center justify-center text-xs font-medium text-lagoon-200">
                        TB
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-live ring-2 ring-ink-800" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-mist-100 truncate">Tanushree Bobade</span>
                          <span className="text-[10px] text-mist-500">5:52 PM</span>
                        </div>
                        <p className="text-[11px] text-mist-300 truncate">I grabbed us a table near...</p>
                      </div>
                    </div>

                    {/* Contact 2 */}
                    <div className="p-3 hover:bg-ink-700/20 flex items-center gap-3 cursor-pointer">
                      <div className="relative w-9 h-9 rounded-full bg-ink-700 flex items-center justify-center text-xs font-medium text-mist-300">
                        RY
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-live ring-2 ring-ink-800" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-mist-100">Rahul Yadav</span>
                          <span className="text-[10px] text-mist-500">3:15 PM</span>
                        </div>
                        <p className="text-[11px] text-mist-500 truncate">Sent the design specs over</p>
                      </div>
                      <span className="w-4 h-4 rounded-full bg-lagoon-500 text-ink-950 text-[10px] font-bold flex items-center justify-center">
                        2
                      </span>
                    </div>

                    {/* Contact 3 */}
                    <div className="p-3 hover:bg-ink-700/20 flex items-center gap-3 cursor-pointer">
                      <div className="relative w-9 h-9 rounded-full bg-ink-700 flex items-center justify-center text-xs font-medium text-mist-500">
                        RV
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-mist-100">Riya Verma</span>
                          <span className="text-[10px] text-mist-500">Yesterday</span>
                        </div>
                        <p className="text-[11px] text-mist-500 truncate">Sounds great, thanks!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conversation Main Panel (full on mobile, 7 cols on sm) */}
                <div className="col-span-12 sm:col-span-7 flex flex-col bg-ink-900">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-ink-700/60 flex items-center justify-between bg-ink-800/40">
                    <div className="flex items-center gap-2.5 text-left">
                      <div className="relative w-8 h-8 rounded-full bg-lagoon-600/30 border border-lagoon-500/40 flex items-center justify-center text-xs font-medium text-lagoon-200">
                        TB
                        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-live ring-2 ring-ink-900" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-mist-100">Tanushree Bobade</div>
                        <div className="text-[10px] text-live flex items-center gap-1 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-live" />
                          Online
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-mist-500">
                      <button type="button" className="p-1 hover:text-mist-100 transition-colors" aria-label="Call">
                        <Phone className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:text-mist-100 transition-colors" aria-label="More options">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Messages Scroll Area */}
                  <div className="flex-1 p-3.5 space-y-3 overflow-y-auto">
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex ${m.isMine ? "justify-end" : "justify-start"} animate-message-in`}
                      >
                        <div
                          className={`relative max-w-[85%] rounded-2xl px-3.5 py-2 text-left text-xs ${
                            m.isMine
                              ? "bg-lagoon-700 text-white rounded-br-xs"
                              : "bg-ink-700 text-mist-100 rounded-bl-xs border border-ink-600/50"
                          }`}
                        >
                          {m.image && (
                            <div className="mb-1.5 -mx-1.5 -mt-0.5 overflow-hidden rounded-xl">
                              <img
                                src={m.image}
                                alt="Shared cafe view"
                                className="w-full h-28 sm:h-32 object-cover"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <p className="leading-relaxed">{m.text}</p>
                          <div
                            className={`flex items-center justify-end gap-1 mt-1 text-[9px] tabular-nums ${
                              m.isMine ? "text-lagoon-200/80" : "text-mist-500"
                            }`}
                          >
                            <span>{m.time}</span>
                            {m.isMine && <CheckCheck className="w-3 h-3 text-lagoon-300" />}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Real-time Typing Indicator */}
                    {isTyping && (
                      <div className="flex justify-start items-center gap-1.5 text-mist-500 text-[11px] pl-1 animate-fade-in">
                        <span>Tanushree is typing</span>
                        <span className="inline-flex gap-0.5 pt-1">
                          <span className="w-1 h-1 rounded-full bg-mist-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1 h-1 rounded-full bg-mist-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1 h-1 rounded-full bg-mist-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Input Bar */}
                  <div className="p-2.5 border-t border-ink-700/60 bg-ink-800/60">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-ink-900 border border-ink-700 text-xs">
                      <button type="button" className="text-mist-500 hover:text-mist-300 transition-colors" aria-label="Add media">
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button type="button" className="text-mist-500 hover:text-mist-300 transition-colors" aria-label="Attach file">
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <input
                        type="text"
                        readOnly
                        value="See you soon!"
                        className="flex-1 bg-transparent text-mist-100 placeholder:text-mist-500 text-xs focus:outline-none"
                      />
                      <button type="button" className="text-mist-500 hover:text-mist-300 transition-colors" aria-label="Emoji">
                        <Smile className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="w-7 h-7 rounded-lg bg-lagoon-500 hover:bg-lagoon-400 text-ink-950 flex items-center justify-center transition-colors"
                        aria-label="Send message"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
