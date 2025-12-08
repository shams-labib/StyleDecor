// import React from "react";
// import { useQuery } from "@tanstack/react-query";

// import {
//   PieChart,
//   Pie,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   XAxis,
//   YAxis,
//   Bar,
//   CartesianGrid,
// } from "recharts";
// import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

// const AdminDashboardHome = () => {
//   const axiosSecure = useAxiosSecure();

//   // Delivery Stats (Pie Chart)
//   const { data: deliveryStats = [] } = useQuery({
//     queryKey: ["delivery-status-stats"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/parcels/delivery-status/stats");
//       return res.data;
//     },
//   });

//   // Revenue Stats (Bar Chart)
//   const { data: revenueStats = [] } = useQuery({
//     queryKey: ["revenue-stats"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/analytics/revenue");
//       return res.data;
//     },
//   });

//   // Service Bookings (Histogram)
//   const { data: serviceStats = [] } = useQuery({
//     queryKey: ["service-stats"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/analytics/service-bookings");
//       return res.data;
//     },
//   });

//   const getPieChartData = (data) =>
//     data.map((item) => ({ name: item.status, value: item.count }));

//   return (
//     <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

//       {/* Analytics Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//         <div className="p-5 rounded-xl shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
//           <div className="text-sm font-semibold">Total Revenue</div>
//           <div className="text-2xl font-bold mt-2">
//             ${revenueStats.reduce((sum, r) => sum + r.amount, 0)}
//           </div>
//           <div className="text-xs mt-1">Last 30 days</div>
//         </div>

//         <div className="p-5 rounded-xl shadow-lg bg-gradient-to-r from-green-400 to-teal-500 text-white">
//           <div className="text-sm font-semibold">Total Services Booked</div>
//           <div className="text-2xl font-bold mt-2">{serviceStats.length}</div>
//           <div className="text-xs mt-1">Last 30 days</div>
//         </div>

//         <div className="p-5 rounded-xl shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
//           <div className="text-sm font-semibold">Pending Deliveries</div>
//           <div className="text-2xl font-bold mt-2">
//             {deliveryStats.find((d) => d._id === "Pending")?.count || 0}
//           </div>
//           <div className="text-xs mt-1">Jan 1 - Feb 1</div>
//         </div>

//         <div className="p-5 rounded-xl shadow-lg bg-gradient-to-r from-pink-400 to-red-500 text-white">
//           <div className="text-sm font-semibold">Completed Deliveries</div>
//           <div className="text-2xl font-bold mt-2">
//             {deliveryStats.find((d) => d._id === "Delivered")?.count || 0}
//           </div>
//           <div className="text-xs mt-1">Jan 1 - Feb 1</div>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Delivery Status Pie Chart */}
//         <div className="p-6 bg-white rounded-xl shadow-lg">
//           <h2 className="text-xl font-semibold mb-4">Delivery Status</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={getPieChartData(deliveryStats)}
//                 dataKey="value"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 label
//                 fill="#8884d8"
//                 stroke="#fff"
//               />
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Revenue Over Time Bar Chart */}
//         <div className="p-6 bg-white rounded-xl shadow-lg">
//           <h2 className="text-xl font-semibold mb-4">Revenue Over Time</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={revenueStats}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="amount" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Service Bookings Histogram */}
//         <div className="p-6 bg-white rounded-xl shadow-lg md:col-span-2">
//           <h2 className="text-xl font-semibold mb-4">
//             Services Booked Histogram
//           </h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={serviceStats}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="serviceName" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="bookings" fill="#ff7f50" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardHome;
