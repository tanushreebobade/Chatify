import { useState } from "react";
import { CheckCheck, Clock, Radio, Zap, Send } from "lucide-react";

export default function FeatureRealTime() {
  const [demoMessages, setDemoMessages] = useState([
    { id: 1, sender: "Tanushree", text: "Did the API payload sync?", isMine: false, time: "10:14 AM", status: "read" },
    { id: 2, sender: "You", text: "Confirmed. Latency is under 35ms across all regions.", isMine: true, time: "10:15 AM", status: "read" },
    { id: 3, sender: "Tanushree", text: "Incredible speed! Deploying update now 🚀", isMine: false, time: "10:15 AM", status: "read" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLiveSending, setIsLiveSending] = useState(false);

  const handleSendSimulation = (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isLiveSending) return;

    const text = inputText.trim();
    setInputText("");
    setIsLiveSending(true);

    // 1. Optimistic insertion with Clock icon
    const tempId = Date.now();
    const newMsg = {
      id: tempId,
      sender: "You",
      text,
      isMine: true,
      time: "Just now",
      status: "sending",
    };
    setDemoMessages((prev) => [...prev, newMsg]);

    // 2. Simulated instant socket event confirmation (40ms)
    setTimeout(() => {
      setDemoMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...m, status: "delivered" } : m))
      );
      setIsLiveSending(false);
    }, 280);
  };

  return (
    <section id="features" className="py-20 sm:py-28 bg-[#FAF9F7] border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Storytelling Copy */}
          <div className="lg:col-span-5 text-left order-2 lg:order-1">

            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight mb-5">
              Messages that move in real time.
            </h2>

            <p className="text-base text-slate-600 leading-relaxed mb-6">
              Chatify eliminates polling and page reloads. With dedicated full-duplex WebSocket connections, your messages, read receipts, and presence updates travel from device to device in fractions of a second.
            </p>

            <div className="space-y-4 pt-2 border-t border-slate-200/80">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-slate-700">
                  <span className="text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Immediate optimistic rendering</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                    Your sent messages appear on screen instantly, confirming the roundtrip quietly via delivery ticks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-slate-700">
                  <span className="text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Accurate typing signals</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                    Know when your conversation partner is formulating a thought with natural debounced typing indicators.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-slate-700">
                  <span className="text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Automated reconnection</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                    If your connection drops, Socket.IO handles the exponential backoff handshake invisibly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Chatify Conversation Window */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="rounded-2xl bg-ink-950 p-2 sm:p-3 shadow-xl border border-ink-700/80">
              {/* Card Window Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-ink-800 mb-2">
                <div className="flex items-center gap-2">
                  <div className="relative w-7 h-7 rounded-full bg-lagoon-600/30 border border-lagoon-500/40 flex items-center justify-center text-[11px] font-semibold text-lagoon-200">
                    TB
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-live ring-2 ring-ink-900" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-mist-100">Tanushree Bobade</div>
                    <div className="text-[10px] text-live flex items-center gap-1">
                      <Radio className="w-2.5 h-2.5 animate-pulse" />
                      Connected to Socket.IO cluster
                    </div>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-mist-500 bg-ink-900 px-2 py-0.5 rounded border border-ink-800">
                  &lt; 38ms latency
                </div>
              </div>

              {/* Chat Viewport */}
              <div className="h-[340px] rounded-xl bg-ink-900 p-4 flex flex-col justify-between border border-ink-800">
                <div className="space-y-3 overflow-y-auto pr-1">
                  {demoMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isMine ? "justify-end" : "justify-start"} animate-message-in`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs text-left ${
                          msg.isMine
                            ? "bg-lagoon-700 text-white rounded-br-xs"
                            : "bg-ink-700 text-mist-100 rounded-bl-xs border border-ink-600/60"
                        }`}
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                        <div
                          className={`flex items-center justify-end gap-1 mt-1 text-[9px] tabular-nums ${
                            msg.isMine ? "text-lagoon-200/80" : "text-mist-500"
                          }`}
                        >
                          <span>{msg.time}</span>
                          {msg.isMine && (
                            msg.status === "sending" ? (
                              <Clock className="w-2.5 h-2.5 text-lagoon-300 animate-spin" />
                            ) : (
                              <CheckCheck className="w-3 h-3 text-lagoon-300" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Simulated Input */}
                <form onSubmit={handleSendSimulation} className="mt-3 pt-2.5 border-t border-ink-700/60">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type a message to test real-time delivery..."
                      className="flex-1 bg-ink-800 border border-ink-700 text-mist-100 placeholder:text-mist-500 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-lagoon-400"
                    />
                    <button
                      type="submit"
                      disabled={!inputText.trim() || isLiveSending}
                      className="px-3.5 py-2 bg-lagoon-500 hover:bg-lagoon-400 disabled:opacity-40 text-ink-950 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Send</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
