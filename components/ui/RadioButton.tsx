"use client";

import React, { useId, ReactNode } from "react";

interface RadioOption { label: string; value: string; icon?: ReactNode; disabled?: boolean;}
interface RadioCardGroupProps { name: string; value: string; options: RadioOption[]; onChange: (value: string) => void; className?: string;}
export const RadioCardGroup: React.FC<RadioCardGroupProps> = ({name, value, options, onChange, className = "",}) => { const groupId = useId();

  return (
    <div role="radiogroup" className={`grid grid-cols-2 md:grid-cols-3 gap-3 ${className}`}>
      {options.map((opt) => {
        const active = value === opt.value;
        const id = `${groupId}-${name}-${opt.value}`;
        return (
          <label key={opt.value} htmlFor={id} className="w-full">
          <input id={id} type="radio" name={name} value={opt.value} checked={active} disabled={opt.disabled} onChange={() => !opt.disabled && onChange(opt.value)} className="sr-only"/>
          <div className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 bg-white transition-all duration-300 ease-out transform hover:scale-[1.05] ${active ? "bg-green-50 border-green-600" : "border-slate-200 hover:border-slate-300"} ${opt.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
            {opt.icon && (<div className={`text-2xl ${active ? "text-green-600" : "text-slate-700"}`}>{opt.icon}</div>)}
            <span className="text-sm font-semibold text-slate-800 text-center">{opt.label}</span>
          </div>
        </label>
        );
      })}
    </div>
  );
};


// "use client";
// import React, { useId } from "react";

// interface RadioButton {label: string; value: string; disabled?: boolean; icon?: ReactNode;}
// interface RadioChipGroupProps {label?: string; name: string; options: RadioButton[]; value: string; onChange: (value: string) => void; 
//   size?: "sm" | "default" | "lg"; rounded?: "none" | "sm" | "md" | "lg" | "full"; 
//   className?: string; 
//   columns?: boolean; 
//   color?: "blue" | "lightblue" | "green" | "red" | "gray";}

// export const RadioChipGroup: React.FC<RadioChipGroupProps> = ({name, options, value, onChange, size = "default", rounded = "lg", className = "", columns = false, color = "blue",}) => {
//   const groupId = useId();
//   const sizeClasses =
//     size === "sm" ? "px-2 py-0.5 text-xs" : size === "lg" ? "px-4 py-1.5 text-base" : "px-3 py-1 text-sm";
//   const roundedClasses = rounded === "none" ? "rounded-none" : rounded === "sm" ? "rounded-sm" : rounded === "md" ? "rounded-md" : rounded === "full" ? "rounded-full" : "rounded-lg";
//   const activeColors: Record<string, string> = {
//    blue: "bg-blue-600 text-white border-blue-600",
//    lightblue: "bg-blue-600 text-white border-blue-600",
//    green: "bg-green-600 text-white border-green-600",
//    red: "bg-red-600 text-white border-red-600",
//    gray: "bg-gray-600 text-white border-gray-600",
//   };

//   const inactiveColors: Record<string, string> = {
//     blue: "bg-white text-gray-900 border-gray-300 hover:border-blue-500",
//     lightblue: "bg-[#2563EB2B] text-gray-900 border-gray-300 hover:border-blue-500",
//     green: "bg-white text-gray-900 border-gray-300 hover:border-green-500",
//     red: "bg-white text-gray-900 border-gray-300 hover:border-red-500",
//     gray: "bg-white text-gray-900 border-gray-300 hover:border-gray-500",
//   };

//   return (
//     <div role="radiogroup" aria-labelledby={`${groupId}-label`} className={`${columns ? "grid grid-cols-[repeat(auto-fit,minmax(min(160px,100%),1fr))] gap-2" : "flex flex-wrap gap-2"} ${className}`}>
//       {options.map((opt) => {
//         const isActive = value === opt.value;
//         const id = `${groupId}-${name}-${opt.value}`;
//         const base = "inline-flex items-center border transition-colors select-none focus:outline-none";
//         const state = isActive ? activeColors[color] : inactiveColors[color];
//         const disabledCls = opt.disabled ? "opacity-50 cursor-not-allowed hover:border-gray-300" : "cursor-pointer";
//         return (
//           <label key={opt.value} htmlFor={id} className={`${columns ? "w-full" : ""}`}>
//             <input id={id} type="radio" name={name} value={opt.value} checked={isActive} disabled={!!opt.disabled} onChange={() => !opt.disabled && onChange(opt.value)} className="sr-only"/>
//             <span tabIndex={-1} className={`${base} ${sizeClasses} ${roundedClasses} ${state} ${disabledCls} ${columns ? "w-full justify-center" : ""} focus-visible:ring-2 focus-visible:ring-${color}-500 focus-visible:ring-offset-2`}>
//               {opt.icon && (<span className="flex-shrink-0 text-current [&>svg]:text-current">{opt.icon}</span>)}
//               {opt.label}
//             </span>
//           </label>
//         );
//       })}
//     </div>
//   );
// };