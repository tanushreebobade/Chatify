import { useState } from "react";
import { Search, Users, MessageSquare, Check, Bell } from "lucide-react";

export default function FeatureConversations() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const conversationItems = [
    {
      id: 1,
      name: "dev core",
      snippet: "Sprint deployment completed on staging.",
      time: "2m ago",
      unread: 3,
      online: true,
      initials: "DC",
      isGroup: true,
    },
    {
      id: 2,
      name: "Tanushree Bobade",
      snippet: "Let's review the new onboarding flows today.",
      time: "14m ago",
      unread: 1,
      online: true,
      initials: "TB",
    },
    {
      id: 3,
      name: "rohit sharma",
      snippet: "I updated the Cloudinary credentials.",
      time: "1h ago",
      unread: 0,
      online: true,
      initials: "RS",
    },
    {
      id: 4,
      name: "Rahul Yadav",
      snippet: "See you at the coffee shop at 6!",
      time: "3h ago",
      unread: 0,
      online: false,
      initials: "RY",
    },
  ];

  const filteredItems = conversationItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === "unread") return matchesSearch && item.unread > 0;
    return matchesSearch;
  });

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Asymmetrical Chatify Conversation Manager Visual */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-ink-950 p-2 sm:p-3 shadow-lg border border-ink-700/80 max-w-xl mx-auto lg:mx-0">
              {/* Internal window */}
              <div className="rounded-xl bg-ink-900 border border-ink-800 overflow-hidden">
                {/* Header & Tabs */}
                <div className="p-4 border-b border-ink-700/60 bg-ink-800/50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-mist-100 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-lagoon-400" />
                      <span>Conversations</span>
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-mist-500">
                      <span className="w-2 h-2 rounded-full bg-live" />
                      <span>3 Online Contacts</span>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveFilter("all")}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${activeFilter === "all"
                          ? "bg-lagoon-500 text-ink-950 font-semibold"
                          : "bg-ink-700 text-mist-300 hover:text-mist-100"
                        }`}
                    >
                      All Messages
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveFilter("unread")}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${activeFilter === "unread"
                          ? "bg-lagoon-500 text-ink-950 font-semibold"
                          : "bg-ink-700 text-mist-300 hover:text-mist-100"
                        }`}
                    >
                      <span>Unread</span>
                      <span className="w-4 h-4 rounded-full bg-ink-900 text-mist-200 text-[10px] font-bold flex items-center justify-center">
                        2
                      </span>
                    </button>
                  </div>
                </div>

                {/* Instant Search Field */}
                <div className="px-4 py-2.5 border-b border-ink-700/40 bg-ink-900/60">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ink-800 border border-ink-700 text-xs text-mist-300">
                    <Search className="w-3.5 h-3.5 text-mist-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search messages, names or topics..."
                      className="bg-transparent border-none text-mist-100 placeholder:text-mist-500 text-xs focus:outline-none w-full"
                    />
                  </div>
                </div>

                {/* Conversation Rows */}
                <div className="divide-y divide-ink-700/30 max-h-[310px] overflow-y-auto">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 hover:bg-ink-800/50 flex items-center gap-3 transition-colors cursor-pointer text-left"
                    >
                      <div className="relative shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium border ${item.unread > 0
                              ? "bg-lagoon-600/30 text-lagoon-200 border-lagoon-500/40"
                              : "bg-ink-700 text-mist-300 border-ink-600"
                            }`}
                        >
                          {item.initials}
                        </div>
                        {item.online && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-live ring-2 ring-ink-900" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span
                            className={`text-xs font-medium truncate ${item.unread > 0 ? "text-white font-semibold" : "text-mist-100"
                              }`}
                          >
                            {item.name}
                          </span>
                          <span className="text-[10px] text-mist-500 shrink-0 ml-2">
                            {item.time}
                          </span>
                        </div>
                        <p
                          className={`text-xs truncate ${item.unread > 0 ? "text-mist-200 font-medium" : "text-mist-500"
                            }`}
                        >
                          {item.snippet}
                        </p>
                      </div>

                      {item.unread > 0 && (
                        <div className="w-5 h-5 rounded-full bg-lagoon-500 text-ink-950 text-[11px] font-bold flex items-center justify-center shrink-0">
                          {item.unread}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-5 text-left">

            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight mb-5">
              Your conversations, all in one place.
            </h2>

            <p className="text-base text-slate-600 leading-relaxed mb-6">
              Never miss an update. Chatify structures your ongoing dialogues, contacts, and unread priority threads with zero clutter. Quick search gets you straight to the message you need in milliseconds.
            </p>

            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Instant search across all active contacts and dialogue records.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Clear unread badge counters that sync state across all active tabs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Distinct online and idle status indicators so you know who is reachable.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
