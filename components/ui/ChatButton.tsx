"use client";

import { MessageSquareText } from "lucide-react";

import { openChat } from "@/lib/chat/open-chat";

const variants = {
  primary:
    "bg-sdi-strong text-white hover:bg-ink active:translate-y-px shadow-[0_1px_2px_rgba(11,22,64,0.2),0_4px_12px_-4px_rgba(10,98,201,0.5)]",
  quiet: "bg-paper text-ink border border-grid hover:border-sdi hover:text-sdi-strong",
} as const;

interface ChatButtonProps {
  section: string;
  variant?: keyof typeof variants;
  className?: string;
  children?: React.ReactNode;
}

/** Único llamado a la acción del sitio: abre el chat indicando la sección de origen. */
export function ChatButton({ section, variant = "primary", className = "", children = "Habla con SDI" }: ChatButtonProps) {
  return (
    <button
      type="button"
      onClick={() => openChat(section)}
      className={`inline-flex items-center justify-center gap-2 rounded-[3px] px-5 py-3 text-[0.95rem] font-semibold transition-colors duration-150 ${variants[variant]} ${className}`}
    >
      <MessageSquareText aria-hidden size={18} strokeWidth={2} />
      {children}
    </button>
  );
}
