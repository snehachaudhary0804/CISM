import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
const StudentTable = ({ students }) => {
  if (!students?.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No students found.
      </div>
    );
  }

  return (
   <div className="overflow-x-auto">
    <table className="w-full min-w-[900px]">
      <thead className="bg-blue-50 border-b border-blue-100">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">Roll No</th>
          <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">Name</th>
          <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">Department</th>
          <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">Section</th>
          <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">Semester</th>
          <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">Teacher</th>
          <th className="px-6 py-4 text-center text-sm font-bold text-blue-700 uppercase tracking-wide">Action</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student,index) => (
          <tr
            key={student._id}
            className={`
    border-t
    border-slate-200
    hover:bg-blue-50
    transition-colors
    ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
  `}
          >
            <td className="px-6 py-4">
              {student.rollNumber}
            </td>

            <td className="px-5 py-4 font-semibold text-slate-800">
              {student.name}
            </td>

            <td className="px-5 py-4">
              {student.department?.departmentName}
            </td>

            <td className="px-5 py-4">
              {student.section?.sectionName}
            </td>

            <td className="px-5 py-4">
              {student.semester}
            </td>

            <td className="px-5 py-4">
              {student.assignedTeacher?.name || (
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
  Not Assigned
</span>
              )}
            </td>

            <td className="px-6 py-4 text-center">
  <div className="flex items-center justify-center gap-2">
    <button className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-200 transition">
      <Eye size={16} />
         View
    </button>

    <button className="rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-700 hover:bg-green-200 transition">
      <Pencil size={16} />
      Edit
    
    </button>

    <button className="rounded-lg bg-red-100 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-200 transition">
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

export default StudentTable;