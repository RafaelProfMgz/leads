import { Lead } from "../../types/Leads";
import ShadcnLeadCard from "./LeadCard";
import LeadCardSkeleton from "../skeleton/LeadCardSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Info } from "lucide-react";

interface ShadcnLeadListProps {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  openEditModal: (lead: Lead) => void;
  openRemoveModal: (lead: Lead) => void;
}

export default function ShadcnLeadList({
  leads,
  loading,
  error,
  openEditModal,
  openRemoveModal,
}: ShadcnLeadListProps) {
  const skeletonCount = 6;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <LeadCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!leads.length) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Nenhum Lead Encontrado</AlertTitle>
        <AlertDescription>
          Ainda não há leads cadastrados. Adicione um novo lead para começar.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {leads.map((lead) => (
        <ShadcnLeadCard
          key={lead._id ?? Math.random().toString()}
          lead={lead}
          onEdit={() => openEditModal(lead)}
          onRemove={() => openRemoveModal(lead)}
        />
      ))}
    </div>
  );
}
