import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import api from "../../services/api";
import { Lead } from "../../types/Leads";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import ShadcnLeadList from "@/components/lead/LeadList";
import CreateLeadModal from "@/components/lead/leadsCrud/CreateLeadModal";
import EditLeadModal from "@/components/lead/leadsCrud/EditLeadModal";
import RemoveLeadModal from "@/components/lead/leadsCrud/RemoveLeadModal";

export default function Dashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isCreateLeadModalOpen, setCreateLeadModalOpen] = useState(false);
  const [isEditLeadModalOpen, setEditLeadModalOpen] = useState(false);
  const [isRemoveLeadModalOpen, setRemoveLeadModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
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

    if (validateToken()) {
      fetchLeads();
    }
  }, [navigate]);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/leads", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLeads(response.data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.message || "Erro ao carregar leads.";
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError("Sessão expirada ou inválida. Faça login novamente.");
          localStorage.removeItem("token");
          navigate("/");
        } else {
          setError(errorMessage);
        }
      } else {
        setError("Ocorreu um erro inesperado. Tente novamente.");
        console.error("Erro desconhecido:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddLead = () => {
    setCreateLeadModalOpen(false);
    fetchLeads();
  };

  const openEditLeadModal = (lead: Lead) => {
    if (lead._id) {
      // Only set if _id exists
      setSelectedLead(lead);
      setEditLeadModalOpen(true);
    }
  };

  const handleUpdateLead = () => {
    setEditLeadModalOpen(false);
    setSelectedLead(null);
    fetchLeads();
  };

  const openRemoveLeadModal = (lead: Lead) => {
    setSelectedLead(lead);
    setRemoveLeadModalOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Meus Leads</CardTitle>
          <Dialog
            open={isCreateLeadModalOpen}
            onOpenChange={setCreateLeadModalOpen}
          >
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Adicionar Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <CreateLeadModal
                isOpen={isCreateLeadModalOpen}
                onClose={() => setCreateLeadModalOpen(false)}
                onCreate={handleAddLead}
                fetchLeads={fetchLeads}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <div className="mt-6">
            <ShadcnLeadList
              leads={leads}
              loading={loading}
              error={error}
              openEditModal={openEditLeadModal}
              openRemoveModal={openRemoveLeadModal}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditLeadModalOpen} onOpenChange={setEditLeadModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {selectedLead && selectedLead._id && (
            <EditLeadModal
              isOpen={isEditLeadModalOpen}
              lead={{
                _id: selectedLead._id,
                name: selectedLead.name || "",
                email: selectedLead.email || "",
                phone: selectedLead.phone,
                message: selectedLead.message,
              }}
              onClose={() => setEditLeadModalOpen(false)}
              onUpdate={handleUpdateLead}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={isRemoveLeadModalOpen}
        onOpenChange={setRemoveLeadModalOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          {selectedLead && (
            <RemoveLeadModal
              isOpen={isRemoveLeadModalOpen}
              onClose={() => setRemoveLeadModalOpen(false)}
              lead={selectedLead}
              fetchLeads={fetchLeads}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
