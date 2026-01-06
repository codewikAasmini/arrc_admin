"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button } from "./Button";

type MaxWidth = "sm" | "md" | "lg" | "xl" | "2xl";
type Rounded = "none" | "sm" | "md" | "lg" | "full";
type Variant = "default" | "light" | "transparent";

export type ModalProps = {open: boolean; onClose: () => void; children?: ReactNode; maxWidth?: MaxWidth; rounded?: Rounded; showCloseButton?: boolean; closeOnOverlayClick?: boolean; ariaLabel?: string; variant?: Variant;};
const MAX_W: Record<MaxWidth, string> = {sm: "sm:max-w-sm", md: "sm:max-w-md", lg: "sm:max-w-lg", xl: "sm:max-w-xl", "2xl": "sm:max-w-2xl",};
const ROUNDED: Record<Rounded | "5xl", string> = {none: "rounded-none", sm: "rounded-sm", md: "rounded-md", lg: "rounded-lg", "5xl": "rounded-[2.5rem]", full: "rounded-full",};
export default function Modal({open, onClose, children, maxWidth = "lg", rounded = "lg", showCloseButton = true, closeOnOverlayClick = true, ariaLabel, variant = "default",}: ModalProps) {const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {if (e.key === "Escape") onClose();};
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {document.body.style.overflow = prev;};
  }, [open]);

  useEffect(() => {if (!open || !closeOnOverlayClick) return;
    const handler = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!modalRef.current) return;
      if (target && !modalRef.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open, closeOnOverlayClick, onClose]);

  if (!open) return null;

  const variantClasses =
    variant === "light"
      ? "bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/80 backdrop-blur-md"
      : variant === "transparent"
      ? "bg-transparent border-none shadow-none"
      : "bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-xl";

  const contentPadding = variant === "transparent" ? "p-0" : "p-6";

  return (
    <div role="dialog" aria-modal="true" aria-label={ariaLabel} className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div ref={modalRef} className={`relative transform overflow-hidden text-left transition-all sm:my-8 sm:w-full ${MAX_W[maxWidth]} ${ROUNDED[rounded]} ${variantClasses}`} onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
            <div className={contentPadding}>{children}</div>
            {showCloseButton && (<Button variant="ghost" size="icon" rounded="full" aria-label="Close" onClick={onClose} className="absolute right-1.5 top-1.5 text-gray-400 hover:text-gray-600"><IoCloseCircleOutline size={26} color="#FF3705" /></Button>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { useEffect, type ReactNode } from "react";
// import { IoCloseCircleOutline } from "react-icons/io5";
// import { Button } from "./Button";
// type MaxWidth = "sm" | "md" | "lg" | "xl" | "2xl";
// type Rounded = "none" | "sm" | "md" | "lg" | "full";
// type Variant = "default" | "light";

// export type ModalProps = {
//   open: boolean;
//   onClose: () => void;
//   children?: ReactNode;
//   maxWidth?: MaxWidth;
//   rounded?: Rounded;
//   showCloseButton?: boolean;
//   closeOnOverlayClick?: boolean;
//   ariaLabel?: string;
//   variant?: Variant;
// };

// const MAX_W: Record<MaxWidth, string> = {sm: "sm:max-w-sm", md: "sm:max-w-md", lg: "sm:max-w-lg", xl: "sm:max-w-xl", "2xl": "sm:max-w-2xl",};
// const ROUNDED: Record<Rounded | "5xl", string> = {none: "rounded-none", sm: "rounded-sm", md: "rounded-md", lg: "rounded-lg", "5xl": "rounded-[2.5rem]", full: "rounded-full",};
// export default function Modal({
//   open,
//   onClose,
//   children,
//   maxWidth = "lg",
//   rounded = "lg",
//   showCloseButton = true,
//   closeOnOverlayClick = true,
//   ariaLabel,
//   variant = "default",
// }: ModalProps) {
//   useEffect(() => {
//     const h = (e: KeyboardEvent) => {
//       if (e.key === "Escape" && open) onClose();
//     };
//     window.addEventListener("keydown", h);
//     return () => window.removeEventListener("keydown", h);
//   }, [open, onClose]);

//   useEffect(() => {
//     if (open) {
//       const prev = document.body.style.overflow;
//       document.body.style.overflow = "hidden";
//       return () => {
//         document.body.style.overflow = prev;
//       };
//     }
//   }, [open]);

//   if (!open) return null;

//   const variantClasses =
//     variant === "light" ? "bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/80 backdrop-blur-md" : "bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-xl";

//   return (
//     <div role="dialog" aria-modal="true" aria-label={ariaLabel} className="fixed inset-0 z-50">
//       <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity opacity-100" onClick={closeOnOverlayClick ? onClose : undefined}/>
//       <div className="fixed inset-0 overflow-y-auto">
//         <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
//           <div className={`relative transform overflow-hidden text-left shadow-xl transition-all sm:my-8 sm:w-full ${MAX_W[maxWidth]} ${ROUNDED[rounded]} ${variantClasses}`} onClick={(e) => e.stopPropagation()}>
//             <div className="p-6">{children}</div>
//             {showCloseButton && (
//               <Button variant="ghost" size="icon" rounded="full" aria-label="Close" onClick={onClose} className="absolute right-1.5 top-1.5 text-gray-400 hover:text-gray-600"><IoCloseCircleOutline size={26} color="#FF3705" /></Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
