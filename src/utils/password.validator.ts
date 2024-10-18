export function validatePassword(password: string): string[] {
  const errors: string[] = [];
  const minLength = 8;

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long.`);
  }
  if (!/[a-zA-Z]/.test(password)) {
    errors.push('Password must contain at least one letter.');
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number.');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character.');
  }

  return errors;
}
