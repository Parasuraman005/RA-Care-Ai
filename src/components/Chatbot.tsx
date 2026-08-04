import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Info, 
  RotateCcw,
  Sparkles,
  MessageSquare
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "../lib/utils";

interface Message {
  role: "user" | "model";
  parts: { text: string }[];
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", parts: [{ text: input }] };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: input,
          history: messages 
        }),
      });
      
      const data = await response.json();
      const aiMessage: Message = { role: "model", parts: [{ text: data.text }] };
      setMessages([...newMessages, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      <div className="bg-white rounded-t-3xl border border-slate-200 border-b-0 p-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-100">
            <Bot className="text-white w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">RA Care Assistant</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Powered by Gemini AI</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setMessages([])}
          className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
          title="Clear Chat"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 bg-white border-x border-slate-200 overflow-y-auto p-6 space-y-6 scroll-smooth" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-2">
              <Sparkles className="text-blue-500 w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">How can I help you today?</h3>
              <p className="text-slate-500 max-w-sm">Ask about RA symptoms, joint health, lifestyle tips, or help summarizing your recent health logs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md">
              {[
                "What are early signs of RA?",
                "Suggest gentle exercises for stiff joints",
                "How does diet affect inflammation?",
                "Explain morning stiffness management"
              ].map((suggestion) => (
                <button 
                  key={suggestion}
                  onClick={() => { setInput(suggestion); }}
                  className="p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 text-sm font-medium text-slate-600 text-left transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex gap-4 max-w-[85%]",
                msg.role === "user" ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-sm",
                msg.role === "user" ? "bg-white border-slate-200" : "bg-blue-600 border-blue-600 text-white"
              )}>
                {msg.role === "user" ? <User className="w-5 h-5 text-slate-600" /> : <Bot className="w-6 h-6" />}
              </div>
              <div className={cn(
                "p-5 rounded-3xl text-sm leading-relaxed",
                msg.role === "user" 
                  ? "bg-slate-900 text-white rounded-tr-none" 
                  : "bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none shadow-sm"
              )}>
                <div className="prose prose-slate max-w-none">
                  <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div className="p-5 bg-slate-50 rounded-3xl rounded-tl-none border border-slate-100 flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Thinking...</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="bg-white rounded-b-3xl border border-slate-200 p-6 pt-2 shadow-inner">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative group">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type your message here..."
              className="w-full p-4 pr-12 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all resize-none font-medium max-h-32"
            />
            <div className="absolute right-3 bottom-3 text-[10px] font-bold text-slate-400 uppercase group-focus-within:opacity-0 transition-opacity">
              Press Enter ↵
            </div>
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={cn(
              "p-4 rounded-2xl transition-all shadow-lg active:scale-95",
              !input.trim() || isLoading
                ? "bg-slate-100 text-slate-300"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100"
            )}
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
        <div className="mt-4 flex items-center gap-2 text-rose-500 bg-rose-50 p-2 px-4 rounded-xl">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <p className="text-[10px] font-bold uppercase tracking-wide">
            AI Assistant is for educational support. Not for diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
}
