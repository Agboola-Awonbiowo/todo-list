import { auth } from "@/app/firebaseConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm as useReactHookForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .email(
      "Invalid email. Check that the email you entered is correct and try again."
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /[A-Za-z0-9@#$%^&*]/,
      "Password must contain at least one letter, one number, and one special character"
    ),
});

export type FormValues = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [facebookLoading, setFacebookLoading] = useState<boolean>(false);

  const router = useRouter();

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
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    setSubmissionError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const token = await userCredential.user.getIdToken();

      localStorage.setItem("authToken", token);
      router.push("/todo");
      reset();
    } catch (error: any) {
      setSubmissionError(
        error.code || "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      localStorage.setItem("authToken", token);
      router.push("/todo");
    } catch (error: any) {
      setSubmissionError(
        error.code || "An unexpected error occurred. Please try again."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    setFacebookLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      localStorage.setItem("authToken", token);
      router.push("/todo");
    } catch (error: any) {
      setSubmissionError(
        error.code || "An unexpected error occurred. Please try again."
      );
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
