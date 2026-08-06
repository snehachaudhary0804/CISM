const DomainViewModal = ({ show, onClose, domain }) => {
  if (!show || !domain) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-6">
          Domain Details
        </h2>

        <div className="space-y-4">
          <div>
            <label className="font-semibold text-gray-600">
              Domain Name
            </label>
            <p>{domain.domainName}</p>
          </div>

          <div>
            <label className="font-semibold text-gray-600">
              Description
            </label>
            <p>{domain.description || "N/A"}</p>
          </div>

          <div>
            <label className="font-semibold text-gray-600">
              Created At
            </label>
            <p>
              {new Date(domain.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DomainViewModal;