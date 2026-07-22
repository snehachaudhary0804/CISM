import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

const DepartmentTable = ({ departments ,onEdit,onDelete}) => {
  if (!departments?.length) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-500 font-medium">
        No departments found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">

      <table className="w-full min-w-[950px]">

        <thead className="bg-blue-50 border-b border-blue-100">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">
              Code
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">
              Department Name
            </th>

           <th className="px-6 py-4 text-center text-sm font-bold text-blue-700 uppercase tracking-wide">
  Sections
</th>

            <th className="px-6 py-4 text-center text-sm font-bold text-blue-700 uppercase tracking-wide">
              Teachers
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold text-blue-700 uppercase tracking-wide">
              Students
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold text-blue-700 uppercase tracking-wide">
              Action
            </th>
            <th className="px-6 py-4 text-center text-sm font-bold text-blue-700 uppercase tracking-wide">
  Status
</th>

          </tr>

        </thead>

        <tbody>

          {departments.map((department, index) => (

            <tr
              key={department._id}
              className={`
                border-t
                border-slate-200
                hover:bg-blue-50
                transition-colors
                ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
              `}
            >

              <td className="px-6 py-4 font-semibold text-slate-800">
                {department.departmentCode}
              </td>

              <td className="px-6 py-4">
                {department.departmentName}
              </td>

              <td className="px-6 py-4 text-center">
  <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
    {department.sections}
  </span>
</td>

              <td className="px-6 py-4 text-center">
                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {department.teachers ?? "-"}
                </span>
              </td>

              <td className="px-6 py-4 text-center">
                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {department.students ?? "-"}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
  <span
    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
      department.isActive
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {department.isActive ? "Active" : "Inactive"}
  </span>
</td>

              <td className="px-6 py-4">

                <div className="flex items-center justify-center gap-2">

                  <button
                    
                    className="
                      flex items-center gap-1
                      rounded-lg
                      bg-blue-100
                      px-3 py-2
                      text-sm font-medium
                      text-blue-700
                      hover:bg-blue-200
                      transition
                    "
                  >
                    <Eye size={16} />
                    View
                  </button>

                  <button
                   onClick={() => onEdit(department)}
                    className="
                      flex items-center gap-1
                      rounded-lg
                      bg-green-100
                      px-3 py-2
                      text-sm font-medium
                      text-green-700
                      hover:bg-green-200
                      transition
                    "
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                  
                    onClick={() => onDelete(department._id)}
                    className="
                      flex items-center gap-1
                      rounded-lg
                      bg-red-100
                      px-3 py-2
                      text-sm font-medium
                      text-red-700
                      hover:bg-red-200
                      transition
                    "
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

export default DepartmentTable;