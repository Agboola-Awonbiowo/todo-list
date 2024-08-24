"use client";
import { Inputfield } from "@/shared/inputfield";
import React, { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="mt-[20px]">
      <Inputfield label="Email" placeholder="Example@gmail.com" type="email" />
    </div>
  );
};

export default page;
