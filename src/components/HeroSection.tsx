import { motion } from "framer-motion";
import { Play, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-banner-2.jpg";
import { useI18n } from "@/lib/i18n";

const HeroSection = () => {
  const { t } = useI18n();
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-background/60" />

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow animate-pulse" />
            <p className="whitespace-nowrap text-primary font-heading font-semibold text-[10px] sm:text-[11px] md:text-xs tracking-[0.2em] md:tracking-[0.28em] uppercase">
              {t("hero.badge")}
            </p>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8"
        >
          {t("hero.title.a")}{" "}
          <span className="text-gradient">{t("hero.title.highlight")}</span>{" "}
          {t("hero.title.b")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#portfolio"
            className="group inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-heading font-semibold text-base md:text-lg shadow-glow hover:shadow-[0_0_50px_-5px_hsl(271_65%_60%/0.8)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <Play size={18} className="group-hover:scale-110 transition-transform" />
            {t("hero.cta.portfolio")}
          </a>
          <a
            href="#contato"
            className="inline-flex items-center justify-center gap-2 glass text-foreground px-8 py-4 rounded-xl font-heading font-semibold text-base md:text-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <MessageCircle size={18} />
            {t("hero.cta.contact")}
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
