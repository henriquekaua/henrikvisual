import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import BrandsSection from "@/components/BrandsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-banner-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Henrik Visual" },
      { name: "description", content: "Crio vídeos impactantes, animações envolventes e designs que conectam sua marca ao público certo." },
      { property: "og:title", content: "Henrik Visual" },
      { property: "og:description", content: "Transformando ideias em experiências visuais inesquecíveis." },
    ],
    links: [
      { rel: "preload", as: "image", href: heroBg, fetchpriority: "high" } as unknown as { rel: string; href: string },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <BrandsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
