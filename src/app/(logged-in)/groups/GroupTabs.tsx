// components/groups/GroupTabs.tsx
'use client';

import { useState } from 'react';

interface GroupTabsProps {
  children: React.ReactNode;
}

export function GroupTabs({ children }: GroupTabsProps) {
  const [activeTab, setActiveTab] = useState<'owned' | 'joined'>('owned');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('owned')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'owned'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Groups You Own
        </button>
        <button
          onClick={() => setActiveTab('joined')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'joined'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Groups You've Joined
        </button>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}








