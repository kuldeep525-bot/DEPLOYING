// // import { useEffect, useState, useMemo } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// //   CartesianGrid,
// //   PieChart,
// //   Pie,
// //   Cell,
// //   Legend,
// // } from "recharts";
// // import api from "../services/api";
// // import Footer from "../components/layout/Footer";

// // const AdminDashboard = () => {
// //   const navigate = useNavigate();
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     fetchAnalytics();
// //   }, []);

// //   const fetchAnalytics = async () => {
// //     try {
// //       const res = await api.get("/api/v2/admin/analytical");
// //       setData(res.data);
// //     } catch (err) {
// //       setError("Failed to load analytics");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const userGrowth = useMemo(() => {
// //     if (!data) return [];
// //     return data.charts.monthlyUserGrowth.map((item) => ({
// //       month: `${item._id.month}/${item._id.year}`,
// //       total: item.total,
// //     }));
// //   }, [data]);

// //   const notesGrowth = useMemo(() => {
// //     if (!data) return [];
// //     return data.charts.monthlyNotesGrowth.map((item) => ({
// //       month: `${item._id.month}/${item._id.year}`,
// //       total: item.total,
// //     }));
// //   }, [data]);

// //   const userStatusData = useMemo(() => {
// //     if (!data) return [];
// //     return [
// //       { name: "Active", value: data.users.activeUsers },
// //       { name: "Inactive", value: data.users.inactiveUsers },
// //       { name: "Blocked", value: data.users.blockedUsers },
// //     ];
// //   }, [data]);

