import { useEffect, useMemo } from "react";
import { SearchXIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import ConversationRow from "./ConversationRow";
import EmptyState from "./ui/EmptyState";

function ChatsList() {
  const { getMyChatPartners, chats, isChatsLoading, setSelectedUser, selectedUser, unreadCounts, searchQuery } =
    useChatStore();
  const { onlineUsers, authUser } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  const query = searchQuery.trim().toLowerCase();
  const visible = useMemo(
    () => (query ? chats.filter((c) => c.fullName.toLowerCase().includes(query)) : chats),
    [chats, query]
  );

  if (isChatsLoading && chats.length === 0) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;
  if (visible.length === 0) {
    return (
      <EmptyState
        compact
        icon={SearchXIcon}
        title={`No conversations match “${searchQuery.trim()}”`}
        description="Try a different name, or look in Contacts."
      />
    );
  }

  return (
    <ul className="py-1" aria-label="Conversations">
      {visible.map((chat) => (
        <ConversationRow
          key={chat._id}
          user={chat}
          online={onlineUsers.includes(chat._id)}
          selected={selectedUser?._id === chat._id}
          unread={unreadCounts[chat._id] || 0}
          lastMessage={chat.lastMessage}
          isMine={chat.lastMessage?.senderId === authUser._id}
          subtitle="Open conversation"
          onSelect={setSelectedUser}
        />
      ))}
    </ul>
  );
}

export default ChatsList;
