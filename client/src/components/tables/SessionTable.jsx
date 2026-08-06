import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

const SessionTable = ({
  sessions,
  onView,
  onEdit,
  onDelete,
}) => {

  if (!sessions?.length) {
    return (
      <div className="flex justify-center py-16 text-slate-500">
        No Sessions Found.
      </div>
    );
  }

  return (

    <div className="overflow-x-auto">

      <table className="w-full min-w-[950px]">

        <thead className="border-b border-blue-100 bg-blue-50">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide text-blue-700">
              Session
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide text-blue-700">
              Start Date
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide text-blue-700">
              End Date
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-blue-700">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-blue-700">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {sessions.map((session, index) => (

            <tr
              key={session._id}
              className={`
                border-t
                border-slate-200
                hover:bg-blue-50
                transition-colors
                ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
              `}
            >

              <td className="px-6 py-4 font-semibold">
                {session.sessionName}
              </td>

              <td className="px-6 py-4">
                {new Date(session.startDate).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">
                {new Date(session.endDate).toLocaleDateString()}
              </td>

              <td className="px-6 py-4 text-center">

                {session.isActive ? (
  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
    Active
  </span>
) : (
  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
    Inactive
  </span>
)}

              </td>

              <td className="px-6 py-4">

                <div className="flex justify-center gap-2">

                  <button 
                    onClick={() => onView(session)}
                  className="flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200">
                    <Eye size={16} />
                    View
                  </button>

                  <button 
                   onClick={() => onEdit(session)}
                  className="flex items-center gap-1 rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-200">
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button 
                   onClick={() => onDelete(session._id)}
                  className="flex items-center gap-1 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200">
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

export default SessionTable;