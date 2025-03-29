
// components/groups/GroupCard.tsx
import { formatDistance } from 'date-fns';
import { GroupRole } from '@prisma/client';

interface GroupCardProps {
  group: any;
  role: string;
  statusUpdate?: any;
  onCreateUpdate: () => void;
  onViewDetails: () => void;
}

export function GroupCard({
  group,
  role,
  statusUpdate,
  onCreateUpdate,
  onViewDetails,
}: GroupCardProps) {
  const canCreateUpdate = !statusUpdate || new Date(statusUpdate.expiresAt) < new Date();
  
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{group.name}</h3>
            <p className="text-sm text-gray-500">
              Created {formatDistance(new Date(group.createdAt), new Date(), { addSuffix: true })}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {group.description || "No description provided"}
            </p>
          </div>
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
            {role}
          </span>
        </div>

        <div className="mt-4 pt-3 border-t flex justify-between">
          <button
            onClick={onViewDetails}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Details
          </button>
          
          <button
            onClick={onCreateUpdate}
            disabled={!canCreateUpdate}
            className={`px-3 py-1 rounded text-sm font-medium ${
              canCreateUpdate
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {statusUpdate && new Date(statusUpdate.expiresAt) > new Date()
              ? "Update Available in " + formatDistance(new Date(statusUpdate.expiresAt), new Date())
              : "Create Status Update"}
          </button>
        </div>
      </div>
      
      {statusUpdate && new Date(statusUpdate.expiresAt) > new Date() && (
        <div className="p-3 bg-gray-50 border-t">
          <div className="flex items-start">
            {statusUpdate.imageUrl && (
              <div className="flex-shrink-0 mr-3">
                <img 
                  src={statusUpdate.imageUrl} 
                  alt="Status update" 
                  className="w-16 h-16 rounded object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-medium">
                {statusUpdate.heading || "Status update"}
              </p>
              <p className="text-xs text-gray-500">
                Expires {formatDistance(new Date(statusUpdate.expiresAt), new Date(), { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}