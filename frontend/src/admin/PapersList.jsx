import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/layout/Footer";
import { showSuccess, showError } from "../utils/toast";
import { useNavigate } from "react-router-dom";

const PapersList = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // ================= FETCH PAPERS =================

  const fetchPapers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/v2/admin/papers");

      if (res.data.success) {
        setPapers(res.data.data || res.data.papers || []);
      }
    } catch (error) {
      showError("Failed to fetch papers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  // ================= DELETE (SOFT) =================

  const handleDelete = async (paperId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this paper?",
    );
    if (!confirmDelete) return;

    try {
      await api.patch(`/api/v2/admin/paper/delete/${paperId}`);
      showSuccess("Paper deleted successfully");
      fetchPapers();
    } catch (error) {
      showError("Delete failed");
    }
  };

  // ================= RESTORE =================

  const handleRestore = async (paperId) => {
    try {
      await api.patch(`/api/v2/admin/paper/restorePaper/${paperId}`);
      showSuccess("Paper restored successfully");
      fetchPapers();
    } catch (error) {
      showError("Restore failed");
    }
  };

  // ================= HARD DELETE =================

  const handleHardDelete = async (paperId) => {
    const confirmDelete = window.confirm(
      "This will permanently delete the paper. Continue?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/v2/admin/paper/harddelete/${paperId}`);
      showSuccess("Paper permanently deleted");
      fetchPapers();
    } catch (error) {
      showError("Permanent delete failed");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-base-200 p-8">
        <button
          className="px-4 py-2 my-4 bg-green-400 font-bold text-sm rounded-md cursor-pointer "
          onClick={() => navigate("/admin/dashboard")}
        >
          Dashboard
        </button>
        <div className="max-w-6xl mx-auto bg-base-100 rounded-2xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">All Papers</h1>
          {/**/}

          {loading ? (
            <div className="text-center py-10">Loading papers...</div>
          ) : papers.length === 0 ? (
            <div className="text-center py-10">No papers found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Subject</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {papers.map((paper) => (
                    <tr key={paper._id}>
                      <td>{paper.title}</td>
                      <td>{paper.subject}</td>
                      <td>{paper.year}</td>
                      <td>₹ {paper.price}</td>

                      <td>
                        {paper.isDeleted ? (
                          <span className="badge badge-error">Deleted</span>
                        ) : (
                          <span className="badge badge-success">Active</span>
                        )}
                      </td>

                      <td className="space-x-2">
                        {!paper.isDeleted ? (
                          <button
                            onClick={() => handleDelete(paper._id)}
                            className="btn btn-sm btn-warning"
                          >
                            Delete
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleRestore(paper._id)}
                              className="btn btn-sm btn-info"
                            >
                              Restore
                            </button>

                            <button
                              onClick={() => handleHardDelete(paper._id)}
                              className="btn btn-sm btn-error"
                            >
                              Hard Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PapersList;
