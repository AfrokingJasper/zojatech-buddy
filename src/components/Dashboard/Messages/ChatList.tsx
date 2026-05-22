import type { Chat } from "../../../types/chat";
import { EditIcon, SearchIcon } from "../../Common/Icons";

interface ChatListProps {
  myName: string;
  myRole: string;
  myAvatar: string;
  onEditProfile: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filteredChats: Chat[];
  activeChatId: string | null;
  onChatSelect: (id: string) => void;
}

export default function ChatList({
  myName,
  myRole,
  myAvatar,
  onEditProfile,
  searchQuery,
  onSearchChange,
  filteredChats,
  activeChatId,
  onChatSelect,
}: ChatListProps) {
  return (
    <div className="w-[296px] font-inter shrink-0 p-4 bg-[#FAFAFA] flex flex-col h-full overflow-hidden rounded-xl">
      <div className="p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={myAvatar}
              alt={myName}
              className="w-11.25 h-11.25 rounded-full object-cover border border-[#DCE8FF]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[0.9375rem] leading-tight font-semibold text-primary truncate max-w-[150px]">
              {myName}
            </span>
            <span className="text-[0.5625rem] text-[#2E2E2E] leading-[100%] font-semibold truncate max-w-[150px]">
              {myRole}
            </span>
          </div>
        </div>
        <button
          onClick={onEditProfile}
          className="p-2 hover:bg-neutral-100 rounded-full text-neutral-500 transition-colors"
          title="Edit profile"
        >
          <EditIcon className="w-4.25 h-3.75" />
        </button>
      </div>

      <div className="p-3 shrink-0">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
            <SearchIcon className="w-6 h-6" />
          </span>
          <input
            type="text"
            placeholder="Search chat or workspace..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-[1.875rem] bg-white text-xs  text-[#2E2E2E] focus:outline-none focus:border-primary transition-all duration-200"
          />
        </div>
      </div>

      <hr className="border-[#F1F1F1] mx-3 shrink-0" />

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredChats.map((chat) => {
          const isActive = chat.id === activeChatId;
          const lastMsg = chat.messages[chat.messages.length - 1];

          const renderStatus = () => {
            if (chat.unreadCount > 0) {
              return (
                <div className="w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {chat.unreadCount}
                </div>
              );
            }
            if (lastMsg && lastMsg.sender === "me") {
              return (
                <div className="w-5 h-5 bg-[#DCE8FF] rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-primary font-bold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              );
            }
            return null;
          };

          return (
            <div
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
              className={`p-3 rounded-[12px] flex items-center justify-between cursor-pointer select-none transition-all duration-300 ${
                isActive
                  ? "bg-white scale-[1.02] shadow-[0_14px_25px_0_rgba(30,30,30,0.1)] border border-neutral-100"
                  : "hover:bg-neutral-50 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.username}
                    className="min-w-11.25 max-w-11.25 h-11.25 rounded-full object-cover border border-neutral-100"
                  />
                  {chat.isTyping && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full flex items-center justify-center animate-ping" />
                  )}
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-[0.875rem] leading-[100%] font-semibold text-primary truncate">
                    {chat.username}
                  </span>
                  <span className="text-[9px] leading-[100%] text-[#959595] line-clamp-2">
                    {chat.isTyping ? (
                      <span className="text-primary font-medium animate-pulse">
                        Typing...
                      </span>
                    ) : lastMsg?.text ? (
                      lastMsg.text
                    ) : lastMsg?.image ? (
                      "Sent an image"
                    ) : lastMsg?.file ? (
                      "Sent a PDF file"
                    ) : lastMsg?.audio ? (
                      "Sent a voice note"
                    ) : (
                      "No messages yet"
                    )}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0 gap-1 pl-2">
                <span className="text-[10px] text-[#A3A3A3]">
                  {lastMsg ? lastMsg.timestamp : "10:00 AM"}
                </span>
                <div className="h-5">{renderStatus()}</div>
              </div>
            </div>
          );
        })}

        {filteredChats.length === 0 && (
          <div className="text-center py-6 text-xs text-neutral-400">
            No active conversations
          </div>
        )}
      </div>
    </div>
  );
}
