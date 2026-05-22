import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Message, Chat, ChatState } from "../../types/chat";
import lisaImg from "../../assets/Images/lisa-roy.png";
import jamieImg from "../../assets/Images/jamie.png";
import jasonImg from "../../assets/Images/jason.png";
import amyImg from "../../assets/Images/amy.png";
import paulImg from "../../assets/Images/paul.png";
import anaImg from "../../assets/Images/ana.png";

const initialChats: Chat[] = [
  {
    id: "1",
    username: "Lisa Roy",
    avatar: lisaImg,
    unreadCount: 0,
    isTyping: false,
    messages: [
      {
        id: "1",
        sender: "them",
        text: "Hey, are we using Redux Persist for auth?",
        timestamp: "09:15 AM",
      },
      {
        id: "2",
        sender: "me",
        text: "Yes, we did, and I encrypted the token using redux-persist-transform-encrypt to secure it.",
        timestamp: "09:30 AM",
      },
    ],
  },
  {
    id: "2",
    username: "Jamie Taylor",
    avatar: jamieImg,
    unreadCount: 3,
    isTyping: false,

    messages: [
      {
        id: "1",
        sender: "me",
        text: "Hi Echoes! Did you check the latest wireframes?",
        timestamp: "Yesterday",
      },
      {
        id: "2",
        sender: "them",
        text: "Hey! Yes, I did. I have some suggestions for the dashboard.",
        timestamp: "Yesterday",
      },
      {
        id: "3",
        sender: "them",
        text: "Can we hop on a quick call?",
        timestamp: "10:20 AM",
      },
      {
        id: "4",
        sender: "them",
        text: "I sent you the updated file in the Figma channel.",
        timestamp: "10:21 AM",
      },
    ],
  },
  {
    id: "3",
    username: "Jason Roy",
    avatar: jasonImg,
    unreadCount: 0,
    isTyping: false,
    messages: [
      {
        id: "1",
        sender: "me",
        text: "Draft budget is ready for your review.",
        timestamp: "Wednesday",
      },
      {
        id: "2",
        sender: "them",
        text: "Perfect! I will take a look before our alignment meeting tomorrow.",
        timestamp: "Wednesday",
      },
    ],
  },
  {
    id: "4",
    username: "Amy Frost",
    avatar: amyImg,
    unreadCount: 0,
    isTyping: false,
    messages: [
      {
        id: "1",
        sender: "them",
        text: "CI/CD pipeline is fully configured for staging deployment.",
        timestamp: "Tuesday",
      },
      {
        id: "2",
        sender: "me",
        text: "Awesome work, thanks!",
        timestamp: "Tuesday",
      },
    ],
  },
  {
    id: "5",
    username: "Paul Wilson",
    avatar: paulImg,
    unreadCount: 0,
    isTyping: false,
    messages: [
      {
        id: "1",
        sender: "me",
        text: "Did you find any issues with the verification flow?",
        timestamp: "Monday",
      },
      {
        id: "2",
        sender: "them",
        text: "All clear on my side. Tested with multiple credentials.",
        timestamp: "Monday",
      },
    ],
  },
  {
    id: "6",
    username: "Ana Williams",
    avatar: anaImg,
    unreadCount: 0,
    isTyping: false,
    messages: [
      {
        id: "1",
        sender: "them",
        text: "The endpoint to verify OTP has been updated.",
        timestamp: "Last week",
      },
      {
        id: "2",
        sender: "me",
        text: "Perfect. I'll test it right away.",
        timestamp: "Last week",
      },
    ],
  },
];

const initialState: ChatState = {
  chats: initialChats,
  activeChatId: "1",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChatId = action.payload;
      const chat = state.chats.find((c) => c.id === action.payload);
      if (chat) {
        chat.unreadCount = 0;
      }
    },
    sendMessage: (
      state,
      action: PayloadAction<{ chatId: string; message: Message }>,
    ) => {
      const chat = state.chats.find((c) => c.id === action.payload.chatId);
      if (chat) {
        chat.messages.push(action.payload.message);
      }
    },
    setTypingState: (
      state,
      action: PayloadAction<{ chatId: string; isTyping: boolean }>,
    ) => {
      const chat = state.chats.find((c) => c.id === action.payload.chatId);
      if (chat) {
        chat.isTyping = action.payload.isTyping;
      }
    },
    receiveReply: (
      state,
      action: PayloadAction<{ chatId: string; message: Message }>,
    ) => {
      const chat = state.chats.find((c) => c.id === action.payload.chatId);
      if (chat) {
        chat.messages.push(action.payload.message);
        if (state.activeChatId !== action.payload.chatId) {
          chat.unreadCount += 1;
        }
      }
    },
  },
});

export const { setActiveChat, sendMessage, setTypingState, receiveReply } =
  chatSlice.actions;
export default chatSlice.reducer;
