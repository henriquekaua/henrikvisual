import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, Eye, Target, Zap } from "lucide-react";
import profileAsset from "@/assets/profile-new.png";
import { useI18n } from "@/lib/i18n";

const AboutSection = () => {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState(false);

  const highlights = [
    { icon: Sparkles, label: t("about.h1.label"), desc: t("about.h1.desc") },
    { icon: Eye, label: t("about.h2.label"), desc: t("about.h2.desc") },
    { icon: Target, label: t("about.h3.label"), desc: t("about.h3.desc") },
    { icon: Zap, label: t("about.h4.label"), desc: t("about.h4.desc") },
  ];

  return (
    <section id="sobre" className="py-8 md:py-10 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-[4.7rem] items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex justify-center lg:justify-end"
          >
            <div
              className="relative w-[220px] h-[220px] md:w-[280px] md:h-[280px] flex items-center justify-center cursor-pointer"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <span className="absolute inset-0 rounded-full border border-primary pointer-events-none [animation:sonar-pulse_3.5s_ease-out_infinite] will-change-transform" />
              <span className="absolute inset-0 rounded-full border border-primary pointer-events-none [animation:sonar-pulse_3.5s_ease-out_infinite] [animation-delay:1.2s] will-change-transform" />
              <span className="absolute inset-0 rounded-full border border-primary pointer-events-none [animation:sonar-pulse_3.5s_ease-out_infinite] [animation-delay:2.4s] will-change-transform" />

              <div className="relative w-full h-full rounded-full overflow-hidden border border-border/50">
                <img
                  src={profileAsset}
                  alt="Profile"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-all duration-500"
                  style={{
                    filter: hovered ? "grayscale(0%)" : "grayscale(60%)",
                    transform: hovered ? "scale(1.3)" : "scale(1)",
                  }}
                />
              </div>

              <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl -z-10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-primary font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-3">
              {t("about.kicker")}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              {t("about.title.a")}{" "}
              <span className="text-gradient">{t("about.title.highlight")}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t("about.desc")}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="glass rounded-xl p-5 hover:shadow-glow transition-shadow duration-300"
                >
                  <item.icon className="text-primary mb-2" size={24} />
                  <h3 className="font-heading font-semibold text-sm mb-1">
                    {item.label}
                  </h3>
                  <p className="text-muted-foreground text-xs">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
