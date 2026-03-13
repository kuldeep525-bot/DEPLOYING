import { Route, Routes } from "react-router-dom";
import { Login } from "../auth/Login";
import { Signup } from "../auth/SignUp";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import CreateNote from "../pages/CreateNote";
import Logout from "../auth/Logout";
import AllNotes from "../pages/Allnotes";
import EditNotes from "../pages/EditNotes";
import AdminDashboard from "../../admin/AdminDashboard";
import { AdminLogin } from "../../admin/auth/AdminLogin";
import UsersList from "../../admin/UsersList";
import CreatePaper from "../../admin/CreatePaper";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import Profile from "../layout/Profile";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import PapersList from "../../admin/PapersList";
import PapersHome from "../pages/papers/PapersHome";
import PaperDetails from "../pages/papers/PaperDetails";
import PendingPayments from "../../admin/PaymentsList";
// import PurchasePage from "../pages/papers/PurchasePage";
// import PurchasedPapers from "../pages/papers/PurchasedPapers";

const NotesRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      {/* Protected User Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <AllNotes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notes/create"
        element={
          <ProtectedRoute>
            <CreateNote />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notes/edit/:id"
        element={
          <ProtectedRoute>
            <EditNotes />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        path="/admin/papers"
        element={
          <AdminRoute>
            <PapersList />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/login"
        element={
          <AdminRoute>
            <AdminLogin />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <UsersList />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/create-paper"
        element={
          <AdminRoute>
            <CreatePaper />
          </AdminRoute>
        }
      />

      <Route
  path="/admin/pending-payments"
  element={
    <AdminRoute>
      <PendingPayments/>
    </AdminRoute>
  }
/>
      {/* ================= USER PYQ ROUTES ================= */}

      <Route
        path="/pyqs"
        element={
          <ProtectedRoute>
            <PapersHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pyqs/:paperId"
        element={
          <ProtectedRoute>
            <PaperDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default NotesRoutes;
