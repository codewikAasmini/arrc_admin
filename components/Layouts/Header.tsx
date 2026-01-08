"use client";
import { Bell, ChevronDown, Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/Button";
import { API_GET_PROFILE } from "@/utils/api/APIConstant";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const ROUTE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/category": "Category",
  "/categoryitem": "Category Item",
  "/userlist": "User List",
};
export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const pathname = usePathname();
  const email = useSelector((state: any) => state.auth?.user?.email);
  const getReadableTitle = (path: string) => {
    return path
      .replace("/", "")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const pageKey = "/" + pathname.split("/").filter(Boolean)[0];

  const pageTitle = ROUTE_TITLES[pageKey] ?? getReadableTitle(pageKey);

  const loadProfile = async () => {
    try {
      setProfileLoading(true);

      const res = await getApiWithOutQuery({
        url: API_GET_PROFILE,
      });

      setProfile(res?.data || null);
    } catch (error) {
      console.error("Failed to load profile", error);
      setProfile(null);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target as Node) &&
        userRef.current &&
        !userRef.current.contains(e.target as Node)
      ) {
        setNotifOpen(false);
        setUserOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setNotifOpen(false);
        setUserOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-full w-full max-w-full items-center gap-3 p-3 sm:p-4.5">
        <Button
          size="icon"
          onClick={onMenuClick}
          className="!bg-black lg:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h3 className="text-lg lg:text-xl text-slate-900 font-semibold antialiased line-clamp-1 capitalize">
            {pageTitle}
          </h3>
          <p className="text-sm font-normal antialiased line-clamp-1 hidden lg:block">
            Welcome back, {email ? email.split("@")[0] : "User"}!
          </p>
        </div>
        {/* <div className="relative" ref={notifRef}>
          <Button variant="link" size="icon" onClick={() => {setNotifOpen(!notifOpen); setUserOpen(false); }} className="!rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5 text-blue-dark" />
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-rose-500 text-[10px] font-semibold text-white flex items-center justify-center">3</span>
          </Button> */}
        {/* {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5">
                <p className="text-sm font-semibold">Notifications</p>
                <button className="text-xs font-medium text-blue-dark hover:underline">Mark all read</button>
              </div>
              <ul className="max-h-60 divide-y divide-gray-100 overflow-y-auto text-sm">
                <li className="px-4 py-3 hover:bg-gray-50">New comment on Issue #132</li>
                <li className="px-4 py-3 hover:bg-gray-50">Build succeeded on main</li>
                <li className="px-4 py-3 hover:bg-gray-50">Invoice #INV-1099 is ready</li>
              </ul>
            </div>
          )} */}
        {/* </div> */}
        <p className="text-sm font-normal antialiased line-clamp-1 hidden lg:block">
          {email}
        </p>

        <div className="relative" ref={userRef}>
          <Button
            variant="link"
            size="icon"
            onClick={() => {
              setUserOpen(!userOpen);
              setNotifOpen(false);
            }}
            className="h-8 w-8 bg-gradient-to-r from-cyan-500 to-sky-500 !rounded-full hover:bg-gray-100 flex items-center justify-center p-0"
          >
            <img
              src="https://i.pravatar.cc/64?img=3"
              alt="User avatar"
              className="h-full w-full object-cover rounded-full ring-1 ring-gray-200 transition-opacity hidden"
            />
            <span className="text-white text-sm font-semibold"> {email?.charAt(0).toUpperCase()}</span>
          </Button>
          {/* {userOpen && (
            <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden text-sm"> */}
          {/* <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-medium text-sm">Signed in as</p>
                <p className="truncate text-gray-600 text-sm">user@example.com</p>
              </div> */}
          {/* <div className="py-1">
                <a href="#" className="block px-4 py-2 hover:bg-gray-50">Profile</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-50">Settings</a>
                <button className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50">Sign out</button>
              </div> */}
          {/* </div>
          )} */}
        </div>
      </div>
    </header>
  );
}
