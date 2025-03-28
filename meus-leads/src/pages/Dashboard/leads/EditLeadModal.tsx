import React, { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { AiOutlineClose } from "react-icons/ai";
import api from "../../../services/api";

interface EditLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    message?: string;
  } | null;
  onUpdate: (lead: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    message?: string;
  }) => void;
}

const EditLeadModal = ({
  isOpen,
  onClose,
  lead,
  onUpdate,
}: EditLeadModalProps) => {
  const [editedLead, setEditedLead] = useState(
    () =>
      lead || {
        _id: "",
        name: "",
        email: "",
        phone: "",
        message: "",
      }
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lead) {
      setEditedLead(lead);
    }
  }, [lead]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedLead({
      ...editedLead,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("teste", editedLead);

    try {
      const response = await api.patch(
        `/leads/${editedLead._id}`,
        {
          name: editedLead.name,
          email: editedLead.email,
          phone: editedLead.phone,
          message: editedLead.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        onUpdate(editedLead);
        onClose();
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.message || "Erro ao atualizar o lead.";
        setError(errorMessage);
      } else {
        setError("Erro desconhecido. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Editar Lead</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Nome
            </label>
            <input
              type="text"
              name="name"
              value={editedLead.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={editedLead.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Telefone
            </label>
            <input
              type="text"
              name="phone"
              value={editedLead.phone || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Mensagem
            </label>
            <textarea
              name="message"
              value={editedLead.message || ""}
              onChange={handleChange}
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
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loading ? "Editando..." : "Editar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLeadModal;
