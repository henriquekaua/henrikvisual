import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import suprija from "@/assets/brands/suprija.png";
import zafenate from "@/assets/brands/zafenate.png";
import nombrare from "@/assets/brands/nombrare.png";
import panini from "@/assets/brands/panini.png";
import strongbody from "@/assets/brands/strongbody.png";
import hokoriSushi from "@/assets/brands/hokori-sushi.png";
import ace from "@/assets/brands/ace.png";
import buffSmurfs from "@/assets/brands/buff-smurfs.png";
import remessaOnline from "@/assets/brands/remessa-online.png";

const logos = [
  { id: 1, name: "SupriJá", src: suprija },
  { id: 2, name: "Zafenate", src: zafenate },
  { id: 3, name: "Nombrare", src: nombrare },
  { id: 4, name: "Panini", src: panini },
  { id: 5, name: "Strong Body\nSupplements", src: strongbody },
  { id: 9, name: "Remessa Online", src: remessaOnline },
  { id: 6, name: "Hokori Sushi", src: hokoriSushi },
  { id: 7, name: "Ace", src: ace },
  { id: 8, name: "Buff Smurfs", src: buffSmurfs },
];

const LogoCard = ({ logo }: { logo: (typeof logos)[number] }) => (
  <div className="flex-shrink-0 mx-3 md:mx-6">
    <div className="glass w-24 h-24 md:w-36 md:h-36 rounded-2xl flex items-center justify-center transition-all duration-300 hover:shadow-glow hover:scale-105 p-4">
      <img
        src={logo.src}
        alt={logo.name}
        className="max-w-full max-h-full object-contain"
        loading="lazy"
      />
    </div>
    <p className="text-center mt-3 text-[9px] sm:text-sm font-medium text-foreground/80">
      {logo.name.split("\n").map((part, i) => (
        <span key={i}>
          {part}
          {i < logo.name.split("\n").length - 1 && <br />}
        </span>
      ))}
    </p>
  </div>
);

const BrandsSection = () => {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="marcas" className="py-8 md:py-10 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-3">
            {t("brands.kicker")}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            {t("brands.title.a")}{" "}
            <span className="text-gradient">{t("brands.title.highlight")}</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee container */}
      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="flex w-max animate-marquee [animation-duration:20s] md:[animation-duration:30s] will-change-transform">
          <div className="flex shrink-0">
            {logos.map((logo) => (
              <LogoCard key={`a-${logo.id}`} logo={logo} />
            ))}
          </div>
          <div className="flex shrink-0" aria-hidden="true">
            {logos.map((logo) => (
              <LogoCard key={`b-${logo.id}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
