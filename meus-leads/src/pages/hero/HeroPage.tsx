import { Button } from "../../components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Transforme Visitantes em Clientes com Nossos Leads Qualificados
        </h1>
        <p className="text-gray-700 mb-8">
          Nossa plataforma SaaS ajuda você a gerar leads de alta qualidade,
          automatizar seu marketing e aumentar suas vendas.
        </p>
        <Button variant="default" size="lg">
          Começar Agora
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
