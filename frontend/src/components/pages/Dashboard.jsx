// import { useEffect, useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import { NotesContext } from "../../context/NotesContext";
// import Footer from "../layout/Footer";

// /* ================= Animated Counter ================= */
// const AnimatedCounter = ({ value }) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const duration = 800;

//     if (!value) {
//       setCount(0);
//       return;
//     }

//     const increment = value / (duration / 16);

//     const counter = setInterval(() => {
//       start += increment;
//       if (start >= value) {
//         setCount(value);
//         clearInterval(counter);
//       } else {
//         setCount(Math.floor(start));
//       }
//     }, 16);

//     return () => clearInterval(counter);
//   }, [value]);

//   return <span>{count}</span>;
// };

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const { getDashboard, getAllNotes, dashboardStats, notes, loading, user } =
//     useContext(NotesContext);

//   useEffect(() => {
//     getDashboard();
//     getAllNotes();
//   }, []);

//   const username = user?.name || "User";

//   /* ================= PIE DATA ================= */
//   const pieData = [
//     {
//       name: "Active",
//       value:
//         (dashboardStats?.totalNotes || 0) - (dashboardStats?.archiveNotes || 0),
//     },
//     {
//       name: "Archived",
//       value: dashboardStats?.archiveNotes || 0,
//     },
//     {
//       name: "Trash",
//       value: dashboardStats?.deleteNotes || 0,
//     },
//     {
//       name: "Favourite",
//       value: dashboardStats?.favouriteNotes || 0,
//     },
//   ];

//   const COLORS = ["#6366F1", "#0EA5E9", "#EF4444", "#FACC15"];

//   const recentNotes = notes?.filter((note) => !note.isDeleted)?.slice(0, 3);

//   return (
//     <>
//       <div className="flex min-h-screen bg-gradient-to-br from-base-200 to-base-300 transition-all duration-500">
//         {/* ================= SIDEBAR ================= */}
//         <div className="w-64 bg-base-100 p-6 border-r border-base-300 hidden md:block shadow-lg">
//           <h2 className="text-xl font-bold mb-8">My Workspace</h2>

//           <ul className="space-y-4 text-sm">
//             <li className="font-semibold text-primary">Dashboard</li>

//             <li>
//               <Link to="/notes" className="hover:text-primary transition">
//                 All Notes
//               </Link>
//             </li>

//             <li
//               onClick={() => navigate("/notes?filter=archived")}
//               className="cursor-pointer hover:text-primary transition"
//             >
//               Archive
//             </li>

//             <li
//               onClick={() => navigate("/notes?filter=trash")}
//               className="cursor-pointer hover:text-primary transition"
//             >
//               Trash
//             </li>

//             {/* 🔥 PYQs Link Added */}
//             <li>
//               <Link to="/pyqs" className="hover:text-primary transition">
//                 Previous Year Questions
//               </Link>
//             </li>
//           </ul>

//           <button
//             onClick={() => navigate("/notes/create")}
//             className="btn btn-primary w-full mt-10 rounded-xl shadow-md hover:scale-105 transition"
//           >
//             + New Note
//           </button>
//         </div>

//         {/* ================= MAIN ================= */}
//         <div className="flex-1 p-6 md:p-10">
//           {/* HEADER */}
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-3xl font-bold">Welcome, {username} 👋</h1>
//             <button
//               onClick={() => navigate("/notes/create")}
//               className="btn btn-primary btn-sm hover:scale-105 transition"
//             >
//               + Create
//             </button>
//           </div>

//           {loading ? (
//             <div className="flex justify-center mt-20">
//               <span className="loading loading-spinner loading-lg"></span>
//             </div>
//           ) : (
//             <>
//               {/* ================= STATS CARDS ================= */}
//               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
//                 {[
//                   {
//                     label: "Total Notes",
//                     value: dashboardStats?.totalNotes || 0,
//                     gradient: "from-indigo-500 to-purple-500",
//                   },
//                   {
//                     label: "Archived",
//                     value: dashboardStats?.archiveNotes || 0,
//                     gradient: "from-emerald-500 to-green-500",
//                   },
//                   {
//                     label: "Trash",
//                     value: dashboardStats?.deleteNotes || 0,
//                     gradient: "from-red-500 to-pink-500",
//                   },
//                   {
//                     label: "Favourite",
//                     value: dashboardStats?.favouriteNotes || 0,
//                     gradient: "from-yellow-400 to-orange-500",
//                   },
//                   {
//                     label: "This Month",
//                     value: dashboardStats?.thisMonthNotes || 0,
//                     gradient: "from-violet-500 to-indigo-500",
//                   },
//                 ].map((item, i) => (
//                   <div
//                     key={i}
//                     className={`bg-gradient-to-r ${item.gradient} text-white rounded-2xl p-6 shadow-lg hover:scale-105 transform transition duration-300`}
//                   >
//                     <p className="text-sm opacity-90">{item.label}</p>
//                     <h2 className="text-3xl font-bold mt-2">
//                       <AnimatedCounter value={item.value} />
//                     </h2>
//                   </div>
//                 ))}
//               </div>

