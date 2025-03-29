// components/dashboard/GroupFilter.tsx
"use client";
import React, { useState } from "react";
import { Users, ChevronDown, Check } from "lucide-react";
import { Group } from "@prisma/client";

interface GroupFilterProps {
  groups: Group[];
  onFilterChange: (selectedGroups: string[]) => void;
}

const GroupFilter = ({ groups, onFilterChange }: GroupFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  
  const handleToggleGroup = (groupId: string) => {
    const newSelection = selectedGroups.includes(groupId)
      ? selectedGroups.filter(id => id !== groupId)
      : [...selectedGroups, groupId];
    
    setSelectedGroups(newSelection);
    onFilterChange(newSelection);
  };
  
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-500" />
          <span className="font-medium text-gray-700">
            {selectedGroups.length === 0
              ? "Filter by groups"
              : `${selectedGroups.length} group${selectedGroups.length > 1 ? 's' : ''} selected`}
          </span>
        </div>
        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg py-2 max-h-64 overflow-y-auto">
          {groups.length === 0 ? (
            <div className="px-4 py-2 text-gray-500 text-sm">No groups found</div>
          ) : (
            <>
              <div className="px-4 py-2 border-b border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedGroups.length === groups.length) {
                      setSelectedGroups([]);
                      onFilterChange([]);
                    } else {
                      const allGroupIds = groups.map(group => group.id);
                      setSelectedGroups(allGroupIds);
                      onFilterChange(allGroupIds);
                    }
                  }}
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                >
                  {selectedGroups.length === groups.length ? "Deselect all" : "Select all"}
                </button>
              </div>
              
              {groups.map((group) => (
                <div 
                  key={group.id}
                  className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleToggleGroup(group.id)}
                >
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    {selectedGroups.includes(group.id) ? (
                      <div className="h-4 w-4 rounded-sm bg-blue-600 flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    ) : (
                      <div className="h-4 w-4 rounded-sm border border-gray-300"></div>
                    )}
                  </div>
                  
                  <div className="ml-3 flex items-center">
                    {group.image ? (
                      <img 
                        src={group.image} 
                        alt={group.name} 
                        className="h-6 w-6 rounded-full object-cover mr-2"
                      />
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        <Users className="h-3 w-3 text-blue-600" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700">{group.name}</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupFilter;