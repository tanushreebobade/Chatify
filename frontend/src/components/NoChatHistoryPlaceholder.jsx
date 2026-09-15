import { useChatStore } from "../store/useChatStore";
import Avatar from "./ui/Avatar";

const QUICK_REPLIES = ["Hey! How's it going?", "Are you free to talk?", "Just saying hi"];

function NoChatHistoryPlaceholder({ user }) {
  const { sendMessage } = useChatStore();
  const firstName = user.fullName.trim().split(/\s+/)[0];

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center animate-fade-in">
      <Avatar src={user.profilePicture} name={user.fullName} size="xl" ringClass="ring-ink-900" />
      <h3 className="mt-5 text-lg font-semibold text-mist-100">This is the start of your conversation</h3>
      <p className="mt-1.5 max-w-sm text-sm text-mist-500">
        Nothing here yet. Say something to {firstName} — messages arrive instantly when they're online.
      </p>

      <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Quick replies">
        {QUICK_REPLIES.map((reply) => (
          <li key={reply}>
            <button
              type="button"
              onClick={() => sendMessage({ text: reply, image: null })}
              className="focus-ring h-9 rounded-full border border-ink-500 bg-ink-800 px-4 text-[13px] font-medium text-mist-300 transition-colors hover:border-lagoon-500/60 hover:text-mist-100"
            >
              {reply}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoChatHistoryPlaceholder;
