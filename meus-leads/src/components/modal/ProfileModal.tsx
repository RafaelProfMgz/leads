import React, { useState } from "react"; // Importe useState
import { useLogout } from "../../utils/logout";

interface ProfileModalProps {
  isOpen: boolean;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.name || "Usuário Anônimo";
  const userEmail = user.email || "email@exemplo.com";
  const userPhoto = user.photoURL || "URL_PARA_FOTO_PADRAO";
  const logout = useLogout();
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!isOpen) return null;

  return (
    <div
      id="profile-modal"
      className={`absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 ${theme === "dark" ? "text-white" : "text-gray-700"}`} // Adicionando tema
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-center py-3">
        <img
          src={userPhoto}
          alt="Foto de Perfil"
          className="rounded-full h-16 w-16 object-cover"
        />
      </div>
      <div className="px-4 py-2">
        <p className="font-semibold">{userName}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{userEmail}</p>
      </div>

      <hr className="border-gray-200 dark:border-gray-700 my-2" />

      <button
        className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
        onClick={() => {
          alert("Redirecionar para a página de edição de perfil");
        }}
      >
        Editar Perfil
      </button>
      <button
        className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
        onClick={toggleTheme}
      >
        Mudar Tema para {theme === "light" ? "Escuro" : "Claro"}
      </button>

      <button
        onClick={logout}
        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
      >
        Deslogar
      </button>
    </div>
  );
};

export default ProfileModal;
