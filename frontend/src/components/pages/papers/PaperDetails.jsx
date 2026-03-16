

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../../../services/api";
// import QRCode from "qrcode";
// import { toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";

// /* ── Floating blob ── */
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

// const PaperDetails = () => {
//   const { paperId } = useParams();
//   const navigate = useNavigate();

//   const [paper, setPaper] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [upiData, setUpiData] = useState(null);
//   const [transactionId, setTransactionId] = useState("");
//   const [message, setMessage] = useState("");
//   const [qrCode, setQrCode] = useState("");

//   useEffect(() => {
//     const fetchPaper = async () => {
//       try {
//         const res = await api.get(`/api/paper/getPaper/${paperId}`);
//         setPaper(res.data);
//       } catch (error) {
//         console.log("Error fetching paper", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPaper();
//   }, [paperId]);

//   const handleDownloadQuestion = () =>
//     window.open(
//       `http://localhost:4000/api/paper/dwnlQues/${paperId}`,
//       "_blank",
//     );

//   const handleDownloadAnswer = () =>
//     window.open(`http://localhost:4000/api/paper/dwnlAns/${paperId}`, "_blank");

//   const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

//   const handleBuy = async () => {
//     try {
//       const res = await api.get(`/api/paper/generateUpi/${paperId}`);
//       setUpiData(res.data);
//       if (isMobile()) {
//         window.location.href = res.data.upiLink;
//       } else {
//         const qr = await QRCode.toDataURL(res.data.upiLink);
//         setQrCode(qr);
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Failed to generate UPI link");
//     }
//   };

//   const handleSubmitTransaction = async () => {
//     try {
//       const res = await api.post(`/api/paper/submitUpi/${paperId}`, {
//         transactionId,
//       });
//       toast.error(res.data.message);
//       setTransactionId("");
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error submitting transaction");
//     }
//   };

//   /* ── Loading ── */
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center relative overflow-hidden">
//         <Blob
//           className="w-96 h-96 bg-primary/15 -top-20 -left-20"
//           duration={11}
//           xRange={60}
//           yRange={50}
//           delay={0}
//         />
//         <Blob
//           className="w-72 h-72 bg-secondary/15 bottom-0 right-0"
//           duration={9}
//           xRange={-50}
//           yRange={-40}
//           delay={2}
//         />
//         <span className="loading loading-spinner loading-lg relative z-10" />
//       </div>
//     );
//   }

//   /* ── Not found ── */
//   if (!paper) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
//         <p className="opacity-60 text-lg">Paper not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 relative overflow-hidden p-8">
//       {/* Blobs */}
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
//         className="w-[220px] h-[220px] bg-accent/10 top-1/3 right-1/4"
//         duration={13}
//         xRange={40}
//         yRange={60}
//         delay={3.5}
//       />

//       <div className="relative z-10 max-w-2xl mx-auto">
//         {/* Back button */}
//         <motion.button
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.4 }}
//           onClick={() => navigate(-1)}
//           className="mb-6 text-sm opacity-50 hover:opacity-80 transition flex items-center gap-1"
//         >
//           ← Back
//         </motion.button>

//         {/* Main card */}
//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-base-100/80 backdrop-blur-sm border border-base-300 shadow-2xl rounded-2xl p-8 relative overflow-hidden"
//         >
//           {/* Card micro blob */}
//           <Blob
//             className="w-48 h-48 bg-primary/10 -bottom-8 -right-8"
//             duration={8}
//             xRange={15}
//             yRange={15}
//             delay={1}
//           />

//           {/* Badge + Title */}
//           <div className="text-center mb-8">
//             <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 border border-primary/20">
//               📄 PYQ Details
//             </span>
//             <h1 className="text-3xl font-bold tracking-tight">{paper.title}</h1>
//           </div>

