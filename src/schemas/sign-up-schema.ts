import { z } from 'zod';

// Shared rule for first and last name.
const nameField = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .min(2, `${label} must be at least 2 characters.`)
    .max(30, `${label} must be 30 characters or fewer.`);

export const signUpSchema = z
  .object({
    firstName: nameField('First name'),
    lastName: nameField('Last name'),
    email: z
      .string()
      .trim()
      .min(1, 'Email is required.')
      .pipe(z.email('Please enter a valid email address.')),

    // Passwords are not trimmed: spaces can be intentional characters in a password.
    password: z
      .string()
      .min(1, 'Password is required.')
      .min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'], // will attach the error to the Confirm password field
  });


export type SignUpFormData = z.infer<typeof signUpSchema>;