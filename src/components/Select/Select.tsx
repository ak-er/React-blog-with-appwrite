import React, { useId } from "react";

interface SelectProps {
  label?: string;
  className?: string;
  options?: { value: string; title: string }[];
}

export const Select = React.forwardRef(
  (
    { label, className = "", options = [], ...props }: SelectProps,
    ref: React.LegacyRef<HTMLSelectElement>,
  ) => {
    const id = useId();
    return (
      <>
        {label && <label htmlFor={id}>{label}</label>}
        <select className={`${className}`} ref={ref} id={id} {...props}>
          {options &&
            options.map((option) => (
              <option key={option.title} value={option.value}>
                {option.title}
              </option>
            ))}
        </select>
      </>
    );
  },
);
