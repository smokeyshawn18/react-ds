import React, { useState, useEffect } from "react";
import { TextInput } from "./TextInput";
import { SelectInput } from "./SelectInput";
import { FileUpload } from "./FileUpload";
import { DatePicker } from "./DatePicker";
import type { FormData } from "../../interfaces/formInterfaces";
import { validateForm } from "../../utils/mainformValidation";

const roles = [
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
];

export function MainForm() {
  const [form, setForm] = useState<FormData>({
    username: "",
    email: "",
    role: "",
    profilePic: null,
    birthDate: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  // Validate on each form change (live validation)
  useEffect(() => {
    setErrors(validateForm(form));
  }, [form]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    alert(`Form submitted successfully!\n${JSON.stringify(form, null, 2)}`);
    // proceed with submit logic here...
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-6 p-4 border rounded shadow"
      noValidate
    >
      <TextInput
        label="Username"
        value={form.username}
        onChange={(val) => setForm((f) => ({ ...f, username: val }))}
        error={errors.username}
        required
        placeholder="Enter your username"
      />

      <TextInput
        label="Email"
        value={form.email}
        onChange={(val) => setForm((f) => ({ ...f, email: val }))}
        error={errors.email}
        required
        type="email"
        placeholder="you@example.com"
      />

      <SelectInput
        label="Role"
        value={form.role}
        onChange={(val) => setForm((f) => ({ ...f, role: val }))}
        options={roles}
        error={errors.role}
        required
        searchable
      />

      <FileUpload
        label="Profile Picture"
        value={form.profilePic}
        onChange={(file) => setForm((f) => ({ ...f, profilePic: file }))}
        accept="image/*"
        helperText="Upload your profile photo"
      />

      <DatePicker
        label="Birth Date"
        value={form.birthDate}
        onChange={(val) => setForm((f) => ({ ...f, birthDate: val }))}
        error={errors.birthDate}
        required
        min="1900-01-01"
        max={new Date().toISOString().split("T")[0]}
      />

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={Object.keys(errors).length > 0}
      >
        Submit
      </button>
    </form>
  );
}
