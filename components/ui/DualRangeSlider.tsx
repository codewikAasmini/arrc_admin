"use client";
import React from "react";

type Variant = "blue" | "green" | "red";
type Size = "sm" | "default" | "lg";

interface DualRangeSliderProps {label?: string; controlId?: string; min?: number; max?: number; step?: number; value: [number, number]; onChange: (v: [number, number]) => void; size?: Size; variant?: Variant; format?: (v: number) => string; showEdgeLabels?: boolean; disabled?: boolean; className?: string;}

export const DualRangeSlider: React.FC<DualRangeSliderProps> = ({label, controlId, min = 0, max = 10_000, step = 1, value, onChange, size = "default", variant = "blue", format = (v) => String(v), showEdgeLabels = true, disabled = false, className = "",}) => {
  const rawMin = Math.min(value[0], value[1]);
  const rawMax = Math.max(value[0], value[1]);
  const minVal = Math.max(min, Math.min(rawMin, max));
  const maxVal = Math.max(min, Math.min(rawMax, max));

  const range = Math.max(max - min, 1);
  const leftPct = ((minVal - min) / range) * 100;
  const rightPct = ((maxVal - min) / range) * 100;

  const sizeMap: Record<
    Size,
    { track: string; thumb: number; padY: string; edge: string; trackPx: number }
  > = {
    sm: { track: "h-1.5", thumb: 14, padY: "py-2", edge: "text-xs", trackPx: 6 },
    default: { track: "h-2", thumb: 16, padY: "py-3", edge: "text-sm", trackPx: 8 },
    lg: { track: "h-2.5", thumb: 18, padY: "py-4", edge: "text-base", trackPx: 10 },
  };

  const colors: Record<Variant, { active: string; ring: string }> = {
    blue: { active: "#2563eb", ring: "#1d4ed8" },
    green: { active: "#16a34a", ring: "#15803d" },
    red: { active: "#dc2626", ring: "#b91c1c" },
  };

  const { track, thumb, padY, edge, trackPx } = sizeMap[size];
  const { active, ring } = colors[variant];

  const onMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    onChange([Math.min(v, maxVal - step), maxVal]);
  };

  const onMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    onChange([minVal, Math.max(v, minVal + step)]);
  };

  const minZ = minVal >= maxVal - step ? 50 : 30;
  const maxZ = 40;

  const labelId = controlId ? `${controlId}-label` : undefined;
  const cssVars = {
    "--thumb": `${thumb}px`,
    "--track": `${trackPx}px`,
    "--active": active,
    "--ring": ring,
  } as React.CSSProperties;

  return (
    <div id={controlId} className={`w-full ${padY} ${className}`}>
      {label && ( <label id={labelId} className="mb-1 block text-sm font-medium text-black select-none"> {label}</label> )}
      {showEdgeLabels && (
        <div className="mb-1 flex justify-between">
          <span className={`${edge} font-medium`} style={{ color: active }}> {format(minVal)} </span>
          <span className={`${edge} font-medium`} style={{ color: active }}> {format(maxVal)} </span>
        </div>
      )}
      <div className="relative ranger_slider" style={cssVars}>
        <div className={`w-full rounded-full bg-gray-200 ${track} absolute left-0 right-0 top-1/2 -translate-y-1/2`} />
        <div className={`absolute ${track} rounded-full top-1/2 -translate-y-1/2`} style={{ left: `${leftPct}%`, width: `${Math.max(rightPct - leftPct, 0)}%`, backgroundColor: active,}}/>
        <input type="range" min={min} max={max} step={step} value={minVal} onChange={onMinChange} disabled={disabled} aria-labelledby={labelId} aria-label={label ? undefined : "Minimum value"} className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none focus:outline-none" style={{ WebkitAppearance: "none", zIndex: minZ }}/>
        <input type="range" min={min} max={max} step={step} value={maxVal} onChange={onMaxChange} disabled={disabled} aria-labelledby={labelId} aria-label={label ? undefined : "Maximum value"} className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none focus:outline-none" style={{ WebkitAppearance: "none", zIndex: maxZ }}/>
      </div>
    </div>
  );
};
