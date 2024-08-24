import Image from "next/image";
import React from "react";

interface InputfieldProps {
  placeholder?: string;
  type: string;
  label?: string;
  htmlFor?: string;
  className?: string;
  value?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  maxLength?: number;
  id?: string;
  list?: string;
  disabled?: boolean;
  pattern?: string;
  icon?: boolean;
}

const Inputfield = React.forwardRef<HTMLInputElement, InputfieldProps>(
  (
    {
      placeholder,
      type,
      label,
      htmlFor,
      className,
      value,
      onKeyDown,
      onFocus,
      autoFocus,
      onChange,
      readonly,
      onPaste,
      maxLength,
      list,
      id,
      disabled,
      pattern,
      icon,
      ...rest
    },
    ref
  ) => {
    const defaultClass =
      "appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full bg-white rounded-[8px] border border-silverCity py-[16px] px-[12px] outline-black focus:ring focus:ring-inputRingColor font-semibold  text-dimGray";
    return (
      <div>
        <label
          className="mb-[3px] text-[14px] font-medium text-dimGray flex items-center gap-x-[2px]"
          htmlFor={htmlFor}
        >
          {label}
        </label>
        <input
          className={`${className} ${defaultClass}`}
          type={type}
          placeholder={placeholder}
          value={value}
          ref={ref}
          disabled={disabled}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          autoFocus={autoFocus}
          onChange={onChange}
          readOnly={readonly}
          onPaste={onPaste}
          maxLength={maxLength}
          list={list}
          pattern={pattern}
          id={id}
          {...rest}
          // @ts-ignore
          onWheel={(e) => e.target.blur()}
        />
      </div>
    );
  }
);

Inputfield.displayName = "Inputfield";

export { Inputfield };
