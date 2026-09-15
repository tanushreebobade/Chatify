import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import ConnectionBanner from "./ConnectionBanner";

function ChatContainer() {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser._id, getMessagesByUserId]);

  let body;
  if (isMessagesLoading && messages.length === 0) {
    body = <MessagesLoadingSkeleton />;
  } else if (messages.length === 0) {
    body = <NoChatHistoryPlaceholder user={selectedUser} />;
  } else {
    body = <MessageList messages={messages} currentUserId={authUser._id} conversationId={selectedUser._id} />;
  }

  return (
    <div className="flex h-full min-h-0 flex-col md:animate-none animate-panel-in">
      <ChatHeader />
      <ConnectionBanner />
      {body}
      <MessageInput />
    </div>
  );
}

export default ChatContainer;
