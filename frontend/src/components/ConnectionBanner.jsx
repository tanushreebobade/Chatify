import { WifiOffIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

// Shown only after a live connection drops; socket.io retries on its own.
function ConnectionBanner() {
  const socketStatus = useAuthStore((s) => s.socketStatus);
  if (socketStatus !== "disconnected") return null;

  return (
    <div
      role="status"
      className="flex items-center justify-center gap-2 bg-warn/15 px-4 py-1.5 text-xs font-medium text-warn animate-fade-in"
    >
      <WifiOffIcon className="size-3.5" aria-hidden="true" />
      Connection lost. Reconnecting…
    </div>
  );
}

export default ConnectionBanner;
