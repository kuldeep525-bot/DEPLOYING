

// import { useEffect, useState } from "react";
// import api from "../../../services/api";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// /* ── Floating blob (same as rest of app) ── */
// const Blob = ({
//   className,
//   duration = 9,
//   xRange = 60,
//   yRange = 40,
//   delay = 0,
// }) => (
//   <motion.div
//     className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
//     animate={{
//       x: [0, xRange, xRange / 2, -xRange / 2, 0],
//       y: [0, -yRange, yRange, -yRange / 2, 0],
//       scale: [1, 1.1, 0.95, 1.05, 1],
//     }}
//     transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
//   />
// );

// const CARD_ACCENTS = [
//   "from-violet-500/20 to-indigo-500/10 border-violet-500/30",
//   "from-sky-500/20 to-cyan-500/10 border-sky-500/30",
//   "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
//   "from-amber-500/20 to-orange-400/10 border-amber-500/30",
//   "from-rose-500/20 to-pink-500/10 border-rose-500/30",
//   "from-fuchsia-500/20 to-purple-500/10 border-fuchsia-500/30",
// ];

// const Skeleton = () => (
//   <div className="rounded-2xl border border-base-300 p-6 animate-pulse bg-base-100/60">
//     <div className="h-5 bg-base-300 rounded w-3/4 mb-3" />
//     <div className="h-3 bg-base-300 rounded w-1/2 mb-2" />
//     <div className="h-3 bg-base-300 rounded w-1/3 mb-6" />
//     <div className="h-9 bg-base-300 rounded-xl w-full" />
//   </div>
// );

// const PapersHome = () => {
//   const [papers, setPapers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchPapers = async (page = 1) => {
//     try {
//       setLoading(true);
//       const res = await api.get(`/api/paper/getAllPaper?page=${page}&limit=6`);
//       setPapers(res.data.papers);
//       setCurrentPage(res.data.page);
//       setTotalPages(res.data.totalPages);
//     } catch (error) {
//       console.log("Error fetching papers", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPapers(currentPage);
//   }, [currentPage]);

//   const handlePageChange = (page) => {
//     if (page !== currentPage) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 relative overflow-hidden p-8">
//       {/* ── Blobs ── */}
//       <Blob
//         className="w-[420px] h-[420px] bg-primary/15 -top-24 -left-24"
//         duration={11}
//         xRange={60}
//         yRange={50}
//         delay={0}
//       />
//       <Blob
//         className="w-[320px] h-[320px] bg-secondary/15 bottom-10 right-0"
//         duration={9}
//         xRange={-50}
//         yRange={-40}
//         delay={2}
//       />
//       <Blob
//         className="w-[240px] h-[240px] bg-accent/10 top-1/2 right-1/4"
//         duration={13}
//         xRange={40}
//         yRange={60}
//         delay={3.5}
//       />

//       <div className="relative z-10 max-w-6xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 border border-primary/20">
//             📄 Study Resources
//           </span>
//           <h1 className="text-4xl font-bold tracking-tight">
//             Previous Year Questions
//           </h1>
//           <p className="text-sm opacity-50 mt-2">
//             Browse and download available PYQs
//           </p>
//         </motion.div>

//         {/* Grid */}
//         {loading ? (
//           <div className="grid md:grid-cols-3 gap-6">
//             {Array(6)
//               .fill(0)
//               .map((_, i) => (
//                 <Skeleton key={i} />
//               ))}
//           </div>
//         ) : (
//           <AnimatePresence mode="popLayout">
//             <div className="grid md:grid-cols-3 gap-6">
//               {papers.map((paper, idx) => {
//                 const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
//                 return (
//                   <motion.div
//                     key={paper._id}
//                     layout
//                     initial={{ opacity: 0, y: 20, scale: 0.96 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.92 }}
//                     transition={{ delay: idx * 0.05, duration: 0.35 }}
//                     whileHover={{
//                       y: -5,
//                       boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
//                     }}
//                     className={`bg-gradient-to-br ${accent} border rounded-2xl p-6 relative overflow-hidden`}
//                   >
//                     {/* micro blob */}
//                     <Blob
//                       className="w-20 h-20 bg-white/10 -bottom-3 -right-3"
//                       duration={6 + (idx % 3)}
//                       xRange={8}
//                       yRange={8}
//                       delay={idx * 0.4}
//                     />

