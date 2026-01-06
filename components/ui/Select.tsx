"use client";

import React from "react";
import { IoIosArrowDown } from "react-icons/io";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  variant?: "default" | "gray" | "outline" | "error" | "success";
  size?: "default" | "sm" | "lg";
  label?: string;
  controlId?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  variant = "default",
  size = "default",
  label,
  controlId,
  options,
  placeholder,
  error,
  className = "",
  ...props
}) => {
  const baseClasses =
    "cursor-pointer w-full rounded-md border font-poppins transition-colors " +
    "focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed appearance-none";

  const variantClasses: Record<NonNullable<SelectProps["variant"]>, string> = {
    default:
      "bg-[var(--color-neutral-white)] border-[var(--color-neutral-gray)] text-[var(--color-neutral-black)] " +
      "focus:border-[var(--color-blue-primary)] focus:ring-0.5 focus:ring-[var(--color-blue-primary)]",

    gray:
      "bg-[var(--color-neutral-surface)] border-[var(--color-neutral-surface)] text-[var(--color-neutral-dark-gray)] " +
      "focus:border-[var(--color-blue-primary)] focus:ring-0.5 focus:ring-[var(--color-blue-primary)]",

    outline:
      "bg-transparent border-2 border-[var(--color-neutral-gray)] text-[var(--color-neutral-black)] " +
      "focus:border-[var(--color-blue-primary)] focus:ring-0.5 focus:ring-[var(--color-blue-primary)]",

    error:
      "bg-[var(--color-neutral-white)] border-[var(--color-red-primary)] text-[var(--color-red-dark)] " +
      "focus:border-[var(--color-red-primary)] focus:ring-0.5 focus:ring-[var(--color-red-primary)]",

    success:
      "bg-[var(--color-neutral-white)] border-[var(--color-green-primary)] text-[var(--color-green-dark)] " +
      "focus:border-[var(--color-green-primary)] focus:ring-0.5 focus:ring-[var(--color-green-primary)]",
  };

  const sizeClasses: Record<NonNullable<SelectProps["size"]>, string> = {
    default: "h-10 px-3 text-sm",
    sm: "h-8 px-2 text-xs",
    lg: "h-12 px-4 text-base",
  };

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={controlId}
          className="block text-sm mb-1 text-[var(--color-neutral-dark-gray)]"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={controlId}
          className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} pr-10`}
          aria-invalid={variant === "error"}
          aria-describedby={error ? `${controlId}-error` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-neutral-dark-gray)] pointer-events-none">
          <IoIosArrowDown className="text-lg" />
        </span>
      </div>

      {error && (
        <p
          id={`${controlId}-error`}
          className="text-xs mt-1 text-[var(--color-red-primary)]"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;



// "use client";
// import React from "react";
// import { IoIosArrowDown } from "react-icons/io";

// interface SelectProps
//   extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
//   variant?: "default" | "gray" | "outline" | "error" | "success";
//   size?: "default" | "sm" | "lg";
//   label?: string;
//   controlId?: string;
//   options: { value: string; label: string }[];
//   placeholder?: string;
//   error?: string;
// }

// export const Select: React.FC<SelectProps> = ({ variant = "default", size = "default", label, controlId, options, placeholder, error, className = "", ...props}) => {
//   const baseClasses =
//     "cursor-pointer w-full rounded-md border font-poppins transition-colors " +
//     "focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed appearance-none " +
//     "placeholder:text-[rgba(0,0,0,0.32)]";

//   const variantClasses: Record<NonNullable<SelectProps["variant"]>, string> = {
//     default: "bg-[var(--color-neutral-white)] border-[var(--color-neutral-gray)] text-[var(--color-neutral-black)] " + "focus:border-[var(--color-blue-primary)] focus:ring-0.5 focus:ring-[var(--color-blue-primary)]",
//     gray: "bg-[var(--color-neutral-surface)] border-[var(--color-neutral-surface)] text-[var(--color-neutral-dark-gray)] " + "focus:border-[var(--color-blue-primary)] focus:ring-0.5 focus:ring-[var(--color-blue-primary)]",
//     outline: "bg-transparent border-2 border-[var(--color-neutral-gray)] text-[var(--color-neutral-black)] " + "focus:border-[var(--color-blue-primary)] focus:ring-0.5 focus:ring-[var(--color-blue-primary)]",
//     error: "bg-[var(--color-neutral-white)] border-[var(--color-red-primary)] text-[var(--color-red-dark)] " + "focus:border-[var(--color-red-primary)] focus:ring-0.5 focus:ring-[var(--color-red-primary)]",
//     success: "bg-[var(--color-neutral-white)] border-[var(--color-green-primary)] text-[var(--color-green-dark)] " + "focus:border-[var(--color-green-primary)] focus:ring-0.5 focus:ring-[var(--color-green-primary)]",
//   };

//   const sizeClasses: Record<NonNullable<SelectProps["size"]>, string> = {
//     default: "h-10 px-3 text-sm",
//     sm: "h-8 px-2 text-xs",
//     lg: "h-12 px-4 text-base",
//   };

//   return (
//     <div className="relative">
//       {label && (<label htmlFor={controlId} className="block text-sm mb-1 text-[var(--color-neutral-dark-gray)]" > {label} </label>)}
//       <div className="relative">
//         <select id={controlId} className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} pr-10`} aria-invalid={variant === "error"} aria-describedby={error ? `${controlId}-error` : undefined} {...props}>
//           {placeholder && ( <option value="" disabled hidden> {placeholder} </option>)}
//           {options.map((option) => ( <option key={option.value} value={option.value}>{option.label}</option> ))}
//         </select>
//         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-neutral-dark-gray)] pointer-events-none">
//           <IoIosArrowDown className="text-lg" />
//         </span>
//       </div>
//       {error && ( <p id={`${controlId}-error`} className="text-xs mt-1 text-[var(--color-red-primary)]"> {error} </p> )}
//     </div>
//   );
// };