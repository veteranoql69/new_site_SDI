import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center sm:p-20 relative overflow-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-secondary/20 blur-[100px] rounded-full pointer-events-none" />

      <Hero />

      <SolutionsSection />

      <Footer />
    </div>
  );
}
