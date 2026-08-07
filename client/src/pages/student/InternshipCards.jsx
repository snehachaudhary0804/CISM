import {
  BriefcaseBusiness,
  CircleCheckBig,
  Clock3,
  FileCheck,
} from "lucide-react";

const InternshipCards = ({ internships = [] }) => {
  const total = internships.length;

  const active = internships.filter(
    (item) => item.status === "Active" || item.status === "Approved",
  ).length;

  const completed = internships.filter(
    (item) => item.status === "Completed",
  ).length;

  const pending = internships.filter(
    (item) => item.status === "Pending",
  ).length;

  const cards = [
    {
      title: "Total Internships",
      value: total,
      icon: BriefcaseBusiness,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Internship",
      value: active,
      icon: CircleCheckBig,
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Completed",
      value: completed,
      icon: FileCheck,
      bg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Pending Approval",
      value: pending,
      icon: Clock3,
      bg: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6  mt-8 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              bg-white
              border
              border-slate-200
              rounded-2xl
              shadow-sm
              p-6
              transition-all
              duration-200
              hover:shadow-md
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{card.title}</p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                  {card.value}
                </h2>
              </div>

              <div
                className={`
                  ${card.bg}
                  p-3
                  rounded-xl
                `}
              >
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InternshipCards;
