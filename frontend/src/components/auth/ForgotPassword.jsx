import { useState } from "react";
import api from "../../services/api";
import { showSuccess, showError } from "../../utils/toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/forgot", { email });
      showSuccess("If email exists, reset link has been sent");
      setEmail("");
    } catch {
      showError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          required
          placeholder="Enter your email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn btn-primary w-full mt-4">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;