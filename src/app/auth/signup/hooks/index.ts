import { auth, createUserWithEmailAndPassword } from "@/app/firebaseConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm as useReactHookForm } from "react-hook-form";
import { z } from "zod";

export type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = z
  .object({
    email: z.string().email({
      message:
        "Invalid email. Check that the email you entered is correct and try again.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password confirmation mismatch. Try again",
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
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    setSubmissionError(null);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push("/auth/login");
      reset();
    } catch (error: any) {
      if (error.code) {
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
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem("authToken", token);
      router.push("/todo");
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
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem("authToken", token);
      router.push("/todo");
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
