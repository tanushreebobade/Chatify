import { ImageIcon } from "lucide-react";
import Avatar from "./ui/Avatar";
import { formatListTime } from "../lib/format";
import { useAuthStore } from "../store/useAuthStore";

function Preview({ lastMessage, isMine }) {
  if (!lastMessage) return null;
  const prefix = isMine ? "You: " : "";
  if (lastMessage.text) {
    return (
      <span className="truncate">
        {prefix}
        {lastMessage.text}
      </span>
    );
  }
  if (lastMessage.image) {
    return (
      <span className="inline-flex items-center gap-1 truncate">
        {prefix}
        <ImageIcon className="size-3.5 shrink-0" aria-hidden="true" />
        Photo
      </span>
    );
  }
  return null;
}

function ConversationRow({ user, online, selected, unread = 0, lastMessage, isMine, subtitle, onSelect }) {
  const { authUser } = useAuthStore();
  const hasPreview = Boolean(lastMessage?.text || lastMessage?.image);
  const isSelf = authUser?._id === user._id;

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(user)}
        aria-current={selected ? "true" : undefined}
        className={`focus-ring group relative flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
          selected ? "bg-lagoon-500/10" : "hover:bg-ink-700/60 active:bg-ink-700"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-y-2 left-0 w-0.5 rounded-r bg-lagoon-400 transition-opacity ${
            selected ? "opacity-100" : "opacity-0"
          }`}
        />
        <Avatar src={user.profilePicture} name={user.fullName} online={online} />

        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-2">
            <span
              className={`truncate text-[15px] leading-5 ${
                unread > 0 ? "font-bold text-mist-100" : "font-semibold text-mist-100"
              }`}
            >
              {user.fullName} {isSelf && "(You)"}
            </span>
            {lastMessage?.createdAt && (
              <span
                className={`shrink-0 text-2xs tabular-nums ${unread > 0 ? "text-lagoon-400" : "text-mist-700"}`}
              >
                {formatListTime(lastMessage.createdAt)}
              </span>
            )}
          </span>

          <span className="mt-0.5 flex items-center justify-between gap-2">
            <span
              className={`flex min-w-0 flex-1 text-[13px] leading-5 ${
                unread > 0 ? "font-medium text-mist-300" : "text-mist-500"
              }`}
            >
              {hasPreview ? (
                <Preview lastMessage={lastMessage} isMine={isMine} />
              ) : (
                <span className="truncate">{subtitle}</span>
              )}
            </span>
            {unread > 0 && (
              <span
                className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-lagoon-500 px-1.5 text-2xs font-bold tabular-nums text-ink-950"
                aria-label={`${unread} unread`}
              >
                {unread > 99 ? "99+" : unread}
              </span>
            )}
          </span>
        </span>
      </button>
    </li>
  );
}

export default ConversationRow;
