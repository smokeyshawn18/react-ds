// src/components/SlowUserList.tsx
import React, { useState, useMemo, useCallback } from "react";
import UserCard from "./UserCard";
import type { User, Department } from "../../types/types";

interface ShowUserListProps {
  users: User[];
  departments: Department[];
  onUserSelect: (user: User) => void;
}

const ShowUserList: React.FC<ShowUserListProps> = ({
  users,
  departments,
  onUserSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Map departments for quick lookup
  const departmentMap = useMemo(() => {
    const map: Record<string, Department> = {};
    departments.forEach((d) => {
      map[d.id] = d;
    });
    return map;
  }, [departments]);

  // Filter & sort users
  const filteredSortedUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return users
      .filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term);
        const matchesDepartment =
          selectedDepartment === "all" ||
          user.department === selectedDepartment;
        return matchesSearch && matchesDepartment;
      })
      .sort(
        (a, b) =>
          new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime()
      );
  }, [users, searchTerm, selectedDepartment]);

  const handleUserSelect = useCallback(
    (user: User) => {
      onUserSelect(user);
    },
    [onUserSelect]
  );

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="flex-1 border border-gray-300 rounded px-3 py-2"
        />
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="all">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        {filteredSortedUsers.length > 0 ? (
          filteredSortedUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClick={handleUserSelect}
              department={departmentMap[user.department]}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
};

export default ShowUserList;
