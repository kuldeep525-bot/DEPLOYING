import { createContext, useState } from "react";
import api from "../services/api";

export const PaperContext = createContext();

const PaperProvider = ({ children }) => {
  const [papers, setPapers] = useState([]);
  const [singlePaper, setSinglePaper] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });

  const getAllPapers = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/api/paper/getAllPaper?page=${page}&limit=6`);
      setPapers(res.data.papers);
      setPagination({
        page: res.data.page,
        totalPages: res.data.totalPages,
      });
    } catch (error) {
      console.error("Paper fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPaperById = async (id) => {
    try {
      setLoading(true);
      const res = await api.get(`/api/paper/getPaper/${id}`);
      setSinglePaper(res.data);
    } catch (error) {
      console.error("Single paper error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperContext.Provider
      value={{
        papers,
        singlePaper,
        loading,
        pagination,
        getAllPapers,
        getPaperById,
      }}
    >
      {children}
    </PaperContext.Provider>
  );
};

export default PaperProvider;
