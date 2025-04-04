import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheck, AlertCircle, Loader2 } from "lucide-react";

const sendPasswordResetEmail = async (
  email: string,
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (email === "error@example.com") {
    return {
      success: false,
      message:
        "Falha ao enviar e-mail de redefinição. Tente novamente mais tarde.",
    };
  }
  if (!email.includes("@")) {
    return {
      success: false,
      message: "Por favor, insira um endereço de e-mail válido.",
    };
  }
  return {
    success: true,
    message:
      "Se existir uma conta para este e-mail, um link de redefinição de senha foi enviado.",
  };
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await sendPasswordResetEmail(email);
      if (result.success) {
        setSuccessMessage(result.message);
        setEmail("");
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Erro de redefinição de senha:", err);
      setError("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const alertVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Esqueceu sua senha?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence>
                {error && (
                  <motion.div
                    key="error-alert"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={alertVariants}
                  >
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {successMessage && (
                  <motion.div
                    key="success-alert"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={alertVariants}
                  >
                    <Alert
                      variant="default"
                      className="bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-300"
                    >
                      <MailCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <AlertTitle className="text-green-700 dark:text-green-200">
                        Success
                      </AlertTitle>
                      <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading || !!successMessage}
                  className={
                    error
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !!successMessage}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Enviar link de redefinição"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="link" asChild disabled={isLoading}>
              <Link to="/login">Voltar ao login</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
