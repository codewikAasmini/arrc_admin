"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";

/* ============================
   Dropdown (Container)
============================ */
export interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  /** Pass the trigger button ref so clicking it doesn't count as outside. */
  anchorRef?: React.RefObject<HTMLElement>;
}

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  anchorRef,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Focus first item when opened
  useLayoutEffect(() => {
    if (!isOpen) return;
    const first = menuRef.current?.querySelector<HTMLElement>(
      '[role="menuitem"]:not([aria-disabled="true"])'
    );
    first?.focus();
  }, [isOpen]);

  // Close on outside click/touch (ignores anchor button via anchorRef)
  useEffect(() => {
    if (!isOpen) return;
    const handler = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      const inMenu = menuRef.current?.contains(target ?? null);
      const inAnchor = anchorRef?.current?.contains(target ?? null);
      if (!inMenu && !inAnchor) onClose();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [isOpen, onClose, anchorRef]);

  // Keyboard handling: Esc/Tab to close; basic arrow nav is optional
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (!menuRef.current) return;
      if (e.key === "Escape" || e.key === "Tab") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={menuRef} role="menu" aria-orientation="vertical"
      className={[ "absolute right-0 z-40 mt-2 w-56 origin-top-right rounded-xl", "border border-gray-300 bg-white shadow-lg ring-1 ring-black/5", "dark:border-gray-800 dark:bg-gray-900",
        className,
      ].join(" ")}
      data-state="open">
      <div className="py-1">{children}</div>
    </div>
  );
};

/* ============================
   DropdownItem
   - Works as <button> or Next <Link>
============================ */
interface DropdownItemProps {
  children: React.ReactNode;
  className?: string;
  /** Provide href to render as Next <Link>. */
  href?: string;
  /** Called on click. */
  onClick?: (e: React.MouseEvent) => void;
  /** If true, prevent default navigation (rare). Defaults to false. */
  preventDefault?: boolean;
  /** Disable the item (no click, dimmed). */
  disabled?: boolean;
  /** If provided, called after onClick; usually used to close the menu. */
  onItemClick?: () => void;
}

const baseItemClasses = "block w-full text-left px-4 py-2 text-sm outline-none " + "text-gray-700 hover:bg-gray-100 hover:text-gray-900 " + "dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white " + "focus:bg-gray-100 dark:focus:bg-gray-800 rounded";

export const DropdownItem: React.FC<DropdownItemProps> = ({children, className = "", href, onClick, preventDefault = false, disabled = false, onItemClick,}) => {
  const classes = [baseItemClasses, disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "", className,]
    .join(" ")
    .trim();

  const handleClick = (e: React.MouseEvent) => {
    if (preventDefault) e.preventDefault();
    onClick?.(e);
    onItemClick?.();
  };

  if (href && !disabled) {
    return (
      <Link href={href} role="menuitem" tabIndex={-1} className={classes} onClick={handleClick}> {children} </Link>
    );
  }

  return (
    <button type="button" role="menuitem" tabIndex={-1} className={classes} onClick={handleClick} disabled={disabled} aria-disabled={disabled || undefined}> {children} </button>
  );
};

/* ============================
   Optional: Separator
============================ */
export const DropdownSeparator: React.FC = () => (
  <div className="my-1 h-px bg-gray-200 dark:bg-gray-800" role="none" />
);