import React, { useCallback } from "react";
import { Lead } from "../../../types/Leads";
import { AiOutlineClose } from "react-icons/ai";

interface RemoveLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => Promise<void>;
  lead: Lead | null;
}

const RemoveLeadModal: React.FC<RemoveLeadModalProps> = ({
  isOpen,
  onClose,
  onRemove,
  lead,
}) => {
  const handleRemoveClick = useCallback(async () => {
    if (onRemove) {
      await onRemove();
      onClose();
    }
  }, [onRemove, onClose]);

  if (!isOpen || !lead) return null;

  return (
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
            onClick={handleRemoveClick}
            className="bg-red-500 text-white py-2 px-4 rounded-lg"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveLeadModal;
