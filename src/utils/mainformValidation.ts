import type { FormData } from "../interfaces/formInterfaces";

export function validateForm(form: FormData) {
  const errors: Partial<Record<keyof FormData, string>> = {};

  if (!form.username.trim()) errors.username = "Username is required";

  if (!form.email.trim()) errors.email = "Email is required";
  else if (!form.email.includes("@")) errors.email = "Email is invalid";

  if (!form.role) errors.role = "Please select a role";

  if (!form.birthDate) errors.birthDate = "Birth date is required";

  return errors;
}
