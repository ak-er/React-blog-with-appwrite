import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  className?: string;
}

export const Button = ({
  children,
  type = "button",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`text-sm block font-semibold leading-6 ml-3 py-2 px-4 rounded-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
