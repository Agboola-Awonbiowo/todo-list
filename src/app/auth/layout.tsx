"use client";
import background from "@public/images/background.jpeg";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex overflow-x-hidden px-[16px] xl:px-0">
      <div className="flex-1 w-full xl:w-1/2 xl:pt-[100px] pt-[40px] flex  overflow-y-scroll no-scrollbar  justify-center">
        <div className="flex flex-col md:items-center">
          <div className="flex flex-col h-full">
            <h1 className="text-black text-2xl font-bold">Welcome Back 👋</h1>
            <p className="font-medium md:w-[360px] mt-[20px]">
              Today is a new day. It's your day. You shape it. Sign in to start
              managing your projects.
            </p>
            <div className="flex-1 w-full md:w-[360px] lg:mb-[30px]">
              {children}
            </div>
            <footer className="lg:w-full text-center pb-[20px]">
              <p className="text-gray-300">&copy; 2023 ALL RIGHTS RESERVED</p>
            </footer>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 h-full hidden p-5 lg:block">
        <Image
          className="h-full rounded-[20px] w-full"
          src={background}
          alt=""
        />
      </div>
    </div>
  );
}