//           {/* Info pills */}
//           <div className="flex flex-wrap justify-center gap-3 mb-8">
//             {[
//               { label: "Subject", value: paper.subject },
//               { label: "Year", value: paper.year },
//               {
//                 label: "Price",
//                 value: paper.isPaid ? `₹${paper.price}` : "Free",
//               },
//             ].map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 + i * 0.08 }}
//                 className="bg-base-200/80 border border-base-300 rounded-xl px-4 py-2 text-sm"
//               >
//                 <span className="opacity-50 text-xs uppercase tracking-wide block">
//                   {item.label}
//                 </span>
//                 <span className="font-semibold">{item.value}</span>
//               </motion.div>
//             ))}
//           </div>

//           {/* Action buttons */}
//           <div className="space-y-3">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.97 }}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.35 }}
//               type="button"
//               onClick={handleDownloadQuestion}
//               className="btn btn-primary w-full rounded-xl"
//             >
//               ⬇ Download Question Paper
//             </motion.button>

//             {paper.isPaid && (
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.97 }}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.42 }}
//                 type="button"
//                 onClick={handleBuy}
//                 className="btn btn-accent w-full rounded-xl"
//               >
//                 💳 Buy Answer PDF
//               </motion.button>
//             )}

//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.97 }}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.49 }}
//               type="button"
//               onClick={handleDownloadAnswer}
//               className="btn btn-secondary w-full rounded-xl"
//             >
//               ⬇ Download Answer PDF
//             </motion.button>
//           </div>

//           {/* QR Code */}
//           <AnimatePresence>
//             {paper.isPaid && qrCode && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.92 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.92 }}
//                 transition={{ duration: 0.35 }}
//                 className="mt-8 text-center"
//               >
//                 <p className="text-sm font-semibold mb-3 opacity-70">
//                   Scan to Pay via UPI
//                 </p>
//                 <div className="inline-block p-3 bg-white rounded-2xl shadow-lg">
//                   <img src={qrCode} alt="UPI QR Code" className="w-52 h-52" />
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Transaction form */}
//           <AnimatePresence>
//             {paper.isPaid && upiData && (
//               <motion.div
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -8 }}
//                 transition={{ duration: 0.35 }}
//                 className="mt-8 bg-base-200/70 border border-base-300 rounded-2xl p-5"
//               >
//                 <h3 className="font-semibold mb-1">Enter Transaction ID</h3>
//                 <p className="text-xs opacity-50 mb-4">
//                   After completing payment of ₹{upiData.amount}
//                 </p>

//                 <input
//                   type="text"
//                   placeholder="Transaction ID"
//                   value={transactionId}
//                   onChange={(e) => setTransactionId(e.target.value)}
//                   className="w-full px-4 py-2.5 rounded-xl border border-base-300 bg-base-100/80 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition mb-3"
//                 />

//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.97 }}
//                   type="button"
//                   onClick={handleSubmitTransaction}
//                   className="btn btn-success w-full rounded-xl"
//                 >
//                   ✓ Submit Transaction
//                 </motion.button>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Message */}
//           <AnimatePresence>
//             {message && (
//               <motion.div
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 className="mt-6 alert alert-info rounded-xl text-sm"
//               >
//                 {message}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default PaperDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import QRCode from "qrcode";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

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

