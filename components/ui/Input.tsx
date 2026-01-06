"use client";

import React from "react";
import clsx from "clsx";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "default" | "gray" | "outline" | "error" | "success";
  size?: "default" | "sm" | "lg";
  label?: string;
  controlId?: string;
  labelColor?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      size = "default",
      label,
      controlId,
      labelColor = "text-slate-700",
      className = "",
      leftIcon,
      rightIcon,
      wrapperClassName = "",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "w-full rounded-md border font-poppins transition-colors " +
      "focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed " +
      "text-slate-900 placeholder:text-slate-400"; // ✅ FORCE readable text

    const variantClasses: Record<NonNullable<InputProps["variant"]>, string> = {
      default:
        "bg-slate-50/50 border-slate-200 focus:border-slate-400",
      gray:
        "bg-slate-50/50 border-slate-200 focus:border-slate-400",
      outline:
        "bg-transparent border-2 border-slate-200 focus:border-slate-400",
      error:
        "bg-slate-50/50 border-red-400 text-red-700 placeholder:text-red-400 focus:border-red-500",
      success:
        "bg-slate-50/50 border-green-400 text-green-700 placeholder:text-green-400 focus:border-green-500",
    };

    const sizeClasses: Record<NonNullable<InputProps["size"]>, string> = {
      default: "h-10 px-3 text-sm",
      sm: "h-8 px-2 text-xs",
      lg: "h-12 px-4 text-base",
    };

    return (
      <div className={clsx("relative", wrapperClassName)}>
        {label && (
          <label
            htmlFor={controlId}
            className={clsx("block text-sm mb-1 text-start", labelColor)}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </span>
          )}

          {rightIcon && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {rightIcon}
            </span>
          )}

          <input
            ref={ref}
            id={controlId}
            className={clsx(
              baseClasses,
              variantClasses[variant],
              sizeClasses[size],
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
