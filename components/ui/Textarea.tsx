"use client";
import React from "react";
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "gray" | "outline" | "error" | "success";
  size?: "default" | "sm" | "lg";
  label?: string;
  controlId?: string;
  ariaLabel?: string;
  description?: string;
  errorMessage?: string;
  successMessage?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ variant = "default", size = "default", label, controlId, ariaLabel, description, errorMessage, successMessage, className = "", ...props}) => {
  const baseClasses =
    "w-full rounded-md border font-poppins transition-colors " +
    "focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed " +
    "placeholder:text-[rgba(0,0,0,0.32)]";

  const variantClasses: Record<NonNullable<TextareaProps["variant"]>, string> = {
    default: "bg-[var(--color-neutral-white)] border-[var(--color-neutral-gray)] text-[var(--color-neutral-black)] " + "focus:border-[var(--color-blue-primary)] focus:ring-0.5 focus:ring-[var(--color-blue-primary)]",
    gray: "bg-[var(--color-neutral-surface)] border-[var(--color-neutral-surface)] text-[var(--color-neutral-dark-gray)] " + "focus:border-[var(--color-blue-primary)] focus:ring-0.5 focus:ring-[var(--color-blue-primary)]",
    outline: "bg-transparent border-2 border-[var(--color-neutral-gray)] text-[var(--color-neutral-black)] " + "focus:border-[var(--color-blue-primary)] focus:ring-0.5 focus:ring-[var(--color-blue-primary)]",
    error: "bg-[var(--color-neutral-white)] border-[var(--color-red-primary)] text-[var(--color-red-dark)] " + "focus:border-[var(--color-red-primary)] focus:ring-0.5 focus:ring-[var(--color-red-primary)] " + "placeholder:text-[rgba(220,0,0,0.4)]",
    success: "bg-[var(--color-neutral-white)] border-[var(--color-green-primary)] text-[var(--color-green-dark)] " + "focus:border-[var(--color-green-primary)] focus:ring-0.5 focus:ring-[var(--color-green-primary)] " + "placeholder:text-[rgba(0,180,0,0.4)]",
  };

  const sizeClasses: Record<NonNullable<TextareaProps["size"]>, string> = {
    default: "h-24 px-3 py-2 text-sm",
    sm: "h-16 px-2 py-1 text-xs",
    lg: "h-32 px-4 py-3 text-base",
  };

  const descId = controlId ? `${controlId}-desc` : undefined;
  const ariaDescribedBy = descId && (description || errorMessage || successMessage) ? descId : undefined;

  return (
    <div className="relative">
      {label && ( <label htmlFor={controlId} className="block text-sm mb-1 text-[var(--color-neutral-dark-gray)]"> {label} </label>)}
      <textarea id={controlId} aria-label={ariaLabel || label} aria-describedby={ariaDescribedBy} className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...props}/>
      {(description || errorMessage || successMessage) && (
        <p id={descId} className={`mt-1 text-sm ${variant === "error" ? "text-[var(--color-red-primary)]" : variant === "success" ? "text-[var(--color-green-primary)]" : "text-[var(--color-neutral-dark-gray)]"}`} > {errorMessage || successMessage || description} </p>
      )}
    </div>
  );
};
