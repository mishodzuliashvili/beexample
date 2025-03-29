
// components/groups/GroupDetailsModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { getGroupDetails } from './actions';
import { formatDistance } from 'date-fns';

interface GroupDetailsModalProps {
  group: any;
  userId: string;
  onClose: () => void;
}

export function GroupDetailsModal({ group, userId, onClose }: GroupDetailsModalProps) {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getGroupDetails(group.id);
        setDetails(data);
      } catch (err) {
        setError('Failed to load group details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDetails();
  }, [group.id]);
  
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-lg w-full p-6">
          <div className="text-center py-8">Loading group details...</div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-lg w-full p-6">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={onClose}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{group.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600">{group.description || "No description provided"}</p>
          <p className="text-sm text-gray-500 mt-1">
            Created {formatDistance(new Date(group.createdAt), new Date(), { addSuffix: true })}
          </p>
        </div>
        
        {details?.owner && (
          <div className="mb-4">
            <h3 className="font-medium text-gray-700">Owner</h3>
            <div className="flex items-center mt-2">
              <div className="flex-shrink-0 mr-2">
                <img
                  src={details.owner.image || "/placeholder-avatar.png"}
                  alt={details.owner.name}
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{details.owner.name}</p>
                <p className="text-xs text-gray-500">{details.owner.email}</p>
              </div>
            </div>
          </div>
        )}
        
        {details?.members && (
          <div>
            <h3 className="font-medium text-gray-700 mb-2">
              Members ({details.members.length})
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {details.members.map((member: any) => (
                <div key={member.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-2">
                      <img
                        src={member.user.image || "/placeholder-avatar.png"}
                        alt={member.user.name}
                        className="w-6 h-6 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.user.name}</p>
                      <p className="text-xs text-gray-500">
                        Joined {formatDistance(new Date(member.createdAt), new Date(), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}