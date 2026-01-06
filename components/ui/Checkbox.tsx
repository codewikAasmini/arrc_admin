"use client";
import React, { forwardRef, useEffect } from "react";
import clsx from "clsx";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "default" | "gray" | "outline" | "error" | "success";
  size?: "default" | "sm" | "lg";
  label?: string;
  controlId?: string;
  indeterminate?: boolean;
  helperText?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({variant = "default", size = "default", label, controlId, indeterminate = false, helperText, className = "", disabled, ...props}, ref ) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    const checkboxRef = ref || internalRef;

    useEffect(() => {
      if (typeof checkboxRef !== "function" && checkboxRef?.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const sizeStyles = {
      sm: { box: "h-4 w-4", label: "text-xs", gap: "gap-2" },
      default: { box: "h-[18px] w-[18px]", label: "text-sm", gap: "gap-2.5" },
      lg: { box: "h-6 w-6", label: "text-base", gap: "gap-3" },
    };

    const baseBox =
      "rounded border appearance-none cursor-pointer transition-all flex items-center justify-center " +
      "checked:bg-blue-600 checked:border-blue-600 checked:after:content-['✔'] checked:after:text-white checked:after:text-xs " +
      "indeterminate:bg-blue-600 indeterminate:border-blue-600 indeterminate:after:content-['−'] indeterminate:after:text-white " +
      "focus:ring-0 focus:ring-offset-0 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed";

    const variantClasses = {
      default: "border-[var(--color-neutral-gray)] focus:ring-blue-500",
      gray: "bg-[var(--color-neutral-surface)] border-[var(--color-neutral-gray)] focus:ring-blue-500",
      outline: "bg-transparent border-2 border-[var(--color-neutral-gray)] focus:ring-blue-500",
      error: "border-red-500 focus:ring-red-500",
      success: "border-green-500 focus:ring-green-500",
    };

    const { box, label: labelSize, gap } = sizeStyles[size];
    const labelColor = disabled ? "text-gray-400" : "text-black";

    return (
      <label htmlFor={controlId} className={clsx("inline-flex items-start select-none", gap, { "cursor-not-allowed": disabled, "cursor-pointer": !disabled, })}>
        <input ref={checkboxRef} id={controlId} type="checkbox" role="checkbox" aria-checked={indeterminate ? "mixed" : props.checked} className={clsx(baseBox, variantClasses[variant], box, className)} disabled={disabled} aria-invalid={variant === "error"} {...props}/>
        {(label || helperText) && (
          <span className="flex flex-col">
            {label && ( <span className={clsx(labelSize, "font-medium", labelColor)}> {label} </span> )}
            {helperText && (
              <span className={clsx("mt-0.5 text-xs", { "text-red-600": variant === "error", "text-green-600": variant === "success", "text-gray-500": variant !== "error" && variant !== "success",})}>{helperText}</span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
