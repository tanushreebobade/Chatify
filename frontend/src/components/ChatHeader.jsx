import { useEffect } from "react";
import { ArrowLeftIcon, XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import Avatar from "./ui/Avatar";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <header className="safe-top flex h-16 shrink-0 items-center gap-2 border-b border-ink-600/60 bg-ink-800 px-2 sm:px-4">
      <button
        type="button"
        onClick={() => setSelectedUser(null)}
        className="icon-btn md:hidden"
        aria-label="Back to conversations"
      >
        <ArrowLeftIcon className="size-5" />
      </button>

      <Avatar src={selectedUser.profilePicture} name={selectedUser.fullName} size="sm" online={isOnline} />

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-[15px] font-semibold leading-tight text-mist-100">{selectedUser.fullName}</h2>
        <p
          className={`mt-0.5 flex items-center gap-1.5 text-xs transition-colors ${
            isOnline ? "text-live" : "text-mist-500"
          }`}
          aria-live="polite"
        >
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setSelectedUser(null)}
        className="icon-btn hidden md:inline-flex"
        aria-label="Close conversation"
        title="Close (Esc)"
      >
        <XIcon className="size-5" />
      </button>
    </header>
  );
}

export default ChatHeader;
