import { useLogout } from "../../utils/logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.name || "Usuário Anônimo";
  const userEmail = user.email || "email@exemplo.com";
  const userPhoto = user.photoURL || "";
  const logout = useLogout();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Perfil</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={userPhoto} alt={userName} />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{userName}</p>
              <p className="text-sm text-muted-foreground">{userEmail}</p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() =>
              alert("Redirecionar para a página de edição de perfil")
            }
          >
            Editar Perfil
          </Button>
        </div>

        <div className="mt-6">
          <Button variant="destructive" onClick={logout} className="w-full">
            Deslogar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
