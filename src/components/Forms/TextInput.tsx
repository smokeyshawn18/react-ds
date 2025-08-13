import React from "react";
import type { BaseInputProps } from "../../interfaces/formInterfaces";

interface TextInputProps extends BaseInputProps<string> {
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  error,
  required,
  disabled,
  helperText,
  onChange,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="space-y-1">
      <label className="block font-medium">
        {label} {required && <span className="text-yellow-600">*</span>}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border px-3 py-2 rounded ${
          error ? "border-yellow-600" : "border-gray-300"
        } ${disabled ? "bg-gray-100" : "bg-white"}`}
      />
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
      {error && <p className="text-sm text-yellow-600">{error}</p>}
    </div>
  );
};
