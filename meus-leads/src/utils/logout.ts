// utils/logout.ts
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate(); // Agora usamos useNavigate

  const logout = () => {
    // Remove todos os itens do localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    // Redireciona o usuário para a página inicial ou de login
    navigate("/"); // Navega para a página principal
  };

  return logout;
};
