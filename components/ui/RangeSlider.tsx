"use client";
import React, { useEffect, useId, useMemo, useState } from "react";
interface RangeSliderProps { min?: number; max?: number; step?: number; defaultValue?: number; label?: string; id?: string; showValue?: boolean;}
export default function RangeSlider({ min = 0, max = 100, step = 1, defaultValue = 0, label, id, showValue = true,}: RangeSliderProps) {
  const autoId = useId();
  const inputId = id ?? `range-${autoId}`;

  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const [value, setValue] = useState<number>(() => clamp(defaultValue));

  useEffect(() => {
    setValue((v) => clamp(Number.isFinite(v) ? v : defaultValue));
  }, [min, max, defaultValue]);

  const fillPercent = useMemo(() => {
    const span = Math.max(1, max - min);
    return ((value - min) / span) * 100;
  }, [value, min, max]);

  const inputStyle: React.CSSProperties = {
    background: `linear-gradient(to right, rgb(37 99 235) 0%, rgb(37 99 235) ${fillPercent}%, rgb(209 213 219) ${fillPercent}%, rgb(209 213 219) 100%)`,
  };
  return (
    <div className="w-full">
      {label && (<label htmlFor={inputId} className="mb-1 block select-none text-sm font-medium text-black"> {label} </label>)}
      <div className="inputRange relative flex flex-col gap-1 w-full items-center justify-center">
        <input id={inputId} type="range" value={value} min={min} max={max} step={step} onChange={(e) => setValue(Number(e.target.value))} aria-valuemin={min} aria-valuemax={max} aria-valuenow={value} style={inputStyle} 
        className="m-0 h-1 w-full cursor-pointer appearance-none rounded-full p-0 outline-none
          /* WebKit thumb */ [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_1px_5px_#d1d5db]
          /* Firefox thumb */ [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white
          /* Firefox track reset */ [&::-moz-range-track]:bg-transparent"/>
        {showValue && (<output htmlFor={inputId} className="pointer-events-none w-full text-right text-sm font-medium text-gray-600">{value} / {max}</output>)}
      </div>
    </div>
  );
}
