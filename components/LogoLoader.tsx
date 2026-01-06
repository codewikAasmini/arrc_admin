"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import Image from "next/image";

export default function LogoLoader() {
  const loading = useSelector((state: RootState) => state.loader.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="logo-loader w-40 h-40 rounded-full overflow-hidden shadow-2xl">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={160}
            height={160}
            priority
            className="object-cover"
          />
        </div>

        <p className="text-white/70 text-sm tracking-wide loading-dots">
          Loading
        </p>
      </div>
    </div>
  );
}


