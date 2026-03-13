// import { useContext, useEffect, useState } from "react";
// import { NotesContext } from "../../context/NotesContext";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../../services/api";

// import { FaEdit } from "react-icons/fa";
// import {
//   MdDelete,
//   MdArchive,
//   MdOutlineUnarchive,
//   MdRestore,
//   MdDeleteForever,
// } from "react-icons/md";
// import { CiStar } from "react-icons/ci";
// import Footer from "../layout/Footer";
// import {
//   showInfo,
//   showSuccess,
//   showWarning,
// } from "../../utils/toast";

// const AllNotes = () => {
//   const { notes = [], getSmartNotes, loading } = useContext(NotesContext);

//   const [filter, setFilter] = useState("all");
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   /* ===== Initial Fetch ===== */
//   useEffect(() => {
//     getSmartNotes();
//     showSuccess("Notes fetched successfully");
//   }, []);

//   /* ===== Filter Change ===== */
//   const handleFilterChange = (type) => {
//     setFilter(type);

//     const query = {};

//     if (type === "archived") query.archived = true;
//     if (type === "favourite") query.favourite = true;
//     if (type === "trash") query.deleted = true;

//     getSmartNotes(query);
//   };

//   /* ===== Search (Debounce) ===== */
//   useEffect(() => {
//     const delay = setTimeout(() => {
//       const query = {};

//       if (filter === "archived") query.archived = true;
//       if (filter === "favourite") query.favourite = true;
//       if (filter === "trash") query.deleted = true;
//       if (search) query.search = search;

//       getSmartNotes(query);
//     }, 500);

//     return () => clearTimeout(delay);
//   }, [search, filter]);

//   /* ===== Refresh ===== */
//   const refreshNotes = () => {
//     const query = {};

//     if (filter === "archived") query.archived = true;
//     if (filter === "favourite") query.favourite = true;
//     if (filter === "trash") query.deleted = true;

//     getSmartNotes(query);
//   };

//   /* ===== Actions ===== */

//   const handleSoftDelete = async (e, id) => {
//     e.stopPropagation();
//     const res = await api.patch(`/api/notes/deletenote/${id}`);
//     showInfo(res.data.message);
//     refreshNotes();
//   };

//   const handleHardDelete = async (e, id) => {
//     e.stopPropagation();
//     const res = await api.delete(`/api/notes/harddeletenote/${id}`);
//     showWarning(res.data.message);
//     refreshNotes();
//   };

//   const handleRestore = async (e, id) => {
//     e.stopPropagation();
//     const res = await api.patch(`/api/notes/restorenote/${id}`);
//     showSuccess(res.data.message);
//     refreshNotes();
//   };

//   const handleFavourite = async (e, note) => {
//     e.stopPropagation();
//     const res = await api.patch(
//       `/api/notes/${note.isFavourite ? "unfavourite" : "favourite"}/${note._id}`
//     );
//     showInfo(res.data.message);
//     refreshNotes();
//   };

//   const handleArchive = async (e, note) => {
//     e.stopPropagation();
//     const res = await api.patch(
//       `/api/notes/${note.isArchived ? "unarchive" : "archive"}/${note._id}`
//     );
//     showSuccess(res.data.message);
//     refreshNotes();
//   };

//   return (
//     <>
//       <div className="flex min-h-screen bg-base-200">
//         {/* Sidebar */}
//         <div className="w-64 bg-base-100 p-6 border-r">
//           <h2 className="text-xl font-bold mb-8">My Notes</h2>

//           <ul className="space-y-3">
//             {["all", "archived", "favourite", "trash"].map((item) => (
//               <li
//                 key={item}
//                 onClick={() => handleFilterChange(item)}
//                 className={`cursor-pointer px-3 py-2 rounded-lg transition ${
//                   filter === item
//                     ? "bg-primary text-white"
//                     : "hover:bg-base-200"
//                 }`}
//               >
//                 {item.charAt(0).toUpperCase() + item.slice(1)}
//               </li>
//             ))}
//           </ul>

