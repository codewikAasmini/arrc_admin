"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Layouts/Sidebar";
import Header from "@/components/Layouts/Header";

const NO_LAYOUT_ROUTES = [
  "/about",
   "/About",
  "/BusinessAdvertising",
  "/business-advertising",
];
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isMarketsRoute = pathname.startsWith("/markets");

  if (NO_LAYOUT_ROUTES.includes(pathname)) {
    return (
      <main className="min-h-screen bg-white">
        {children}
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main
          className={`flex-1 ${
            isMarketsRoute ? "bg-black text-white" : "bg-slate-50"
          }`}
        >
          <div className="mx-auto w-full max-w-full px-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}


// "use client";
// import React, { useState } from "react";
// import Sidebar from "@/components/Layouts/Sidebar";
// import Header from "@/components/Layouts/Header";
// import { usePathname } from "next/navigation";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-white text-gray-900 flex">
//       <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//       <div className="flex flex-col flex-1 lg:ml-64">
//         <Header onMenuClick={() => setSidebarOpen(true)} />
//          <main className="flex-1 bg-slate-50 "> {/* bg-black if markets route */}
//           <div className="mx-auto w-full max-w-full px-4 sm:p-6 lg:p-8">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// }
