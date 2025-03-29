import { UserStatus } from "@prisma/client";

interface UserStatusBadgeProps {
  status: UserStatus;
}

export default function UserStatusBadge({ status }: UserStatusBadgeProps) {
  let badgeColor = "";
  
  switch (status) {
    case "ACTIVE":
      badgeColor = "bg-green-100 text-green-800";
      break;
    case "BANNED":
      badgeColor = "bg-red-100 text-red-800";
      break;
    case "SUSPENDED":
      badgeColor = "bg-yellow-100 text-yellow-800";
      break;
    default:
      badgeColor = "bg-gray-100 text-gray-800";
  }
  
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeColor}`}>
      {status}
    </span>
  );
}

