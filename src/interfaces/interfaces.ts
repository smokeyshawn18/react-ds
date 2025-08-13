// interfaces/User.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Form-specific type: removes id & role, adds phone
export type UserFormData = Omit<User, "id" | "role"> & {
  phone: string;
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: "small" | "medium" | "large";
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
}
