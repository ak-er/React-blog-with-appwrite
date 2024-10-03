import React, { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClass?: string;
}

export const Input = React.forwardRef(
  (
    {
      type = "text",
      label,
      labelClass = "",
      className = "",
      ...props
    }: InputProps,
    ref: React.LegacyRef<HTMLInputElement>,
  ) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label className={labelClass} htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          className={`w-full ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