//               {/* ================= EXPLORE SECTION ================= */}
//               <div className="bg-base-100 rounded-2xl p-6 shadow-lg mb-10">
//                 <h2 className="text-xl font-semibold mb-4">
//                   Explore Resources
//                 </h2>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div
//                     onClick={() => navigate("/pyqs")}
//                     className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow hover:scale-105 transition"
//                   >
//                     <h3 className="text-lg font-semibold">
//                       Previous Year Questions
//                     </h3>
//                     <p className="text-sm opacity-90 mt-2">
//                       Browse and download available PYQs
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* ================= CHARTS ================= */}
//               <div className="grid md:grid-cols-2 gap-8 mb-10">
//                 <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
//                   <h2 className="text-xl font-semibold mb-4">Monthly Notes</h2>

//                   <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={dashboardStats?.monthlyStats || []}>
//                       <XAxis dataKey="month" />
//                       <YAxis />
//                       <Tooltip />
//                       <Line
//                         type="monotone"
//                         dataKey="count"
//                         stroke="#6366F1"
//                         strokeWidth={3}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>

//                 <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
//                   <h2 className="text-xl font-semibold mb-6">
//                     Notes Distribution
//                   </h2>

//                   <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                       <Pie
//                         data={pieData}
//                         dataKey="value"
//                         nameKey="name"
//                         outerRadius={100}
//                         innerRadius={60}
//                         paddingAngle={5}
//                       >
//                         {pieData.map((entry, index) => (
//                           <Cell
//                             key={index}
//                             fill={COLORS[index % COLORS.length]}
//                           />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                       <Legend />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* ================= RECENT NOTES ================= */}
//               <div>
//                 <h2 className="text-xl font-semibold mb-6">Recent Notes</h2>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {recentNotes?.length > 0 ? (
//                     recentNotes.map((note) => (
//                       <div
//                         key={note._id}
//                         onClick={() => navigate(`/notes/edit/${note._id}`)}
//                         className="bg-base-100 p-6 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
//                       >
//                         <h3 className="font-semibold text-lg">{note.title}</h3>
//                         <p className="text-sm opacity-60 mt-2 line-clamp-3">
//                           {note.content}
//                         </p>
//                         <div className="mt-4 text-xs opacity-50">
//                           {new Date(note.createdAt).toLocaleDateString()}
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="col-span-full text-center opacity-60">
//                       No notes yet.
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Dashboard;
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { NotesContext } from "../../context/NotesContext";
import Footer from "../layout/Footer";

/* ================= Animated Counter ================= */
const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;

    if (!value) {
      setCount(0);
      return;
    }

    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return <span>{count}</span>;
};

