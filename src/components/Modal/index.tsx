import { useState } from "react";
import Modal from "./Modal";

import type { UserFormData } from "../../interfaces/interfaces";
import UserForm from "../Forms/UserFormModal";

export default function UserModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleFormSubmit(data: UserFormData) {
    alert(`Submitted:\n${JSON.stringify(data, null, 2)}`);
    setIsModalOpen(false);
  }

  return (
    <div className="flex flex-col items-center justify-center mt-4 gap-4">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setIsModalOpen(true)}
      >
        Open User Form
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="User Information"
        size="medium"
        closeOnOverlayClick={true}
        closeOnEscape={true}
      >
        <UserForm
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
