import type { Column } from "../interfaces/dataTableInterface";
import type { User } from "../types/types";

const columns: Column<User>[] = [
  { key: "name", label: "Full Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "role", label: "Role", sortable: false },
];

export default columns;
