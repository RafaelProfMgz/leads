import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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

  const shapeVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.1, 0.15, 0.1],
      rotate: [0, 10, -5, 0],
      transition: {
        duration: 15,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror" as const,
      },
    },
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-slate-900 dark:via-purple-950 dark:to-indigo-950 overflow-hidden p-4">
      <motion.div
        className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full filter blur-3xl opacity-30"
        variants={shapeVariants}
        initial="initial"
        animate="animate"
        style={{ mixBlendMode: "multiply" }}
      />

      <motion.div
        className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-pink-300 dark:bg-pink-700 rounded-full filter blur-3xl opacity-30"
        variants={shapeVariants}
        initial="initial"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
          rotate: [0, 10, -5, 0],
          transition: {
            duration: 20,
            delay: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror" as const,
          },
        }}
        style={{ mixBlendMode: "multiply" }}
      />

      <motion.div
        className="container mx-auto px-4 text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-gray-100"
          variants={itemVariants}
        >
          Bem-vindo ao <span className="text-primary">LEADVITRUS</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
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
