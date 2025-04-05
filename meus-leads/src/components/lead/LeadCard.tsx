// src/components/lead/ShadcnLeadCard.tsx (novo nome ou substitua o antigo)
import { Lead } from "../../types/Leads";
import { Button } from "@/components/ui/button"; // Shadcn Button
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Shadcn Card
import { Pencil, Trash2 } from "lucide-react"; // Lucide Icons

interface ShadcnLeadCardProps {
  lead: Lead;
  onEdit: () => void;
  onRemove: () => void;
}

export default function ShadcnLeadCard({
  lead,
  onEdit,
  onRemove,
}: ShadcnLeadCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{lead.name}</CardTitle>
        <CardDescription>{lead.email}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {lead.phone && (
          <p className="text-sm text-muted-foreground">
            Telefone: {lead.phone}
          </p>
        )}
        {lead.message && (
          <p className="text-sm text-muted-foreground">
            Mensagem: {lead.message}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {/* Botão Editar */}
        <Button variant="ghost" size="icon" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Editar</span> {/* Para acessibilidade */}
        </Button>

        {/* Botão Remover */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-destructive hover:text-destructive/90"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remover</span> {/* Para acessibilidade */}
        </Button>
      </CardFooter>
    </Card>
  );
}
