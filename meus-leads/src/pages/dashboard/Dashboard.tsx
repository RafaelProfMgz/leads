import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import CreateLeadModal from "@/components/lead/leadsCrud/CreateLeadModal";
import EditLeadModal from "@/components/lead/leadsCrud/EditLeadModal";
import RemoveLeadModal from "@/components/lead/leadsCrud/RemoveLeadModal";
import api from "../../services/api";
import { Lead } from "../../types/Leads";
import LeadList from "../../components/lead/LeadList";
import CreateLeadButton from "../../components/lead/button/CreateLeadButton";

export default function Dashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isCreateLeadModalOpen, setCreateLeadModalOpen] = useState(false);
  const [isEditLeadModalOpen, setEditLeadModalOpen] = useState(false);
  const [isRemoveLeadModalOpen, setRemoveLeadModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedLeadToRemove, setSelectedLeadToRemove] = useState<Lead | null>(
    null,
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
      lead._id === updatedLead._id ? updatedLead : lead,
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

  const closeRemoveLeadModal = () => {
    setRemoveLeadModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Meus Leads</h2>

          <CreateLeadButton onClick={openCreateLeadModal} />

          <div className="mt-6 space-y-6">
            <LeadList
              leads={leads}
              loading={loading}
              error={error}
              openEditModal={openEditLeadModal}
              openRemoveModal={openRemoveLeadModal}
            />
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
          lead={selectedLeadToRemove}
          fetchLeads={fetchLeads}
        />
      )}
    </div>
  );
}
