"use client";
import { Button } from "@/shared/button";
import { Inputfield } from "@/shared/inputfield";
import Link from "next/link";
import React, { FC } from "react";
import { useForm } from "./hooks";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { register, handleSubmit, errors, submissionError, onSubmit } =
    useForm();
  return (
    <div className="mt-[20px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Inputfield
            label="Email"
            placeholder="Example@gmail.com"
            type="email"
            {...register("email")}
          />
          <p className="text-darkRed text-xs mt-[5px]">
            {errors.email?.message}
          </p>
        </div>
        <div className="mt-[16px]">
          <Inputfield
            label="Password"
            placeholder="At leat 8 characters"
            type="password"
            {...register("password")}
          />
          <p className="text-darkRed text-xs mt-[5px]">
            {errors.password?.message}
          </p>
        </div>
        <div className="mt-[16px]">
          <Inputfield
            label="Confirm  Password"
            placeholder="Confirm Password"
            type="password"
            {...register("confirmPassword")}
          />
          <p className="text-darkRed text-xs mt-[5px]">
            {errors.confirmPassword?.message}
          </p>
        </div>
        {submissionError && (
          <p className="text-red-600 mt-2">{submissionError}</p>
        )}
        <div className="mt-[30px]">
          <Button type="submit">Sign up</Button>
        </div>
      </form>
      <div className="flex items-center gap-x-[10px] mt-[30px]">
        <div className="border border-zinc-500 w-full"></div>
        <p>Or</p>
        <div className="border  border-zinc-500 w-full"></div>
      </div>
      <Button
        className="flex items-center justify-center w-full px-4 py-2 !bg-white !text-gray-800 border !border-gray-300 rounded-lg shadow-md !hover:bg-gray-100 focus:outline-none focus:ring-2 !focus:ring-gray-500 my-[30px]"
        aria-label="Login with Google"
        type="button"
      >
        Google login
      </Button>

      <Button
        className="flex items-center justify-center w-full px-4 py-2 !bg-[#4267B2] !text-white rounded-lg shadow-md !hover:bg-[#365899] focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Login with Facebook"
        type="button"
      >
        facebook
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

export default page;
