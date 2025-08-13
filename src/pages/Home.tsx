import { useState } from "react";
import WhiteLabelDataTable from "../components/Task5/WhiteLabelTab";
import { users } from "../data/users";
import columns from "../data/column";

export const Home = () => {
  const [page, setPage] = useState(1);
  return (
    <div>
      <WhiteLabelDataTable
        data={users}
        columns={columns}
        pagination={{ page, pageSize: 3, total: users.length }}
        onPageChange={setPage}
        clientId="client-b"
      />
    </div>
  );
};
