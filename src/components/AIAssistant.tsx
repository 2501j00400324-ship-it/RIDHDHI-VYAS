import React, { useState } from 'react';
import { ASSISTANTS, AssistantType } from '../types';
import { generateResponse } from '../services/gemini';
import ReactMarkdown from 'react-markdown';
import { Copy, Send, Loader2, Check } from 'lucide-react';
import * as Icons from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AIAssistantProps {
  assistantId: AssistantType;
}

export default function AIAssistant({ assistantId }: AIAssistantProps) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const assistant = ASSISTANTS.find(a => a.id === assistantId)!;

  const handleGenerate = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    setResponse('');
    const result = await generateResponse(input, assistant.systemInstruction);
    setResponse(result);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{assistant.title}</h1>
        <p className="text-zinc-500">{assistant.description}</p>
      </div>

      <div className="relative group">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={assistant.placeholder}
          className="w-full min-h-[160px] p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all resize-none text-zinc-800 placeholder:text-zinc-400"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
              handleGenerate();
            }
          }}
        />
        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
          <span className="text-xs text-zinc-400 opacity-0 group-focus-within:opacity-100 transition-opacity">
            Ctrl + Enter to send
          </span>
          <button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-xl transition-all",
              loading || !input.trim() 
                ? "bg-zinc-100 text-zinc-400 cursor-not-allowed" 
                : "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-95 shadow-lg shadow-zinc-200"
            )}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {response && (
        <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={copyToClipboard}
              className="p-2 bg-white/80 backdrop-blur border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors text-zinc-600"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="p-8 bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="markdown-body">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}

      {!response && !loading && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-12">
          <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center">
            {React.createElement((Icons as any)[assistant.icon], { className: "w-8 h-8 text-zinc-400" })}
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-zinc-900">Ready to assist</h3>
            <p className="text-sm text-zinc-500 max-w-xs">
              Describe what you need help with above and I'll generate a professional response for you.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
