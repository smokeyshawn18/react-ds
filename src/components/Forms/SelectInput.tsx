import React, { useState, useMemo, useCallback } from "react";
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

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value.trimStart()); // prevent leading spaces
    },
    []
  );

  const handleSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const filteredOptions = useMemo(() => {
    if (!searchable || !search) return options;
    const lowerSearch = search.toLowerCase();
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(lowerSearch)
    );
  }, [search, options, searchable]);

  if (!options.length) {
    return <p className="text-sm text-gray-500">No options available</p>;
  }

  return (
    <div className="space-y-1">
      {label && (
        <label className="block font-medium">
          {label} {required && <span className="text-yellow-600">*</span>}
        </label>
      )}

      {searchable && (
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="w-full border border-gray-300 px-3 py-1 rounded"
          disabled={disabled}
        />
      )}

      <select
        value={value}
        onChange={handleSelectChange}
        disabled={disabled}
        required={required}
        className={`w-full border px-3 py-2 rounded focus:outline-none ${
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
