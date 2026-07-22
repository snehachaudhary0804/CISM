import { useEffect, useState } from "react";
import api from "../../services/api";
import SessionTable from "../../components/tables/SessionTable";
import SessionModal from "../../components/common/SessionModal";

const Sessions = () => {

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

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
      await api.put(
        `/academic-sessions/${editingSession._id}`,
        formData
      );
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
    console.log("Backend Error:", err.response?.data);
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

  await api.delete(`/academic-sessions/${id}`);

  fetchSessions();
};

  useEffect(() => {
    fetchSessions();
  }, []);


  const fetchSessions = async () => {

    try {

      setLoading(true);

      const res = await api.get("/academic-sessions");

      console.log("Sessions:", res.data);

      setSessions(res.data.data);

    } catch (error) {

      console.error(
        error.response?.data || error
      );

    } finally {

      setLoading(false);

    }

  };


  const filteredSessions = sessions.filter(
    (session) =>
      session.sessionName
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );


  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">


        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Academic Sessions
          </h1>


          <p className="text-slate-500 mt-1">
            Manage academic sessions.
          </p>


          <p className="inline-flex mt-3 rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
            Total Sessions : {sessions.length}
          </p>


        </div>


       <button
  onClick={() => {
    setEditingSession(null);

    setFormData({
      sessionName: "",
      startYear: "",
      endYear: "",
      isCurrent: false,
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

          onChange={(e)=>setSearch(e.target.value)}

          placeholder="Search Session..."

          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"

        />


      </div>



      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">


        {
          loading ?

          (
            <div className="p-10 text-center text-slate-500">
              Loading Sessions...
            </div>
          )

          :

          (
            <SessionTable
  sessions={filteredSessions}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
          )

        }


      </div>

    <SessionModal
  show={showModal}
  onClose={() => setShowModal(false)}
  formData={formData}
  setFormData={setFormData}
  editingSession={editingSession}
  onSubmit={handleSubmit}
/>
    </div>

  );
};

export default Sessions;