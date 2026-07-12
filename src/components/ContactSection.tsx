import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Instagram, Mail, Calendar } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const ContactSection = () => {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contacts = [
    {
      icon: MessageCircle,
      label: t("contact.whatsapp.label"),
      desc: t("contact.whatsapp.desc"),
      href: "https://wa.me/5511912493697?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Henrik%20Visual%2C%20gostaria%20de%20fazer%20um%20or%C3%A7amento.",
      cta: t("contact.whatsapp.cta"),
    },
    {
      icon: Instagram,
      label: t("contact.instagram.label"),
      desc: t("contact.instagram.desc"),
      href: "https://www.instagram.com/henrik_visual/",
      cta: t("contact.instagram.cta"),
    },
    {
      icon: Mail,
      label: t("contact.email.label"),
      desc: t("contact.email.desc"),
      href: "mailto:henrikv.contact@gmail.com",
      cta: t("contact.email.cta"),
    },
    {
      icon: Calendar,
      label: t("contact.calendar.label"),
      desc: t("contact.calendar.desc"),
      href: "https://cal.com/henrikvisual",
      cta: t("contact.calendar.cta"),
    },
  ];

  return (
    <section id="contato" className="py-8 md:py-10 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-3">
            {t("contact.kicker")}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            {t("contact.title.a")}{" "}
            <span className="text-gradient">{t("contact.title.highlight")}</span>{" "}
            {t("contact.title.b")}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glass rounded-2xl p-6 text-center group hover:shadow-glow transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <contact.icon className="text-primary-foreground" size={22} />
              </div>
              <h3 className="font-heading font-semibold text-sm mb-1">
                {contact.label}
              </h3>
              <p className="text-muted-foreground text-xs mb-4">{contact.desc}</p>
              <span className="text-primary text-xs font-semibold">
                {contact.cta} →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
