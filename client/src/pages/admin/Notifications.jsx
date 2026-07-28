import { useEffect, useState } from "react";
import api from "../../services/api";
import NotificationTable from "../../components/tables/NotificationTable";
import NotificationModal from "../../components/common/NotificationModal";

const Notifications = () => {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
const [openModal, setOpenModal] = useState(false);
const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

const handleDelete = async (id) => {
  try {
    await api.delete(`/notifications/${id}`);
    fetchNotifications();
  } catch (error) {
    console.error(error.response?.data || error);
  }
};

const handleMarkAsRead = async (id) => {
  try {
    await api.patch(`/notifications/${id}/read`);
    fetchNotifications();
  } catch (error) {
    console.error(error.response?.data || error);
  }
};
  const fetchNotifications = async () => {

    try {

      setLoading(true);

      const res = await api.get("/notifications");

      console.log("Notifications:", res.data);

      setNotifications(res.data.data);

    } catch (error) {

      console.error(
        error.response?.data || error
      );

    } finally {

      setLoading(false);

    }

  };


  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      notification.message
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );


  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">


        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Notifications
          </h1>


          <p className="text-slate-500 mt-1">
            Manage all system notifications.
          </p>


          <p className="inline-flex mt-3 rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
            Total Notifications : {notifications.length}
          </p>


        </div>


       <button
  onClick={() => setShowModal(true)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold"
>
  + Send Notification
</button>


      </div>



      {/* Search */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">


        <input

          type="text"

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          placeholder="Search Notification..."

          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

        />


      </div>



      {/* Table */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">


        {
          loading ?

          (
            <div className="p-10 text-center text-slate-500">
              Loading Notifications...
            </div>
          )

          :

          (
            <NotificationTable
  notifications={filteredNotifications}
  onDelete={handleDelete}
  onMarkAsRead={handleMarkAsRead}
/>
          )

        }


      </div>

<NotificationModal
  show={showModal}
  onClose={() => setShowModal(false)}
  onSuccess={fetchNotifications}
/>
    </div>

  );

};


export default Notifications;