import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
const SectionTable = ({
  sections,
  onView,
  onEdit,
  onDelete,
}) => {
  if (!sections?.length) {
    return (
      <div className="flex justify-center py-16 text-slate-500">
        No Sections Found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">

      <table className="w-full min-w-[900px]">

        <thead className="bg-blue-50 border-b border-blue-100">

          <tr>
            
            <th className="px-6 py-4 text-center text-sm font-bold text-blue-700 uppercase tracking-wide">
  #
</th>
            <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">
              Section
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">
              Department
            </th>

           <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">
  Session
</th>

            <th className="px-6 py-4 text-center text-sm font-bold text-blue-700 uppercase tracking-wide">
              Students
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold text-blue-700 uppercase tracking-wide">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {sections.map((section, index) => (
    

            <tr
              key={section._id}
              className={`
                border-t
                border-slate-200
                hover:bg-blue-50
                transition-colors
                ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
              `}
            >
               <td className="px-6 py-4 text-center font-semibold text-slate-700">
  {index + 1}
</td>
              <td className="px-6 py-4 font-semibold text-slate-800">
                {section.sectionName}
              </td>

              <td className="px-6 py-4">
                {section.department?.departmentName || "-"}
              </td>

               <td className="px-6 py-4">
  {section.academicSession?.sessionName || "-"}
</td>        

              <td className="px-6 py-4 text-center">
                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {section.students ?.length|| 0}
                </span>
              </td>

              <td className="px-6 py-4">

                <div className="flex justify-center gap-2">

                  <button
  onClick={() => onView(section)}
  className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-200 transition"
>
  <Eye size={16} />
  View
</button>

                 <button
  onClick={() => onEdit(section)}
  className="rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-700 hover:bg-green-200 transition"
>
  <Pencil size={16} />
  Edit
</button>

                <button
  onClick={() => onDelete(section._id)}
  className="rounded-lg bg-red-100 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-200 transition"
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

export default SectionTable;