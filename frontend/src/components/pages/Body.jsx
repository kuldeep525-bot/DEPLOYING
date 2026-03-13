// import { useNavigate } from "react-router";
// import { motion } from "framer-motion";
// import Footer from "../layout/Footer";

// const Body = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-base-200 text-base-content overflow-hidden">
//       <main className="pt-24">
//         {/* HERO SECTION */}
//         <section className="py-28 relative">
//           <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-3xl opacity-40"></div>

//           <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
//             {/* LEFT CONTENT */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="flex-1 text-center lg:text-left"
//             >
//               <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
//                 Organize your <br />
//                 <span className="text-primary">digital chaos.</span>
//               </h1>

//               <p className="mt-6 text-lg opacity-80 max-w-xl">
//                 NoteSphere helps you capture ideas, manage tasks and track
//                 productivity with a clean, distraction-free experience built
//                 using modern MERN architecture.
//               </p>

//               <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <button
//                   onClick={() => navigate("/signup")}
//                   className="btn btn-primary btn-lg shadow-xl hover:scale-105 transition"
//                 >
//                   Get Started Free
//                 </button>

//                 <button
//                   onClick={() => navigate("/login")}
//                   className="btn btn-outline btn-lg hover:scale-105 transition"
//                 >
//                   Login
//                 </button>
//               </div>

//               <p className="mt-6 text-sm opacity-60">
//                 Built with React, Node.js & MongoDB
//               </p>
//             </motion.div>

//             {/* RIGHT MOCKUP */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8 }}
//               className="flex-1"
//             >
//               <div className="bg-base-100 shadow-2xl border border-base-300 rounded-2xl overflow-hidden">
//                 {/* Mac Top Bar */}
//                 <div className="flex items-center gap-2 px-4 py-3 bg-base-200 border-b border-base-300">
//                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                   <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
//                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                   <span className="ml-4 text-xs opacity-60">
//                     notesphere.app/dashboard
//                   </span>
//                 </div>

//                 {/* App Content */}
//                 <div className="p-6 space-y-6">
//                   <div className="p-4 bg-base-200 rounded-xl border border-base-300 shadow-sm">
//                     <h3 className="font-semibold text-primary mb-2">
//                       Product Ideas
//                     </h3>
//                     <p className="text-sm opacity-70">
//                       Build admin analytics dashboard with monthly growth
//                       tracking.
//                     </p>

//                     <div className="flex justify-between items-center mt-4">
//                       <span className="badge badge-primary badge-sm">
//                         Important
//                       </span>

//                       <div className="flex gap-2">
//                         <button className="btn btn-xs btn-outline">Edit</button>
//                         <button className="btn btn-xs btn-ghost">
//                           Archive
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-4 bg-base-200 rounded-xl border border-base-300 shadow-sm">
//                     <h3 className="font-semibold text-secondary mb-2">
//                       Backend Optimization
//                     </h3>
//                     <p className="text-sm opacity-70">
//                       Replace filters with MongoDB countDocuments for
//                       performance.
//                     </p>

//                     <div className="mt-4 h-2 bg-base-300 rounded-full overflow-hidden">
//                       <motion.div
//                         initial={{ width: 0 }}
//                         animate={{ width: "70%" }}
//                         transition={{ duration: 1.5 }}
//                         className="h-full bg-secondary"
//                       />
//                     </div>
//                   </div>

//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.8 }}
//                     className="text-xs opacity-50 text-right"
//                   >
//                     Last synced: {new Date().toLocaleTimeString()}
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </section>

//         {/* SOCIAL PROOF */}
//         <section className="py-24 bg-base-100 text-center">
//           <h2 className="text-3xl font-bold mb-10">
//             Trusted by modern creators
//           </h2>

//           <div className="flex flex-wrap justify-center gap-10 opacity-60 text-lg font-medium">
//             <span>Startup Teams</span>
//             <span>Developers</span>
//             <span>Product Designers</span>
//             <span>Students</span>
//           </div>
//         </section>