const PaperDetails = () => {
  const { paperId } = useParams();
  const navigate = useNavigate();

  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upiData, setUpiData] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [message, setMessage] = useState("");

  /* FETCH PAPER */
  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const res = await api.get(`/api/paper/getPaper/${paperId}`);

        setPaper({
          ...res.data,
          isPurchased: res.data.isPurchased || false,
        });
      } catch (error) {
        console.log("Error fetching paper", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [paperId]);

  /* DOWNLOAD QUESTION */
  // const handleDownloadQuestion = () => {
  //   window.open(
  //     `https://deploying-production-2fdb.up.railway.app/api/paper/dwnlQues/${paperId}`,
  //     "_blank"
  //   );
  // };

  const handleDownloadQuestion = async () => {
  try {
    const res = await api.get(`/api/paper/dwnlQues/${paperId}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    window.open(url);
  } catch (err) {
    toast.error("Download failed");
  }
};

  /* DOWNLOAD ANSWER */
//  const handleDownloadAnswer = () => {
//   window.open(
//     `https://deploying-production-2fdb.up.railway.app/api/paper/dwnlAns/${paperId}`,
//     "_blank"
//   );
// };

const handleDownloadAnswer = async () => {
  try {
    const res = await api.get(`/api/paper/dwnlAns/${paperId}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    window.open(url);
  } catch (err) {
    toast.error("Download failed");
  }
};

  /* MOBILE CHECK */
  const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  /* BUY PAPER */
  const handleBuy = async () => {
    try {
      const res = await api.get(`/api/paper/generateUpi/${paperId}`);
      setUpiData(res.data);

      if (isMobile()) {
        window.location.href = res.data.upiLink;
      } else {
        const qr = await QRCode.toDataURL(res.data.upiLink);
        setQrCode(qr);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to generate UPI");
    }
  };

  /* SUBMIT TRANSACTION */
  const handleSubmitTransaction = async () => {
    try {
      const res = await api.post(`/api/paper/submitUpi/${paperId}`, {
        transactionId,
      });

      toast.success(res.data.message);

      /* UI UPDATE */
      setPaper((prev) => ({
        ...prev,
        isPurchased: true,
      }));

      setTransactionId("");
      setQrCode("");
      setUpiData(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "Transaction failed");
    }
  };

  /* LOADING */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  /* NOT FOUND */
  if (!paper) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Paper not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 relative p-8 overflow-hidden">
      
      <Blob className="w-96 h-96 bg-primary/20 -top-20 -left-20" />
      <Blob className="w-80 h-80 bg-secondary/20 bottom-0 right-0" delay={2} />

      <div className="max-w-2xl mx-auto relative z-10">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm opacity-60 hover:opacity-100"
        >
          ← Back
        </button>

        <div className="bg-base-100 border border-base-300 shadow-xl rounded-2xl p-8">

          {/* TITLE */}
          <h1 className="text-3xl font-bold text-center mb-8">
            {paper.title}
          </h1>

          {/* BADGES */}
          <div className="flex justify-center gap-4 flex-wrap mb-8">

            <div className="badge ">
              Subject: {paper.subject}
            </div>

            <div className="badge ">
              Year: {paper.year}
            </div>

            <div className="badge ">
              Price: {paper.isPaid ? `₹${paper.price}` : "Free"}
            </div>

            {paper.isPurchased && (
              <div className="badge badge-success">
                ✔ Purchased
              </div>
            )}

          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-3">

            <button
              onClick={handleDownloadQuestion}
              className="btn btn-primary w-full"
            >
              ⬇ Download Question Paper
            </button>

            {/* BUY BUTTON */}
            {paper.isPaid && !paper.isPurchased && (
              <button
                onClick={handleBuy}
                className="btn btn-accent w-full"
              >
                💳 Buy Answer PDF
              </button>
            )}

            <button
              onClick={handleDownloadAnswer}
              className="btn btn-secondary w-full"
            >
              ⬇ Download Answer PDF
            </button>

          </div>

          {/* QR CODE */}
          <AnimatePresence>
            {paper.isPaid && qrCode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-center"
              >
                <p className="mb-3 font-semibold">Scan to Pay</p>

                <img
                  src={qrCode}
                  alt="QR"
                  className="w-52 mx-auto"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* TRANSACTION */}
          <AnimatePresence>
            {paper.isPaid && upiData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8"
              >

                <input
                  type="text"
                  placeholder="Enter Transaction ID"
                  value={transactionId}
                  onChange={(e) =>
                    setTransactionId(e.target.value)
                  }
                  className="input input-bordered w-full mb-3"
                />

                <button
                  onClick={handleSubmitTransaction}
                  className="btn btn-success w-full"
                >
                  Submit Transaction
                </button>

              </motion.div>
            )}
          </AnimatePresence>

          {message && (
            <div className="alert alert-info mt-6">
              {message}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PaperDetails;