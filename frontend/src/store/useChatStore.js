import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import { getErrorMessage } from "../lib/errors";

const readSoundPreference = () => {
  try {
    return JSON.parse(localStorage.getItem("isSoundEnabled")) === true;
  } catch {
    return false;
  }
};

const notificationSound = new Audio("/sounds/notification.mp3");

const playNotification = () => {
  notificationSound.currentTime = 0;
  notificationSound.play().catch((e) => console.log("Audio play failed:", e));
};

const summarize = (message) => ({
  text: message.text,
  image: message.image,
  senderId: message.senderId,
  createdAt: message.createdAt,
});

// Move (or insert) a chat partner to the top of the list with a fresh preview.
const bumpChat = (chats, partner, lastMessage) => {
  const rest = chats.filter((c) => c._id !== partner._id);
  return [{ ...partner, lastMessage }, ...rest];
};

let activeMessageHandler = null;

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  searchQuery: "",
  unreadCounts: {},
  isContactsLoading: false,
  isChatsLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: readSoundPreference(),

  toggleSound: () => {
    const next = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", JSON.stringify(next));
    set({ isSoundEnabled: next });
  },

  setActiveTab: (tab) => set({ activeTab: tab, searchQuery: "" }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  setSelectedUser: (selectedUser) => {
    if (!selectedUser) {
      set({ selectedUser: null, messages: [] });
      return;
    }
    const unreadCounts = { ...get().unreadCounts };
    delete unreadCounts[selectedUser._id];

    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.emit("markMessagesAsRead", { senderId: selectedUser._id });
    }

    // Re-selecting the open conversation (same person from the other tab, or
    // clicking its row again) must not drop the messages already loaded —
    // the container doesn't remount for the same id, so nothing would refetch.
    const isSameConversation = get().selectedUser?._id === selectedUser._id;
    set({ selectedUser, unreadCounts, ...(isSameConversation ? {} : { messages: [] }) });
  },

  getAllContacts: async () => {
    set({ isContactsLoading: true });
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      console.error("Failed to load contacts:", error);
      toast.error(getErrorMessage(error, "Couldn't load your contacts."));
    } finally {
      set({ isContactsLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isChatsLoading: true });
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data });
    } catch (error) {
      console.error("Failed to load chats:", error);
      toast.error(getErrorMessage(error, "Couldn't load your conversations."));
    } finally {
      set({ isChatsLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      // Ignore the response if the user switched conversations mid-flight.
      if (get().selectedUser?._id !== userId) return;
      // Keep anything that arrived while the request was in flight (an
      // optimistic send, a socket delivery) so a slow history load can't
      // wipe it out.
      const known = new Set(res.data.map((m) => m._id));
      const inFlight = get().messages.filter((m) => !known.has(m._id));
      set({ messages: [...res.data, ...inFlight] });
    } catch (error) {
      console.error("Failed to load messages:", error);
      toast.error(getErrorMessage(error, "Couldn't load this conversation."));
    } finally {
      if (get().selectedUser?._id === userId) set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    const { authUser } = useAuthStore.getState();
    if (!selectedUser || !authUser) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };
    set({ messages: [...get().messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      const sent = res.data;
      set((state) => ({
        messages:
          state.selectedUser?._id === selectedUser._id
            ? state.messages.map((m) => (m._id === tempId ? sent : m))
            : state.messages,
        chats: bumpChat(state.chats, selectedUser, summarize(sent)),
      }));
    } catch (error) {
      console.error("Failed to send message:", error);
      set((state) => ({ messages: state.messages.filter((m) => m._id !== tempId) }));
      toast.error(getErrorMessage(error, "Couldn't send your message. Please try again."));
    }
  },

  handleIncomingMessage: (newMessage) => {
    const { selectedUser, chats, allContacts, isSoundEnabled } = get();
    const senderId = newMessage.senderId;
    const isFromOpenConversation = selectedUser?._id === senderId;

    if (isFromOpenConversation) {
      set((state) => ({ messages: [...state.messages, newMessage] }));
      const socket = useAuthStore.getState().socket;
      if (socket) {
        socket.emit("markMessagesAsRead", { senderId });
      }
    } else {
      set((state) => ({
        unreadCounts: {
          ...state.unreadCounts,
          [senderId]: (state.unreadCounts[senderId] || 0) + 1,
        },
      }));
    }

    const partner = chats.find((c) => c._id === senderId) || allContacts.find((c) => c._id === senderId);
    if (partner) {
      set((state) => ({ chats: bumpChat(state.chats, partner, summarize(newMessage)) }));
    } else {
      // First message from someone we haven't loaded yet — refresh the list.
      get().getMyChatPartners();
    }

    if (isSoundEnabled) playNotification();
  },

  subscribeToMessages: (socket) => {
    if (!socket) return;
    get().unsubscribeFromMessages(socket);
    activeMessageHandler = (message) => get().handleIncomingMessage(message);
    socket.on("newMessage", activeMessageHandler);

    socket.on("messagesRead", ({ receiverId }) => {
      set((state) => {
        if (state.selectedUser?._id !== receiverId) return state;
        return {
          messages: state.messages.map((m) =>
            m.receiverId === receiverId && m.senderId !== receiverId ? { ...m, isRead: true } : m
          ),
        };
      });
    });
  },

  unsubscribeFromMessages: (socket) => {
    if (!socket || !activeMessageHandler) return;
    socket.off("newMessage", activeMessageHandler);
    socket.off("messagesRead");
    activeMessageHandler = null;
  },

  reset: () =>
    set({
      allContacts: [],
      chats: [],
      messages: [],
      activeTab: "chats",
      selectedUser: null,
      searchQuery: "",
      unreadCounts: {},
    }),
}));
