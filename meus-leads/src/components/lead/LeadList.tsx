import { Lead } from "../../types/Leads";
import LeadCard from "./LeadCard";

interface LeadListProps {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  openEditModal: (lead: Lead) => void;
  openRemoveModal: (lead: Lead) => void;
}

export default function LeadList({
  leads,
  loading,
  error,
  openEditModal,
  openRemoveModal,
}: LeadListProps) {
  return (
    <>
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
            <LeadCard
              key={index}
              lead={lead}
              onEdit={() => openEditModal(lead)}
              onRemove={() => openRemoveModal(lead)}
            />
          ))}
        </div>
      )}
    </>
  );
}
