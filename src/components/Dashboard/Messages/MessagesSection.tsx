import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setActiveChat,
  sendMessage,
  setTypingState,
  receiveReply,
} from "../../../store/slices/chatSlice";
import type { Message as MessageType } from "../../../types/chat";
import toast from "react-hot-toast";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import davidImg from "../../../assets/Images/david-peters.png";

const MY_AVATAR = davidImg;

export default function MessagesSection() {
  const dispatch = useAppDispatch();
  const { chats, activeChatId } = useAppSelector((state) => state.chat);
  const currentUser = useAppSelector((state) => state.auth.user);

  const myName = currentUser
    ? `${currentUser.first_name || ""} ${currentUser.last_name || ""}`.trim() ||
      "Fortune"
    : "Oliseyenum";

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  const [search, setSearch] = useState("");

  const filteredChats = chats.filter((c) =>
    c.username.toLowerCase().includes(search.toLowerCase()),
  );

  const handleChatSelect = (id: string) => dispatch(setActiveChat(id));
  const handleEditProfile = () =>
    toast.success("Profile edit interface coming soon!");

  const triggerAutoReply = (chatId: string, type: string) => {
    setTimeout(() => {
      dispatch(setTypingState({ chatId, isTyping: true }));
      setTimeout(() => {
        dispatch(setTypingState({ chatId, isTyping: false }));

        let replyText = "Received! Let me look into this.";
        if (type === "image") {
          replyText = "Wow, that looks awesome! Let me inspect the details.";
        } else if (type === "file") {
          replyText = "Got the PDF file! Reviewing the sheets now.";
        } else if (type === "audio") {
          replyText =
            "Got your voice note. Sounds good, I will reply in a bit!";
        } else {
          const responses = [
            "Makes perfect sense. Let's schedule a meeting.",
            "I'm on it. I'll get back to you shortly.",
            "Thanks for the update!",
            "Let's finalize this design tomorrow.",
          ];
          replyText = responses[Math.floor(Math.random() * responses.length)];
        }

        const replyMsg: MessageType = {
          id: `reply_${Date.now()}`,
          sender: "them",
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        dispatch(receiveReply({ chatId, message: replyMsg }));
      }, 1000);
    }, 1000);
  };

  const handleSendMessage = (msg: MessageType, replyType: string) => {
    dispatch(sendMessage({ chatId: activeChat.id, message: msg }));
    triggerAutoReply(activeChat.id, replyType);
  };

  return (
    <div className="justify-between p-5 w-[1140px] max-w-full h-[660px] bg-white border border-[#DDE2E4] rounded-[12px] shadow-sm flex overflow-hidden mx-auto font-sans text-[#2E2E2E]">
      <ChatList
        myName={myName}
        myRole="Software Developer"
        myAvatar={MY_AVATAR}
        onEditProfile={handleEditProfile}
        searchQuery={search}
        onSearchChange={setSearch}
        filteredChats={filteredChats}
        activeChatId={activeChatId}
        onChatSelect={handleChatSelect}
      />
      <ChatBox
        activeChat={activeChat}
        myAvatar={MY_AVATAR}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
