import { useChatStore } from "../store/useChatStore";

const TABS = [
  { id: "chats", label: "Chats" },
  { id: "contacts", label: "Contacts" },
];

function ActiveTabSwitch() {
  const { activeTab, setActiveTab, unreadCounts } = useChatStore();
  const totalUnread = Object.values(unreadCounts).reduce((sum, n) => sum + n, 0);
  const activeIndex = TABS.findIndex((t) => t.id === activeTab);

  return (
    <div
      role="tablist"
      aria-label="Sidebar sections"
      className="relative mx-4 mt-3 grid grid-cols-2 rounded-xl bg-ink-900 p-1"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-lg bg-ink-600 shadow-raised transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
      {TABS.map((tab) => {
        const selected = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => setActiveTab(tab.id)}
            className={`focus-ring relative z-10 flex h-9 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors ${
              selected ? "text-mist-100" : "text-mist-500 hover:text-mist-300"
            }`}
          >
            {tab.label}
            {tab.id === "chats" && totalUnread > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-lagoon-500 px-1.5 text-2xs font-bold text-ink-950">
                {totalUnread > 99 ? "99+" : totalUnread}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ActiveTabSwitch;
