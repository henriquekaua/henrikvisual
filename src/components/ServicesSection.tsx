import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Film, Wand2, Palette, Code2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const ServicesSection = () => {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Film,
      title: t("services.video.title"),
      items: [
        t("services.video.i1"),
        t("services.video.i2"),
        t("services.video.i3"),
        t("services.video.i4"),
      ],
    },
    {
      icon: Wand2,
      title: t("services.motion.title"),
      items: [
        t("services.motion.i1"),
        t("services.motion.i2"),
        t("services.motion.i3"),
        t("services.motion.i4"),
        t("services.motion.i5"),
      ],
    },
    {
      icon: Palette,
      title: t("services.design.title"),
      items: [
        t("services.design.i1"),
        t("services.design.i2"),
        t("services.design.i3"),
        t("services.design.i4"),
      ],
    },
    {
      icon: Code2,
      title: t("services.web.title"),
      items: [
        t("services.web.i1"),
        t("services.web.i2"),
        t("services.web.i3"),
      ],
    },
  ];

  return (
    <section id="servicos" className="py-8 md:py-10 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-3">
            {t("services.kicker")}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            {t("services.title.a")} <span className="text-gradient">{t("services.title.highlight")}</span> {t("services.title.b")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="glass rounded-2xl p-8 group hover:shadow-glow transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="text-primary-foreground" size={24} />
              </div>
              <h3 className="font-heading text-xl font-bold mb-4">
                {service.title}
              </h3>
              <ul className="space-y-3">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground text-sm flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
