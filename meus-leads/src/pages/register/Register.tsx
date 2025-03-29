import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AxiosError } from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success("Cadastro realizado com sucesso!", {
          autoClose: 2000,
        });
        navigate("/");
      }
    } catch (err: unknown) {
      let errorMessage = "Ocorreu um erro. Tente novamente.";
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          errorMessage = "Este e-mail já está cadastrado.";
        } else {
          errorMessage = "Ocorreu um erro. Tente novamente.";
        }
      } else {
        errorMessage = "Erro desconhecido.";
      }
      setError(errorMessage);
      toast.error(errorMessage, {
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Criar uma conta</CardTitle>
          <CardDescription>
            Insira suas informações para criar uma conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Seu nome completo"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="seuemail@exemplo.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                placeholder="********"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button disabled={isSubmitting} type="submit" className="w-full">
              Cadastrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?
            <Button
              variant="link"
              className="p-0 font-normal"
              onClick={() => navigate("/")}
            >
              Faça login
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