//           <button
//             onClick={() => navigate("/notes/create")}
//             className="btn btn-primary w-full mt-10"
//           >
//             + New Note
//           </button>
//         </div>

//         {/* Main */}
//         <div className="flex-1 p-8">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-3xl font-bold capitalize">
//               {filter} Notes
//             </h1>

//             <div className="flex gap-4 items-center">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="input input-bordered w-64"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <Link
//                 to="/dashboard"
//                 className="text-lg font-semibold hover:text-primary"
//               >
//                 Dashboard
//               </Link>
//             </div>
//           </div>

//           {loading ? (
//             <div className="flex justify-center mt-10">
//               <span className="loading loading-spinner loading-lg"></span>
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-3 gap-6">
//               {notes.length > 0 ? (
//                 notes.map((note) => (
//                   <div
//                     key={note._id}
//                     onClick={() =>
//                       navigate(`/notes/edit/${note._id}`)
//                     }
//                     className="bg-base-100 p-6 rounded-xl shadow hover:shadow-xl cursor-pointer transition"
//                   >
//                     <h3 className="font-semibold text-lg">
//                       {note.title}
//                     </h3>

//                     <p className="text-sm opacity-60 mt-2 line-clamp-3">
//                       {note.content}
//                     </p>

//                     <div className="flex justify-end gap-4 mt-4 text-lg">
//                       {filter === "trash" ? (
//                         <>
//                           <MdRestore
//                             onClick={(e) =>
//                               handleRestore(e, note._id)
//                             }
//                             className="text-green-600"
//                           />
//                           <MdDeleteForever
//                             onClick={(e) =>
//                               handleHardDelete(e, note._id)
//                             }
//                             className="text-red-600"
//                           />
//                         </>
//                       ) : (
//                         <>
//                           <FaEdit
//                             className="text-green-500"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               navigate(`/notes/edit/${note._id}`);
//                             }}
//                           />

//                           <CiStar
//                             onClick={(e) =>
//                               handleFavourite(e, note)
//                             }
//                             className={`${
//                               note.isFavourite
//                                 ? "text-yellow-500"
//                                 : "text-gray-400"
//                             }`}
//                           />

//                           {note.isArchived ? (
//                             <MdOutlineUnarchive
//                               onClick={(e) =>
//                                 handleArchive(e, note)
//                               }
//                               className="text-blue-600"
//                             />
//                           ) : (
//                             <MdArchive
//                               onClick={(e) =>
//                                 handleArchive(e, note)
//                               }
//                               className="text-gray-400"
//                             />
//                           )}

//                           <MdDelete
//                             onClick={(e) =>
//                               handleSoftDelete(e, note._id)
//                             }
//                             className="text-red-500"
//                           />
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="opacity-60">No Notes Found</p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AllNotes;
import { useContext, useEffect, useState } from "react";
import { NotesContext } from "../../context/NotesContext";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";

import { FaEdit } from "react-icons/fa";
import {
  MdDelete,
  MdArchive,
  MdOutlineUnarchive,
  MdRestore,
  MdDeleteForever,
} from "react-icons/md";
import { CiStar } from "react-icons/ci";
import Footer from "../layout/Footer";
import { showInfo, showSuccess, showWarning } from "../../utils/toast";

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

const CARD_ACCENTS = [
  "from-violet-500/20 to-indigo-500/10 border-violet-500/30",
  "from-sky-500/20 to-cyan-500/10 border-sky-500/30",
  "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
  "from-amber-500/20 to-orange-400/10 border-amber-500/30",
  "from-rose-500/20 to-pink-500/10 border-rose-500/30",
  "from-fuchsia-500/20 to-purple-500/10 border-fuchsia-500/30",
];

