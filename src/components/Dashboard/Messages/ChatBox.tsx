import React, { useState, useEffect, useRef } from "react";
import type { EmojiClickData } from "emoji-picker-react";
import toast from "react-hot-toast";
import type { Chat, Message as MessageType } from "../../../types/chat";
import {
  HeartIcon,
  SearchIcon,
  NotificationIcon,
} from "../../Common/Icons";
import ChatInputBar from "./ChatInputBar";

function RealAudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;

    const onLoaded = () => setDuration(audio.duration);
    const onTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress(
        audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0,
      );
    };
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.src = "";
    };
  }, [src]);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => toast.error("Could not play audio."));
      setIsPlaying(true);
    }
  };

  const fmt = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  const bars = [
    12, 18, 10, 15, 24, 18, 12, 16, 20, 10, 15, 22, 18, 14, 10, 16, 24, 18, 12,
    20, 15, 12, 16, 10,
  ];

  return (
    <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-neutral-200 w-[240px] text-[#2E2E2E]">
      <button
        onClick={togglePlayback}
        className="w-8 h-8 rounded-full bg-[#FF860029] hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all shrink-0 active:scale-95"
      >
        {isPlaying ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 ml-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-end gap-0.5 h-6">
          {bars.map((h, i) => {
            const isActive = i / bars.length <= progress / 100;
            return (
              <div
                key={i}
                className="flex-1 rounded-sm transition-colors duration-100"
                style={{
                  height: `${h}px`,
                  backgroundColor: isActive ? "#FF8600" : "#E6E6E6",
                }}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between text-[9px] text-neutral-400">
          <span>{fmt(currentTime)}</span>
          <span>{duration > 0 ? fmt(duration) : "Voice Note"}</span>
        </div>
      </div>
    </div>
  );
}

interface ChatBoxProps {
  activeChat: Chat;
  myAvatar: string;
  onSendMessage: (msg: MessageType, replyType: string) => void;
}

export default function ChatBox({
  activeChat,
  myAvatar,
  onSendMessage,
}: ChatBoxProps) {
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    progress: number;
  } | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recordTimerRef = useRef<number | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const prevChatIdRef = useRef<string | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      const isSameChat = prevChatIdRef.current === activeChat?.id;
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: isSameChat ? "smooth" : "auto",
      });
    }
    prevChatIdRef.current = activeChat?.id || null;
  }, [activeChat?.messages, activeChat?.isTyping, activeChat?.id]);

  useEffect(() => {
    if (isRecording) {
      recordTimerRef.current = window.setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordTimerRef.current) clearInterval(recordTimerRef.current);
      setRecordDuration(0);
    }
    return () => {
      if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    };
  }, [isRecording]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };
    if (showEmojiPicker) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showEmojiPicker]);

  const fmt = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setSelectedFile(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please upload PDF files only");
        return;
      }
      setSelectedImage(null);
      setSelectedFile({ name: file.name, progress: 0 });
      let progress = 0;
      const interval = window.setInterval(() => {
        progress += 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setSelectedFile((prev) => (prev ? { ...prev, progress } : null));
      }, 100);
    }
  };

  const stopMediaStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.start(100);
      setSelectedImage(null);
      setSelectedFile(null);
      setIsRecording(true);
      toast.success("Recording started...");
    } catch {
      toast.error(
        "Microphone access denied. Please allow microphone permission.",
      );
    }
  };

  const stopAndSendRecording = () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const audioUrl = URL.createObjectURL(blob);
      const newMsg: MessageType = {
        id: `msg_${Date.now()}`,
        sender: "me",
        audio: audioUrl,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      onSendMessage(newMsg, "audio");
    };

    mediaRecorderRef.current.stop();
    stopMediaStream();
    setIsRecording(false);
  };

  const cancelRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.ondataavailable = null;
      mediaRecorderRef.current.stop();
    }
    stopMediaStream();
    audioChunksRef.current = [];
    setIsRecording(false);
    toast.error("Recording cancelled");
  };

  const handleSend = () => {
    if (!inputText.trim() && !selectedImage && !selectedFile) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newMsg: MessageType = {
      id: `msg_${Date.now()}`,
      sender: "me",
      timestamp,
    };
    let replyType = "text";

    if (selectedFile) {
      newMsg.file = {
        name: selectedFile.name,
        loadingProgress: selectedFile.progress,
      };
      replyType = "file";
      setSelectedFile(null);
    } else {
      if (selectedImage) {
        newMsg.image = selectedImage;
        replyType = "image";
        setSelectedImage(null);
      }
      if (inputText.trim()) {
        newMsg.text = inputText.trim();
        setInputText("");
      }
    }

    onSendMessage(newMsg, replyType);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInputText((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="w-[796px] bg-[#FAFAFA] flex flex-col h-full overflow-hidden rounded-xl pb-4 p-6">
      <div className="p-4 border-b border-[#D9D9D9] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={activeChat.avatar}
              alt={activeChat.username}
              className="w-11.25 h-11.25 rounded-full object-cover border border-neutral-100"
            />
            <span className="absolute bottom-0 left-0 w-3.25 h-3.25 bg-[#4CD964] border-2 border-white rounded-full" />
          </div>

          <div className="flex flex-col">
            <span className="text-[0.9375rem] font-semibold text-[#2E2E2E]">
              {activeChat.username}
            </span>
            <span className="text-[11px] text-[#818187]">
              {activeChat.isTyping ? "Typing..." : ""}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-neutral-500">
          <button className="p-1 hover:bg-neutral-50 rounded-full hover:text-primary transition-colors">
            <SearchIcon className="w-5 h-5" />
          </button>
          <button className="p-1 hover:bg-neutral-50 rounded-full hover:text-red-500 transition-colors">
            <HeartIcon className="w-5 h-4.75" />
          </button>
          <button className="p-1 hover:bg-neutral-50 rounded-full hover:text-primary transition-colors">
            <NotificationIcon className="w-5 h-5.25" />
          </button>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-[#FAFBFD] space-y-4"
      >
        {activeChat.messages.map((msg) => {
          const isMe = msg.sender === "me";
          return (
            <div
              key={msg.id}
              className={`flex gap-1 max-w-[75%] ${isMe ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              <img
                src={isMe ? myAvatar : activeChat.avatar}
                className="w-6.25 h-6.25 rounded-full object-cover mt-auto shrink-0"
                alt="avatar"
              />
              <div className="flex flex-col">
                <div
                  className={`p-3 rounded-[0.625rem] ${
                    isMe
                      ? "bg-[#F1F1F1] text-primary font-medium rounded-br-none"
                      : "bg-[#F1F1F1] text-[#2E2E2E] rounded-bl-none"
                  } shadow-[0_1px_3px_rgba(0,0,0,0.05)]`}
                >
                  {msg.image && (
                    <div className="mb-2 max-w-[280px] rounded-lg overflow-hidden border border-neutral-200">
                      <img
                        src={msg.image}
                        alt="Sent attachment"
                        className="w-full object-cover"
                      />
                    </div>
                  )}

                  {msg.file && (
                    <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white border border-neutral-200 text-neutral-800 text-xs min-w-[200px]">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-8 h-8 text-red-500 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="flex text-[1rem] flex-col truncate">
                          <span className="font-semibold truncate">
                            {msg.file.name}
                          </span>
                          <span className="text-neutral-400">PDF Document</span>
                        </div>
                      </div>
                      {msg.file.loadingProgress !== undefined &&
                        msg.file.loadingProgress < 100 && (
                          <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden mt-2">
                            <div
                              className="bg-primary h-1.5 transition-all duration-300"
                              style={{ width: `${msg.file.loadingProgress}%` }}
                            />
                          </div>
                        )}
                    </div>
                  )}

                  {msg.audio && <RealAudioPlayer src={msg.audio} />}

                  {msg.text && (
                    <p className="text-[1rem] leading-[100%] wrap-break-words">
                      {msg.text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {activeChat.isTyping && (
          <div className="flex gap-3 max-w-[75%] mr-auto items-end animate-fade-in">
            <img
              src={activeChat.avatar}
              className="w-8 h-8 rounded-full object-cover shrink-0 border border-neutral-100"
              alt="avatar"
            />
            <div className="p-3 bg-[#F1F1F1] rounded-2xl rounded-tl-none shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-1.5 py-1 px-0.5">
                <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
      </div>

      {(selectedImage || selectedFile) && (
        <div className="px-4 py-2 border-t border-[#F1F1F1] bg-neutral-50 flex items-center justify-between shrink-0">
          {selectedImage && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded border overflow-hidden bg-white shrink-0">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-neutral-700">
                  Selected Image
                </span>
              </div>
            </div>
          )}
          {selectedFile && (
            <div className="flex items-center gap-3 flex-1 max-w-[80%]">
              <div className="w-10 h-10 rounded bg-[#FFEEEE] text-red-500 flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h2a2 2 0 002-2V4a2 2 0 00-2-2H9z" />
                </svg>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-xs font-semibold text-neutral-700 truncate">
                  {selectedFile.name}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-24 bg-neutral-200 h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-1"
                      style={{ width: `${selectedFile.progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-neutral-400">
                    {selectedFile.progress}%
                  </span>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={() => {
              setSelectedImage(null);
              setSelectedFile(null);
            }}
            className="p-1 hover:bg-neutral-200 rounded-full text-neutral-500 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {isRecording && (
        <div className="px-4 py-3 border-t border-[#F1F1F1] bg-[#FFF8F2] flex items-center justify-between shrink-0 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <span className="text-xs font-semibold text-neutral-800">
              Recording Voice Note: {fmt(recordDuration)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={cancelRecording}
              className="px-3 py-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 text-xs font-semibold transition"
            >
              Cancel
            </button>
            <button
              onClick={stopAndSendRecording}
              className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/95 transition shadow-sm"
            >
              Stop &amp; Send
            </button>
          </div>
        </div>
      )}

      {!isRecording && (
        <ChatInputBar
          inputText={inputText}
          setInputText={setInputText}
          handleSend={handleSend}
          selectedFile={selectedFile}
          handleFileSelect={handleFileSelect}
          handleImageSelect={handleImageSelect}
          startRecording={startRecording}
          showEmojiPicker={showEmojiPicker}
          setShowEmojiPicker={setShowEmojiPicker}
          handleEmojiClick={handleEmojiClick}
          emojiPickerRef={emojiPickerRef}
        />
      )}
    </div>
  );
}
