import React from "react";
import { Lead } from "../../../types/Leads";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingModal from "../../../components/modal/LoadingModal";
import api from "../../../services/api";
import { AxiosError } from "axios";

interface RemoveLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  fetchLeads: () => void;
}

const RemoveLeadModal: React.FC<RemoveLeadModalProps> = ({
  isOpen,
  onClose,
  lead,
  fetchLeads,
}) => {
  const [loading, setLoading] = React.useState(false);
  console.log(lead);
  const handleRemove = async () => {
    if (!lead) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token não encontrado!");
        return;
      }

      await api.delete(`/leads/${lead._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Lead removido com sucesso!");
      onClose();
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.message || "Erro ao remover o lead.";
        toast.error(errorMessage);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Erro desconhecido. Tente novamente.");
      }
    } finally {
      fetchLeads();
      setLoading(false);
    }
  };

  if (!isOpen || !lead) return null;

  return (
    <>
      <LoadingModal isOpen={loading} message="Removendo Lead..." />
      <div className="fixed inset-0 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <AiOutlineClose size={20} />
          </button>
          <h3 className="text-xl font-semibold mb-4">Remover Lead</h3>
          <p>
            Tem certeza que deseja remover o lead:
            <strong>{lead.name}</strong>
          </p>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
            >
              Cancelar
            </button>
            <button
              onClick={handleRemove}
              className="bg-red-500 text-white py-2 px-4 rounded-lg"
            >
              Remover
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoveLeadModal;
