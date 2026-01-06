"use client";
import React from "react";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  variant?: "default" | "striped" | "bordered" | "compact";
  rounded?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
  width?: string;
}

export const Table: React.FC<TableProps> = ({
  children,
  variant = "default",
  rounded = "md",
  shadow = "sm",
  width = "w-full",
  className = "",
  ...props
}) => {
  const baseClasses =
    "min-w-full text-left text-sm font-medium text-gray-700 overflow-hidden";

  const variantClasses: Record<NonNullable<TableProps["variant"]>, string> = {
    default: "divide-y divide-gray-200",
    striped: "divide-y divide-gray-200 [&>tbody>tr:nth-child(even)]:bg-gray-50",
    bordered: "border border-gray-200",
    compact: "text-xs [&>thead>tr>th]:px-2 [&>tbody>tr>td]:px-2",
  };

  const roundedClasses: Record<NonNullable<TableProps["rounded"]>, string> = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
  };

  const shadowClasses: Record<NonNullable<TableProps["shadow"]>, string> = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  return (
    <div className={`${width} overflow-x-auto ${shadowClasses[shadow]} ${roundedClasses[rounded]}`}>
      <table className={[ baseClasses, variantClasses[variant], className,].join(" ")}{...props}>
        {children}
      </table>
    </div>
  );
};

export default Table;