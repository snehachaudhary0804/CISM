import { useEffect, useState } from "react";
import api from "../../services/api";
import SessionTable from "../../components/tables/SessionTable";
import SessionModal from "../../components/common/SessionModal";
import SessionViewModal from "../../components/common/SessionViewModal";
import Loader from "../../components/common/Loader";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [editingSession, setEditingSession] = useState(null);

  const [formData, setFormData] = useState({
    sessionName: "",
    startDate: "",
    endDate: "",
    isActive: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingSession) {
        await api.put(`/academic-sessions/${editingSession._id}`, formData);
      } else {
        await api.post("/academic-sessions", formData);
      }

      fetchSessions();

      setShowModal(false);

      setEditingSession(null);

      setFormData({
        sessionName: "",
        startDate: "",
        endDate: "",
        isActive: false,
      });
    } catch (err) {
      console.error("Backend Error:", err.response?.data);
    }
  };

  const handleEdit = (session) => {
    setEditingSession(session);

    setFormData({
      sessionName: session.sessionName,
      startDate: session.startDate?.split("T")[0],
      endDate: session.endDate?.split("T")[0],
      isActive: session.isActive,
    });

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this session?")) return;

    try {
      await api.delete(`/academic-sessions/${id}`);
      fetchSessions();
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };
  const handleView = (session) => {
    setSelectedSession(session);
    setShowViewModal(true);
  };

  const fetchSessions = async () => {
    try {
      setLoading(true);

      const res = await api.get("/academic-sessions");

      setSessions(res.data.data);
    } catch (error) {
      console.error(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSessions = sessions.filter((session) =>
    session.sessionName?.toLowerCase().includes(search.toLowerCase()),
  );
  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}

      <h1 className="text-4xl font-bold text-center text-slate-800 mb-3">
        Academic Sessions
      </h1>

      <p className="text-slate-500 mt-1 text-center">
        Manage academic sessions.
      </p>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="inline-flex mt-3 rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
            Total Sessions : {sessions.length}
          </p>
        </div>

        <button
          onClick={() => {
            setEditingSession(null);

            setFormData({
              sessionName: "",
              startDate: "",
              endDate: "",
              isActive: false,
            });

            setShowModal(true);
          }}
          className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 transition"
        >
          + Add Session
        </button>
      </div>

      {/* Search */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Session..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-10 text-center text-slate-500">
            <Loader />
          </div>
        ) : (
          <SessionTable
            sessions={filteredSessions}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <SessionModal
        show={showModal}
        onClose={() => setShowModal(false)}
        formData={formData}
        setFormData={setFormData}
        editingSession={editingSession}
        onSubmit={handleSubmit}
      />
      <SessionViewModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        session={selectedSession}
      />
    </div>
  );
};

export default Sessions;
