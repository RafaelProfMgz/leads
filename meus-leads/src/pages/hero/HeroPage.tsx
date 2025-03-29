import { Button } from "../../components/ui/button";
import { Rocket } from "lucide-react"; // Importe o ícone do foguete

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-100 to-purple-100 py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[url('/bg-pattern.svg')] bg-center opacity-10"
        style={{ zIndex: 0 }}
      />

      <div
        className="container mx-auto text-center relative"
        style={{ zIndex: 1 }}
      >
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
          <span className="text-blue-600">Leads Qualificados</span> para
          Impulsionar Seu Negócio
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          Descubra como nossa plataforma SaaS pode revolucionar a forma como
          você gera leads, automatiza seu marketing e conquista novos clientes.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="default" size="lg">
            Começar Agora <Rocket className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg">
            Saiba Mais
          </Button>
        </div>

        {/* Hero Image (Mockup) */}
        <div className="mt-12">
          <img
            src="/hero-mockup.png"
            alt="Mockup da Plataforma"
            className="mx-auto max-w-lg rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