//         {/* FEATURES */}
//         <section className="py-28 bg-base-200">
//           <div className="text-center mb-20">
//             <h2 className="text-4xl font-bold">Designed for Focus</h2>
//             <p className="opacity-70 mt-4">
//               Everything you need. Nothing you don't.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
//             {[
//               {
//                 title: "Secure Authentication",
//                 desc: "JWT protected system with role-based access control.",
//               },
//               {
//                 title: "Real-Time Productivity",
//                 desc: "Instant note updates with optimized backend APIs.",
//               },
//               {
//                 title: "Smart Organization",
//                 desc: "Archive, favorite and restore notes seamlessly.",
//               },
//               {
//                 title: "Admin Control",
//                 desc: "Complete moderation with analytics dashboard.",
//               },
//               {
//                 title: "Cloud Integration",
//                 desc: "Secure file uploads using Cloudinary.",
//               },
//               {
//                 title: "Minimal Design",
//                 desc: "A distraction-free environment for creators.",
//               },
//             ].map((feature, i) => (
//               <motion.div
//                 key={i}
//                 whileHover={{ y: -6 }}
//                 transition={{ duration: 0.2 }}
//                 className="card bg-base-100 shadow-xl border border-base-300"
//               >
//                 <div className="card-body text-center">
//                   <h3 className="card-title justify-center">{feature.title}</h3>
//                   <p className="opacity-70">{feature.desc}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* CTA */}
//         <section className="py-24 text-center">
//           <h2 className="text-4xl font-bold">
//             Your ideas deserve better organization.
//           </h2>
//           <p className="mt-4 opacity-70">
//             Join NoteSphere and simplify your digital life.
//           </p>

//           <button
//             onClick={() => navigate("/signup")}
//             className="btn btn-primary btn-lg mt-8 shadow-xl hover:scale-105 transition"
//           >
//             Create Free Account
//           </button>
//         </section>

//         {/* FOOTER */}
//         <Footer />
//       </main>
//     </div>
//   );
// };

// export default Body;

import { useNavigate } from "react-router";
import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";
import Footer from "../layout/Footer";

const FEATURES = [
  {
    icon: "🔐",
    title: "Secure Authentication",
    desc: "JWT protected system with role-based access control.",
  },
  {
    icon: "⚡",
    title: "Real-Time Productivity",
    desc: "Instant note updates with optimised backend APIs.",
  },
  {
    icon: "🗂️",
    title: "Smart Organisation",
    desc: "Archive, favourite and restore notes seamlessly.",
  },
  {
    icon: "🛡️",
    title: "Admin Control",
    desc: "Complete moderation with analytics dashboard.",
  },
  {
    icon: "☁️",
    title: "Cloud Integration",
    desc: "Secure file uploads using Cloudinary.",
  },
  {
    icon: "✦",
    title: "Minimal Design",
    desc: "A distraction-free environment for creators.",
  },
];

