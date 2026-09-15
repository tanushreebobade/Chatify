import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import SearchField from "../components/SearchField";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const socket = useAuthStore((s) => s.socket);

  // One live listener for the whole page so messages from any contact update
  // the sidebar, unread counts and the open conversation.
  useEffect(() => {
    if (!socket) return;
    subscribeToMessages(socket);
    return () => unsubscribeFromMessages(socket);
  }, [socket, subscribeToMessages, unsubscribeFromMessages]);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-ink-900">
      <aside
        className={`w-full shrink-0 flex-col border-r border-ink-600/60 bg-ink-800 md:flex md:w-[300px] lg:w-[340px] xl:w-[380px] ${
          selectedUser ? "hidden" : "flex"
        }`}
        aria-label="Sidebar"
      >
        <ProfileHeader />
        <ActiveTabSwitch />
        <SearchField />
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {activeTab === "chats" ? <ChatsList /> : <ContactList />}
        </div>
      </aside>

      <main
        className={`min-w-0 flex-1 flex-col bg-ink-900 md:flex ${selectedUser ? "flex" : "hidden"}`}
        aria-label="Conversation"
      >
        {selectedUser ? <ChatContainer key={selectedUser._id} /> : <NoConversationPlaceholder />}
      </main>
    </div>
  );
}

export default ChatPage;
