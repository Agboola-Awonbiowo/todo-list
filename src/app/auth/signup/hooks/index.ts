import { useState } from 'react';
import { z, ZodError } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm, SubmitHandler } from 'react-hook-form';

export type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = z.object({
  email: z.string().email({ message: 'Invalid email. Check that the email you entered is correct and try again.' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[@$!%*?&]/, 'Password must contain at least one special character'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Password confirmation mismatch. Try again'
});

export const useForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useReactHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Implement form submission logic here
      console.log(data);
      // For example, you might send a POST request to an API
      // await api.submitForm(data);
      // reset();
    } catch (error) {
      if (error instanceof ZodError) {
        setSubmissionError('Form validation failed.');
      } else {
        setSubmissionError('An error occurred during submission.');
      }
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    submissionError,
    onSubmit,
  };
};
