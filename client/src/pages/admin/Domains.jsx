import { useEffect, useState } from "react";
import api from "../../services/api";
import DomainTable from "../../components/tables/DomainTable";
import DomainModal from "../../components/common/DomainModal";
import DomainViewModal from "../../components/common/DomainViewModal";

const Domains = () => {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [editingDomain, setEditingDomain] = useState(null);

  const [formData, setFormData] = useState({
    domainName: "",
    description: "",
  });

  const fetchDomains = async () => {
    try {
      setLoading(true);

      const res = await api.get("/domains");
      setDomains(res.data.data);
    } catch (error) {
      console.error(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingDomain) {
        await api.put(`/domains/${editingDomain._id}`, formData);
      } else {
        await api.post("/domains", formData);
      }

      fetchDomains();

      setShowModal(false);

      setEditingDomain(null);

      setFormData({
        domainName: "",
        description: "",
      });
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  const handleEdit = (domain) => {
    setEditingDomain(domain);

    setFormData({
      domainName: domain.domainName,
      description: domain.description || "",
    });

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this domain?")) return;

    try {
      await api.delete(`/domains/${id}`);
      fetchDomains();
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };
  const handleView = (domain) => {
    setSelectedDomain(domain);
    setShowViewModal(true);
  };

  const filteredDomains = domains.filter((domain) =>
    domain.domainName?.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetchDomains();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}

      <h1 className="text-4xl font-bold text-center text-slate-800 mb-3">
        Domain Management
      </h1>

      <p className="text-slate-500 mt-1 text-center">
        Manage internship domains.
      </p>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="inline-flex mt-3 rounded-full bg-blue-100 text-blue-700 px-4 py-1 text-sm font-semibold">
            Total Domains: {domains.length}
          </p>
        </div>

        <button
          onClick={() => {
            setEditingDomain(null);

            setFormData({
              domainName: "",
              description: "",
            });

            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition"
        >
          + Add Domain
        </button>
      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Domain..."
          className="
            w-full
            border
            border-slate-300
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />
      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-500">
            Loading Domains...
          </div>
        ) : (
          <DomainTable
            domains={filteredDomains}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <DomainModal
        show={showModal}
        onClose={() => setShowModal(false)}
        formData={formData}
        setFormData={setFormData}
        editingDomain={editingDomain}
        onSubmit={handleSubmit}
      />
      <DomainViewModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        domain={selectedDomain}
      />
    </div>
  );
};

export default Domains;
