import { useState } from "react";
import type { User } from "../../interfaces/interfaces";
import type { Column } from "../../interfaces/dataTableInterface";
import DataTable from "./DataTable";

const usersData: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "User" },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "User" },
  { id: 4, name: "David", email: "david@example.com", role: "Moderator" },
  { id: 5, name: "Eve", email: "eve@example.com", role: "User" },
  { id: 6, name: "Frank", email: "frank@example.com", role: "User" },
  { id: 7, name: "Grace", email: "grace@example.com", role: "Admin" },
];

const columns: Column<User>[] = [
  { key: "name", label: "Full Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "role", label: "Role", sortable: false },
];

export default function Index() {
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const total = usersData.length;

  // Sorting handler - you can enhance this to sort your actual data.
  // For demo, we'll just log the sort key and direction
  function handleSort(key: string, direction: "asc" | "desc") {
    console.log("Sorting by", key, direction);
    // TODO: implement sorting in real data
  }

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  return (
    <div className="p-4">
      <DataTable<User>
        data={usersData}
        columns={columns}
        onSort={handleSort}
        pagination={{ page, pageSize, total }}
        onPageChange={handlePageChange}
        loading={false}
        emptyMessage="No users found."
      />
    </div>
  );
}
