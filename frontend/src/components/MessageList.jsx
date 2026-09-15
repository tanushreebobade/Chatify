import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowDownIcon } from "lucide-react";
import MessageBubble from "./MessageBubble";
import ImageLightbox from "./ImageLightbox";
import { formatDayLabel, isSameDay } from "../lib/format";

const GROUP_WINDOW_MS = 3 * 60 * 1000;

// Annotate each message with its position in a same-sender run and whether
// a day separator should precede it.
const buildTimeline = (messages) =>
  messages.map((msg, i) => {
    const prev = messages[i - 1];
    const next = messages[i + 1];
    const newDay = !prev || !isSameDay(prev.createdAt, msg.createdAt);
    const joinsPrev =
      prev &&
      !newDay &&
      prev.senderId === msg.senderId &&
      new Date(msg.createdAt) - new Date(prev.createdAt) < GROUP_WINDOW_MS;
    const joinsNext =
      next &&
      isSameDay(next.createdAt, msg.createdAt) &&
      next.senderId === msg.senderId &&
      new Date(next.createdAt) - new Date(msg.createdAt) < GROUP_WINDOW_MS;

    let position = "single";
    if (joinsPrev && joinsNext) position = "middle";
    else if (joinsPrev) position = "last";
    else if (joinsNext) position = "first";

    return { msg, position, newDay };
  });

function DaySeparator({ label }) {
  return (
    <div className="my-5 flex items-center gap-3" role="separator" aria-label={label}>
      <span className="h-px flex-1 bg-ink-600/70" />
      <span className="rounded-full bg-ink-800 px-3 py-1 text-2xs font-semibold text-mist-500">{label}</span>
      <span className="h-px flex-1 bg-ink-600/70" />
    </div>
  );
}

function MessageList({ messages, currentUserId, conversationId }) {
  const scrollRef = useRef(null);
  const bottomRef = useRef(null);
  const settledCountRef = useRef(0);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [showJump, setShowJump] = useState(false);

  const timeline = useMemo(() => buildTimeline(messages), [messages]);

  // Jump straight to the bottom when a conversation opens; ease there for
  // new messages when the reader is already near the end.
  useLayoutEffect(() => {
    settledCountRef.current = messages.length;
    bottomRef.current?.scrollIntoView({ block: "end" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const lastMessage = messages[messages.length - 1];
    const isMineOrNear = lastMessage?.senderId === currentUserId || distanceFromBottom < 160;
    if (isMineOrNear) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      setShowJump(false);
    } else if (messages.length > settledCountRef.current) {
      setShowJump(true);
    }
  }, [messages, currentUserId]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (distanceFromBottom < 40) setShowJump(false);
  };

  // An image finishing its load grows the list after we've already scrolled;
  // keep the end in view if the reader was there.
  const handleImageLoad = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    const grewBy = e.target.getBoundingClientRect().height;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (distanceFromBottom - grewBy < 160) bottomRef.current?.scrollIntoView({ block: "end" });
  };

  return (
    <div className="relative flex-1 min-h-0">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto overscroll-contain px-3 py-4 sm:px-6"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        <div className="mx-auto max-w-3xl">
          {timeline.map(({ msg, position, newDay }, index) => (
            <div key={msg._id}>
              {newDay && <DaySeparator label={formatDayLabel(msg.createdAt)} />}
              <MessageBubble
                message={msg}
                isMine={msg.senderId === currentUserId}
                position={position}
                animate={index >= settledCountRef.current}
                onOpenImage={setLightboxSrc}
                onImageLoad={handleImageLoad}
              />
            </div>
          ))}
          <div ref={bottomRef} className="h-px" />
        </div>
      </div>

      {showJump && (
        <button
          type="button"
          onClick={() => bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })}
          className="focus-ring absolute bottom-3 left-1/2 flex h-9 -translate-x-1/2 items-center gap-1.5 rounded-full border border-ink-500 bg-ink-800 px-3.5 text-xs font-semibold text-mist-100 shadow-pop animate-rise-in"
        >
          <ArrowDownIcon className="size-3.5" aria-hidden="true" />
          New messages
        </button>
      )}

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}

export default MessageList;
