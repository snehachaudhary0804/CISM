import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
const TeacherTable = ({ teachers }) => {
  if (!teachers?.length) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-500 font-medium">
        No teachers found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">

      <table className="w-full min-w-[900px]">

        <thead className="bg-blue-50 border-b border-blue-100">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 tracking-wideuppercase">
              Employee ID
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 tracking-wide uppercase">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 tracking-wide uppercase">
              Department
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 tracking-wide uppercase">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 tracking-wide uppercase">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold text-blue-700 tracking-wide uppercase">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {teachers.map((teacher,index) => (

            <tr
              key={teacher._id}
              className={`
    border-t
    border-slate-200
    hover:bg-blue-50
    transition-colors
    ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
  `}
            >

              <td className="px-6 py-4">
                {teacher.employeeId}
              </td>

              <td className="px-6 py-4 font-semibold text-slate-800">
                {teacher.name}
              </td>

              <td className="px-6 py-4">
                {teacher.department?.departmentName}
              </td>

              <td className="px-6 py-4">
                {teacher.email}
              </td>

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

                  <button className="rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-200 transition">
                     <Eye size={16} />
    View
                  </button>

                  <button className="rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-700 hover:bg-green-200 transition">
                  <Pencil size={16} />
    Edit
                  </button>

                  <button className="rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-200 transition">
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