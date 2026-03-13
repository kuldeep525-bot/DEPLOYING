// import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { ThemeContext } from "../../context/ThemeContext";
// import { NotesContext } from "../../context/NotesContext";
// import api from "../../services/api";

// const Navbar = () => {
//   const { user, setUser, authLoading } = useContext(NotesContext);
//   const { theme, toggleTheme } = useContext(ThemeContext);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await api.post("/api/auth/logout");
//       setUser(null);
//       navigate("/");
//     } catch (error) {
//       console.log("Logout error:", error);
//     }
//   };

//   return (
//     <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-50">
//       {/* LOGO */}
//       <div className="flex-1">
//         <Link to="/" className="btn btn-ghost text-xl font-bold tracking-wide">
//           NoteSphere
//         </Link>
//       </div>

//       {/* CENTER MENU */}
//       <div className="hidden lg:flex">
//         <ul className="menu menu-horizontal gap-2 px-1">
//           <li>
//             <Link to="/">Home</Link>
//           </li>

//           {user && (
//             <>
//               <li>
//                 <Link to="/dashboard">Dashboard</Link>
//               </li>

//               <li>
//                 <Link to="/notes">My Notes</Link>
//               </li>

//               {/* 🔥 Direct PYQs Entry */}
//               <li>
//                 <Link to="/pyqs">PYQs</Link>
//               </li>
//             </>
//           )}

//           <li>
//             <details>
//               <summary>Products</summary>
//               <ul className="p-2 bg-base-100 w-44 z-10">
//                 <li>
//                   <Link to="/pyqs">PYQs</Link>
//                 </li>
//                 <li>
//                   <a className="opacity-50 cursor-not-allowed">
//                     URL Shortener (Coming Soon)
//                   </a>
//                 </li>
//               </ul>
//             </details>
//           </li>
//         </ul>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="navbar-end gap-3">
//         <button
//           onClick={toggleTheme}
//           className="btn btn-ghost btn-circle"
//           title="Toggle Theme"
//         >
//           {theme === "forest" ? "🌙" : "☀️"}
//         </button>

//         {authLoading ? (
//           <span className="loading loading-spinner loading-sm"></span>
//         ) : user ? (
//           <div className="dropdown dropdown-end">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar"
//             >
//               {user.profileImg ? (
//                 <div className="w-10 rounded-full overflow-hidden">
//                   <img
//                     src={user.profileImg}
//                     alt="profile"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ) : (
//                 <div className="w-10 rounded-full bg-primary text-white flex items-center justify-center">
//                   {user.name?.charAt(0).toUpperCase()}
//                 </div>
//               )}
//             </div>

//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow"
//             >
//               <li className="px-3 py-2 font-semibold text-sm opacity-70">
//                 {user.name}
//               </li>

//               <li>
//                 <Link to="/dashboard">Dashboard</Link>
//               </li>

//               <li>
//                 <Link to="/notes">My Notes</Link>
//               </li>

//               <li>
//                 <Link to="/pyqs">PYQs</Link>
//               </li>

//               <li>
//                 <Link to="/profile">Profile</Link>
//               </li>

//               {user.role === "admin" && (
//                 <li>
//                   <Link to="/admin/dashboard" className="text-warning">
//                     Admin Panel
//                   </Link>
//                 </li>
//               )}

//               <li>
//                 <button onClick={handleLogout} className="text-error">
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         ) : (
//           <>
//             <Link to="/login" className="btn btn-sm btn-primary">
//               Login
//             </Link>
//             <Link to="/signup" className="btn btn-sm btn-outline">
//               Signup
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { NotesContext } from "../../context/NotesContext";
import { motion } from "framer-motion";
import api from "../../services/api";

const Navbar = () => {
  const { user, setUser, authLoading } = useContext(NotesContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-300/60 px-6 sticky top-0 z-50 shadow-sm"
    >
      {/* LOGO */}
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight hover:opacity-80 transition"
        >
          <span className="text-primary">✦</span> NoteSphere
        </Link>
      </div>

      {/* CENTER MENU */}
      <div className="hidden lg:flex">
        <ul className="flex items-center gap-1 text-sm font-medium">
          {[
            { label: "Home", to: "/" },
            ...(user
              ? [
                  { label: "Dashboard", to: "/dashboard" },
                  { label: "My Notes", to: "/notes" },
                  { label: "PYQs", to: "/pyqs" },
                ]
              : []),
          ].map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="px-3 py-1.5 rounded-lg hover:bg-base-200 transition opacity-70 hover:opacity-100"
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Products dropdown */}
          <li>
            <details className="dropdown">
              <summary className="px-3 py-1.5 rounded-lg hover:bg-base-200 transition opacity-70 hover:opacity-100 cursor-pointer list-none flex items-center gap-1">
                Products <span className="text-[10px] opacity-50">▾</span>
              </summary>
              <ul className="dropdown-content bg-base-100/95 backdrop-blur-sm border border-base-300 rounded-xl shadow-xl z-10 mt-2 w-48 p-2 text-sm">
                <li>
                  <Link
                    to="/pyqs"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200 transition"
                  >
                    📄 PYQs
                  </Link>
                </li>
                <li>
                  <span className="flex items-center gap-2 px-3 py-2 rounded-lg opacity-40 cursor-not-allowed text-xs">
                    🔗 URL Shortener
                    <span className="ml-auto text-[9px] bg-base-300 px-1.5 py-0.5 rounded-full">
                      Soon
                    </span>
                  </span>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-end gap-2">
        {/* Theme toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl bg-base-200 border border-base-300 flex items-center justify-center text-base hover:border-primary/40 transition"
          title="Toggle Theme"
        >
          {theme === "forest" ? "☀️" : "🌙"}
        </motion.button>

        {authLoading ? (
          <span className="loading loading-spinner loading-sm opacity-50" />
        ) : user ? (
          <div className="dropdown dropdown-end">
            <motion.div
              whileHover={{ scale: 1.05 }}
              tabIndex={0}
              role="button"
              className="cursor-pointer"
            >
              {user.profileImg ? (
                <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-primary/30 hover:border-primary/60 transition">
                  <img
                    src={user.profileImg}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-primary text-primary-content flex items-center justify-center font-bold text-sm shadow-md shadow-primary/20">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </motion.div>

            <ul
              tabIndex={0}
              className="dropdown-content bg-base-100/95 backdrop-blur-sm border border-base-300 rounded-2xl shadow-xl z-10 mt-3 w-52 p-2 text-sm"
            >
              {/* User info */}
              <li className="px-3 py-2.5 mb-1 border-b border-base-300">
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-[11px] opacity-40 truncate">{user.email}</p>
              </li>

              {[
                { label: "Dashboard", to: "/dashboard", icon: "📊" },
                { label: "My Notes", to: "/notes", icon: "📝" },
                { label: "PYQs", to: "/pyqs", icon: "📄" },
                { label: "Profile", to: "/profile", icon: "👤" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-base-200 transition"
                  >
                    <span className="text-base">{item.icon}</span> {item.label}
                  </Link>
                </li>
              ))}

              {user.role === "admin" && (
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-warning/10 text-warning transition"
                  >
                    <span>⚙️</span> Admin Panel
                  </Link>
                </li>
              )}

              <li className="mt-1 border-t border-base-300 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-error/10 text-error transition"
                >
                  <span>🚪</span> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/login"
                className="btn btn-sm btn-primary rounded-xl shadow-md shadow-primary/20"
              >
                Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/signup" className="btn btn-sm btn-outline rounded-xl">
                Signup
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
