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

const validationSchema = z
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
    message: "Password confirmation mismatch. Try again.",
  });

export const useAuth = () => {
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [facebookLoading, setFacebookLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useReactHookForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    setSubmissionError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
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

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    handleSocialSignIn(provider, setGoogleLoading);
  };

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    handleSocialSignIn(provider, setFacebookLoading);
  };

  const handleSocialSignIn = async (
    provider: GoogleAuthProvider | FacebookAuthProvider,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    submissionError,
    loading,
    googleLoading,
    facebookLoading,
    onSubmit,
    signInWithGoogle,
    signInWithFacebook,
  };
};
