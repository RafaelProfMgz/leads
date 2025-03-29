import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "../ui/spinner";

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
}

export default function LoadingModal({
  isOpen,
  message = "Carregando...",
}: LoadingModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px] flex items-center justify-center space-x-4">
        <Spinner className="h-8 w-8" />
        <DialogTitle>{message}</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
