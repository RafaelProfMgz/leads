import { Lead } from "../../types/Leads";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface LeadCardProps {
  lead: Lead;
  onEdit: () => void;
  onRemove: () => void;
}

export default function LeadCard({ lead, onEdit, onRemove }: LeadCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
      <h3 className="text-xl font-semibold mb-2">{lead.name}</h3>
      <p className="text-sm text-gray-600">{lead.email}</p>
      {lead.phone && (
        <p className="text-sm text-gray-600">Telefone: {lead.phone}</p>
      )}
      {lead.message && (
        <p className="text-sm text-gray-600">Mensagem: {lead.message}</p>
      )}
      <div className="flex mt-4 space-x-4">
        <button
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-700 transition duration-200"
        >
          <FaEdit className="h-5 w-5" />
        </button>

        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 transition duration-200"
        >
          <FaTrashAlt className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