/* ================= Contribution Heatmap ================= */
const ContributionHeatmap = ({ notes }) => {
  // Build a map of date -> count from notes
  const contributionMap = {};

  notes?.forEach((note) => {
    if (!note.isDeleted && note.createdAt) {
      const date = new Date(note.createdAt).toISOString().split("T")[0];
      contributionMap[date] = (contributionMap[date] || 0) + 1;
    }
  });

  // Generate last 12 weeks (84 days) grid
  const today = new Date();
  const days = [];
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    days.push({ date: dateStr, count: contributionMap[dateStr] || 0 });
  }

  // Pad so grid starts on Sunday
  const firstDayOfWeek = new Date(days[0].date).getDay(); // 0=Sun
  const paddedDays = [...Array(firstDayOfWeek).fill(null), ...days];

  // Chunk into weeks
  const weeks = [];
  for (let i = 0; i < paddedDays.length; i += 7) {
    weeks.push(paddedDays.slice(i, i + 7));
  }

  const getColor = (count) => {
    if (count === 0) return "bg-base-300";
    if (count === 1) return "bg-indigo-200";
    if (count === 2) return "bg-indigo-400";
    if (count === 3) return "bg-indigo-500";
    return "bg-indigo-700";
  };

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Month labels
  const monthLabels = [];
  weeks.forEach((week, wi) => {
    const firstReal = week.find((d) => d !== null);
    if (firstReal) {
      const d = new Date(firstReal.date);
      if (d.getDate() <= 7) {
        monthLabels[wi] = d.toLocaleString("default", { month: "short" });
      }
    }
  });

  const totalContributions = days.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-base-100 rounded-2xl p-6 shadow-lg mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Contribution Activity</h2>
        <span className="text-sm opacity-60">
          {totalContributions} notes in last 12 weeks
        </span>
      </div>

      {/* Month labels */}
      <div className="flex gap-1 mb-1 pl-8">
        {weeks.map((_, wi) => (
          <div key={wi} className="w-4 text-[10px] opacity-50 shrink-0">
            {monthLabels[wi] || ""}
          </div>
        ))}
      </div>

      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 mr-1">
          {dayLabels.map((label, i) => (
            <div
              key={i}
              className="h-4 w-6 text-[10px] opacity-50 flex items-center"
            >
              {i % 2 === 1 ? label : ""}
            </div>
          ))}
        </div>

        {/* Grid */}
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {Array(7)
              .fill(null)
              .map((_, di) => {
                const cell = week[di] ?? null;
                return (
                  <div
                    key={di}
                    title={
                      cell
                        ? `${cell.date}: ${cell.count} note${cell.count !== 1 ? "s" : ""}`
                        : ""
                    }
                    className={`w-4 h-4 rounded-sm shrink-0 transition-all duration-200 hover:ring-2 hover:ring-indigo-400 ${
                      cell === null ? "bg-transparent" : getColor(cell.count)
                    }`}
                  />
                );
              })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 text-xs opacity-60">
        <span>Less</span>
        {[
          "bg-base-300",
          "bg-indigo-200",
          "bg-indigo-400",
          "bg-indigo-500",
          "bg-indigo-700",
        ].map((cls, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${cls}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

/* ================= Weekly Bar Chart ================= */
const WeeklyBarChart = ({ notes }) => {
  // Build last 8 weeks of data
  const today = new Date();
  const weeks = [];

  for (let w = 7; w >= 0; w--) {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - w * 7 - today.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const label = `${weekStart.getDate()} ${weekStart.toLocaleString("default", { month: "short" })}`;

    const count =
      notes?.filter((note) => {
        if (note.isDeleted) return false;
        const d = new Date(note.createdAt);
        return d >= weekStart && d <= weekEnd;
      }).length || 0;

    weeks.push({ week: label, count });
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-200 border border-base-300 rounded-lg px-3 py-2 text-sm shadow">
          <p className="font-semibold">Week of {label}</p>
          <p className="text-indigo-400">{payload[0].value} notes created</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Weekly Notes Created</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={weeks} barSize={28}>
          <XAxis
            dataKey="week"
            tick={{ fontSize: 11, opacity: 0.6 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11, opacity: 0.6 }}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(99,102,241,0.08)" }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="url(#barGradient)" />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.6} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

/* ================= Dashboard ================= */
const Dashboard = () => {
  const navigate = useNavigate();

  const { getDashboard, getAllNotes, dashboardStats, notes, loading, user } =
    useContext(NotesContext);

  useEffect(() => {
    getDashboard();
    getAllNotes();
  }, []);

  const username = user?.name || "User";

  /* ================= PIE DATA ================= */
  const pieData = [
    {
      name: "Active",
      value:
        (dashboardStats?.totalNotes || 0) - (dashboardStats?.archiveNotes || 0),
    },
    {
      name: "Archived",
      value: dashboardStats?.archiveNotes || 0,
    },
    {
      name: "Trash",
      value: dashboardStats?.deleteNotes || 0,
    },
    {
      name: "Favourite",
      value: dashboardStats?.favouriteNotes || 0,
    },
  ];

  const COLORS = ["#6366F1", "#0EA5E9", "#EF4444", "#FACC15"];

  const recentNotes = notes?.filter((note) => !note.isDeleted)?.slice(0, 3);

  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-br from-base-200 to-base-300 transition-all duration-500">
        {/* ================= SIDEBAR ================= */}
        <div className="w-64 bg-base-100 p-6 border-r border-base-300 hidden md:block shadow-lg">
          <h2 className="text-xl font-bold mb-8">My Workspace</h2>

          <ul className="space-y-4 text-sm">
            <li className="font-semibold text-primary">Dashboard</li>

            <li>
              <Link to="/notes" className="hover:text-primary transition">
                All Notes
              </Link>
            </li>

            <li
              onClick={() => navigate("/notes?filter=archived")}
              className="cursor-pointer hover:text-primary transition"
            >
              Archive
            </li>

            <li
              onClick={() => navigate("/notes?filter=trash")}
              className="cursor-pointer hover:text-primary transition"
            >
              Trash
            </li>

            <li>
              <Link to="/pyqs" className="hover:text-primary transition">
                Previous Year Questions
              </Link>
            </li>
          </ul>

          <button
            onClick={() => navigate("/notes/create")}
            className="btn btn-primary w-full mt-10 rounded-xl shadow-md hover:scale-105 transition"
          >
            + New Note
          </button>
        </div>

        {/* ================= MAIN ================= */}
        <div className="flex-1 p-6 md:p-10">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Welcome, {username} 👋</h1>
            <button
              onClick={() => navigate("/notes/create")}
              className="btn btn-primary btn-sm hover:scale-105 transition"
            >
              + Create
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center mt-20">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              {/* ================= STATS CARDS ================= */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
                {[
                  {
                    label: "Total Notes",
                    value: dashboardStats?.totalNotes || 0,
                    gradient: "from-indigo-500 to-purple-500",
                  },
                  {
                    label: "Archived",
                    value: dashboardStats?.archiveNotes || 0,
                    gradient: "from-emerald-500 to-green-500",
                  },
                  {
                    label: "Trash",
                    value: dashboardStats?.deleteNotes || 0,
                    gradient: "from-red-500 to-pink-500",
                  },
                  {
                    label: "Favourite",
                    value: dashboardStats?.favouriteNotes || 0,
                    gradient: "from-yellow-400 to-orange-500",
                  },
                  {
                    label: "This Month",
                    value: dashboardStats?.thisMonthNotes || 0,
                    gradient: "from-violet-500 to-indigo-500",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`bg-gradient-to-r ${item.gradient} text-white rounded-2xl p-6 shadow-lg hover:scale-105 transform transition duration-300`}
                  >
                    <p className="text-sm opacity-90">{item.label}</p>
                    <h2 className="text-3xl font-bold mt-2">
                      <AnimatedCounter value={item.value} />
                    </h2>
                  </div>
                ))}
              </div>

              {/* ================= EXPLORE SECTION ================= */}
              <div className="bg-base-100 rounded-2xl p-6 shadow-lg mb-10">
                <h2 className="text-xl font-semibold mb-4">
                  Explore Resources
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div
                    onClick={() => navigate("/pyqs")}
                    className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow hover:scale-105 transition"
                  >
                    <h3 className="text-lg font-semibold">
                      Previous Year Questions
                    </h3>
                    <p className="text-sm opacity-90 mt-2">
                      Browse and download available PYQs
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= CONTRIBUTION HEATMAP ================= */}
              <ContributionHeatmap notes={notes} />

              {/* ================= CHARTS ================= */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Weekly Bar Chart */}
                <WeeklyBarChart notes={notes} />

                {/* Pie Chart */}
                <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
                  <h2 className="text-xl font-semibold mb-6">
                    Notes Distribution
                  </h2>

                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        innerRadius={60}
                        paddingAngle={5}
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* ================= RECENT NOTES ================= */}
              <div>
                <h2 className="text-xl font-semibold mb-6">Recent Notes</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recentNotes?.length > 0 ? (
                    recentNotes.map((note) => (
                      <div
                        key={note._id}
                        onClick={() => navigate(`/notes/edit/${note._id}`)}
                        className="bg-base-100 p-6 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
                      >
                        <h3 className="font-semibold text-lg">{note.title}</h3>
                        <p className="text-sm opacity-60 mt-2 line-clamp-3">
                          {note.content}
                        </p>
                        <div className="mt-4 text-xs opacity-50">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center opacity-60">
                      No notes yet.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
