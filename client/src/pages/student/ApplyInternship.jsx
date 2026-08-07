import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import DashboardHero from "../../components/dashboard/DashboardHero";
import axios from "axios";
import {
  getAllDepartments,
  getAllAcademicSessions,
  getAllDomains,
} from "../../services/adminService";
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
  const [departments, setDepartments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [domains, setDomains] = useState([]);
  const [formData, setFormData] = useState({
    department: "",
    academicSession: "",
    domain: "",
    companyName: "",
    companyAddress: "",
    hrName: "",
    hrEmail: "",
    duration: "",
    startDate: "",
    endDate: "",
    remarks: "",
    offerLetter: null,
  });

  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {
    try {
      const [deptRes, sessionRes, domainRes] = await Promise.all([
        getAllDepartments(),
        getAllAcademicSessions(),
        getAllDomains(),
      ]);

      setDepartments(deptRes.data || []);
      setSessions(sessionRes.data || []);
      setDomains(domainRes.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const payload = {
        department: formData.department,
        academicSession: formData.academicSession,
        domain: formData.domain,
        internshipType,

        externalDetails:
          internshipType === "External"
            ? {
                companyName: formData.companyName,
                companyAddress: formData.companyAddress,
                hrName: formData.hrName,
                hrEmail: formData.hrEmail,
                duration: formData.duration,
                startDate: formData.startDate,
                endDate: formData.endDate,
                remarks: formData.remarks,
              }
            : undefined,

        inHouseDetails:
          internshipType === "In-House"
            ? {
                duration: formData.duration,
                remarks: formData.remarks,
              }
            : undefined,
      };
      const response = await axios.post(
        "http://localhost:5000/api/v1/internships",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      alert(response.data.message);
      console.log(response.data);

      // Optional: Reset form
      // setFormData(initialState);
    } catch (error) {
      console.error(error.response?.data || error);

      alert(error.response?.data?.message || "Failed to submit internship.");
    }
  };

  return (
    
      <div className="space-y-8 pb-10">
        {/* Internship Type */}

        <div className="grid md:grid-cols-2 gap-6">
          {/* External Internship */}
          <div
            onClick={() => setInternshipType("External")}
            className={`
      relative
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
            <div className="absolute top-6 right-6">
              <CheckCircle2
                size={30}
                className={
                  internshipType === "External"
                    ? "text-blue-600"
                    : "text-slate-300"
                }
              />
            </div>

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-5">
              <Building2 className="text-blue-600" size={34} />
            </div>

            <h2 className="text-3xl font-bold text-slate-800">
              External Internship
            </h2>

            <p className="text-slate-500 mt-3 text-base leading-7">
              Already selected a company? Submit your internship details, upload
              the offer letter and request your NOC.
            </p>
          </div>

          {/* In-House Internship */}
          <div
            onClick={() => setInternshipType("In-House")}
            className={`
      relative
      cursor-pointer
      rounded-3xl
      border
      p-8
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-xl
      ${
        internshipType === "In-House"
          ? "border-blue-600 bg-gradient-to-br from-blue-50 to-white shadow-lg"
          : "border-slate-200 bg-white"
      }
    `}
          >
            <div className="absolute top-6 right-6">
              <CheckCircle2
                size={30}
                className={
                  internshipType === "In-House"
                    ? "text-blue-600"
                    : "text-slate-300"
                }
              />
            </div>

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-5">
              <GraduationCap className="text-blue-600" size={34} />
            </div>

            <h2 className="text-3xl font-bold text-slate-800">
              In-House Internship
            </h2>

            <p className="text-slate-500 mt-3 text-base leading-7">
              Apply for an internship organized by your college.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Basic Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Department */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Department *
                </label>

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl p-3"
                >
                  <option value="">Select Department</option>

                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.departmentName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Academic Session */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Academic Session *
                </label>

                <select
                  name="academicSession"
                  value={formData.academicSession}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl p-3"
                >
                  <option value="">Select Session</option>

                  {sessions.map((session) => (
                    <option key={session._id} value={session._id}>
                      {session.sessionName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* External Internship */}
          {internshipType === "External" && (
            <>
              {/* Company Information */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="text-blue-600" size={28} />

                  <h2 className="text-2xl font-bold">Company Information</h2>
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
                  <Briefcase size={28} className="text-blue-600" />

                  <h2 className="text-2xl font-bold">Internship Details</h2>
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
                      className="w-full border border-slate-300 rounded-xl p-3"
                    >
                      <option value="">Select Domain</option>

                      {domains.map((domain) => (
                        <option key={domain._id} value={domain._id}>
                          {domain.domainName}
                        </option>
                      ))}
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
              </div>{" "}
              {/* Documents */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Upload size={28} className="text-blue-600" />

                  <h2 className="text-2xl font-bold">Documents</h2>
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
                  <Upload size={40} className="text-blue-600" />

                  <p className="mt-4 text-slate-600">
                    Click to upload your Offer Letter
                  </p>

                  <p className="text-sm text-slate-400 mt-2">PDF only</p>

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
                  <GraduationCap className="text-blue-600" size={34} />

                  <h2 className="text-2xl font-bold">In-House Internship</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Preferred Domain
                    </label>

                    <select
                      name="domain"
                      value={formData.domain}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl p-3"
                    >
                      <option value="">Select Domain</option>

                      {domains.map((domain) => (
                        <option key={domain._id} value={domain._id}>
                          {domain.domainName}
                        </option>
                      ))}
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
            <FileText size={28} className="text-blue-600" />

            <h2 className="text-2xl font-bold">Application Process</h2>
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
              <span>NOC Issued (External Internship Only)</span>
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
  
  );
};

export default ApplyInternship;
