"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "white" | "gray" | "graylight" | "success" | "green" | "black" | "outline" | "secondary" | "ghost" | "link" | "blueCustom" | "neutral" | "danger" | "outlineGradient" | "gradientPurpleBlue" | "slateSoft" | "sky" | "gradientCyanSky" | "dangerOutline" | "gradientPurplePink" | "cyan";
  size?: "default" | "sm" | "lg" | "icon";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  width?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = "default", size = "default", rounded = "md", width, className = "", ...props}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors " +
    "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-blue-dark focus-visible:ring-offset-0" +
    "disabled:opacity-50 disabled:pointer-events-none font-poppins leading-none";

  const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    white: "bg-white text-slate-700 border border-slate-200 " + "hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm",
    graylight: "bg-gray-200 text-black hover:bg-gray-300 border border-gray-300",
    gray: "bg-gray-600 text-white hover:bg-gray-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-slate-300 bg-white text-black hover:bg-slate-100",
    secondary: "bg-teal-600 text-white hover:bg-teal-700",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    link: "bg-transparent text-blue-600 underline-offset-4 hover:underline",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
    green: "bg-green-500 text-white hover:bg-green-600",
    black: "bg-slate-900 hover:bg-slate-800 text-white",
    blueCustom: "bg-blue-800 text-white hover:bg-blue-900",
    neutral: "bg-gray-100 text-black hover:bg-gray-200",
    danger: "bg-red-500 text-white hover:bg-red-600",
    dangerOutline: "bg-red-100 text-red-700 border border-red-200 hover:bg-red-200",
    outlineGradient: "bg-white border border-purple-200 text-purple-700 " + "hover:bg-purple-50 hover:border-purple-300 hover:text-purple-800",
    gradientPurpleBlue: "bg-gradient-to-r from-purple-500 to-blue-500 text-white " + "hover:from-purple-600 hover:to-blue-600",
    slateSoft: "bg-slate-100 border border-slate-200 text-slate-600 " + "hover:bg-slate-200 transition-colors",
    sky: "bg-sky-600 text-white hover:bg-sky-700",
    gradientCyanSky: "bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 text-white shadow-lg shadow-cyan-500/20",
    gradientPurplePink: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white",
    cyan: "bg-cyan-600 text-white border border-cyan-600 cursor-pointer transition-colors hover:bg-cyan-700",
  };    

  const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-9 px-3 rounded-md text-sm",
    lg: "h-11 px-8 text-base",
    icon: "h-10 w-10 p-0 text-xl",
  };

  const roundedClasses: Record<NonNullable<ButtonProps["rounded"]>, string> = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  return (
    <button className={[ baseClasses, variantClasses[variant], sizeClasses[size], roundedClasses[rounded], width ?? "",className,].join(" ")} {...props}> {children}</button>
  );
};