import React from "react";

const LOGO_URL = "/images/logo.png";

type SizeKey = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

const sizes: Record<SizeKey, string> = {
  "2xs": "h-[4.4rem] w-[4.4rem]",
  xs: "h-[6.2rem] w-[6.2rem]",
  sm: "h-[8.2rem] w-[8.2rem]",
  md: "h-[12.2rem] w-[12.2rem]",
  lg: "h-[16.3rem] w-[16.3rem]",
  xl: "h-[20.4rem] w-[20.4rem]",
};

export default function Logo({
  size = "md",
  className = "",
}: {
  size?: SizeKey;
  className?: string;
}) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      
      {/* Outer cyan ring */}
      <div
        className={`
          ${sizes[size]}
          rounded-full
          flex items-center justify-center
          bg-transparent
          shadow-[0_0_0_2px_rgba(167,243,208,0.9)]
        `}
      >
        {/* Inner dark circle (CLIPS image) */}
        <div className="w-[92%] h-[92%] rounded-full bg-[#071c2e] overflow-hidden flex items-center justify-center">
          
          {/* LOGO IMAGE */}
          <img
            src={LOGO_URL}
            alt="ARRC Logo"
            draggable={false}
            className="w-full h-full object-contain rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
