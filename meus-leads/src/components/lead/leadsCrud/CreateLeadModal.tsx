// CreateLeadModal.tsx
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import api from "../../../services/api";
import { AxiosError } from "axios";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingModal from "../../../components/modal/LoadingModal";

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

  // Schema de validação com Yup
  const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório").required(),
    email: yup
      .string()
      .email("Email inválido")
      .required("Email é obrigatório")
      .required(),
    phone: yup
      .string()
      .matches(/^([0-9]{2})?([0-9]{4,5})?([0-9]{4})$/, "Telefone inválido")
      .required(),
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = { name, email, phone };

    try {
      await schema.validate(formData, { abortEarly: false });

      setLoading(true);
      setError(null);

      const response = await api.post(
        "/leads",
        { name, email, phone, message },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.status === 201) {
        const newLead = response.data;

        onCreate(newLead);

        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        toast.success("Lead criado com sucesso!");
      }
      onClose();
    } catch (err) {
      setLoading(false);
      if (err instanceof yup.ValidationError) {
        const errorMessages = err.errors.join(", ");
        setError(errorMessages);
        toast.error(errorMessages);
      } else if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.message || "Não foi possível criar o lead.";
        setError(errorMessage);
        toast.error(errorMessage);
      } else if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError("Erro desconhecido. Tente novamente.");
        toast.error("Erro desconhecido. Tente novamente.");
      }
    } finally {
      fetchLeads();
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingModal isOpen={loading} message="Criando Lead..." />{" "}
      {/* Renderiza o LoadingModal */}
      <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-40">
        <div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <AiOutlineClose size={20} />
          </button>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Criar Novo Lead
          </h2>
          <form onSubmit={handleSubmit}>
            {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Nome
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                E-mail
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Telefone
              </label>
              <input
                required
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
    </>
  );
};

export default CreateLeadModal;
