import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { showSuccess, showError } from "../../utils/toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/auth/reset/${token}`, {
        password,
        confirmPassword,
      });

      showSuccess("Password reset successful");
      navigate("/login");
    } catch {
      showError("Invalid or expired token");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        <input
          type="password"
          required
          placeholder="New Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          required
          placeholder="Confirm Password"
          className="input input-bordered w-full mt-3"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="btn btn-primary w-full mt-4">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;