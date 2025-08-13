// form for Modal

import { useState } from "react";
import type { UserFormData } from "../../interfaces/interfaces";

interface UserFormProps {
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
}

export default function UserForm({
  initialData = { name: "", email: "", phone: "" },
  onSubmit,
  onCancel,
}: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>(initialData);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 w-full">
      <div>
        <label className="block mb-1 text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Phone No</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
