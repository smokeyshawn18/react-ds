import React from "react";
import type { BaseInputProps } from "../../interfaces/formInterfaces";

interface DatePickerProps extends BaseInputProps<string> {
  min?: string;
  max?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  error,
  required,
  disabled,
  helperText,
  onChange,
  min,
  max,
}) => {
  return (
    <div className="space-y-1">
      <label className="block font-medium">
        {label} {required && <span className="text-yellow-600">*</span>}
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        required={required}
        disabled={disabled}
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
