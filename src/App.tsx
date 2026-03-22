/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AIAssistant from './components/AIAssistant';
import { AssistantType } from './types';

export default function App() {
  const [activeAssistant, setActiveAssistant] = useState<AssistantType>('email');

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden">
      <Sidebar 
        activeId={activeAssistant} 
        onSelect={setActiveAssistant} 
      />
      
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="min-h-full">
          <AIAssistant assistantId={activeAssistant} />
        </div>
      </main>
    </div>
  );
}
