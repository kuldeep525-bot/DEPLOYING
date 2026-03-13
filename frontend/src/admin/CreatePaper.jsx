// import { useState } from "react";
// import api from "../services/api";
// import Footer from "../components/layout/Footer";
// import { useNavigate } from "react-router-dom";
// import { showSuccess, showError } from "../utils/toast";

// const CreatePaper = () => {
//   const [form, setForm] = useState({
//     title: "",
//     subject: "",
//     year: "",
//     price: "",
//   });

//   const [questionPdf, setQuestionPdf] = useState(null);
//   const [answerPdf, setAnswerPdf] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [successAnim, setSuccessAnim] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!questionPdf || !answerPdf) {
//       showError("Both PDFs are required");
//       return;
//     }

//     setLoading(true);
//     setProgress(0);

//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("subject", form.subject);
//     formData.append("year", form.year);
//     formData.append("price", form.price);
//     formData.append("questionPdf", questionPdf);
//     formData.append("answerPdf", answerPdf);

//     try {
//       await api.post("/api/v2/admin/create", formData, {
//         onUploadProgress: (event) => {
//           const percent = Math.round((event.loaded * 100) / event.total);
//           setProgress(percent);
//         },
//       });

//       showSuccess("Paper Uploaded Successfully ✅");
//       setSuccessAnim(true);

//       setTimeout(() => setSuccessAnim(false), 2000);

//       setForm({ title: "", subject: "", year: "", price: "" });
//       setQuestionPdf(null);
//       setAnswerPdf(null);
//       setProgress(0);
//     } catch (error) {
//       showError(error.response?.data?.message || "Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDrop = (e, type) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file && file.type === "application/pdf") {
//       type === "question" ? setQuestionPdf(file) : setAnswerPdf(file);
//     } else {
//       showError("Only PDF files allowed");
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-10 text-white">
//         {/* Manage Button */}
//         <div className="flex justify-end mb-6">
//           <button
//             onClick={() => navigate("/admin/papers")}
//             className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-full shadow-lg font-semibold text-sm"
//           >
//             📄 Manage Papers
//           </button>
//         </div>

//         <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10 transition-all">
//           <h1 className="text-3xl font-bold mb-2">Upload Paper</h1>
//           <p className="text-gray-400 mb-8 text-sm">
//             Upload Question & Answer PDFs for students.
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <InputField
//               name="title"
//               placeholder="Title"
//               value={form.title}
//               onChange={handleChange}
//             />
//             <InputField
//               name="subject"
//               placeholder="Subject"
//               value={form.subject}
//               onChange={handleChange}
//             />
//             <InputField
//               name="year"
//               type="number"
//               placeholder="Year"
//               value={form.year}
//               onChange={handleChange}
//             />
//             <InputField
//               name="price"
//               type="number"
//               placeholder="Price"
//               value={form.price}
//               onChange={handleChange}
//             />

//             {/* Drag Drop Area */}
//             <DropZone
//               label="Question PDF"
//               file={questionPdf}
//               onFile={(file) => setQuestionPdf(file)}
//               onDrop={(e) => handleDrop(e, "question")}
//             />

//             <DropZone
//               label="Answer PDF"
//               file={answerPdf}
//               onFile={(file) => setAnswerPdf(file)}
//               onDrop={(e) => handleDrop(e, "answer")}
//             />

//             {/* Progress Bar */}
//             {loading && (
//               <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
//                 <div
//                   className="bg-indigo-500 h-3 transition-all duration-300"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>
//             )}

//             {/* Upload Button */}
//             <button
//               disabled={loading}
//               className={`w-full py-3 rounded-xl font-semibold transition flex items-center justify-center gap-3 ${
//                 loading
//                   ? "bg-indigo-400 cursor-not-allowed"
//                   : "bg-indigo-600 hover:bg-indigo-700"
//               }`}
//             >
//               {loading ? (
//                 <>
//                   <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                   Uploading {progress}%
//                 </>
//               ) : (
//                 "Upload Paper"
//               )}
//             </button>

//             {/* Success Animation */}
//             {successAnim && (
//               <div className="text-green-400 text-center mt-4 animate-bounce">
//                 🎉 Upload Successful!
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// const InputField = ({ name, placeholder, value, onChange, type = "text" }) => (
//   <input
//     type={type}
//     name={name}
//     value={value}
//     placeholder={placeholder}
//     onChange={onChange}
//     required
//     className="w-full p-3 bg-white/10 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//   />
// );

