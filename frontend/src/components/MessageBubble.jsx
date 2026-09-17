import { ClockIcon, CheckCheckIcon, TrashIcon } from "lucide-react";
import { formatTime } from "../lib/format";
import { useChatStore } from "../store/useChatStore";

// `position` describes where the message sits inside a run of consecutive
// messages from the same sender: single | first | middle | last. The corner
// nearest the sender's neighbours is tightened so runs read as one thread.
const RADII = {
  mine: {
    single: "rounded-bubble rounded-br-md",
    first: "rounded-bubble rounded-br-md",
    middle: "rounded-bubble rounded-r-md",
    last: "rounded-bubble rounded-tr-md",
  },
  theirs: {
    single: "rounded-bubble rounded-bl-md",
    first: "rounded-bubble rounded-bl-md",
    middle: "rounded-bubble rounded-l-md",
    last: "rounded-bubble rounded-tl-md",
  },
};

function MessageBubble({ message, isMine, position = "single", animate = false, onOpenImage, onImageLoad }) {
  const { deleteMessage } = useChatStore();
  const radius = RADII[isMine ? "mine" : "theirs"][position];
  const hasText = Boolean(message.text);
  const hasImage = Boolean(message.image);

  return (
    <div
      className={`flex ${isMine ? "justify-end" : "justify-start"} ${animate ? "animate-message-in" : ""} ${
        position === "single" || position === "first" ? "mt-3" : "mt-1"
      }`}
    >
      <div
        className={`group relative max-w-[82%] sm:max-w-[72%] lg:max-w-[60%] ${radius} ${
          isMine ? "bg-lagoon-700 text-white" : "bg-ink-700 text-mist-100"
        } ${message.isOptimistic ? "opacity-70" : ""} ${hasImage && !hasText ? "p-1" : "px-3.5 py-2"}`}
      >
        {isMine && !message.isOptimistic && (
          <button
            onClick={() => deleteMessage(message._id)}
            className="absolute -left-8 top-1/2 -translate-y-1/2 p-1.5 text-danger opacity-0 transition-opacity hover:bg-ink-700/50 rounded-full group-hover:opacity-100"
            title="Delete message"
          >
            <TrashIcon className="size-4" />
          </button>
        )}
        {hasImage && (
          <button
            type="button"
            onClick={() => onOpenImage?.(message.image)}
            className={`focus-ring block overflow-hidden ${hasText ? "-mx-2 -mt-1 mb-1.5 rounded-xl" : "rounded-[0.9rem]"}`}
            aria-label="Open image"
          >
            <img
              src={message.image}
              alt=""
              loading="lazy"
              onLoad={onImageLoad}
              className="max-h-80 w-full max-w-xs object-cover"
              draggable="false"
            />
          </button>
        )}

        {hasText && (
          <p className="whitespace-pre-wrap break-anywhere text-[15px] leading-[1.45]">{message.text}</p>
        )}

        <span
          className={`flex items-center justify-end gap-1 text-2xs tabular-nums ${
            hasText ? "mt-0.5" : "absolute bottom-2 right-2.5 rounded-md bg-ink-950/60 px-1.5 py-0.5"
          } ${isMine ? "text-lagoon-200/80" : "text-mist-500"}`}
        >
          {message.isOptimistic && <ClockIcon className="size-3" aria-label="Sending" />}
          <time dateTime={message.createdAt}>{formatTime(message.createdAt)}</time>
          {isMine && !message.isOptimistic && (
            <CheckCheckIcon 
              className={`size-3.5 ${message.isRead ? "text-sky-400" : "text-lagoon-200/50"}`} 
              aria-label={message.isRead ? "Read" : "Delivered"} 
            />
          )}
        </span>
      </div>
    </div>
  );
}

export default MessageBubble;
