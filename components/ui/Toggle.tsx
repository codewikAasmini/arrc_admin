"use client";
import React from "react";

type Props = {
  enabled: boolean;
  onChange: (val: boolean) => void;
  className?: string;
};

export default function Toggle({ enabled, onChange, className = "" }: Props) {
  return (
    <button onClick={() => onChange(!enabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${ enabled ? "bg-blue-dark" : "bg-gray-300" } ${className}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1" }`}/>
    </button>
  );
}
