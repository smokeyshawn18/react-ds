import React, { useState } from "react";
import type { DragEvent } from "react";
import type { BaseInputProps } from "../../interfaces/formInterfaces";

interface FileUploadProps extends BaseInputProps<File | null> {
  accept?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  value,
  error,
  required,
  disabled,
  helperText,
  onChange,
  accept,
}) => {
  const [dragOver, setDragOver] = useState(false);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onChange(e.dataTransfer.files[0]);
    }
  }

  return (
    <div className="space-y-1">
      <label className="block font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`border-dashed border-2 rounded p-4 text-center cursor-pointer ${
          dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          disabled={disabled}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className="cursor-pointer">
          {value ? value.name : "Drag & drop or click to select a file"}
        </label>
      </div>
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
export default FileUpload;
