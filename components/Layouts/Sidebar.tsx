"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { House, Wallet, Store, TrendingUp, CreditCard, MapPin, Crown, Calculator, CircleHelp, LogOut, Briefcase, Sparkles,} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onLogoutSuccess } from "@/redux/auth/authSlice";
import { useDispatch } from "react-redux";
import ShowToast from "../Common/ShowToast";
import { API_LOGOUT } from "@/utils/api/APIConstant";
import { apiPost } from "@/utils/endpoints/common";

type NavLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const mainNavLinks: NavLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <House className="w-5 h-5 text-cyan-600" />,
  },
 
];

const businessNavLinks: NavLink[] = [
  // {
  //   label: "Business Dashboard",
  //   href: "/business-suite",
  //   icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
  // },
  // // {
  // //   label: "Analytics",
  // //   href: "/business-analytics",
  // //   icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
  // // },
  // {
  //   label: "Feature Your Business",
  //   href: "/business-advertising",
  //   icon: <Sparkles className="w-5 h-5 text-pink-600" />,
  // },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
 
  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-black/40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}/>
            <motion.aside className="fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-xl ring-1 ring-black/5 lg:hidden" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", stiffness: 260, damping: 30 }}>
              <SidebarContent onClose={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block lg:w-64 lg:border-r lg:border-gray-200 lg:bg-white">
        <SidebarContent />
      </aside>
    </>
  );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // const res = await apiPost({
      //   url: API_LOGOUT,
      //   values: {},
      // });

      // if (!res?.success) {
      //   ShowToast(res?.error || "Logout failed", "error");
      //   return;
      // }

      ShowToast("Logout successfully", "success");
      dispatch(onLogoutSuccess());
      router.push("/");
    } catch {
      ShowToast("Network error during logout", "error");
    }
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const baseItemClasses = "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-slate-100";

  return (
    <div className="flex h-full flex-col bg-blue-glass">
      <div className="flex justify-center p-4 mb-2">
        <div className="relative group">
          <div className="relative h-[6.21rem] w-[6.21rem] rounded-full p-2 border-2 border-cyan-200/80 group-hover:border-cyan-100 overflow-hidden shadow-inner bg-black transition-all duration-300">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-100/30 via-sky-100/40 to-cyan-100/30 mix-blend-overlay opacity-50" />
            <img src="/images/logo.png" alt="Logo Images" className="relative z-10 h-full w-full rounded-full object-cover transition-transform duration-300 group-hover:scale-110" style={{filter: "drop-shadow(0 0 15px rgba(34, 211, 238, 0.5))",}}/>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 text-gray-700 space-y-4">
        <div className="flex w-full flex-col">
          <div className="mb-3 flex h-6 items-center rounded-md px-2 text-xs font-semibold text-slate-600">Main Navigation</div>
          <ul className="flex w-full flex-col gap-1">
            {mainNavLinks.map((item) => {
              const active = isActive(item.href);
              const handleClick = () => {if (onClose) onClose();};
              return (
                <li key={item.href}>
                  <Link href={item.href} onClick={handleClick} className={[baseItemClasses, "text-slate-700", active ? "bg-cyan-50 text-cyan-700 border-r-2 border-cyan-600" : "",] .filter(Boolean).join(" ")}>
                    {item.icon} <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex w-full flex-col">
          {/* <div className="mb-3 flex h-6 items-center rounded-md px-2 text-xs font-semibold text-slate-600">Business</div> */}
          <ul className="flex w-full flex-col gap-1">
            {businessNavLinks.map((item) => {
              const active = isActive(item.href);
              const handleClick = () => {if (onClose) onClose();};
              return (
                <li key={item.href}>
                  <Link href={item.href} onClick={handleClick} className={[baseItemClasses, "text-slate-700", active ? "bg-cyan-50 text-cyan-700 border-r-2 border-cyan-600" : "",] .filter(Boolean) .join(" ")}>
                    {item.icon} <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <ul className="mt-auto border-t border-gray-100 p-4 space-y-1">
        <li>
           <button
            type="button"
            onClick={handleLogout}
            className="group bg-white flex items-center gap-2 rounded-xl p-2 text-sm font-medium transition-all duration-200 hover:bg-slate-100 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="truncate">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}