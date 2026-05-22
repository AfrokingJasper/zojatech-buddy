import { useRef, type ChangeEvent, type Dispatch, type SetStateAction, type RefObject } from "react";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import {
  CameraIcon,
  RecordIcon,
  SmilieIcon,
  PaperClipIcon,
  SendIcon,
} from "../../Common/Icons";

interface ChatInputBarProps {
  inputText: string;
  setInputText: (text: string) => void;
  handleSend: () => void;
  selectedFile: any;
  handleFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImageSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  startRecording: () => void;
  showEmojiPicker: boolean;
  setShowEmojiPicker: Dispatch<SetStateAction<boolean>>;
  handleEmojiClick: (emojiData: EmojiClickData) => void;
  emojiPickerRef: RefObject<HTMLDivElement | null>;
}

export default function ChatInputBar({
  inputText,
  setInputText,
  handleSend,
  selectedFile,
  handleFileSelect,
  handleImageSelect,
  startRecording,
  showEmojiPicker,
  setShowEmojiPicker,
  handleEmojiClick,
  emojiPickerRef,
}: ChatInputBarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-4 bg-[#D9D9D9] rounded-xl h-[96px] flex items-center gap-2 shrink-0 relative">
      <button
        onClick={startRecording}
        className="-mr-12 z-100 p-2 text-neutral-500 hover:text-primary hover:bg-neutral-50 rounded-full transition-colors"
        title="Record audio"
      >
        <RecordIcon className="w-6 h-6" />
      </button>

      <div className="flex-1 bg-[#F8FAFC] rounded-xl border border-neutral-200 flex items-center px-3 relative">
        <input
          type="text"
          placeholder={
            selectedFile ? "File ready to send" : "Write your message..."
          }
          disabled={!!selectedFile}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          className="flex-1 pl-6 py-3 text-[0.9375rem] placeholder:text-neutral-400 bg-transparent text-[#2E2E2E] focus:outline-none disabled:opacity-50"
        />

        <input
          type="file"
          ref={imageInputRef}
          onChange={handleImageSelect}
          accept="image/*"
          className="hidden"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="application/pdf"
          className="hidden"
        />

        <div className="flex items-center gap-1.5 text-neutral-400">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-1 hover:text-primary rounded transition-colors"
            title="Attach PDF"
          >
            <PaperClipIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => imageInputRef.current?.click()}
            className="p-1 hover:text-primary rounded transition-colors"
            title="Attach image"
          >
            <CameraIcon className="w-6 h-5" />
          </button>
          <button
            onClick={() => setShowEmojiPicker((v) => !v)}
            className={`p-1 rounded transition-colors ${
              showEmojiPicker ? "text-primary" : "hover:text-primary"
            }`}
            title="Insert emoji"
          >
            <SmilieIcon className="w-6 h-6" />
          </button>
        </div>

        {showEmojiPicker && (
          <div
            ref={emojiPickerRef}
            className="absolute bottom-12 right-0 z-30 shadow-2xl"
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              height={380}
              width={320}
            />
          </div>
        )}
      </div>

      <button
        onClick={handleSend}
        className="p-2 bg-primary text-white cursor-pointer rounded-full hover:bg-primary/95 transition-all active:scale-95 shadow-sm"
        title="Send message"
      >
        <SendIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
