import { useState } from "react";
import InternshipTable from "../../components/tables/InternshipTable";

const Internships = () => {

  const [internships] = useState([
    {
      _id: 1,
      student: "Sneha Chaudhary",
      company: "Infosys",
      domain: "Web Development",
      type: "External",
      teacher: "Dr. Sharma",
      status: "Approved",
      noc: "Issued",
    },
    {
      _id: 2,
      student: "Rahul Kumar",
      company: "TCS",
      domain: "AI",
      type: "External",
      teacher: "Prof. Gupta",
      status: "Pending",
      noc: "Pending",
    },
    {
      _id: 3,
      student: "Anjali Singh",
      company: "College Lab",
      domain: "Cyber Security",
      type: "In-House",
      teacher: "Dr. Verma",
      status: "Rejected",
      noc: "Not Required",
    },
  ]);

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Internship Management
          </h1>

          <p className="text-slate-500 mt-1">
            Manage all internship applications.
          </p>

          <p className="inline-flex mt-3 rounded-full bg-blue-100 text-blue-700 px-4 py-1 text-sm font-semibold">
            Total Internships : {internships.length}
          </p>

        </div>

        <button
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-2.5
            rounded-xl
            font-semibold
            transition
          "
        >
          + Add Internship
        </button>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

          <input
            type="text"
            placeholder="Search Student..."
            className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <select className="border border-slate-300 rounded-xl px-4 py-3">
            <option>All Departments</option>
          </select>

          <select className="border border-slate-300 rounded-xl px-4 py-3">
            <option>All Teachers</option>
          </select>

          <select className="border border-slate-300 rounded-xl px-4 py-3">
            <option>All Status</option>
          </select>

          <select className="border border-slate-300 rounded-xl px-4 py-3">
            <option>All Types</option>
          </select>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <InternshipTable internships={internships} />

      </div>

    </div>

  );

};

export default Internships;