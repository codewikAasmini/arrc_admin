// "use client";

// import React, { useState, useEffect } from "react";
// import { Campaign } from "@/entities/Campaign";
// import { Transaction } from "@/entities/Transaction";
// import { MerchantPartner } from "@/entities/MerchantPartner";
// import { base44 } from "@/api/base44Client";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Textarea } from "@/components/ui/textarea";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import {
//   Plus,
//   Calendar,
//   Percent,
//   DollarSign,
//   Play,
//   Pause,
//   Trash2,
//   Edit,
//   Megaphone,
//   Sparkles,
//   Loader2,
//   Wand2,
// } from "lucide-react";

// import { motion, AnimatePresence } from "framer-motion";
// import { format, parseISO, isAfter, isWithinInterval } from "date-fns";

// const statusColors = {
//   draft: "bg-slate-100 text-slate-700 border-slate-300",
//   active: "bg-emerald-100 text-emerald-700 border-emerald-300",
//   paused: "bg-amber-100 text-amber-700 border-amber-300",
//   completed: "bg-blue-100 text-blue-700 border-blue-300",
// };

// const statusIcons = {
//   draft: Edit,
//   active: Play,
//   paused: Pause,
//   completed: Calendar,
// };

// export default function CampaignManager({ organizationId, merchantId }) {
//   const [campaigns, setCampaigns] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingCampaign, setEditingCampaign] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [aiSuggestions, setAiSuggestions] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     start_date: "",
//     end_date: "",
//     reward_percentage: 5,
//     budget: 1000,
//     status: "draft",
//   });

//   useEffect(() => {
//     if (organizationId) loadCampaigns();
//   }, [organizationId]);

//   const loadCampaigns = async () => {
//     setIsLoading(true);

//     const data = await Campaign.filter(
//       { organization_id: organizationId },
//       "-created_date"
//     );

//     const today = new Date();

//     const updated = await Promise.all(
//       data.map(async (c) => {
//         const start = parseISO(c.start_date);
//         const end = parseISO(c.end_date);
//         let status = c.status;

//         if (c.status !== "paused" && c.status !== "draft") {
//           if (isAfter(today, end)) status = "completed";
//           else if (isWithinInterval(today, { start, end })) status = "active";
//         }

//         if (status !== c.status) {
//           await Campaign.update(c.id, { status });
//           return { ...c, status };
//         }

//         return c;
//       })
//     );

//     setCampaigns(updated);
//     setIsLoading(false);
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       description: "",
//       start_date: "",
//       end_date: "",
//       reward_percentage: 5,
//       budget: 1000,
//       status: "draft",
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       ...formData,
//       organization_id: organizationId,
//       merchant_id: merchantId,
//     };

//     if (editingCampaign) {
//       await Campaign.update(editingCampaign.id, payload);
//     } else {
//       await Campaign.create(payload);
//     }

//     setIsDialogOpen(false);
//     setEditingCampaign(null);
//     resetForm();
//     loadCampaigns();
//   };

//   const handleEdit = (campaign) => {
//     setEditingCampaign(campaign);
//     setFormData({
//       name: campaign.name,
//       description: campaign.description || "",
//       start_date: campaign.start_date,
//       end_date: campaign.end_date,
//       reward_percentage: campaign.reward_percentage,
//       budget: campaign.budget || 1000,
//       status: campaign.status,
//     });
//     setIsDialogOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (confirm("Delete this campaign?")) {
//       await Campaign.delete(id);
//       loadCampaigns();
//     }
//   };

//   const handleStatusChange = async (campaign, status) => {
//     await Campaign.update(campaign.id, { status });
//     loadCampaigns();
//   };

//   const getProgress = (c) =>
//     c.budget ? Math.min(100, ((c.spent || 0) / c.budget) * 100) : 0;

//   const generateAISuggestions = async () => {
//     setIsGenerating(true);
//     setAiSuggestions(null);

//     try {
//       const [merchant, txns, past] = await Promise.all([
//         merchantId ? MerchantPartner.get(merchantId) : null,
//         merchantId ? Transaction.filter({ merchant_name: merchantId }) : [],
//         Campaign.filter({ organization_id: organizationId }),
//       ]);

//       const avgValue =
//         txns.length > 0
//           ? txns.reduce((s, t) => s + (t.amount || 0), 0) / txns.length
//           : 50;

//       const prompt = `
// Create 3 high-performing reward campaigns.

// Business:
// - Name: ${merchant?.name}
// - Category: ${merchant?.category}
// - Avg Order Value: $${avgValue.toFixed(2)}
// - Past Campaigns: ${past.length}

// Return JSON only.
// `;

//       const res = await base44.integrations.Core.InvokeLLM({
//         prompt,
//         response_json_schema: {
//           type: "object",
//           properties: {
//             suggestions: {
//               type: "array",
//               items: {
//                 type: "object",
//                 properties: {
//                   name: { type: "string" },
//                   description: { type: "string" },
//                   reward_percentage: { type: "number" },
//                   start_date: { type: "string" },
//                   end_date: { type: "string" },
//                   budget: { type: "number" },
//                   expected_roi: { type: "number" },
//                 },
//               },
//             },
//           },
//         },
//       });

