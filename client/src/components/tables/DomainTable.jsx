import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

const DomainTable = ({
  domains,
  onEdit,
  onDelete,
}) => {
  if (!domains?.length) {
    return (
      <div className="flex justify-center py-16 text-slate-500 font-medium">
        No domains found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">

      <table className="w-full min-w-[1000px]">

        <thead className="bg-blue-50 border-b border-blue-100">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">
              Domain
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wide">
              Description
            </th>

           

            <th className="px-6 py-4 text-center text-sm font-bold text-blue-700 uppercase tracking-wide">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold text-blue-700 uppercase tracking-wide">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {domains.map((domain, index) => (

            <tr
              key={domain._id}
              className={`
                border-t
                border-slate-200
                hover:bg-blue-50
                transition-colors
                ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
              `}
            >

              <td className="px-6 py-4 font-semibold text-slate-800">
                {domain.domainName}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {domain.description || "-"}
              </td>

              

              

              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">

                  <button className="flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 transition">
                    <Eye size={16} />
                    View
                  </button>

                  <button 
                  onClick={() => onEdit(domain)}
                  className="flex items-center gap-1 rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-200 transition">
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                  onClick={() => onDelete(domain._id)}
                  className="flex items-center gap-1 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200 transition">
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

export default DomainTable;