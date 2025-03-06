import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import api from "../../../services/api";
import { AxiosError } from "axios";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

interface CreateLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  fetchLeads: () => void;
  onCreate: (lead: Lead) => void;
}

const CreateLeadModal: React.FC<CreateLeadModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  fetchLeads,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const validateForm = (): string | null => {
    if (!name || !email) {
      return "Nome e E-mail são obrigatórios.";
    }
    if (!email.includes("@")) {
      return "Por favor, insira um e-mail válido.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.post(
        "/leads",
        { name, email, phone, message },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        const newLead = response.data;

        onCreate(newLead);

        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        onClose();
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.message || "Não foi possível criar os leads.";
        setError(errorMessage);
      } else {
        setError("Erro desconhecido. Tente novamente.");
      }
    } finally {
      fetchLeads();
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Criar Novo Lead</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Telefone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Mensagem
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Fechar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLeadModal;
