import { SearchIcon, XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function SearchField() {
  const { searchQuery, setSearchQuery, activeTab } = useChatStore();
  const placeholder = activeTab === "chats" ? "Search conversations" : "Search people";

  return (
    <div className="px-4 pb-2 pt-3">
      <label className="relative block">
        <span className="sr-only">{placeholder}</span>
        <SearchIcon
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-mist-700"
          aria-hidden="true"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="field h-10 rounded-lg bg-ink-900 pl-9 pr-9 text-sm [&::-webkit-search-cancel-button]:hidden"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="focus-ring absolute right-1.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-mist-500 hover:text-mist-100"
            aria-label="Clear search"
          >
            <XIcon className="size-4" />
          </button>
        )}
      </label>
    </div>
  );
}

export default SearchField;
