// src/components/UserCard.tsx
import React, { useMemo } from "react";
import type { Department, User } from "../../types/types";

interface UserCardProps {
  user: User;
  department?: Department;
  onClick: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = React.memo(
  ({ user, department, onClick }) => {
    const isActive = useMemo(
      () =>
        new Date().getTime() - new Date(user.lastLogin).getTime() <
        30 * 24 * 60 * 60 * 1000,
      [user.lastLogin]
    );

    return (
      <div
        onClick={() => onClick(user)}
        className={`border rounded p-4 mb-3 cursor-pointer transition-colors ${
          isActive ? "bg-green-50" : "bg-gray-50"
        } hover:bg-gray-100`}
      >
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-500">Department: {department?.name}</p>
        <p className="text-sm text-gray-500">
          Last Login: {new Date(user.lastLogin).toLocaleDateString()}
        </p>
        <span
          className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
            isActive ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>
    );
  }
);

export default UserCard;
