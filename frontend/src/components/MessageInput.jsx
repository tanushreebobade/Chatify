import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImagePlusIcon, SendHorizontalIcon, XIcon } from "lucide-react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_ROWS = 6;

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const { sendMessage, isSoundEnabled, selectedUser } = useChatStore();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const canSend = Boolean(text.trim() || imagePreview);

  // The composer remounts per conversation (ChatContainer is keyed by user),
  // so only focus here — and only on pointer devices, where it won't pop a keyboard.
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) textareaRef.current?.focus();
  }, []);

  const resize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const lineHeight = 22;
    el.style.height = `${Math.min(el.scrollHeight, lineHeight * MAX_ROWS + 20)}px`;
  };

  useEffect(resize, [text]);

  const submit = () => {
    if (!canSend) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();
    sendMessage({ text: text.trim(), image: imagePreview });
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    textareaRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Choose an image file (PNG, JPG, GIF, WebP).");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      toast.error("That image is over 5 MB. Pick a smaller one.");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    textareaRef.current?.focus();
  };

  return (
    <div className="safe-bottom shrink-0 border-t border-ink-600/60 bg-ink-800 px-3 pt-3 sm:px-6">
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
        {imagePreview && (
          <div className="mb-2 inline-flex animate-rise-in items-start gap-2 rounded-xl border border-ink-500 bg-ink-900 p-1.5">
            <img src={imagePreview} alt="Attached preview" className="size-16 rounded-lg object-cover" />
            <button
              type="button"
              onClick={removeImage}
              className="icon-btn size-8 rounded-md"
              aria-label="Remove attached image"
            >
              <XIcon className="size-4" />
            </button>
          </div>
        )}

        <div className="flex items-end gap-2 rounded-2xl border border-ink-500 bg-ink-900 p-1.5 transition-colors focus-within:border-lagoon-400 focus-within:ring-2 focus-within:ring-lagoon-400/25">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`icon-btn rounded-xl ${imagePreview ? "text-lagoon-400" : ""}`}
            aria-label="Attach an image"
            title="Attach an image"
          >
            <ImagePlusIcon className="size-5" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            tabIndex={-1}
          />

          <label className="sr-only" htmlFor="message-composer">
            Message {selectedUser?.fullName}
          </label>
          <textarea
            id="message-composer"
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (isSoundEnabled) playRandomKeyStrokeSound();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Write a message"
            enterKeyHint="send"
            autoComplete="off"
            className="max-h-40 min-h-10 flex-1 resize-none self-center bg-transparent px-1.5 py-2 text-[15px] leading-[22px] text-mist-100 placeholder:text-mist-700 focus:outline-none"
          />

          <button
            type="submit"
            disabled={!canSend}
            className="focus-ring flex size-10 shrink-0 items-center justify-center rounded-xl bg-lagoon-500 text-ink-950 transition-all hover:bg-lagoon-400 active:scale-95 disabled:cursor-not-allowed disabled:bg-ink-600 disabled:text-mist-700"
            aria-label="Send message"
            title="Send (Enter)"
          >
            <SendHorizontalIcon className="size-5" />
          </button>
        </div>
        <p className="mt-1.5 hidden text-2xs text-mist-700 sm:block">Enter to send, Shift + Enter for a new line</p>
      </form>
    </div>
  );
}

export default MessageInput;
