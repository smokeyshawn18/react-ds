import React, { useState, useMemo, useCallback, useEffect } from "react";

const UserCard = React.memo(({ user, onClick, department }) => {
  const isActive = useMemo(() => {
    return new Date() - new Date(user.lastLogin) < 30 * 24 * 60 * 60 * 1000;
  }, [user.lastLogin]);

  return (
    <div
      onClick={onClick}
      className={`user-card ${isActive ? "active" : "inactive"}`}
    >
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>Department: {department?.name}</p>
      <p>Last Login: {new Date(user.lastLogin).toLocaleDateString()}</p>
      <span>{isActive ? "Active" : "Inactive"}</span>
    </div>
  );
});

const styles = `
.user-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
}
.user-card.active {
  background-color: #e8f5e8;
}
.user-card.inactive {
  background-color: #f5f5f5;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const OptimizedUserList = ({ users, departments, onUserSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Debounce search term updates
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Memoize department map for O(1) lookups
  const departmentMap = useMemo(() => {
    return departments.reduce((map, dept) => {
      map.set(dept.id, dept);
      return map;
    }, new Map());
  }, [departments]);

  // Memoize filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesDepartment =
        selectedDepartment === "all" || user.department === selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }, [users, debouncedSearchTerm, selectedDepartment]);

  // Memoize sorted users (use slice to avoid mutating original)
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      return new Date(b.lastLogin) - new Date(a.lastLogin);
    });
  }, [filteredUsers]);

  // Memoize onClick handler to avoid recreating functions
  const handleUserSelect = useCallback(
    (user) => {
      onUserSelect(user);
    },
    [onUserSelect]
  );

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
      />

      <select
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
      >
        <option value="all">All Departments</option>
        {departments.map((dept) => (
          <option key={dept.id} value={dept.id}>
            {dept.name}
          </option>
        ))}
      </select>

      <div>
        {sortedUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() => handleUserSelect(user)}
            department={departmentMap.get(user.department)}
          />
        ))}
      </div>
    </div>
  );
};