// const DropZone = ({ label, file, onFile, onDrop }) => (
//   <div
//     onDragOver={(e) => e.preventDefault()}
//     onDrop={onDrop}
//     className="border-2 border-dashed border-indigo-500/40 rounded-xl p-6 text-center bg-white/5 hover:bg-white/10 transition"
//   >
//     <p className="mb-2 text-sm text-gray-300">{label}</p>

//     <input
//       type="file"
//       accept="application/pdf"
//       onChange={(e) => onFile(e.target.files[0])}
//       className="hidden"
//       id={label}
//     />

//     <label
//       htmlFor={label}
//       className="cursor-pointer text-indigo-400 font-medium"
//     >
//       Click to upload or drag & drop
//     </label>

//     {file && (
//       <p className="mt-3 text-sm text-green-400">Selected: {file.name}</p>
//     )}
//   </div>
// );

// export default CreatePaper;


//updated code

import { useState } from "react";
import api from "../services/api";
import Footer from "../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../utils/toast";

const CreatePaper = () => {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    year: "",
    price: "",
    course: "",
    semester: "",
  });

  const [questionPdf, setQuestionPdf] = useState(null);
  const [answerPdf, setAnswerPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [successAnim, setSuccessAnim] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!questionPdf || !answerPdf) {
      showError("Both PDFs are required");
      return;
    }

    setLoading(true);
    setProgress(0);

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    formData.append("questionPdf", questionPdf);
    formData.append("answerPdf", answerPdf);

    try {
      await api.post("/api/v2/admin/create", formData, {
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });

      showSuccess("Paper Uploaded Successfully ✅");

      setSuccessAnim(true);
      setTimeout(() => setSuccessAnim(false), 2000);

      setForm({
        title: "",
        subject: "",
        year: "",
        price: "",
        course: "",
        semester: "",
      });

      setQuestionPdf(null);
      setAnswerPdf(null);
      setProgress(0);

    } catch (error) {
      showError(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file && file.type === "application/pdf") {
      type === "question" ? setQuestionPdf(file) : setAnswerPdf(file);
    } else {
      showError("Only PDF files allowed");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-10 text-white">

        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/admin/papers")}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-full shadow-lg font-semibold text-sm"
          >
            📄 Manage Papers
          </button>
        </div>

        <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10">

          <h1 className="text-3xl font-bold mb-2">Upload Paper</h1>

          <p className="text-gray-400 mb-8 text-sm">
            Upload Question & Answer PDFs for students.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            <InputField
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
            />

            <InputField
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
            />

            {/* NEW FIELD */}
            <InputField
              name="course"
              placeholder="Course (Example: BCA)"
              value={form.course}
              onChange={handleChange}
            />

            {/* NEW FIELD */}
            <InputField
              name="semester"
              type="number"
              placeholder="Semester (1 - 6)"
              value={form.semester}
              onChange={handleChange}
            />

            <InputField
              name="year"
              type="number"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
            />

            <InputField
              name="price"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
            />

            {/* Question PDF */}
            <DropZone
              label="Question PDF"
              file={questionPdf}
              onFile={(file) => setQuestionPdf(file)}
              onDrop={(e) => handleDrop(e, "question")}
            />

            {/* Answer PDF */}
            <DropZone
              label="Answer PDF"
              file={answerPdf}
              onFile={(file) => setAnswerPdf(file)}
              onDrop={(e) => handleDrop(e, "answer")}
            />

            {loading && (
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-indigo-500 h-3 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            <button
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition flex items-center justify-center gap-3 ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Uploading {progress}%
                </>
              ) : (
                "Upload Paper"
              )}
            </button>

            {successAnim && (
              <div className="text-green-400 text-center mt-4 animate-bounce">
                🎉 Upload Successful!
              </div>
            )}

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

const InputField = ({ name, placeholder, value, onChange, type = "text" }) => (
  <input
    type={type}
    name={name}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    required
    className="w-full p-3 bg-white/10 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
);

const DropZone = ({ label, file, onFile, onDrop }) => (
  <div
    onDragOver={(e) => e.preventDefault()}
    onDrop={onDrop}
    className="border-2 border-dashed border-indigo-500/40 rounded-xl p-6 text-center bg-white/5 hover:bg-white/10 transition"
  >
    <p className="mb-2 text-sm text-gray-300">{label}</p>

    <input
      type="file"
      accept="application/pdf"
      onChange={(e) => onFile(e.target.files[0])}
      className="hidden"
      id={label}
    />

    <label
      htmlFor={label}
      className="cursor-pointer text-indigo-400 font-medium"
    >
      Click to upload or drag & drop
    </label>

    {file && (
      <p className="mt-3 text-sm text-green-400">
        Selected: {file.name}
      </p>
    )}
  </div>
);

export default CreatePaper;