// //   if (loading)
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-xl text-white bg-[#111827]">
// //         Loading Analytics...
// //       </div>
// //     );

// //   if (error)
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-red-400 bg-[#111827]">
// //         {error}
// //       </div>
// //     );

// //   return (
// //     <>
// //       <div className="p-8 bg-[#111827] min-h-screen text-white">
// //         <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>

// //         {/* ===== ADMIN ACTION CARDS ===== */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
// //           <div
// //             onClick={() => navigate("/admin/users")}
// //             className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition"
// //           >
// //             <h2 className="text-2xl font-semibold mb-2">Manage Users</h2>
// //             <p className="text-sm opacity-80">Block, Unblock & Restore users</p>
// //           </div>

// //           <div
// //             onClick={() => navigate("/admin/create-paper")}
// //             className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition"
// //           >
// //             <h2 className="text-2xl font-semibold mb-2">Upload Paper</h2>
// //             <p className="text-sm opacity-80">Upload Question & Answer PDFs</p>
// //           </div>
// //           <button
// //             onClick={() => navigate("/admin/papers")}
// //             className="btn btn-primary"
// //           >
// //             Manage Papers
// //           </button>
// //         </div>

// //         {/* ===== STAT CARDS ===== */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
// //           <StatCard title="Total Users" value={data.users.totalUsers} />
// //           <StatCard title="Total Notes" value={data.notes.totalNotes} />
// //           <StatCard title="Deleted Notes" value={data.notes.deletedNotes} />
// //         </div>

// //         {/* ===== CHARTS ===== */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
// //           <ChartCard title="Monthly User Growth">
// //             <ResponsiveContainer width="100%" height={300}>
// //               <LineChart data={userGrowth}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="month" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Line type="monotone" dataKey="total" stroke="#60a5fa" />
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </ChartCard>

// //           <ChartCard title="Monthly Notes Growth">
// //             <ResponsiveContainer width="100%" height={300}>
// //               <LineChart data={notesGrowth}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="month" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Line type="monotone" dataKey="total" stroke="#34d399" />
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </ChartCard>
// //         </div>

// //         {/* ===== PIE CHART ===== */}
// //         <div className="mt-12">
// //           <ChartCard title="User Status Distribution">
// //             <ResponsiveContainer width="100%" height={350}>
// //               <PieChart>
// //                 <Pie
// //                   data={userStatusData}
// //                   dataKey="value"
// //                   nameKey="name"
// //                   outerRadius={120}
// //                   label
// //                 >
// //                   {userStatusData.map((_, index) => (
// //                     <Cell key={index} />
// //                   ))}
// //                 </Pie>
// //                 <Legend />
// //                 <Tooltip />
// //               </PieChart>
// //             </ResponsiveContainer>
// //           </ChartCard>
// //         </div>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // };

// // const StatCard = ({ title, value }) => (
// //   <div className="bg-[#1f2937] p-6 rounded-2xl shadow-md hover:shadow-xl transition">
// //     <h2 className="text-gray-400 mb-2">{title}</h2>
// //     <p className="text-3xl font-bold">{value}</p>
// //   </div>
// // );

// // const ChartCard = ({ title, children }) => (
// //   <div className="bg-[#1f2937] p-6 rounded-2xl shadow-lg">
// //     <h2 className="mb-4 font-semibold text-lg">{title}</h2>
// //     {children}
// //   </div>
// // );

// // export default AdminDashboard;

// import { useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import api from "../services/api";
// import Footer from "../components/layout/Footer";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchAnalytics();
//   }, []);

//   const fetchAnalytics = async () => {
//     try {
//       const res = await api.get("/api/v2/admin/analytical");
//       setData(res.data);
//     } catch (err) {
//       setError("Failed to load analytics");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const userGrowth = useMemo(() => {
//     if (!data) return [];
//     return data.charts.monthlyUserGrowth.map((item) => ({
//       month: `${item._id.month}/${item._id.year}`,
//       total: item.total,
//     }));
//   }, [data]);

//   const notesGrowth = useMemo(() => {
//     if (!data) return [];
//     return data.charts.monthlyNotesGrowth.map((item) => ({
//       month: `${item._id.month}/${item._id.year}`,
//       total: item.total,
//     }));
//   }, [data]);

//   const userStatusData = useMemo(() => {
//     if (!data) return [];
//     return [
//       { name: "Active", value: data.users.activeUsers },
//       { name: "Inactive", value: data.users.inactiveUsers },
//       { name: "Blocked", value: data.users.blockedUsers },
//     ];
//   }, [data]);

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl text-white bg-[#111827]">
//         Loading Analytics...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-400 bg-[#111827]">
//         {error}
//       </div>
//     );

//   return (
//     <>
//       <div className="p-8 bg-[#111827] min-h-screen text-white">
//         <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>

//         {/* ===== ADMIN ACTION CARDS ===== */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//           <div
//             onClick={() => navigate("/admin/users")}
//             className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition"
//           >
//             <h2 className="text-2xl font-semibold mb-2">Manage Users</h2>
//             <p className="text-sm opacity-80">Block, Unblock & Restore users</p>
//           </div>

//           <div
//             onClick={() => navigate("/admin/create-paper")}
//             className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition"
//           >
//             <h2 className="text-2xl font-semibold mb-2">Upload Paper</h2>
//             <p className="text-sm opacity-80">
//               Upload Question & Answer PDFs
//             </p>
//           </div>

//           <button
//             onClick={() => navigate("/admin/papers")}
//             className="btn btn-primary"
//           >
//             Manage Papers
//           </button>

//           {/* ✅ YEH NAYA BUTTON ADD KIYA */}
//           <button
//             onClick={() => navigate("/admin/pending-payments")}
//             className="btn btn-warning"
//           >
//             View Pending Payments
//           </button>
//         </div>

//         {/* ===== STAT CARDS ===== */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           <StatCard title="Total Users" value={data.users.totalUsers} />
//           <StatCard title="Total Notes" value={data.notes.totalNotes} />
//           <StatCard title="Deleted Notes" value={data.notes.deletedNotes} />
//         </div>

//         {/* ===== CHARTS ===== */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           <ChartCard title="Monthly User Growth">
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={userGrowth}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="total" stroke="#60a5fa" />
//               </LineChart>
//             </ResponsiveContainer>
//           </ChartCard>

//           <ChartCard title="Monthly Notes Growth">
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={notesGrowth}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="total" stroke="#34d399" />
//               </LineChart>
//             </ResponsiveContainer>
//           </ChartCard>
//         </div>

//         {/* ===== PIE CHART ===== */}
//         <div className="mt-12">
//           <ChartCard title="User Status Distribution">
//             <ResponsiveContainer width="100%" height={350}>
//               <PieChart>
//                 <Pie
//                   data={userStatusData}
//                   dataKey="value"
//                   nameKey="name"
//                   outerRadius={120}
//                   label
//                 >
//                   {userStatusData.map((_, index) => (
//                     <Cell key={index} />
//                   ))}
//                 </Pie>
//                 <Legend />
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </ChartCard>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// const StatCard = ({ title, value }) => (
//   <div className="bg-[#1f2937] p-6 rounded-2xl shadow-md hover:shadow-xl transition">
//     <h2 className="text-gray-400 mb-2">{title}</h2>
//     <p className="text-3xl font-bold">{value}</p>
//   </div>
// );

// const ChartCard = ({ title, children }) => (
//   <div className="bg-[#1f2937] p-6 rounded-2xl shadow-lg">
//     <h2 className="mb-4 font-semibold text-lg">{title}</h2>
//     {children}
//   </div>
// );

// export default AdminDashboard;

import { useEffect, useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import api from "../services/api";
import Footer from "../components/layout/Footer";
import { ThemeContext } from "../context/ThemeContext";

/* ── Floating blob ── */
const Blob = ({
  className,
  duration = 9,
  xRange = 60,
  yRange = 40,
  delay = 0,
}) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={{
      x: [0, xRange, xRange / 2, -xRange / 2, 0],
      y: [0, -yRange, yRange, -yRange / 2, 0],
      scale: [1, 1.1, 0.95, 1.05, 1],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* ── Animated counter ── */
const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!value) return;
    let start = 0;
    const inc = value / (800 / 16);
    const timer = setInterval(() => {
      start += inc;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count}</span>;
};

const PIE_COLORS = ["#6366f1", "#f59e0b", "#ef4444"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "forest";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/api/v2/admin/analytical");
      setData(res.data);
    } catch {
      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  const userGrowth = useMemo(() => {
    if (!data) return [];
    return data.charts.monthlyUserGrowth.map((item) => ({
      month: `${item._id.month}/${item._id.year}`,
      total: item.total,
    }));
  }, [data]);

  const notesGrowth = useMemo(() => {
    if (!data) return [];
    return data.charts.monthlyNotesGrowth.map((item) => ({
      month: `${item._id.month}/${item._id.year}`,
      total: item.total,
    }));
  }, [data]);

  const userStatusData = useMemo(() => {
    if (!data) return [];
    return [
      { name: "Active", value: data.users.activeUsers },
      { name: "Inactive", value: data.users.inactiveUsers },
      { name: "Blocked", value: data.users.blockedUsers },
    ];
  }, [data]);

  // ── Theme-aware tokens ──
  const t = {
    bg: isDark ? "bg-[#0f1623]" : "bg-base-200",
    cardBg: isDark ? "bg-white/5" : "bg-base-100",
    cardBorder: isDark ? "border-white/10" : "border-base-300",
    text: isDark ? "text-white" : "text-base-content",
    textMuted: isDark ? "text-white/50" : "text-base-content/50",
    axisColor: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
    gridColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)",
    tooltipBg: isDark ? "#1e2535" : "oklch(var(--b1))",
    tooltipBorder: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    tooltipText: isDark ? "#fff" : "oklch(var(--bc))",
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
      <div
        style={{
          background: t.tooltipBg,
          border: `1px solid ${t.tooltipBorder}`,
          color: t.tooltipText,
        }}
        className="rounded-xl px-4 py-2 text-sm shadow-xl"
      >
        <p className="font-semibold" style={{ color: payload[0].payload.fill }}>
          {payload[0].name}
        </p>
        <p style={{ opacity: 0.6 }}>{payload[0].value} users</p>
      </div>
    );
  };

  const CustomLineTooltip = ({ active, payload, label, stroke }) => {
    if (!active || !payload?.length) return null;
    return (
      <div
        style={{
          background: t.tooltipBg,
          border: `1px solid ${t.tooltipBorder}`,
          color: t.tooltipText,
        }}
        className="rounded-xl px-4 py-2 text-sm shadow-xl"
      >
        <p style={{ opacity: 0.5, fontSize: 11 }} className="mb-1">
          {label}
        </p>
        <p className="font-semibold" style={{ color: payload[0].stroke }}>
          {payload[0].value} total
        </p>
      </div>
    );
  };

  /* ── Loading ── */
  if (loading)
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${t.bg} relative overflow-hidden`}
      >
        <Blob
          className="w-96 h-96 bg-indigo-500/20 -top-20 -left-20"
          duration={11}
          xRange={60}
          yRange={50}
          delay={0}
        />
        <Blob
          className="w-72 h-72 bg-emerald-500/15 bottom-0 right-0"
          duration={9}
          xRange={-50}
          yRange={-40}
          delay={2}
        />
        <div className="relative z-10 text-center">
          <span className="loading loading-spinner loading-lg text-indigo-400" />
          <p className={`${t.textMuted} text-sm mt-3`}>Loading analytics…</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${t.bg} text-red-400`}
      >
        {error}
      </div>
    );

  return (
    <>
      <div
        className={`min-h-screen ${t.bg} ${t.text} relative overflow-hidden transition-colors duration-300`}
      >
        {/* Background blobs */}
        <Blob
          className="w-[500px] h-[500px] bg-indigo-500/10 -top-32 -left-32"
          duration={13}
          xRange={70}
          yRange={50}
          delay={0}
        />
        <Blob
          className="w-[380px] h-[380px] bg-emerald-500/10 top-1/2 right-0"
          duration={10}
          xRange={-60}
          yRange={60}
          delay={2}
        />
        <Blob
          className="w-[280px] h-[280px] bg-amber-500/8 bottom-20 left-1/3"
          duration={15}
          xRange={40}
          yRange={-40}
          delay={4}
        />

        <div className="relative z-10 p-8 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex items-center justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-1">
                Admin Panel
              </p>
              <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
            </div>
            <div
              className={`w-10 h-10 rounded-xl ${t.cardBg} border ${t.cardBorder} flex items-center justify-center text-lg`}
            >
              ⚙️
            </div>
          </motion.div>

          {/* ── ACTION CARDS ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {[
              {
                label: "Manage Users",
                desc: "Block, Unblock & Restore users",
                to: "/admin/users",
                gradient: "from-indigo-600/80 to-blue-600/80",
                icon: "👥",
              },
              {
                label: "Upload Paper",
                desc: "Upload Question & Answer PDFs",
                to: "/admin/create-paper",
                gradient: "from-emerald-600/80 to-teal-600/80",
                icon: "📤",
              },
              {
                label: "Manage Papers",
                desc: "Edit and organise all papers",
                to: "/admin/papers",
                gradient: "from-violet-600/80 to-purple-600/80",
                icon: "📄",
              },
              {
                label: "Pending Payments",
                desc: "Review and approve transactions",
                to: "/admin/pending-payments",
                gradient: "from-amber-600/80 to-orange-600/80",
                icon: "💳",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(card.to)}
                className={`bg-gradient-to-r ${card.gradient} border border-white/10 p-6 rounded-2xl cursor-pointer shadow-lg text-white`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{card.icon}</span>
                  <div>
                    <h2 className="text-lg font-semibold">{card.label}</h2>
                    <p className="text-sm opacity-70 mt-0.5">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              {
                title: "Total Users",
                value: data.users.totalUsers,
                icon: "👤",
                color: "text-indigo-400",
                border: "border-indigo-500/30",
              },
              {
                title: "Total Notes",
                value: data.notes.totalNotes,
                icon: "📝",
                color: "text-emerald-400",
                border: "border-emerald-500/30",
              },
              {
                title: "Deleted Notes",
                value: data.notes.deletedNotes,
                icon: "🗑️",
                color: "text-red-400",
                border: "border-red-500/30",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -3 }}
                className={`${t.cardBg} border ${stat.border} backdrop-blur-sm p-6 rounded-2xl transition-colors duration-300`}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className={`text-sm ${t.textMuted}`}>{stat.title}</p>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <p className={`text-4xl font-bold ${stat.color}`}>
                  <AnimatedCounter value={stat.value} />
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── LINE CHARTS ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {[
              {
                title: "Monthly User Growth",
                data: userGrowth,
                stroke: "#6366f1",
              },
              {
                title: "Monthly Notes Growth",
                data: notesGrowth,
                stroke: "#34d399",
              },
            ].map((chart, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`${t.cardBg} border ${t.cardBorder} backdrop-blur-sm rounded-2xl p-6 transition-colors duration-300`}
              >
                <h2 className={`font-semibold text-base mb-5 ${t.textMuted}`}>
                  {chart.title}
                </h2>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={chart.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke={t.gridColor} />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: t.axisColor }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: t.axisColor }}
                      axisLine={false}
                      tickLine={false}
                      width={28}
                    />
                    <Tooltip content={<CustomLineTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke={chart.stroke}
                      strokeWidth={2.5}
                      dot={{ fill: chart.stroke, r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            ))}
          </div>

          {/* ── PIE CHART ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${t.cardBg} border ${t.cardBorder} backdrop-blur-sm rounded-2xl p-6 transition-colors duration-300`}
          >
            <h2 className={`font-semibold text-base mb-6 ${t.textMuted}`}>
              User Status Distribution
            </h2>

            <div className="flex flex-col lg:flex-row items-center gap-8">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userStatusData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    innerRadius={65}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {userStatusData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                        opacity={0.9}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Legend
                    formatter={(value) => (
                      <span style={{ color: t.axisColor, fontSize: "13px" }}>
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Side legend */}
              <div className="flex flex-col gap-4 min-w-[160px]">
                {userStatusData.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: PIE_COLORS[i] }}
                    />
                    <div>
                      <p className={`text-xs ${t.textMuted}`}>{item.name}</p>
                      <p
                        className="font-bold text-lg"
                        style={{ color: PIE_COLORS[i] }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
