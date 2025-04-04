import { Button } from "../../components/ui/button";

export default function Home() {
  return (
    <section className="bg-gradient-to-br from-blue-100 to-purple-100 py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Welcome to My Website</h1>
        <p className="text-lg mb-8">
          This is a sample website built with Next.js and Tailwind CSS.
        </p>
        <Button>Get Started</Button>
      </div>
    </section>
  );
}
