// import React from "react";

// const Footer = () => {
//   return (
//     <div>
//       <footer className="bg-base-100 py-16 mt-16">
//         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
//           <div>
//             <h3 className="text-xl font-bold text-primary">NoteSphere</h3>
//             <p className="mt-4 opacity-70 text-sm">
//               A modern full-stack notes management system built using MERN.
//             </p>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-4">Product</h4>
//             <ul className="space-y-2 text-sm opacity-70">
//               <li>Features</li>
//               <li>Dashboard</li>
//               <li>Security</li>
//               <li>Analytics</li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-4">Company</h4>
//             <ul className="space-y-2 text-sm opacity-70">
//               <li>About</li>
//               <li>Contact</li>
//               <li>Privacy</li>
//               <li>Terms</li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-4">Built With</h4>
//             <ul className="space-y-2 text-sm opacity-70">
//               <li>React</li>
//               <li>Node.js</li>
//               <li>MongoDB</li>
//               <li>Tailwind + DaisyUI</li>
//             </ul>
//           </div>
//         </div>

//       </footer>
//         <div className="text-center mb-3 text-sm opacity-50 mt-10">
//           © {new Date().getFullYear()} NoteSphere. All rights reserved.
//         </div>
//     </div>
//   );
// };

// export default Footer;
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const cols = [
    {
      heading: "Product",
      items: [
        { label: "Features", to: null },
        { label: "Dashboard", to: "/dashboard" },
        { label: "PYQs", to: "/pyqs" },
        { label: "Analytics", to: null },
      ],
    },
    {
      heading: "Company",
      items: [
        { label: "About", to: null },
        { label: "Contact", to: null },
        { label: "Privacy", to: null },
        { label: "Terms", to: null },
      ],
    },
    {
      heading: "Built With",
      items: [
        { label: "⚛️ React", to: null },
        { label: "🟢 Node.js", to: null },
        { label: "🍃 MongoDB", to: null },
        { label: "🎨 Tailwind + DaisyUI", to: null },
      ],
    },
  ];

  return (
    <footer className="bg-base-100 border-t border-base-300 mt-16 relative overflow-hidden">
      {/* Subtle static blobs — no motion to keep footer light */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-8">
        {/* Top grid */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight mb-4"
            >
              <span className="text-primary">✦</span> NoteSphere
            </Link>
            <p className="text-sm opacity-55 leading-relaxed">
              A modern full-stack notes management system built using the MERN
              stack.
            </p>
            {/* Socials placeholder */}
            <div className="flex gap-2 mt-5">
              {["𝕏", "in", "gh"].map((s, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-lg bg-base-200 border border-base-300 flex items-center justify-center text-xs font-bold opacity-50 hover:opacity-80 hover:border-primary/40 transition cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Link cols */}
          {cols.map((col, ci) => (
            <motion.div
              key={col.heading}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + ci * 0.08 }}
            >
              <h4 className="font-semibold text-sm mb-4 tracking-wide">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    {item.to ? (
                      <Link
                        to={item.to}
                        className="text-sm opacity-55 hover:opacity-90 hover:text-primary transition"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-sm opacity-55">{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-base-300 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs opacity-40">
            © {new Date().getFullYear()} NoteSphere. All rights reserved.
          </p>
          <p className="text-xs opacity-30">Made with ❤️ using MERN Stack</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
