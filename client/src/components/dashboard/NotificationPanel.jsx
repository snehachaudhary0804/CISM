import { CheckCircle2, Clock3, Bell, FileText, UserPlus } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: CheckCircle2,
    color: "text-green-600",
    title: "Internship Approved",
    message: "Rahul Kumar's internship has been approved.",
    time: "5 min ago",
  },
  {
    id: 2,
    icon: FileText,
    color: "text-blue-600",
    title: "Offer Letter Uploaded",
    message: "Sneha Chaudhary uploaded an offer letter.",
    time: "18 min ago",
  },
  {
    id: 3,
    icon: Clock3,
    color: "text-orange-500",
    title: "Pending Review",
    message: "12 internship requests are waiting for approval.",
    time: "1 hour ago",
  },
  {
    id: 4,
    icon: UserPlus,
    color: "text-purple-600",
    title: "New Student Registered",
    message: "A new student has been added to CSE Department.",
    time: "Today",
  },
];

const NotificationPanel = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Header */}

      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200 dark:border-slate-800">
        <Bell className="text-blue-600" />

        <div>
          <h2 className="text-xl font-semibold dark:text-white">
            Recent Activities
          </h2>

          <p className="text-sm text-slate-500">
            Latest updates from the system
          </p>
        </div>
      </div>

      {/* Notification List */}

      <div className="max-h-[420px] overflow-y-auto">
        {notifications.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="
                flex
                gap-4
                p-5
                border-b
                border-slate-100
                dark:border-slate-800
                hover:bg-slate-50
                dark:hover:bg-slate-800
                transition
              "
            >
              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-slate-100
                  dark:bg-slate-800
                  flex
                  items-center
                  justify-center
                "
              >
                <Icon className={item.color} size={22} />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-slate-800 dark:text-white">
                    {item.title}
                  </h3>

                  <span className="text-xs text-slate-400">{item.time}</span>
                </div>

                <p className="mt-2 text-sm text-slate-500">{item.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationPanel;
