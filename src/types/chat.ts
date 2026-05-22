export interface Message {
  id: string;
  sender: "me" | "them";
  text?: string;
  image?: string;
  file?: {
    name: string;
    url?: string;
    loadingProgress?: number;
  };
  audio?: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  username: string;
  avatar: string;
  unreadCount: number;
  isTyping: boolean;
  messages: Message[];
}

export interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
}
