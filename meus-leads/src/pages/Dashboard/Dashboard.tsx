import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import CreateLeadModal from "./leads/CreateLeadModal";
import EditLeadModal from "./leads/EditLeadModal";
import RemoveLeadModal from "./leads/RemoveLeadModal";
import api from "../../services/api";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface Lead {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isCreateLeadModalOpen, setCreateLeadModalOpen] = useState(false);
  const [isEditLeadModalOpen, setEditLeadModalOpen] = useState(false);
  const [isRemoveLeadModalOpen, setRemoveLeadModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedLeadToRemove, setSelectedLeadToRemove] = useState<Lead | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return false;
      }
      return true;
    };
    fetchLeads();
    validateToken();
  }, [navigate]);

  // Função de busca de leads
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await api.get("/leads", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setLeads(response.data);
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.message || "Erro ao carregar leads.";
        setError(errorMessage);
      } else {
        setError("Erro desconhecido. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const openCreateLeadModal = () => {
    setCreateLeadModalOpen(true);
  };

  const closeCreateLeadModal = () => {
    setCreateLeadModalOpen(false);
  };

  const addLead = (newLead: Lead) => {
    setLeads((prevLeads) => [...prevLeads, newLead]);
    closeCreateLeadModal();
  };

  const openEditLeadModal = (lead: Lead) => {
    setSelectedLead(lead);
    setEditLeadModalOpen(true);
  };

  const updateLead = (updatedLead: Lead) => {
    const updatedLeads = leads.map((lead) =>
      lead._id === updatedLead._id ? updatedLead : lead
    );

    setLeads(updatedLeads);
    setEditLeadModalOpen(false);
  };

  const closeEditLeadModal = () => {
    setEditLeadModalOpen(false);
  };

  const openRemoveLeadModal = (lead: Lead) => {
    setSelectedLeadToRemove(lead);
    setRemoveLeadModalOpen(true);
  };

  const removeLead = async () => {
    const token = localStorage.getItem("token");
    if (!token || !selectedLeadToRemove) return;

    try {
      await api.delete(`/leads/${selectedLeadToRemove._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setLeads((prevLeads) =>
        prevLeads.filter((lead) => lead._id !== selectedLeadToRemove._id)
      );
      setRemoveLeadModalOpen(false);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.message || "Erro ao carregar leads.";
        setError(errorMessage);
      } else {
        setError("Erro desconhecido. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const closeRemoveLeadModal = () => {
    setRemoveLeadModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Meus Leads</h2>

          <button
            onClick={openCreateLeadModal}
            className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Criar Lead
          </button>

          <div className="mt-6 space-y-6">
            {loading && (
              <div className="text-gray-600 text-center">Carregando...</div>
            )}

            {error && (
              <div className="bg-red-200 p-4 rounded-lg shadow-md text-gray-700 text-center">
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && leads.length === 0 && (
              <div className="bg-yellow-200 p-4 rounded-lg shadow-md text-gray-700 text-center">
                <p>Não há leads cadastrados.</p>
              </div>
            )}

            {!loading && !error && leads.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {leads.map((lead, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between"
                  >
                    <h3 className="text-xl font-semibold mb-2">{lead.name}</h3>
                    <p className="text-sm text-gray-600">{lead.email}</p>
                    {lead.phone && (
                      <p className="text-sm text-gray-600">
                        Telefone: {lead.phone}
                      </p>
                    )}
                    {lead.message && (
                      <p className="text-sm text-gray-600">
                        Mensagem: {lead.message}
                      </p>
                    )}
                    <div className="flex mt-4 space-x-4">
                      <button
                        onClick={() => {
                          console.log("Lead removido:", lead);
                          openEditLeadModal(lead);
                        }}
                        className="text-blue-500 hover:text-blue-700 transition duration-200"
                      >
                        <FaEdit className="h-5 w-5" />
                      </button>

                      <button
                        onClick={() => {
                          console.log("Lead removido:", lead);
                          openRemoveLeadModal(lead);
                        }}
                        className="text-red-500 hover:text-red-700 transition duration-200"
                      >
                        <FaTrashAlt className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {isCreateLeadModalOpen && (
        <CreateLeadModal
          isOpen={isCreateLeadModalOpen}
          onClose={closeCreateLeadModal}
          onCreate={addLead}
          fetchLeads={fetchLeads}
        />
      )}

      <EditLeadModal
        isOpen={isEditLeadModalOpen}
        onClose={closeEditLeadModal}
        lead={
          selectedLead ? { ...selectedLead, _id: selectedLead._id || "" } : null
        }
        onUpdate={updateLead}
      />

      {isRemoveLeadModalOpen && (
        <RemoveLeadModal
          isOpen={isRemoveLeadModalOpen}
          onClose={closeRemoveLeadModal}
          onRemove={removeLead}
          lead={selectedLeadToRemove}
        />
      )}
    </div>
  );
}
