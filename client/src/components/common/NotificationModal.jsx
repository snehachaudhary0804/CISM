import { useEffect, useState } from "react";
import api from "../../services/api";

const NotificationModal = ({ show, onClose, onSuccess }) => {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    receiver: "",
    title: "",
    message: "",
    type: "System",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      fetchUsers();
    }
  }, [show]);

  const fetchUsers = async () => {
    try {
      const [studentRes, teacherRes] = await Promise.all([
        api.get("/admin/students?limit=1000"),
        api.get("/admin/teachers?limit=1000"),
      ]);

      const students = studentRes.data.data || [];
      const teachers = teacherRes.data.teachers || [];

      setUsers([...students, ...teachers]);
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">
          Send Notification
        </h2>

        <form className="space-y-5">
          {/* Receiver */}

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Receiver
            </label>

            <select
              name="receiver"
              value={formData.receiver}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Receiver</option>

              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.role})
                </option>
              ))}
            </select>
          </div>

          {/* Title */}

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter notification title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Message */}

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Message
            </label>

            <textarea
              rows={5}
              name="message"
              placeholder="Enter notification message..."
              value={formData.message}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Type */}

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="System">System</option>
              <option value="General">General</option>
              <option value="Internship">Internship</option>
              <option value="Reminder">Reminder</option>
            </select>
          </div>
          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  receiver: "",
                  title: "",
                  message: "",
                  type: "System",
                });
                onClose();
              }}
              className="rounded-lg border border-slate-300 px-5 py-2 font-medium hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Notification"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.receiver || !formData.title || !formData.message) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/notifications", formData);

      alert("Notification sent successfully.");

      setFormData({
        receiver: "",
        title: "",
        message: "",
        type: "System",
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error.response?.data || error);

      alert(error.response?.data?.message || "Failed to send notification.");
    } finally {
      setLoading(false);
    }
  }
};

export default NotificationModal;
