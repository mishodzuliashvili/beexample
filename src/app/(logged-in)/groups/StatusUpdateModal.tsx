
// components/groups/StatusUpdateModal.tsx
'use client';

import { useState } from 'react';
import { createStatusUpdate } from './actions';

interface StatusUpdateModalProps {
  group: any;
  userId: string;
  onClose: () => void;
}

export function StatusUpdateModal({ group, userId, onClose }: StatusUpdateModalProps) {
  const [heading, setHeading] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [groups, setGroups] = useState<any[]>([group]);
  const [availableGroups, setAvailableGroups] = useState<any[]>([]);

  // For adding the same status update to multiple groups
  // In a real app, you'd fetch available groups from the server
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!heading.trim() && !imageUrl.trim()) {
      setError('Please provide at least a heading or image URL');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create the same status update for all selected groups
      const groupIds = groups.map(g => g.id);
      
      await createStatusUpdate({
        heading: heading.trim(),
        imageUrl: imageUrl.trim(),
        userId,
        groupIds,
        expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 hours from now
      });
      
      onClose();
    } catch (err) {
      setError('Failed to create status update. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Status Update</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heading
            </label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="What's on your mind?"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">
              Your status will be visible for 6 hours and cannot be updated during this time.
            </p>
            
            <p className="text-sm font-medium text-gray-700 mb-1">
              Posting to:
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {groups.map(g => (
                <div key={g.id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {g.name}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isSubmitting ? 'Posting...' : 'Post Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}