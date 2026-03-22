import React from 'react';
import { ASSISTANTS, AssistantType } from '../types';
import * as Icons from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeId: AssistantType;
  onSelect: (id: AssistantType) => void;
}

export default function Sidebar({ activeId, onSelect }: SidebarProps) {
  return (
    <div className="w-72 border-r border-zinc-200 bg-white flex flex-col h-full">
      <div className="p-6 border-b border-zinc-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
            <Icons.Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-zinc-900">WorkPilot AI</h2>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Deputy Manager Assistant</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {ASSISTANTS.map((assistant) => {
          const IconComponent = (Icons as any)[assistant.icon];
          const isActive = activeId === assistant.id;

          return (
            <button
              key={assistant.id}
              onClick={() => onSelect(assistant.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group",
                isActive 
                  ? "bg-zinc-900 text-white shadow-md shadow-zinc-200" 
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              )}
            >
              <IconComponent className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-900"
              )} />
              <div className="flex-1">
                <div className="text-sm font-medium">{assistant.title}</div>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-100">
        <div className="p-4 bg-zinc-50 rounded-xl space-y-3">
          <div className="flex items-center space-x-2 text-zinc-900">
            <Icons.ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Pro Edition</span>
          </div>
          <p className="text-[11px] text-zinc-500 leading-relaxed">
            Optimized for management workflows and professional communication.
          </p>
        </div>
      </div>
    </div>
  );
}
