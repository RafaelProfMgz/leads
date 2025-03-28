import React from "react";
import { useLogout } from "../../utils/logout";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen }) => {
  // Obtendo os dados do usuário corretamente
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.name || "Usuário Anônimo";

  const logout = useLogout(); // Pega a função de logout

  if (!isOpen) return null;

  return (
    <div
      id="profile-modal"
      className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-4 py-2 text-sm text-gray-700">
        <p>{userName}</p>
      </div>
      <button
        onClick={logout} // Chama a função de logout ao clicar
        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 rounded-lg"
      >
        Deslogar
      </button>
    </div>
  );
};

export default ProfileModal;