/* ── Animated floating blob ── */
const Blob = ({
  className,
  duration = 8,
  xRange = 60,
  yRange = 40,
  delay = 0,
}) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{
        x: [0, xRange, xRange / 2, -xRange / 2, 0],
        y: [0, -yRange, yRange, -yRange / 2, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const Body = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 text-base-content overflow-hidden">
      <main className="pt-24">
        {/* ── HERO ── */}
        <section className="py-28 relative">
          {/* Animated blobs */}
          <Blob
            className="w-[480px] h-[480px] bg-primary/25 -top-24 -left-24"
            duration={9}
            xRange={70}
            yRange={50}
            delay={0}
          />
          <Blob
            className="w-[360px] h-[360px] bg-secondary/20 bottom-0 right-0"
            duration={11}
            xRange={-60}
            yRange={-40}
            delay={1.5}
          />
          <Blob
            className="w-[280px] h-[280px] bg-accent/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            duration={7}
            xRange={50}
            yRange={60}
            delay={3}
          />

          <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex-1 text-center lg:text-left"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 border border-primary/20"
              >
                ✦ MERN Stack App
              </motion.span>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Organise your <br />
                <motion.span
                  className="text-primary inline-block"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  digital chaos.
                </motion.span>
              </h1>

              <p className="mt-5 text-base opacity-70 max-w-lg leading-relaxed">
                NoteSphere helps you capture ideas, manage tasks and track
                productivity with a clean, distraction-free experience.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/signup")}
                  className="btn btn-primary btn-lg shadow-xl rounded-xl"
                >
                  Get Started Free →
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/login")}
                  className="btn btn-outline btn-lg rounded-xl"
                >
                  Login
                </motion.button>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.8 }}
                className="mt-5 text-xs flex items-center gap-2 justify-center lg:justify-start"
              >
                <span>⚛️ React</span>
                <span>·</span>
                <span>🟢 Node.js</span>
                <span>·</span>
                <span>🍃 MongoDB</span>
              </motion.p>
            </motion.div>

            {/* RIGHT — Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex-1 w-full max-w-md mx-auto"
            >
              <div className="bg-base-100 shadow-2xl border border-base-300 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-base-200 border-b border-base-300">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-xs opacity-40 font-mono">
                    notesphere.app/dashboard
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  {[
                    {
                      title: "Product Ideas",
                      color: "text-primary",
                      badge: "Important",
                      badgeClass: "badge-primary",
                      text: "Build admin analytics dashboard with monthly growth tracking.",
                    },
                    {
                      title: "Backend Optimisation",
                      color: "text-secondary",
                      progress: true,
                      text: "Replace filters with MongoDB countDocuments for performance.",
                    },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.2 }}
                      className="p-4 bg-base-200 rounded-xl border border-base-300"
                    >
                      <h3
                        className={`font-semibold text-sm ${card.color} mb-1`}
                      >
                        {card.title}
                      </h3>
                      <p className="text-xs opacity-60 leading-relaxed">
                        {card.text}
                      </p>

                      {card.badge && (
                        <div className="flex justify-between items-center mt-3">
                          <span className={`badge ${card.badgeClass} badge-sm`}>
                            {card.badge}
                          </span>
                          <div className="flex gap-1">
                            <button className="btn btn-xs btn-outline rounded-lg">
                              Edit
                            </button>
                            <button className="btn btn-xs btn-ghost rounded-lg">
                              Archive
                            </button>
                          </div>
                        </div>
                      )}

                      {card.progress && (
                        <div className="mt-3">
                          <div className="flex justify-between text-[10px] opacity-40 mb-1">
                            <span>Progress</span>
                            <span>70%</span>
                          </div>
                          <div className="h-1.5 bg-base-300 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "70%" }}
                              transition={{ duration: 1.4, delay: 0.8 }}
                              className="h-full bg-secondary rounded-full"
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-[10px] opacity-30 text-right font-mono"
                  >
                    Last synced: {new Date().toLocaleTimeString()}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ── */}
        <section className="py-16 bg-base-100 text-center border-y border-base-300 relative overflow-hidden">
          {/* subtle floating blob behind */}
          <Blob
            className="w-64 h-64 bg-primary/10 top-0 right-1/4 opacity-60"
            duration={12}
            xRange={30}
            yRange={20}
            delay={2}
          />
          <p className="text-xs uppercase tracking-widest opacity-40 mb-8 font-semibold relative z-10">
            Trusted by modern creators
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium opacity-50 relative z-10">
            {[
              "Startup Teams",
              "Developers",
              "Product Designers",
              "Students",
            ].map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.08, opacity: 1 }}
                className="px-4 py-1.5 rounded-full border border-base-300 cursor-default"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="py-28 bg-base-200 relative overflow-hidden">
          {/* background blob */}
          <Blob
            className="w-[500px] h-[500px] bg-secondary/10 top-10 right-0 opacity-70"
            duration={14}
            xRange={-40}
            yRange={60}
            delay={0.5}
          />
          <Blob
            className="w-[300px] h-[300px] bg-primary/10 bottom-10 left-0 opacity-70"
            duration={10}
            xRange={50}
            yRange={-30}
            delay={2}
          />

          <div className="text-center mb-16 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold"
            >
              Designed for Focus
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-sm"
            >
              Everything you need. Nothing you don't.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 relative z-10">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm transition-shadow"
              >
                <motion.div
                  className="text-3xl mb-3 inline-block"
                  whileHover={{ scale: 1.2, rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {f.icon}
                </motion.div>
                <h3 className="font-semibold text-base mb-1">{f.title}</h3>
                <p className="text-sm opacity-55 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 text-center relative overflow-hidden">
          <Blob
            className="w-[400px] h-[400px] bg-primary/15 top-0 left-1/2 -translate-x-1/2"
            duration={10}
            xRange={40}
            yRange={30}
            delay={1}
          />
          <Blob
            className="w-[250px] h-[250px] bg-secondary/15 bottom-0 right-10"
            duration={8}
            xRange={-30}
            yRange={-40}
            delay={0}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl font-bold">Your ideas deserve better.</h2>
            <p className="mt-3 opacity-50 text-sm">
              Join NoteSphere and simplify your digital life.
            </p>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/signup")}
              className="btn btn-primary btn-lg mt-8 shadow-xl rounded-xl"
            >
              Create Free Account →
            </motion.button>
          </motion.div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Body;