const FILTER_META = {
  all: { label: "All", emoji: "📝", desc: "Every note" },
  archived: { label: "Archive", emoji: "🗃️", desc: "Stored away" },
  favourite: { label: "Starred", emoji: "⭐", desc: "Your picks" },
  trash: { label: "Trash", emoji: "🗑️", desc: "Deleted items" },
};

const Skeleton = () => (
  <div className="rounded-2xl border border-base-300 p-6 animate-pulse bg-base-100">
    <div className="h-4 bg-base-300 rounded w-3/4 mb-3" />
    <div className="h-3 bg-base-300 rounded w-full mb-2" />
    <div className="h-3 bg-base-300 rounded w-5/6 mb-2" />
    <div className="h-3 bg-base-300 rounded w-2/3" />
  </div>
);

const AllNotes = () => {
  const { notes = [], getSmartNotes, loading } = useContext(NotesContext);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  // Local copy for optimistic updates — no re-fetch needed for actions
  const [localNotes, setLocalNotes] = useState([]);
  const navigate = useNavigate();

  // Sync localNotes when notes from context change (only on real fetches)
  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  // Initial fetch only
  useEffect(() => {
    getSmartNotes();
    showSuccess("Notes fetched successfully");
  }, []);

  // Filter change → fetch once
  const handleFilterChange = (type) => {
    setFilter(type);
    const q = {};
    if (type === "archived") q.archived = true;
    if (type === "favourite") q.favourite = true;
    if (type === "trash") q.deleted = true;
    getSmartNotes(q);
  };

  // Search debounce → fetch once per settled input
  useEffect(() => {
    const timer = setTimeout(() => {
      const q = {};
      if (filter === "archived") q.archived = true;
      if (filter === "favourite") q.favourite = true;
      if (filter === "trash") q.deleted = true;
      if (search) q.search = search;
      getSmartNotes(q);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]); // ← only search, NOT filter (filter has its own handler)

  // ── Optimistic helpers ──
  const removeFromLocal = (id) =>
    setLocalNotes((prev) => prev.filter((n) => n._id !== id));

  const updateLocal = (id, patch) =>
    setLocalNotes((prev) =>
      prev.map((n) => (n._id === id ? { ...n, ...patch } : n)),
    );

  // ── Actions — optimistic, no refreshNotes() ──
  const handleSoftDelete = async (e, id) => {
    e.stopPropagation();
    removeFromLocal(id); // instant UI remove
    try {
      const r = await api.patch(`/api/notes/deletenote/${id}`);
      showInfo(r.data.message);
    } catch {
      showWarning("Failed to delete");
      getSmartNotes(); // rollback
    }
  };

  const handleHardDelete = async (e, id) => {
    e.stopPropagation();
    removeFromLocal(id);
    try {
      const r = await api.delete(`/api/notes/harddeletenote/${id}`);
      showWarning(r.data.message);
    } catch {
      showWarning("Failed to delete permanently");
      getSmartNotes();
    }
  };

  const handleRestore = async (e, id) => {
    e.stopPropagation();
    removeFromLocal(id); // removed from trash view instantly
    try {
      const r = await api.patch(`/api/notes/restorenote/${id}`);
      showSuccess(r.data.message);
    } catch {
      showWarning("Failed to restore");
      getSmartNotes();
    }
  };

  const handleFavourite = async (e, note) => {
    e.stopPropagation();
    const newVal = !note.isFavourite;
    updateLocal(note._id, { isFavourite: newVal }); // instant star toggle
    try {
      const r = await api.patch(
        `/api/notes/${note.isFavourite ? "unfavourite" : "favourite"}/${note._id}`,
      );
      showInfo(r.data.message);
      // If in favourite filter and we un-starred, remove from view
      if (filter === "favourite" && !newVal) removeFromLocal(note._id);
    } catch {
      updateLocal(note._id, { isFavourite: note.isFavourite }); // rollback
      showWarning("Failed to update favourite");
    }
  };

  const handleArchive = async (e, note) => {
    e.stopPropagation();
    const newVal = !note.isArchived;
    updateLocal(note._id, { isArchived: newVal }); // instant icon swap
    try {
      const r = await api.patch(
        `/api/notes/${note.isArchived ? "unarchive" : "archive"}/${note._id}`,
      );
      showSuccess(r.data.message);
      // If in archived filter and we unarchived, remove from view
      if (filter === "archived" && !newVal) removeFromLocal(note._id);
    } catch {
      updateLocal(note._id, { isArchived: note.isArchived }); // rollback
      showWarning("Failed to update archive");
    }
  };

  const activeMeta = FILTER_META[filter];

  // Apply search filter locally too (instant, no debounce flash)
  const visibleNotes = search
    ? localNotes.filter(
        (n) =>
          n.title?.toLowerCase().includes(search.toLowerCase()) ||
          n.content?.toLowerCase().includes(search.toLowerCase()),
      )
    : localNotes;

  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-br from-base-200 to-base-300 relative overflow-hidden">
        {/* Background blobs */}
        <Blob
          className="w-[420px] h-[420px] bg-primary/15 -top-20 -left-20"
          duration={11}
          xRange={60}
          yRange={50}
          delay={0}
        />
        <Blob
          className="w-[320px] h-[320px] bg-secondary/15 bottom-10 right-10"
          duration={9}
          xRange={-50}
          yRange={-40}
          delay={2}
        />
        <Blob
          className="w-[200px] h-[200px] bg-accent/10 top-1/2 right-1/3"
          duration={13}
          xRange={40}
          yRange={60}
          delay={4}
        />

        {/* ── SIDEBAR ── */}
        <motion.aside
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-64 bg-base-100/80 backdrop-blur-sm p-6 border-r border-base-300 hidden md:flex flex-col shadow-xl relative z-10"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">My Notes</h2>
            <p className="text-xs opacity-40 mt-1">Organised. Always.</p>
          </div>

          <nav className="space-y-1 flex-1">
            {Object.entries(FILTER_META).map(([key, meta], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                onClick={() => handleFilterChange(key)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200
                  ${
                    filter === key
                      ? "bg-primary text-primary-content shadow-md shadow-primary/30 scale-[1.02]"
                      : "hover:bg-base-200 hover:translate-x-1"
                  }`}
              >
                <span className="text-lg">{meta.emoji}</span>
                <div>
                  <div className="text-sm font-medium">{meta.label}</div>
                  {filter !== key && (
                    <div className="text-[10px] opacity-40">{meta.desc}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </nav>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/notes/create")}
            className="btn btn-primary w-full rounded-xl mt-6 shadow-lg"
          >
            ✦ New Note
          </motion.button>

          <Link
            to="/dashboard"
            className="text-center text-xs opacity-40 hover:opacity-70 transition mt-4"
          >
            ← Dashboard
          </Link>
        </motion.aside>

        {/* ── MAIN ── */}
        <main className="flex-1 p-6 md:p-10 flex flex-col gap-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <motion.span
                key={filter}
                initial={{ scale: 0.6, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="text-3xl"
              >
                {activeMeta.emoji}
              </motion.span>
              <div>
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={filter}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="text-3xl font-bold"
                  >
                    {activeMeta.label} Notes
                  </motion.h1>
                </AnimatePresence>
                <p className="text-xs opacity-40 mt-0.5">{activeMeta.desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 text-sm">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search notes…"
                  className="pl-9 pr-4 py-2 rounded-xl border border-base-300 bg-base-100/80 backdrop-blur-sm text-sm w-56 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/notes/create")}
                className="btn btn-primary btn-sm rounded-xl"
              >
                + New
              </motion.button>
            </div>
          </motion.div>

          {/* Count badge */}
          {!loading && (
            <div className="flex gap-2 -mt-2">
              <span className="text-[11px] px-3 py-1 rounded-full bg-base-300/60 font-semibold uppercase tracking-wide opacity-60">
                {visibleNotes.length}{" "}
                {visibleNotes.length === 1 ? "note" : "notes"}
              </span>
              {search && (
                <span className="text-[11px] px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold uppercase tracking-wide">
                  "{search}"
                </span>
              )}
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} />
                ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {visibleNotes.length > 0 ? (
                  visibleNotes.map((note, idx) => {
                    const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
                    return (
                      <motion.div
                        key={note._id}
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          scale: 0.88,
                          y: -10,
                          transition: { duration: 0.2 },
                        }}
                        transition={{ delay: idx * 0.03, duration: 0.3 }}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                        }}
                        onClick={() => navigate(`/notes/edit/${note._id}`)}
                        className={`bg-gradient-to-br ${accent} border rounded-2xl p-6 cursor-pointer relative overflow-hidden`}
                      >
                        {/* Micro blob */}
                        <Blob
                          className="w-24 h-24 bg-white/10 -bottom-4 -right-4"
                          duration={6 + (idx % 3)}
                          xRange={10}
                          yRange={10}
                          delay={idx * 0.3}
                        />

                        {note.isFavourite && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 right-4 text-yellow-400 text-lg"
                          >
                            ★
                          </motion.span>
                        )}
                        {note.isArchived && (
                          <span className="absolute top-4 left-4 text-[9px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 uppercase tracking-wide">
                            archived
                          </span>
                        )}

                        <h3 className="font-semibold text-lg leading-snug mt-2 pr-6">
                          {note.title}
                        </h3>
                        <p className="text-sm opacity-55 mt-2 line-clamp-3 leading-relaxed">
                          {note.content}
                        </p>

                        <div className="flex justify-between items-center mt-5">
                          <span className="text-[11px] opacity-35 font-mono">
                            {new Date(note.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>

                          <div
                            className="flex gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {filter === "trash" ? (
                              <>
                                <motion.button
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-base-200/60 text-emerald-500"
                                  onClick={(e) => handleRestore(e, note._id)}
                                >
                                  <MdRestore />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-base-200/60 text-red-500"
                                  onClick={(e) => handleHardDelete(e, note._id)}
                                >
                                  <MdDeleteForever />
                                </motion.button>
                              </>
                            ) : (
                              <>
                                <motion.button
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-base-200/60 text-emerald-500"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/notes/edit/${note._id}`);
                                  }}
                                >
                                  <FaEdit />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.2, rotate: 15 }}
                                  whileTap={{ scale: 0.9 }}
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center bg-base-200/60 ${note.isFavourite ? "text-yellow-400" : "text-base-content/40"}`}
                                  onClick={(e) => handleFavourite(e, note)}
                                >
                                  <CiStar />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.9 }}
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center bg-base-200/60 ${note.isArchived ? "text-sky-400" : "text-base-content/40"}`}
                                  onClick={(e) => handleArchive(e, note)}
                                >
                                  {note.isArchived ? (
                                    <MdOutlineUnarchive />
                                  ) : (
                                    <MdArchive />
                                  )}
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-base-200/60 text-red-400"
                                  onClick={(e) => handleSoftDelete(e, note._id)}
                                >
                                  <MdDelete />
                                </motion.button>
                              </>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="col-span-full text-center py-24"
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-5xl mb-4"
                    >
                      {filter === "trash"
                        ? "🗑️"
                        : filter === "archived"
                          ? "🗃️"
                          : filter === "favourite"
                            ? "⭐"
                            : "📭"}
                    </motion.div>
                    <p className="text-lg font-medium opacity-60">
                      No notes here
                    </p>
                    <p className="text-sm opacity-40 mt-1">
                      {filter === "all"
                        ? "Create your first note to get started"
                        : `Nothing in ${activeMeta.label.toLowerCase()} yet`}
                    </p>
                    {filter === "all" && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate("/notes/create")}
                        className="btn btn-primary btn-sm mt-6 rounded-xl"
                      >
                        + Create Note
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AllNotes;