//                     <h2 className="text-lg font-semibold leading-snug">
//                       {paper.title}
//                     </h2>
//                     <p className="text-sm opacity-60 mt-1">{paper.subject}</p>
//                     <p className="text-xs opacity-40 mt-1 font-mono">
//                       Year: {paper.year}
//                     </p>

//                     <motion.div
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.97 }}
//                       className="mt-5"
//                     >
//                       <Link
//                         to={`/pyqs/${paper._id}`}
//                         className="btn btn-primary w-full rounded-xl btn-sm"
//                       >
//                         View Details →
//                       </Link>
//                     </motion.div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </AnimatePresence>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="flex justify-center mt-12 gap-2"
//           >
//             {[...Array(totalPages)].map((_, index) => {
//               const page = index + 1;
//               return (
//                 <motion.button
//                   key={page}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.93 }}
//                   onClick={() => handlePageChange(page)}
//                   className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all
//                     ${
//                       currentPage === page
//                         ? "bg-primary text-primary-content shadow-lg shadow-primary/30"
//                         : "bg-base-100/70 border border-base-300 hover:border-primary/50"
//                     }`}
//                 >
//                   {page}
//                 </motion.button>
//               );
//             })}
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PapersHome;
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* Floating blob */
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

const PapersHome = () => {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPapers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/paper/pyq?course=BCA");
      setSemesters(res.data.data);
    } catch (error) {
      console.log("Error fetching papers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 relative overflow-hidden p-8">

      {/* Blobs */}
      <Blob className="w-[420px] h-[420px] bg-primary/15 -top-24 -left-24" />
      <Blob className="w-[320px] h-[320px] bg-secondary/15 bottom-10 right-0" delay={2} />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">Previous Year Questions</h1>
          <p className="text-sm opacity-50 mt-2">
            Browse papers by semester & subject
          </p>
        </div>

        {/* Loader */}
        {loading && (
          <div className="text-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {/* Course Card */}
        {!loading && (
          <div className="bg-base-100 border border-base-300 rounded-xl shadow-md">

            {/* Course Header */}
            <div className="p-6 border-b flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <h2 className="text-xl font-semibold">
                Bachelor of Computer Application
              </h2>
            </div>

            {/* Semesters */}
            <div className="p-4 space-y-3">

              {semesters.map((semester) => (

                <div
                  key={semester._id}
                  className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-lg"
                >

                  <input type="checkbox" />

                  <div className="collapse-title font-semibold flex justify-between">

                    <span>
                      Semester {semester._id}
                    </span>

                    <span className="text-sm opacity-60">
                      ({semester.subjects.length} subjects)
                    </span>

                  </div>

                  <div className="collapse-content">

                    {semester.subjects.map((subject, idx) => (

                      <div key={idx} className="mb-6">

                        <h3 className="font-semibold mb-3">
                          {subject.subject}
                        </h3>

                        <div className="grid md:grid-cols-3 gap-4">

                          {subject.papers.map((paper) => (

                            <motion.div
                              key={paper._id}
                              whileHover={{ y: -4 }}
                              className="bg-base-100 border border-base-300 rounded-xl p-4 shadow-sm"
                            >

                              <h4 className="font-medium">
                                {paper.title}
                              </h4>

                              <p className="text-xs opacity-60">
                                Year: {paper.year}
                              </p>

                              <p className="text-xs mt-1">
                                {paper.price > 0
                                  ? `₹${paper.price}`
                                  : "Free"}
                              </p>

                              <Link
                                to={`/pyqs/${paper._id}`}
                                className="btn btn-primary btn-xs mt-3 w-full"
                              >
                                View
                              </Link>

                            </motion.div>

                          ))}

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default PapersHome;