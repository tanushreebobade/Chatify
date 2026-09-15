import { UsersIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

// A stack of Chatify's own bubbles — the same shapes used in the canvas —
// so the empty state introduces the product rather than filling space.
function BubbleStack() {
  return (
    <div className="relative mx-auto h-40 w-64" aria-hidden="true">
      <span className="absolute left-0 top-3 h-11 w-40 rounded-bubble rounded-bl-md bg-ink-700 animate-rise-in [animation-delay:60ms]" />
      <span className="absolute right-0 top-[3.6rem] h-11 w-48 rounded-bubble rounded-br-md bg-lagoon-700 animate-rise-in [animation-delay:200ms]">
        <span className="absolute bottom-2 right-3 h-1 w-8 rounded-full bg-lagoon-300/50" />
      </span>
      <span className="absolute bottom-0 left-6 flex h-11 w-24 items-center justify-center gap-1.5 rounded-bubble rounded-bl-md bg-ink-700 animate-rise-in [animation-delay:340ms]">
        <span className="size-1.5 rounded-full bg-mist-500" />
        <span className="size-1.5 rounded-full bg-mist-500" />
        <span className="size-1.5 rounded-full bg-mist-500" />
      </span>
    </div>
  );
}

function NoConversationPlaceholder() {
  const { setActiveTab, chats } = useChatStore();

  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <BubbleStack />
      <h2 className="mt-8 text-2xl font-bold tracking-tight text-mist-100">Your messages live here</h2>
      <p className="mt-2 max-w-sm text-[15px] text-mist-500">
        {chats.length > 0
          ? "Pick a conversation from the left to keep talking, or find someone new."
          : "You haven't started any conversations yet. Find someone in Contacts and say hello."}
      </p>
      <button type="button" onClick={() => setActiveTab("contacts")} className="btn-primary mt-7">
        <UsersIcon className="size-4" aria-hidden="true" />
        Find people
      </button>
    </div>
  );
}

export default NoConversationPlaceholder;
