import { useEffect } from "react";
import { ArrowLeftIcon, XIcon, TrashIcon, Phone, MoreVertical } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import Avatar from "./ui/Avatar";

function ChatHeader() {
  const { selectedUser, setSelectedUser, clearChat } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);
  const isSelf = authUser?._id === selectedUser._id;

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
        <h2 className="truncate text-[15px] font-semibold leading-tight text-mist-100">{selectedUser.fullName} {isSelf && "(You)"}</h2>
        <p
          className={`mt-0.5 flex items-center gap-1.5 text-xs transition-colors ${
            isOnline ? "text-live" : "text-mist-500"
          }`}
          aria-live="polite"
        >
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="icon-btn hidden sm:inline-flex text-mist-400 hover:text-mist-100"
          aria-label="Call"
          title="Audio call"
        >
          <Phone className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Are you sure you want to clear this chat for everyone?")) {
              clearChat();
            }
          }}
          className="icon-btn hover:text-danger"
          aria-label="Clear chat"
          title="Clear chat"
        >
          <TrashIcon className="size-5" />
        </button>

        <button
          type="button"
          className="icon-btn text-mist-400 hover:text-mist-100"
          aria-label="More options"
          title="More options"
        >
          <MoreVertical className="size-5" />
        </button>

        <button
          type="button"
          onClick={() => setSelectedUser(null)}
          className="icon-btn hidden md:inline-flex"
          aria-label="Close conversation"
          title="Close (Esc)"
        >
          <XIcon className="size-5" />
        </button>
      </div>
    </header>
  );
}

export default ChatHeader;
