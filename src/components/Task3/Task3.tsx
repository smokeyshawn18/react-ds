import { departments } from "../../data/departments";
import { users } from "../../data/users";
import type { User } from "../../types/types";
import ShowUserList from "./ShowUserList";

const Task3: React.FC = () => {
  const handleUserSelect = (user: User) => {
    console.log("Selected user:", user);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">User Management</h1>
      <ShowUserList
        users={users}
        departments={departments}
        onUserSelect={handleUserSelect}
      />
    </div>
  );
};

export default Task3;
