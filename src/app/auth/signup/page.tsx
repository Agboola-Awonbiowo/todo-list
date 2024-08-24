"use client";
import { Button } from "@/shared/button";
import { Inputfield } from "@/shared/inputfield";
import React, { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="mt-[20px]">
      <Inputfield label="Email" placeholder="Example@gmail.com" type="email" />
      <div className="mt-[18px]">
        <Button type="submit">Send</Button>
      </div>
    </div>
  );
};

export default page;
