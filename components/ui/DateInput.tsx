"use client";

import { forwardRef } from "react";
import { Calendar } from "lucide-react";

type Props = {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
};

const DateInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onClick, placeholder }, ref) => {
    return (
      <div
        onClick={onClick}
        className="relative w-full"
      >
        <input
          ref={ref}
          value={value}
          readOnly
          placeholder={placeholder}
          className="
            arr-dark-input
            w-full
            h-10
            pr-10
            cursor-pointer
          "
        />

        {/* Calendar Icon */}
        <Calendar
          className="
            absolute right-3 top-1/2
            -translate-y-1/2
            w-4 h-4
            text-gray-400
            pointer-events-none
          "
        />
      </div>
    );
  }
);

DateInput.displayName = "DateInput";

export default DateInput;
