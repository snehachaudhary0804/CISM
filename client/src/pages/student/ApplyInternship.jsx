import { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import DashboardHero from "../../components/dashboard/DashboardHero";

import {
  Building2,
  GraduationCap,
  Briefcase,
  Calendar,
  Clock3,
  Upload,
  FileText,
  CheckCircle2,
} from "lucide-react";

const ApplyInternship = () => {
  const [internshipType, setInternshipType] = useState("External");

  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    hrName: "",
    hrEmail: "",
    domain: "",
    duration: "",
    startDate: "",
    endDate: "",
    remarks: "",
    offerLetter: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Backend Integration Next
  };

  return (
    <DashboardLayout role="student">

      <div className="space-y-8 pb-10">

        <DashboardHero
  user="Student"
  subtitle="Apply for an External or In-House Internship. Submit your application for approval and track every stage from one place."
  overviewTitle="Apply Internship"
  overviewValue={
    internshipType === "External"
      ? "External Internship"
      : "In-House Internship"
  }
  overviewText={
    internshipType === "External"
      ? "Request NOC for your selected company."
      : "Apply for an internship offered by your college."
  }
  buttonText="My Internships"
/>

        {/* Internship Type */}

        <div className="grid md:grid-cols-2 gap-6">

          {/* External */}

          <div
  onClick={() => setInternshipType("External")}
  className={`
    cursor-pointer
    rounded-3xl
    border
    p-8
    transition-all
    duration-300
    hover:-translate-y-2
    hover:shadow-xl
    ${
      internshipType === "External"
        ? "border-blue-600 bg-gradient-to-br from-blue-50 to-white shadow-lg"
        : "border-slate-200 bg-white"
    }
  `}
>
  <div className="flex justify-between items-center">

    <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
      <Building2 className="text-blue-600" size={34} />
    </div>

    {internshipType === "External" && (
      <CheckCircle2
        className="text-blue-600"
        size={32}
      />
    )}

  </div>

  <h2 className="text-2xl font-bold mt-6">
    External Internship
  </h2>

  <p className="text-slate-500 mt-3 leading-7">
    Already selected a company?
    Submit your internship details,
    upload the offer letter,
    and request your NOC.
  </p>

</div>
          {/* In House */}

          <div
            onClick={() => setInternshipType("In-House")}
            className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg
            ${
              internshipType === "In-House"
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 bg-white"
            }`}
          >

            <div className="flex items-center justify-between">

              <GraduationCap
                size={34}
                className="text-blue-600"
              />

              {internshipType === "In-House" && (
                <CheckCircle2
                  className="text-blue-600"
                  size={28}
                />
              )}

            </div>

            <h2 className="text-xl font-bold mt-5">
              In-House Internship
            </h2>

            <p className="text-slate-500 mt-2">
              Apply for an internship organized
              by your college.
            </p>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {internshipType === "External" && (
            <>

              {/* Company Information */}

              <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8">

                <div className="flex items-center gap-3 mb-6">

                  <GraduationCap
                    className="text-blue-600"
                    size={28}
                  />

                  <h2 className="text-2xl font-bold">
                    Company Information
                  </h2>

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  <div>

                    <label className="block text-sm font-semibold mb-2">
                      Company Name *
                    </label>

                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                  <div>

                    <label className="block text-sm font-semibold mb-2">
                      Company Address *
                    </label>

                    <input
                      type="text"
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                  <div>

                    <label className="block text-sm font-semibold mb-2">
                      HR Name
                    </label>

                    <input
                      type="text"
                      name="hrName"
                      value={formData.hrName}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                  <div>

                    <label className="block text-sm font-semibold mb-2">
                      HR Email
                    </label>

                    <input
                      type="email"
                      name="hrEmail"
                      value={formData.hrEmail}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                </div>

              </div>

              {/* Internship Details */}

              <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8">

                <div className="flex items-center gap-3 mb-6">

                  <Briefcase
                    size={28}
                    className="text-blue-600"
                  />

                  <h2 className="text-2xl font-bold">
                    Internship Details
                  </h2>

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  <div>

                    <label className="block text-sm font-semibold mb-2">
                      Domain *
                    </label>

                   <select
  name="domain"
  value={formData.domain}
  onChange={handleChange}
  className="
    w-full
    border
    border-slate-300
    rounded-xl
    p-3
    bg-white
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
  "
>
  <option value="">Select Domain</option>

  <option value="Web Development">
    Web Development
  </option>

  <option value="App Development">
    App Development
  </option>

  <option value="Artificial Intelligence">
    Artificial Intelligence
  </option>

  <option value="Machine Learning">
    Machine Learning
  </option>

  <option value="Data Science">
    Data Science
  </option>

  <option value="Cyber Security">
    Cyber Security
  </option>

  <option value="Cloud Computing">
    Cloud Computing
  </option>

  <option value="UI/UX">
    UI / UX
  </option>
</select>

                  </div>

                  <div>

                    <label className="block text-sm font-semibold mb-2">
                      Duration (Months)
                    </label>

                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl p-3"
                    />

                  </div>

                  <div>

                    <label className="block text-sm font-semibold mb-2">
                      Start Date
                    </label>

                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl p-3"
                    />

                  </div>

                  <div>

                    <label className="block text-sm font-semibold mb-2">
                      End Date
                    </label>

                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl p-3"
                    />

                  </div>

                </div>

              </div>              {/* Documents */}

              <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8">

                <div className="flex items-center gap-3 mb-6">

                  <Upload
                    size={28}
                    className="text-blue-600"
                  />

                  <h2 className="text-2xl font-bold">
                    Documents
                  </h2>

                </div>

                <label className="block text-sm font-semibold mb-3">
                  Upload Offer Letter (PDF)
                </label>

                <label
                  htmlFor="offerLetter"
                  className="
                    border-2
                    border-dashed
                    border-blue-300
                    rounded-2xl
                    p-10
                    flex
                    flex-col
                    items-center
                    justify-center
                    cursor-pointer
                    hover:bg-blue-50
                    transition
                  "
                >

                  <Upload
                    size={40}
                    className="text-blue-600"
                  />

                  <p className="mt-4 text-slate-600">
                    Click to upload your Offer Letter
                  </p>

                  <p className="text-sm text-slate-400 mt-2">
                    PDF only
                  </p>

                  {formData.offerLetter && (
                    <p className="mt-4 font-medium text-green-600">
                      {formData.offerLetter.name}
                    </p>
                  )}

                </label>

                <input
                  id="offerLetter"
                  type="file"
                  name="offerLetter"
                  accept=".pdf"
                  onChange={handleChange}
                  className="hidden"
                />

              </div>

              <button
                type="submit"
                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-bold
                  py-4
                  rounded-xl
                  transition
                "
              >
                Request NOC
              </button>

            </>
          )}

          {/* ========================= */}
          {/* In-House Internship */}
          {/* ========================= */}

          {internshipType === "In-House" && (

            <>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8">

                <div className="flex items-center gap-3 mb-6">

                  <GraduationCap
                    size={28}
                    className="text-blue-600"
                  />

                  <h2 className="text-2xl font-bold">
                    In-House Internship
                  </h2>

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  <div>

                    <label className="block text-sm font-semibold mb-2">
                      Preferred Domain
                    </label>

                    <input
                      type="text"
                      name="domain"
                      value={formData.domain}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl p-3"
                    />

                  </div>

                  <div>

                    <label className="block text-sm font-semibold mb-2">
                      Duration (Months)
                    </label>

                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl p-3"
                    />

                  </div>

                </div>

                <div className="mt-6">

                  <label className="block text-sm font-semibold mb-2">
                    Remarks
                  </label>

                  <textarea
                    rows={5}
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl p-3"
                    placeholder="Write anything you want the admin to know..."
                  />

                </div>

              </div>

              <button
                type="submit"
                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-bold
                  py-4
                  rounded-xl
                  transition
                "
              >
                Apply Internship
              </button>

            </>

          )}

        </form>

        {/* Application Process */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8">

          <div className="flex items-center gap-3 mb-6">

            <FileText
              size={28}
              className="text-blue-600"
            />

            <h2 className="text-2xl font-bold">
              Application Process
            </h2>

          </div>

          <div className="space-y-5">

            <div className="flex items-center gap-4">
              <CheckCircle2 className="text-green-600" />
              <span>Fill Internship Application</span>
            </div>

            <div className="flex items-center gap-4">
              <CheckCircle2 className="text-green-600" />
              <span>Admin Reviews Application</span>
            </div>

            <div className="flex items-center gap-4">
              <CheckCircle2 className="text-green-600" />
              <span>Teacher Assignment</span>
            </div>

            <div className="flex items-center gap-4">
              <CheckCircle2 className="text-green-600" />
              <span>
                NOC Issued (External Internship Only)
              </span>
            </div>

            <div className="flex items-center gap-4">
              <CheckCircle2 className="text-green-600" />
              <span>Internship Starts</span>
            </div>

            <div className="flex items-center gap-4">
              <CheckCircle2 className="text-green-600" />
              <span>Upload Completion Documents</span>
            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default ApplyInternship;