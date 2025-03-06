import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AxiosError } from "axios";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        alert("Cadastro realizado com sucesso!");
        navigate("/");
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          setError("Este e-mail já está cadastrado.");
        } else {
          setError("Ocorreu um erro. Tente novamente.");
        }
      } else {
        setError("Erro desconhecido.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Cadastro</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Nome"
          className="w-full p-2 mb-4 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Cadastrar
        </button>
        <p className="text-center text-sm mt-4">
          Já tem uma conta?
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Faça login
          </span>
        </p>
      </form>
    </div>
  );
}
