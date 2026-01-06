"use client";
import { Home } from "lucide-react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { usePathname } from "next/navigation";
export default function NotFound() {
  const pathname = usePathname();
  const pageName = pathname.split("/").filter(Boolean).pop();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-6">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-20 h-20 text-yellow-400 mx-auto mb-6" />

        <h1 className="text-4xl font-bold text-white mb-3">Page Not Found</h1>

        <h1 className="text-2xl :text-3xl font-semibold text-white mb-4">
          The page <span className="text-cyan-400 font-bold">"{pageName}"</span>{" "}
          could not be found in this application.
        </h1>

        <Link
          href="/Dashboard"
          className=" mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-white font-semibold hover:bg-cyan-600 transition"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
