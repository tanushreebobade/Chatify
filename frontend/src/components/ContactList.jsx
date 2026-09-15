import { useEffect, useMemo } from "react";
import { SearchXIcon, UsersIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import ConversationRow from "./ConversationRow";
import EmptyState from "./ui/EmptyState";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, selectedUser, isContactsLoading, searchQuery, unreadCounts } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  const query = searchQuery.trim().toLowerCase();
  const visible = useMemo(() => {
    const list = query ? allContacts.filter((c) => c.fullName.toLowerCase().includes(query)) : allContacts;
    return [...list].sort((a, b) => a.fullName.localeCompare(b.fullName));
  }, [allContacts, query]);

  if (isContactsLoading && allContacts.length === 0) return <UsersLoadingSkeleton />;

  if (allContacts.length === 0) {
    return (
      <EmptyState
        compact
        icon={UsersIcon}
        title="No one else is here yet"
        description="When other people join Chatify, they'll show up here."
      />
    );
  }

  if (visible.length === 0) {
    return (
      <EmptyState
        compact
        icon={SearchXIcon}
        title={`No one matches “${searchQuery.trim()}”`}
        description="Check the spelling or try a shorter name."
      />
    );
  }

  const onlineCount = visible.filter((c) => onlineUsers.includes(c._id)).length;

  return (
    <div className="py-1">
      <p className="px-4 pb-1 pt-2 text-xs text-mist-700">
        {onlineCount > 0 ? `${onlineCount} online` : "Nobody online right now"}
      </p>
      <ul aria-label="Contacts">
        {visible.map((contact) => {
          const online = onlineUsers.includes(contact._id);
          return (
            <ConversationRow
              key={contact._id}
              user={contact}
              online={online}
              selected={selectedUser?._id === contact._id}
              unread={unreadCounts[contact._id] || 0}
              subtitle={online ? "Online now" : "Offline"}
              onSelect={setSelectedUser}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ContactList;
