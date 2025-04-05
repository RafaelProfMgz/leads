import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import StarrySkyBackground from "@/components/starry-sky-background"; // 1. Importe o novo componente

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // As formas de fundo originais (blur) podem ser removidas ou mantidas
  // Se mantidas, podem precisar de ajuste de cor/opacidade para o céu noturno
  /*
  const shapeVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.1, 0.15, 0.1], // Talvez ajustar opacidade
      rotate: [0, 10, -5, 0],
      transition: {
        duration: 15,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror" as const,
      },
    },
  };
  */

  return (
    // 2. Atualize o background da section para um céu noturno
    //    Remova o gradiente claro e use um escuro. Remova as classes dark: pois agora será sempre escuro.
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-indigo-950 to-slate-900 overflow-hidden p-4">
      {/* 3. Adicione o componente de fundo estrelado */}
      <StarrySkyBackground numStars={200} numShootingStars={10} />

      {/* Formas de fundo opcionais - remova ou ajuste cores/opacidade */}
      {/*
      <motion.div
        className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-purple-700 rounded-full filter blur-3xl opacity-20" // Cor/opacidade ajustada
        variants={shapeVariants}
        initial="initial"
        animate="animate"
        // style={{ mixBlendMode: "multiply" }} // mixBlendMode pode não funcionar bem em fundo escuro
      />

      <motion.div
        className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-pink-700 rounded-full filter blur-3xl opacity-20" // Cor/opacidade ajustada
        variants={shapeVariants}
        initial="initial"
        animate={{
          ...shapeVariants.animate,
           transition: {
            ...shapeVariants.animate.transition,
            duration: 20, // Mantém a transição customizada
            delay: 2,
          },
        }}
       // style={{ mixBlendMode: "multiply" }}
      />
      */}

      {/* Conteúdo principal - Certifique-se que tem z-index maior (z-10 já está ok) */}
      <motion.div
        className="container mx-auto px-4 text-center z-10" // z-10 garante que fique sobre o fundo
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          // 4. Ajuste a cor do texto para contrastar com o fundo escuro
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-100" // Mudou para text-gray-100
          variants={itemVariants}
        >
          Bem-vindo ao <span className="text-primary">LEADVITRUS</span>
        </motion.h1>

        <motion.p
          // 4. Ajuste a cor do texto para contrastar com o fundo escuro
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto" // Mudou para text-gray-300
          variants={itemVariants}
        >
          Gerencie seus leads de forma eficiente, visualize dados importantes e
          impulsione suas vendas. Tudo em um só lugar.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Button size="lg" asChild>
            <Link to="/dashboard">
              Acessar Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
