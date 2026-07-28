import {
  Eye,
  Check,
  Trash2,
} from "lucide-react";
const NotificationTable = ({
  notifications,
  onDelete,
  onMarkAsRead,
}) => {

  if (!notifications?.length) {
    return (
      <div className="flex justify-center py-16 text-slate-500 font-medium">
        No notifications found.
      </div>
    );
  }

  return (

    <div className="overflow-x-auto">

      <table className="w-full min-w-[1200px]">

        <thead className="bg-blue-50 border-b border-blue-100">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide text-blue-700">
              Title
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide text-blue-700">
              Message
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-blue-700">
              Receiver
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-blue-700">
              Date
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-blue-700">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-blue-700">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {notifications.map((notification, index) => (

            <tr
              key={notification._id}
              className={`
                border-t
                border-slate-200
                hover:bg-blue-50
                transition-colors
                ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
              `}
            >

              <td className="px-6 py-4 font-semibold text-slate-800">
                {notification.title}
              </td>

              <td className="px-6 py-4 text-slate-600 max-w-sm">
                {notification.message}
              </td>

              <td className="px-6 py-4 text-center">
                <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {notification.receiver?.name || "-"}
                </span>
              </td>

              <td className="px-6 py-4 text-center">
                {new Date(notification.createdAt).toLocaleDateString()}
              </td>

              <td className="px-6 py-4 text-center">

                {!notification.isRead ? (
                  <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    Unread
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Read
                  </span>
                )}

              </td>

              <td className="px-6 py-4">

                <div className="flex items-center justify-center gap-2">

                  <button
                    className="rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200 transition"
                    title="View"
                  >
                    <Eye size={17} />
                  </button>

                  <button
                  onClick={() => onMarkAsRead(notification._id)}
                    className="rounded-lg bg-green-100 p-2 text-green-700 hover:bg-green-200 transition"
                    title="Mark as Read"
                  >
                    <Check size={17} />
                  </button>

                  <button
                  onClick={() => onDelete(notification._id)}
                    className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200 transition"
                    title="Delete"
                  >
                    <Trash2 size={17} />
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

export default NotificationTable;