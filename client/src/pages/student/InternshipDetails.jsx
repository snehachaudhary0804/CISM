import {
  Building2,
  Code2,
  CalendarDays,
  IndianRupee,
  BriefcaseBusiness,
  MapPin,
} from "lucide-react";
import { CheckCircle } from "lucide-react";
import { UserCheck } from "lucide-react";

const InternshipDetails = ({ internship, timeline }) => {
  if (!internship) {
    return (
      <div
        className="
          bg-white
          rounded-2xl
          border
          border-slate-200
          p-8
          shadow-md
          text-center
          text-slate-500
        "
      >
        No active internship found.
      </div>
    );
  }

  return (
    <div>
      {" "}
      <h2 className="text-4xl font-bold text-center text-slate-800 mb-3">
        Current Internship
      </h2>
      <div
        className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        p-6
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
      "
      >
        {/* Details Grid */}
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-8
        "
        >
          <DetailItem
            icon={Building2}
            label="Company"
            value={internship.externalDetails?.companyName}
          />

          <DetailItem
            icon={Code2}
            label="Domain"
            value={internship.domain?.domainName}
          />

          <DetailItem
            icon={BriefcaseBusiness}
            label="Internship Type"
            value={internship.internshipType}
          />

          <DetailItem
            icon={UserCheck}
            label="Faculty Mentor"
            value={internship.teacherAssignment?.teacher?.name}
          />
          <DetailItem
            icon={MapPin}
            label="Mode"
            value={internship.externalDetails?.mode}
          />

          <DetailItem
            icon={CalendarDays}
            label="Duration"
            value={
              internship.externalDetails?.startDate &&
              internship.externalDetails?.endDate
                ? `${internship.externalDetails?.startDate?.split("T")[0]} - ${internship.externalDetails?.endDate?.split("T")[0]}`
                : "Not Available "
            }
          />

          <DetailItem
            icon={IndianRupee}
            label="Stipend"
            value={
              internship.externalDetails?.stipend
                ? `₹${internship.externalDetails.stipend}`
                : "Unpaid"
            }
          />
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon: Icon, label, value }) => {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        p-4
        rounded-xl
        bg-slate-50
      "
    >
      <div
        className="
          bg-blue-100
          text-blue-600
          p-3
          rounded-lg
        "
      >
        <Icon size={22} />
      </div>

      <div>
        <p
          className="
            text-xs
            uppercase
            font-bold
            text-slate-500
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            font-semibold
            text-slate-800
          "
        >
          {value || "Not Available"}
        </p>
      </div>
    </div>
  );
};

export default InternshipDetails;
