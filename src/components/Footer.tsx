import { Mail, MessageCircle, Instagram } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const contacts = [
  {
    icon: Mail,
    label: "E-mail",
    href: "mailto:henrikv.contact@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/5511912493697?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Henrik%20Visual%2C%20gostaria%20de%20fazer%20um%20or%C3%A7amento.",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/henrik_visual/",
  },
];

const Footer = () => {
  const { t } = useI18n();

  const navLinks = [
    { label: t("nav.home"), href: "#hero" },
    { label: t("nav.about"), href: "#sobre" },
    { label: t("nav.portfolio"), href: "#portfolio" },
    { label: t("nav.contact"), href: "#contato" },
  ];

  const services = [
    t("services.video.title"),
    t("services.motion.title"),
    t("services.design.title"),
    t("services.web.title"),
  ];

  return (
    <footer className="relative pt-8 pb-5 md:pt-16 md:pb-8 border-t border-border/40">
      <div className="hairline absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-6 md:gap-10 lg:gap-14">
          <div className="col-span-2 lg:col-span-1 max-w-sm">
            <h3 className="font-heading text-sm md:text-lg font-bold mb-2 md:mb-4">
              Henrik <span className="text-gradient">Visual</span>
            </h3>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed md:leading-[1.75]">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <p className="font-heading font-semibold text-xs md:text-sm tracking-[0.2em] uppercase mb-3 md:mb-4 text-foreground/90">
              {t("footer.nav")}
            </p>
            <ul className="space-y-2 md:space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground text-xs md:text-sm hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading font-semibold text-xs md:text-sm tracking-[0.2em] uppercase mb-3 md:mb-4 text-foreground/90">
              {t("footer.services")}
            </p>
            <ul className="space-y-2 md:space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-muted-foreground text-xs md:text-sm"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading font-semibold text-xs md:text-sm tracking-[0.2em] uppercase mb-3 md:mb-4 text-foreground/90">
              {t("footer.contact")}
            </p>
            <ul className="space-y-2 md:space-y-3">
              {contacts.map((contact) => (
                <li key={contact.label}>
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-muted-foreground text-xs md:text-sm hover:text-primary transition-colors duration-300"
                  >
                    <contact.icon size={15} />
                    {contact.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline mt-6 md:mt-12 mb-4 md:mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p className="text-muted-foreground/80 text-[11px] md:text-xs">
            © {new Date().getFullYear()} Henrik Visual. {t("footer.rights")}
          </p>
          <a
            href="#hero"
            className="group text-muted-foreground/80 text-[11px] md:text-xs tracking-wider transition-all duration-300 hover:text-primary"
          >
            {t("footer.by")}{" "}
            <span className="border-b border-transparent group-hover:border-primary/60 transition-colors duration-300">
              Henrik Visual
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
