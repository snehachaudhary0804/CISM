import { useEffect, useState } from "react";
import { getAllTeachers, assignTeacher } from "../../services/adminService";

const AssignTeacherModal = ({ open, internship, onClose, onAssigned }) => {
  const [teachers, setTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadTeachers();
    }
  }, [open]);

  const loadTeachers = async () => {
    try {
      const res = await getAllTeachers();

      console.log(res);

      setTeachers(res.teachers || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAssign = async () => {
    if (!teacherId) {
      return alert("Please select a teacher.");
    }

    try {
      setLoading(true);

      await assignTeacher(internship._id, teacherId);

      alert("Teacher assigned successfully.");

      onAssigned();
      onClose();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[500px] p-8">
        <h2 className="text-2xl font-bold mb-6">Assign Teacher</h2>

        <p className="mb-2">
          <strong>Student:</strong> {internship.student?.name}
        </p>

        <p className="mb-6">
          <strong>Company:</strong> {internship.externalDetails?.companyName}
        </p>

        <select
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          className="w-full border rounded-xl p-3"
        >
          <option value="">Select Teacher</option>

          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="border px-5 py-2 rounded-xl">
            Cancel
          </button>

          <button
            onClick={handleAssign}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl"
          >
            {loading ? "Assigning..." : "Assign Teacher"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTeacherModal;
