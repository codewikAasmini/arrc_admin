"use client";
import React from "react";

type Option = { label: string; value: string };
type Props = {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  className?: string;
};

export default function Switch({value, onChange, options, className = "",}: Props) {
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );

  const pad = 4;
  const thumbWidth = `calc((100% - ${pad * 2}px) / ${options.length})`;
  const thumbLeft = `calc(${pad}px + ${activeIndex} * ((100% - ${
    pad * 2
  }px) / ${options.length}))`;

  return (
    <div className={`relative flex h-10 w-full max-w-sm items-center rounded-full bg-gray-200 p-1 overflow-hidden ${className}`} role="tablist">
      <span className="absolute top-1 h-8 rounded-full bg-black transition-all duration-200 ease-in-out" style={{ width: thumbWidth, left: thumbLeft }} aria-hidden="true"/>
      {options.map((opt) => {const active = opt.value === value;
        return (
          <button key={opt.value} type="button" role="tab" aria-selected={active} onClick={() => onChange(opt.value)} className={`relative z-10 flex-1 h-8 rounded-full text-sm font-semibold transition-colors duration-200 ${active ? "text-white" : "text-gray-600 hover:text-black"} focus:outline-none`}>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
