import { auth } from "@/app/firebaseConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { SubmitHandler, useForm as useReactHookForm } from "react-hook-form";
import { z } from "zod";

export type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = z.object({
  email: z.string().email({
    message:
      "Invalid email. Check that the email you entered is correct and try again.",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      /[A-Za-z0-9@#$%^&*]/,
      "Password must contain at least one letter, one number, and one special character"
    ),
});

export const useForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useReactHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [facebookLoading, setFacebookLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    setSubmissionError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      reset();
    } catch (error: any) {
      if (error.code) {
        console.log(error.code);
        setSubmissionError(error.code);
      } else {
        setSubmissionError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setGoogleLoading(true);
      await signInWithPopup(auth, provider); // You can use signInWithRedirect if you prefer
    } catch (error: any) {
      setSubmissionError(error.code);
    } finally {
      setGoogleLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      setFacebookLoading(true);
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      setSubmissionError(error.code);
    } finally {
      setFacebookLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    submissionError,
    loading,
    onSubmit,
    signInWithGoogle,
    signInWithFacebook,
    googleLoading,
    facebookLoading,
  };
};
