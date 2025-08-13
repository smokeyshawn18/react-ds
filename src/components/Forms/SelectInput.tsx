import React, { useState, useMemo } from "react";
import type { BaseInputProps, Option } from "../../interfaces/formInterfaces";

interface SelectInputProps extends BaseInputProps<string> {
  options: Option[];
  searchable?: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  error,
  required,
  disabled,
  helperText,
  onChange,
  options,
  searchable = false,
}) => {
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchable) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, options, searchable]);

  return (
    <div className="space-y-1">
      <label className="block font-medium">
        {label} {required && <span className="text-yellow-600">*</span>}
      </label>
      {searchable && (
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-3 py-1 rounded border-gray-300"
          disabled={disabled}
        />
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        className={`w-full border px-3 py-2 rounded ${
          error ? "border-yellow-600" : "border-gray-300"
        } ${disabled ? "bg-gray-100" : "bg-white"}`}
      >
        <option value="">Select...</option>
        {filteredOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
      {error && <p className="text-sm text-yellow-600">{error}</p>}
    </div>
  );
};
