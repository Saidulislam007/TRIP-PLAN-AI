"use client";

import { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import { interpretAssistantCommand } from "@/lib/services/tripAssistant";
import type { GeneratedTrip } from "@/types/tripPlan";

interface ChatMessage {
  role: "assistant" | "user";
  content: string;
}

const QUICK_PROMPTS = [
  "What if it rains on Day 2?",
  "Make this trip cheaper.",
  "Add more food experiences.",
  "Remove hiking.",
  "Make Day 2 more relaxed.",
];

interface AITravelAssistantProps {
  trip: GeneratedTrip | null;
  onTripUpdate?: (trip: GeneratedTrip) => void;
}

export default function AITravelAssistant({ trip, onTripUpdate }: AITravelAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI travel assistant. How can I help with your trip?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((current) => [...current, { role: "user", content: trimmed }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      if (!trip) {
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content: "Generate a trip first and I'll be able to make live changes to it for you.",
          },
        ]);
        setIsTyping(false);
        return;
      }

      const { reply, updatedTrip } = interpretAssistantCommand(trimmed, trip);
      setMessages((current) => [...current, { role: "assistant", content: reply }]);
      if (updatedTrip) onTripUpdate?.(updatedTrip);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="rounded-[22px] border border-[#DCE6E1] bg-white p-5 shadow-[0_10px_30px_rgba(7,26,22,0.05)]">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4A934]">
          <Sparkles size={16} className="text-[#17211D]" />
        </span>
        <p className="font-serif text-[16px] font-bold text-[#12342D]">Ask TripPlan AI</p>
        <span className="rounded-full bg-[#EEF5F1] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#087F5B]">
          Beta
        </span>
      </div>

      <div className="mt-3 max-h-56 space-y-3 overflow-y-auto custom-scrollbar pr-1">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex max-w-[90%] gap-2 ${message.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
          >
            {message.role === "assistant" && (
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#087F5B] text-white">
                <Bot size={13} />
              </span>
            )}
            <p
              className={`rounded-xl p-2.5 text-[12px] leading-5 ${
                message.role === "user"
                  ? "rounded-tr-sm bg-[#F4A934] text-[#17211D]"
                  : "rounded-tl-sm bg-[#EEF5F1] text-[#30483F]"
              }`}
            >
              {message.content}
            </p>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-1.5 pl-9">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#66736D]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#66736D]" style={{ animationDelay: "0.15s" }} />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#66736D]" style={{ animationDelay: "0.3s" }} />
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => send(prompt)}
            className="rounded-full border border-[#DCE6E1] bg-[#FAFAF7] px-2.5 py-1 text-[10px] font-semibold text-[#30483F] transition-colors hover:border-[#087F5B]/40 hover:bg-[#EEF5F1]"
          >
            {prompt}
          </button>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
        className="mt-3 flex items-center gap-2"
      >
        <label htmlFor="assistant-input" className="sr-only">
          Ask TripPlan AI
        </label>
        <input
          id="assistant-input"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type your question…"
          className="h-10 flex-1 rounded-full border border-[#DCE6E1] bg-[#FAFAF7] px-4 text-[12px] text-[#12342D] outline-none placeholder:text-[#66736D] focus:border-[#087F5B]/50 focus:ring-4 focus:ring-[#087F5B]/[0.08]"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#04271C] text-white transition-colors hover:bg-[#073D31]"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
