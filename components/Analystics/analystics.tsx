
// "use client";
// import React from "react";
// import {
//   Calendar,
//   Download,
//   Target,
//   TrendingUp,
//   ShoppingCart,
//   DollarSign,
//   Users,
//   Megaphone,
// } from "lucide-react";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "../ui/Button";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "../ui/Select";

// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
// } from "recharts";

// export default function AnalysticsPage() {
//   const emptyChartData = Array.from({ length: 15 }).map((_, i) => ({
//     name: `Dec ${i + 1}`,
//     value: 0,
//   }));

//   return (
//     <div className="min-h-screen bg-slate-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">
//               Business Analytics
//             </h1>
//             <p className="text-sm text-slate-500">
//               inglosh • inglosh
//             </p>
//           </div>

//           <div className="flex gap-2">
//             <Select defaultValue="30">
//               <SelectTrigger className="w-36">
//                 <Calendar className="w-4 h-4 mr-2" />
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="7">Last 7 days</SelectItem>
//                 <SelectItem value="30">Last 30 days</SelectItem>
//                 <SelectItem value="90">Last 90 days</SelectItem>
//               </SelectContent>
//             </Select>

//             <Button variant="outline">
//               <Download className="w-4 h-4 mr-2" />
//               Export Data
//             </Button>
//           </div>
//         </div>

//         {/* KPI CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <KpiCard
//             title="Customer Acquisition Cost"
//             value="$0.00"
//             icon={<Target />}
//             gradient="from-cyan-500 to-sky-500"
//           />
//           <KpiCard
//             title="Customer Lifetime Value"
//             value="$0"
//             icon={<TrendingUp />}
//             gradient="from-emerald-500 to-green-500"
//           />
//           <KpiCard
//             title="Total Transactions"
//             value="0"
//             icon={<ShoppingCart />}
//             gradient="from-purple-500 to-pink-500"
//           />
//           <KpiCard
//             title="Average Order Value"
//             value="$0.00"
//             icon={<DollarSign />}
//             gradient="from-amber-500 to-orange-500"
//           />
//         </div>

//         {/* SECOND ROW */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <InfoCard title="Campaign ROI" value="0.0%" subtitle="Return on investment from rewards program" />
//           <InfoCard title="Total Revenue" value="$0.00" subtitle="Revenue in selected period" />
//           <InfoCard title="Active Customers" value="0" subtitle="Unique customers in period" />
//         </div>

//         {/* CHARTS */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <ChartCard title="Revenue & Transaction Trends">
//             <EmptyLineChart data={emptyChartData} />
//           </ChartCard>

//           <ChartCard title="Reward Distribution">
//             <EmptyPlaceholder />
//           </ChartCard>

//           <ChartCard title="Customer Segmentation">
//             <EmptyPlaceholder />
//           </ChartCard>

//           <ChartCard title="Daily Rewards Paid">
//             <EmptyLineChart data={emptyChartData} />
//           </ChartCard>
//         </div>

//         {/* CAMPAIGNS */}
//         <Card className="bg-white shadow-lg">
//           <CardHeader className="flex flex-row justify-between items-center">
//             <CardTitle className="flex items-center gap-2">
//               <Megaphone className="w-5 h-5 text-pink-600" />
//               Reward Campaigns
//             </CardTitle>
//             <Button className="bg-pink-500 hover:bg-pink-600">
//               + New Campaign
//             </Button>
//           </CardHeader>
//           <CardContent>
//             <div className="py-16 text-center text-slate-500">
//               <Megaphone className="w-12 h-12 mx-auto mb-3 opacity-30" />
//               <p className="font-medium">No campaigns yet</p>
//               <p className="text-sm">
//                 Create your first campaign to boost customer rewards!
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// /* ---------------- COMPONENTS ---------------- */

// function KpiCard({ title, value, icon, gradient }) {
//   return (
//     <Card className={`text-white bg-gradient-to-br ${gradient}`}>
//       <CardHeader className="pb-2 flex justify-between">
//         <div className="opacity-80">{icon}</div>
//         <span className="text-xs bg-white/20 px-2 py-1 rounded">
//           +0.0%
//         </span>
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold">{value}</div>
//         <p className="text-sm opacity-90">{title}</p>
//       </CardContent>
//     </Card>
//   );
// }

// function InfoCard({ title, value, subtitle }) {
//   return (
//     <Card className="bg-white shadow-md">
//       <CardHeader>
//         <CardTitle className="text-sm">{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold text-slate-900">{value}</div>
//         <p className="text-sm text-slate-500">{subtitle}</p>
//       </CardContent>
//     </Card>
//   );
// }

// function ChartCard({ title, children }) {
//   return (
//     <Card className="bg-white shadow-lg">
//       <CardHeader>
//         <CardTitle className="text-sm">{title}</CardTitle>
//       </CardHeader>
//       <CardContent className="h-[300px]">
//         {children}
//       </CardContent>
//     </Card>
//   );
// }

// function EmptyLineChart({ data }) {
//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Line type="monotone" dataKey="value" stroke="#10b981" />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }

// function EmptyPlaceholder() {
//   return (
//     <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
//       No data available
//     </div>
//   );
// }


"use client";
export default function AnalysticsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <h1 className="text-3xl font-bold">
        This is my Analystics page
      </h1>
    </div>
  );
}