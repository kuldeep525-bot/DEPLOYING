import React, { useEffect, useState } from "react";
import api from "../services/api";

const PendingPayments = () => {
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState("");

  const fetchPending = async () => {
    try {
      // ✅ CORRECT ROUTE
      const res = await api.get("/api/v2/admin/paper/pending-payments");
      setPayments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (userId, paperId) => {
    try {
      // ✅ CORRECT ROUTE
      const res = await api.post("/api/v2/admin/paper/approvUpi", {
        userId,
        paperId,
      });

      setMessage(res.data.message);

      // Remove approved instantly
      setPayments((prev) =>
        prev.map((user) => ({
          ...user,
          pendingPayments: user.pendingPayments.filter(
            (p) => p.paper !== paperId
          ),
        }))
      );
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Approval failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-4xl mx-auto bg-base-100 p-8 shadow-xl rounded-xl">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Pending UPI Payments
        </h1>

        {payments.length === 0 && (
          <p className="text-center">No pending payments</p>
        )}

        {payments.map((user) =>
          user.pendingPayments
            .filter((p) => p.status === "pending")
            .map((payment, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg mb-4"
              >
                <p><strong>User:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Paper ID:</strong> {payment.paper}</p>
                <p><strong>Transaction ID:</strong> {payment.transactionId}</p>

                <button
                  onClick={() =>
                    handleApprove(user._id, payment.paper)
                  }
                  className="btn btn-success mt-3"
                >
                  Approve Payment
                </button>
              </div>
            ))
        )}

        {message && (
          <div className="mt-4 alert alert-info">
            {message}
          </div>
        )}

      </div>
    </div>
  );
};

export default PendingPayments;