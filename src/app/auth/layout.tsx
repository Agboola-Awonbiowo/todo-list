/* eslint-disable react/no-unescaped-entities */
"use client";
import background from "@public/images/background.jpeg";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex  overflow-hidden px-[16px] xl:px-0">
      <div className="pt-[40px] xl:w-1/2 xl:pt-[150px] md:flex justify-center pb-5">
        <div className="flex flex-col">
          <h1 className="text-black text-2xl font-bold">Welcome Back 👋</h1>
          <p className="font-medium lg:w-[360px] mt-[20px]">
            Today is a new day. It's your day. You shape it. Sign in to start
            managing your projects.
          </p>
          <div className="flex-1">{children}</div>
          <footer className="text-center md:w-screen lg:w-full">
            <p className="text-gray-300">&copy; 2023 ALL RIGHTS RESERVED</p>
          </footer>
        </div>
      </div>
      <div className="xl:w-1/2 h-full rounded-full p-5 hidden lg:block">
        <Image
          className="h-full rounded-[20px] object-cover"
          src={background}
          alt=""
        />
      </div>
    </div>
  );
}
