import { Eye, Pencil, Trash2 } from "lucide-react";

const TeacherTable = ({ teachers, onView, onEdit, onDelete }) => {
  if (!teachers?.length) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-500 font-medium">
        No teachers found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[950px]">
        <thead className="bg-blue-50 border-b border-blue-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">
              Employee ID
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">
              Department
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">
              Phone
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold text-blue-700 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((teacher, index) => (
            <tr
              key={teacher._id}
              className={`border-b border-slate-200 hover:bg-blue-50 transition-colors ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
              }`}
            >
              <td className="px-6 py-4 font-medium">{teacher.employeeId}</td>

              <td className="px-6 py-4 font-semibold text-slate-800">
                {teacher.name}
              </td>

              <td className="px-6 py-4">
                {teacher.department?.departmentName ||
                  teacher.department?.name ||
                  "-"}
              </td>

              <td className="px-6 py-4">{teacher.email}</td>

              <td className="px-6 py-4">{teacher.phone || "-"}</td>

              <td className="px-6 py-4">
                {teacher.isActive ? (
                  <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                    Inactive
                  </span>
                )}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onView?.(teacher)}
                    className="flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 transition"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  <button
                    onClick={() => onEdit?.(teacher)}
                    className="flex items-center gap-1 rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-200 transition"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete?.(teacher._id)}
                    className="flex items-center gap-1 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200 transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable;
