import { useEffect, useState } from "react";
import { X } from "lucide-react";

const GenerateNOCModal = ({ isOpen, onClose, report, onGenerate }) => {
  const [formData, setFormData] = useState({
    nocNumber: "",
    issueDate: "",
    validTill: "",
    hodName: "Dr. HOD Name",
    remarks: "",
  });

  useEffect(() => {
    if (!report) return;

    const today = new Date().toISOString().split("T")[0];

    setFormData({
      nocNumber: `NOC-${Date.now()}`,
      issueDate: today,
      validTill: "",
      hodName: "Dr. HOD Name",
      remarks: "",
    });
  }, [report]);

  if (!isOpen || !report) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onGenerate({
      report,
      ...formData,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Generate NOC</h2>

            <p className="text-sm text-slate-500 mt-1">
              Verify internship details before generating the NOC.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Student Details */}

          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-4">
              Student Information
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <input
                readOnly
                value={report.student?.name || ""}
                className="border rounded-lg p-3 bg-slate-50"
              />

              <input
                readOnly
                value={report.student?.rollNumber || ""}
                className="border rounded-lg p-3 bg-slate-50"
              />

              <input
                readOnly
                value={report.department?.departmentName || ""}
                className="border rounded-lg p-3 bg-slate-50"
              />

              <input
                readOnly
                value={report.teacherAssignment?.teacher?.name || ""}
                className="border rounded-lg p-3 bg-slate-50"
              />
            </div>
          </div>

          {/* Internship */}

          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-4">
              Internship Details
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <input
                readOnly
                value={report.externalDetails?.companyName || ""}
                className="border rounded-lg p-3 bg-slate-50"
              />

              <input
                readOnly
                value={report.domain?.domainName || ""}
                className="border rounded-lg p-3 bg-slate-50"
              />

              <input
                readOnly
                value={report.internshipType || ""}
                className="border rounded-lg p-3 bg-slate-50"
              />

              <input
                readOnly
                value={report.status || ""}
                className="border rounded-lg p-3 bg-slate-50"
              />
            </div>
          </div>

          {/* NOC Details */}

          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-4">
              NOC Details
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">NOC Number</label>

                <input
                  name="nocNumber"
                  value={formData.nocNumber}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Issue Date</label>

                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Valid Till</label>

                <input
                  type="date"
                  name="validTill"
                  value={formData.validTill}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">HOD Name</label>

                <input
                  name="hodName"
                  value={formData.hodName}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-1"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium">Remarks</label>

              <textarea
                rows={3}
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1"
              />
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="border-t p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Generate NOC
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateNOCModal;
