"use client";

import { Button } from "@/shared/button";
import { Inputfield } from "@/shared/inputfield";
import FacebookLogo from "@public/images/facebookicon.png";
import GoogleLogo from "@public/images/googleicon.png";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "./hooks";

const SignUpPage = () => {
  const {
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
  } = useAuth();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  return (
    <div className="mt-[20px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Inputfield
            label="Email"
            placeholder="Example@gmail.com"
            type="email"
            {...register("email")}
            disabled={loading}
          />
          {errors.email && (
            <p className="text-darkRed text-xs mt-[5px]">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mt-[16px] relative">
          <Inputfield
            label="Password"
            placeholder="At least 8 characters"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            disabled={loading}
          />
          {errors.password && (
            <p className="text-darkRed text-xs mt-[5px]">
              {errors.password.message}
            </p>
          )}
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer top-[25px]"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <div className="mt-[16px] relative">
          <Inputfield
            label="Confirm Password"
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            disabled={loading}
          />
          {errors.confirmPassword && (
            <p className="text-darkRed text-xs mt-[5px]">
              {errors.confirmPassword.message}
            </p>
          )}
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer top-[25px]"
            onClick={toggleConfirmPasswordVisibility}
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {submissionError && (
          <p className="text-red-600 mt-2">{submissionError}</p>
        )}
        <div className="mt-[30px]">
          <Button isLoading={loading} disabled={loading} type="submit">
            Sign up
          </Button>
        </div>
      </form>
      <div className="flex items-center gap-x-[10px] mt-[30px]">
        <div className="border border-zinc-500 w-full"></div>
        <p>Or</p>
        <div className="border border-zinc-500 w-full"></div>
      </div>
      <Button
        className="flex items-center justify-center w-full px-4 py-2 !bg-green-50 !text-gray-800 border !border-gray-300 rounded-lg shadow-md !hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 my-[30px]"
        aria-label="Login with Google"
        type="button"
        onClick={signInWithGoogle}
        disabled={googleLoading}
        isLoading={googleLoading}
      >
        <Image className="w-[30px]" src={GoogleLogo} alt="Google logo" /> Sign
        in with Google
      </Button>
      <Button
        className="flex items-center justify-center w-full px-4 py-2 !bg-green-50 !text-gray-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        aria-label="Login with Facebook"
        type="button"
        onClick={signInWithFacebook}
        disabled={facebookLoading}
        isLoading={facebookLoading}
      >
        <Image className="w-[24px]" src={FacebookLogo} alt="Facebook logo" />{" "}
        Sign in with Facebook
      </Button>
      <p className="text-center mt-[30px]">
        Already have an account?{" "}
        <Link href="/auth/login">
          <span className="text-blue-500">Login</span>
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
