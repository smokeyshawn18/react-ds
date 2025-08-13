export interface BaseInputProps<T> {
  label: string;
  value: T;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  onChange: (value: T) => void;
}

export interface Option {
  label: string;
  value: string;
}

export interface FormData {
  username: string;
  email: string;
  role: string;
  profilePic: File | null;
  birthDate: string;
}
