import { MessageSquarePlusIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import EmptyState from "./ui/EmptyState";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <EmptyState
      compact
      icon={MessageSquarePlusIcon}
      title="No conversations yet"
      description="Pick someone from your contacts and send the first message."
      action={
        <button type="button" onClick={() => setActiveTab("contacts")} className="btn-secondary">
          Browse contacts
        </button>
      }
    />
  );
}

export default NoChatsFound;
