import { useContext, useState, useEffect } from "react";
import { NotesContext } from "../../context/NotesContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Footer from "./Footer";
import { showSuccess, showError } from "../../utils/toast";

const Profile = () => {
  const { user, setUser, logoutUser, deleteAccount } =
    useContext(NotesContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    profileImg: "",
    profession: "",
    gender: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        profileImg: user.profileImg || "",
        profession: user.profession || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>User not logged in</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch("/api/auth/profile", formData);
      if (res.data.success) {
        showSuccess(res.data.message);
        setUser(res.data.user);
      }
    } catch {
      showError("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    await deleteAccount();
    showSuccess("Account deleted successfully");
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen bg-base-200 px-6 py-12">
        <div className="max-w-6xl mx-auto  grid md:grid-cols-2 gap-10">
          <div className="bg-base-100 p-8 sm:order-2 order-1 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

            <form onSubmit={handleUpdate} className="space-y-5">
              <input
                type="text"
                name="profileImg"
                placeholder="Profile Image URL"
                className="input input-bordered w-full"
                value={formData.profileImg}
                onChange={handleChange}
              />

              <input
                type="text"
                name="profession"
                placeholder="Profession"
                className="input input-bordered w-full"
                value={formData.profession}
                onChange={handleChange}
              />

              <select
                name="gender"
                className="select select-bordered w-full"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <button className="btn btn-primary w-full">
                Save Changes
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-warning w-full"
              >
                Logout
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-error w-full"
              >
                Delete Account
              </button>
            </form>
          </div>

          <div className="bg-base-100 p-8 rounded-2xl shadow-lg flex flex-col items-center text-center">
            {user.profileImg ? (
              <img
                src={user.profileImg}
                alt="profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-primary text-white flex items-center justify-center text-4xl">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
            <p className="opacity-70">{user.email}</p>
            <div className="badge badge-primary mt-2">{user.role}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;