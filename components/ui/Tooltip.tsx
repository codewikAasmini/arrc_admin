"use client";
import React, { useId } from "react";
import Link from "next/link";

type TooltipPlacement = "top" | "bottom" | "left" | "right";

interface LinkWithTooltipProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  tooltipTitle: string;
  tooltipDescription: string;
  tooltipPlacement?: TooltipPlacement;
}

export const LinkWithTooltip: React.FC<LinkWithTooltipProps> = ({
  href,
  children,
  tooltipTitle,
  tooltipDescription,
  tooltipPlacement = "top",
  className = "",
  ...props
}) => {
  const tooltipId = useId();

  const placementClasses: Record<TooltipPlacement, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  };

  const arrowClasses: Record<TooltipPlacement, string> = {
    top: "after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-white",
    bottom:
      "after:content-[''] after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-b-white",
    left: "after:content-[''] after:absolute after:left-full after:top-1/2 after:-translate-y-1/2 after:border-8 after:border-transparent after:border-l-white",
    right:
      "after:content-[''] after:absolute after:right-full after:top-1/2 after:-translate-y-1/2 after:border-8 after:border-transparent after:border-r-white",
  };

  return (
    <span className="relative inline-flex group">
      <Link
        href={href}
        aria-describedby={tooltipId}
        className={[
          "inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors",
          className,
        ].join(" ")}
        {...props}
      >
        {" "}
        {children}
      </Link>
      <div
        id={tooltipId}
        role="tooltip"
        className={[
          "pointer-events-none absolute z-50 max-w-[90vw] sm:max-w-xs md:max-w-sm",
          "px-4 py-3 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-200",
          "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100 transition-all duration-150 ease-out",
          "text-center",
          placementClasses[tooltipPlacement],
          arrowClasses[tooltipPlacement],
        ].join(" ")}
      >
        <h3 className="font-semibold text-sm sm:text-base mb-1 leading-tight">
          {tooltipTitle}
        </h3>
        <p className="text-xs sm:text-sm leading-snug text-gray-600">
          {tooltipDescription}
        </p>
      </div>
    </span>
  );
};
