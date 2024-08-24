import React from "react";
import SpinnerIcon from "../spinner";


interface ButtonProps {
  children?: React.ReactNode;
  type: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = "submit",
  onClick,
  disabled,
  isLoading,
  className,
  ...rest
}) => {
  const defaultClass = `h-[56px] font-semibold  w-full rounded-[8px] text-white bg-primaryColor ${
    disabled && "cursor-not-allowed opacity-30"
  }`;
  return (
    <button
      onClick={onClick}
      type={type}
      {...rest}
      disabled={disabled}
      className={`${defaultClass} ${className}`}
    >
      <span className="flex justify-center items-center gap-x-2">
        {children}
        {isLoading && <SpinnerIcon className="h-[24px] w-[24px]" />}
      </span>
    </button>
  );
};