//       setAiSuggestions(res.suggestions || []);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const applySuggestion = (s) => {
//     setFormData({
//       name: s.name,
//       description: s.description,
//       start_date: s.start_date,
//       end_date: s.end_date,
//       reward_percentage: s.reward_percentage,
//       budget: s.budget,
//       status: "draft",
//     });
//     setAiSuggestions(null);
//   };

//   return (
//     <Card className="bg-white shadow-lg">
//       <CardHeader className="flex flex-row justify-between items-center">
//         <CardTitle className="flex items-center gap-2">
//           <Megaphone className="w-5 h-5 text-pink-600" />
//           Reward Campaigns
//         </CardTitle>

//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className="bg-gradient-to-r from-pink-500 to-rose-500">
//               <Plus className="w-4 h-4 mr-2" />
//               New Campaign
//             </Button>
//           </DialogTrigger>

//           <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>
//                 {editingCampaign ? "Edit Campaign" : "Create Campaign"}
//               </DialogTitle>
//             </DialogHeader>

//             {!editingCampaign && (
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={generateAISuggestions}
//                 disabled={isGenerating}
//                 className="w-full mb-4"
//               >
//                 {isGenerating ? (
//                   <Loader2 className="animate-spin w-4 h-4 mr-2" />
//                 ) : (
//                   <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
//                 )}
//                 Generate AI Ideas
//               </Button>
//             )}

//             {aiSuggestions && (
//               <div className="space-y-3 mb-4">
//                 {aiSuggestions.map((s, i) => (
//                   <motion.div
//                     key={i}
//                     whileHover={{ scale: 1.02 }}
//                     onClick={() => applySuggestion(s)}
//                     className="p-3 border rounded-lg cursor-pointer bg-gradient-to-r from-purple-50 to-pink-50"
//                   >
//                     <div className="flex justify-between mb-1">
//                       <strong>{s.name}</strong>
//                       <Badge>{s.expected_roi}% ROI</Badge>
//                     </div>
//                     <p className="text-sm">{s.description}</p>
//                   </motion.div>
//                 ))}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <Label>Campaign Name</Label>
//                 <Input
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               <div>
//                 <Label>Description</Label>
//                 <Textarea
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       description: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <Input
//                   type="date"
//                   value={formData.start_date}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       start_date: e.target.value,
//                     })
//                   }
//                   required
//                 />
//                 <Input
//                   type="date"
//                   value={formData.end_date}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       end_date: e.target.value,
//                     })
//                   }
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <Input
//                   type="number"
//                   value={formData.reward_percentage}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       reward_percentage: Number(e.target.value),
//                     })
//                   }
//                 />
//                 <Input
//                   type="number"
//                   value={formData.budget}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       budget: Number(e.target.value),
//                     })
//                   }
//                 />
//               </div>

//               <Button type="submit" className="w-full">
//                 {editingCampaign ? "Update Campaign" : "Create Campaign"}
//               </Button>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </CardHeader>

//       <CardContent>
//         {isLoading ? (
//           <div className="space-y-3">
//             {[1, 2].map((i) => (
//               <div
//                 key={i}
//                 className="h-24 bg-slate-100 rounded-xl animate-pulse"
//               />
//             ))}
//           </div>
//         ) : campaigns.length === 0 ? (
//           <div className="text-center py-12 text-slate-500">
//             <Megaphone className="w-12 h-12 mx-auto mb-4 opacity-30" />
//             No campaigns yet
//           </div>
//         ) : (
//           <AnimatePresence>
//             {campaigns.map((c) => {
//               const Icon = statusIcons[c.status];
//               return (
//                 <motion.div
//                   key={c.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="p-4 border rounded-xl mb-4"
//                 >
//                   <div className="flex justify-between mb-2">
//                     <div className="flex gap-2 items-center">
//                       <strong>{c.name}</strong>
//                       <Badge className={statusColors[c.status]}>
//                         <Icon className="w-3 h-3 mr-1" />
//                         {c.status}
//                       </Badge>
//                     </div>

//                     <div className="flex gap-1">
//                       {c.status !== "completed" && (
//                         <Button
//                           size="sm"
//                           variant="ghost"
//                           onClick={() =>
//                             handleStatusChange(
//                               c,
//                               c.status === "active" ? "paused" : "active"
//                             )
//                           }
//                         >
//                           {c.status === "active" ? (
//                             <Pause className="w-4 h-4" />
//                           ) : (
//                             <Play className="w-4 h-4" />
//                           )}
//                         </Button>
//                       )}
//                       <Button
//                         size="sm"
//                         variant="ghost"
//                         onClick={() => handleEdit(c)}
//                       >
//                         <Edit className="w-4 h-4" />
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="ghost"
//                         onClick={() => handleDelete(c.id)}
//                       >
//                         <Trash2 className="w-4 h-4 text-red-600" />
//                       </Button>
//                     </div>
//                   </div>

//                   <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
//                     <motion.div
//                       animate={{ width: `${getProgress(c)}%` }}
//                       className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
//                     />
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
