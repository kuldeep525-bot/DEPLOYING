// import { useState } from "react";
// import api from "../../services/api";
// import { showSuccess, showError } from "../../utils/toast";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/api/auth/forgot", { email });
//       showSuccess("If email exists, reset link has been sent");
//       setEmail("");
//     } catch {
//       showError("Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-base-200">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-base-100 p-8 rounded-xl shadow-lg w-96"
//       >
//         <h2 className="text-xl font-bold mb-4 text-center">
//           Forgot Password
//         </h2>

//         <input
//           type="email"
//           required
//           placeholder="Enter your email"
//           className="input input-bordered w-full"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <button className="btn btn-primary w-full mt-4">
//           Send Reset Link
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;

import { useState } from "react";
import api from "../../services/api";
import { showSuccess, showError } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=reset password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1 - Email submit
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/auth/forgot-password", { email });
      showSuccess("OTP sent to your email!");
      setStep(2);
    } catch {
      showError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 - OTP verify
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/auth/verify-otp", { email, otp });
      showSuccess("OTP verified!");
      setStep(3);
    } catch {
      showError("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 3 - Reset password
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/auth/reset-password", {
        email,
        otp,
        password,
        confirmPassword,
      });
      showSuccess("Password reset successful! Please login.");
      // reset sab
      setStep(1);
      setEmail("");
      setOtp("");
      setPassword("");
      setConfirmPassword("");
       navigate("/login");
    } catch {
      showError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="bg-base-100 p-8 rounded-xl shadow-lg w-96">

        {/* Step Indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= s
                  ? "bg-primary text-white"
                  : "bg-base-300 text-base-content"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Step 1 - Email */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <h2 className="text-xl font-bold mb-4 text-center">
              Forgot Password
            </h2>
            <p className="text-sm text-center mb-4 opacity-60">
              Enter your email to receive OTP
            </p>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="btn btn-primary w-full mt-4"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* Step 2 - OTP */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit}>
            <h2 className="text-xl font-bold mb-4 text-center">
              Enter OTP
            </h2>
            <p className="text-sm text-center mb-4 opacity-60">
              OTP sent to <strong>{email}</strong>
            </p>
            <input
              type="text"
              required
              maxLength={4}
              placeholder="Enter 4 digit OTP"
              className="input input-bordered w-full text-center tracking-widest text-lg"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="btn btn-primary w-full mt-4"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            {/* Resend OTP */}
            <p className="text-sm text-center mt-3 opacity-60">
              OTP nahi aaya?{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={() => {
                  setStep(1);
                  setOtp("");
                }}
              >
                Resend
              </span>
            </p>
          </form>
        )}

        {/* Step 3 - New Password */}
        {step === 3 && (
          <form onSubmit={handleResetSubmit}>
            <h2 className="text-xl font-bold mb-4 text-center">
              New Password
            </h2>
            <input
              type="password"
              required
              placeholder="New password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Confirm new password"
              className="input input-bordered w-full mt-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="btn btn-primary w-full mt-4"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;