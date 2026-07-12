import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import hokori1 from "@/assets/hokori/hokori1.jpg";
import hokori2 from "@/assets/hokori/hokori2.jpg";
import hokori3 from "@/assets/hokori/hokori3.jpg";
import hokori4 from "@/assets/hokori/hokori4.jpg";
import hokori5 from "@/assets/hokori/hokori5.jpg";
import hokori6 from "@/assets/hokori/hokori6.jpg";
import buff1 from "@/assets/buff/buff1.jpg";
import buff2 from "@/assets/buff/buff2.jpg";
import buff3 from "@/assets/buff/buff3.jpg";
import buff4 from "@/assets/buff/buff4.jpg";
import buff5 from "@/assets/buff/buff5.jpg";
import buff6 from "@/assets/buff/buff6.jpg";
import buff7 from "@/assets/buff/buff7.jpg";
import buff8 from "@/assets/buff/buff8.png";
import pgEuropeu from "@/assets/pg-imports/europeu.jpg";
import pgBanner1 from "@/assets/pg-imports/banner1.jpg";
import pgBanner2 from "@/assets/pg-imports/banner2.jpg";
import pgRetro from "@/assets/pg-imports/retro.jpg";
import pgBrasileiros from "@/assets/pg-imports/brasileiros.jpg";
import thumbLolEdit from "@/assets/thumbnails/lol-edit1.jpg";
import thumbTipoLua from "@/assets/thumbnails/tipo-lua.jpg";
import thumbYasuo from "@/assets/thumbnails/thumb-yasuo.jpg";
import thumbSrnick from "@/assets/thumbnails/srnick-egirl.jpg";
import thumb5x5 from "@/assets/thumbnails/thumb-5x5.jpg";
import thumbYasuoLovers from "@/assets/thumbnails/yasuo-lovers.jpg";

type Client = {
  name: string;
  tagline: string;
  description: string;
  images: { url: string; alt: string; orientation: "square" | "portrait" | "landscape"; desktopOrder?: number }[];
};

const clients: Record<string, Client> = {
  "hokori-sushi": {
    name: "Hokori Sushi",
    tagline: "Identidade visual & social media",
    description:
      "Artes para feed e stories do Instagram com foco em delivery, promoções sazonais e divulgação do cardápio.",
    images: [
      { url: hokori1, alt: "Melhor sushi de Salto", orientation: "square", desktopOrder: 1 },
      { url: hokori2, alt: "Faça seu pedido agora", orientation: "square", desktopOrder: 2 },
      { url: hokori3, alt: "Delivery de sushi", orientation: "square", desktopOrder: 3 },
      { url: hokori4, alt: "Horário de funcionamento Natal", orientation: "portrait", desktopOrder: 4 },
      { url: hokori5, alt: "Promoções de Natal Especial Supreme", orientation: "portrait", desktopOrder: 5 },
      { url: hokori6, alt: "Promoções de Natal Mega Salmão", orientation: "portrait", desktopOrder: 6 },
    ],
  },
  "buff-smurfs": {
    name: "Buff Smurfs",
    tagline: "Social media & criativos para ads",
    description:
      "Artes para feed e stories do Instagram com foco em tabelas de preços, históricos de partidas, serviços concluídos e destaques da marca.",
    images: [
      { url: buff1, alt: "Tabela de preços DuoBoost", orientation: "portrait", desktopOrder: 1 },
      { url: buff2, alt: "Tabela de preços EloBoost", orientation: "landscape", desktopOrder: 4 },
      { url: buff3, alt: "Confira nossos históricos", orientation: "portrait", desktopOrder: 2 },
      { url: buff4, alt: "Serviços concluídos", orientation: "portrait", desktopOrder: 3 },
      { url: buff5, alt: "Destaque — Coaching", orientation: "square", desktopOrder: 5 },
      { url: buff6, alt: "Destaque — Discord", orientation: "square", desktopOrder: 6 },
      { url: buff7, alt: "Streamer parceiro — Varas LoL", orientation: "square", desktopOrder: 7 },
      { url: buff8, alt: "Painel de patrocínio — Varaslol", orientation: "portrait", desktopOrder: 8 },
    ],
  },
  "pg-imports": {
    name: "PG Imports",
    tagline: "Social media & banners para e-commerce",
    description:
      "Artes para categorias, banners promocionais e institucionais da loja de camisas de futebol PG Imports.",
    images: [
      { url: pgBanner1, alt: "Compre 2, Leve 3 — Banner promocional", orientation: "landscape", desktopOrder: 1 },
      { url: pgEuropeu, alt: "Categoria — Europeus", orientation: "portrait", desktopOrder: 2 },
      { url: pgRetro, alt: "Categoria — Retrô", orientation: "portrait", desktopOrder: 3 },
      { url: pgBrasileiros, alt: "Categoria — Brasileiros", orientation: "portrait", desktopOrder: 4 },
      { url: pgBanner2, alt: "Frete grátis para todo o Brasil", orientation: "landscape", desktopOrder: 5 },
    ],
  },
  "thumbnails": {
    name: "Thumbnails",
    tagline: "Thumbnails para YouTube",
    description:
      "Coleção de thumbnails criadas para vídeos de YouTube, com foco em impacto visual, tipografia forte e composições que aumentam a taxa de cliques.",
    images: [
      { url: thumbLolEdit, alt: "LOL Edit", orientation: "landscape" },
      { url: thumbTipoLua, alt: "Tipo Lua", orientation: "landscape" },
      { url: thumbYasuo, alt: "Yasuo", orientation: "landscape" },
      { url: thumbSrnick, alt: "Srnick Egirl", orientation: "landscape" },
      { url: thumb5x5, alt: "5x5", orientation: "landscape" },
      { url: thumbYasuoLovers, alt: "Yasuo Lovers", orientation: "landscape" },
    ],
  },
};


const desktopGalleryWidth = {
  square: "lg:w-[330px]",
  portrait: "lg:w-[300px]",
  landscape: "lg:w-[396px]",
} satisfies Record<Client["images"][number]["orientation"], string>;

export const Route = createFileRoute("/clientes/$slug")({
  component: ClientPage,
  head: ({ params }) => {
    const c = clients[params.slug];
    const title = c ? `${c.name} — Portfólio` : "Cliente — Portfólio";
    return {
      meta: [
        { title },
        { name: "description", content: c?.description ?? "Trabalhos realizados para clientes." },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Cliente não encontrado.</p>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Algo deu errado: {error.message}</p>
        <button
          onClick={() => {
            reset();
            router.invalidate();
          }}
          className="px-4 py-2 rounded-full glass"
        >
          Tentar novamente
        </button>
      </div>
    );
  },
});

function ClientPage() {
  const { slug } = Route.useParams();
  const client = clients[slug];
  const [lightbox, setLightbox] = useState<string | null>(null);
  const galleryImages = [...(client?.images ?? [])].sort(
    (a, b) => (a.desktopOrder ?? 0) - (b.desktopOrder ?? 0),
  );

  if (!client) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Cliente não encontrado.</p>
        <Link to="/" className="px-4 py-2 rounded-full glass">Voltar</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <Link
          to="/"
          hash="portfolio"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Voltar ao portfólio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-primary font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-3">
            {client.tagline}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            {client.name}
          </h1>
          <p className="text-muted-foreground max-w-2xl">{client.description}</p>
        </motion.div>

        {slug === "pg-imports" ? (
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,0.42fr)] lg:grid-rows-[auto_auto] lg:items-stretch">
            {[pgBanner1, pgBanner2].map((img, index) => (
              <button
                key={img.url}
                onClick={() => setLightbox(img.url)}
                className={`group relative block w-full overflow-hidden rounded-2xl border border-border/40 bg-muted/20 shadow-card transition-transform duration-500 hover:-translate-y-1 ${index === 0 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-1 lg:row-start-2"}`}
              >
                <img src={img.url} alt="" loading="lazy" className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]" />
              </button>
            ))}
            <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-3 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-full lg:min-h-0 lg:grid-cols-1 lg:grid-rows-3 lg:overflow-hidden lg:[contain:size]">
              {[pgEuropeu, pgRetro, pgBrasileiros].map((img) => (
                <button
                  key={img.url}
                  onClick={() => setLightbox(img.url)}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-border/40 bg-muted/20 shadow-card transition-transform duration-500 hover:-translate-y-1 lg:h-full lg:min-h-0"
                >
                  <img src={img.url} alt="" loading="lazy" className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.03] lg:h-full lg:object-cover" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div
            className={`grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${slug === "hokori-sushi" ? "" : "2xl:grid-cols-4"} gap-4 md:gap-6 [grid-auto-flow:dense]`}
            style={{ gridAutoRows: "8px" }}
          >
            {galleryImages.map((img, i) => (
              <MasonryItem
                key={img.url}
                img={img}
                index={i}
                onOpen={() => setLightbox(img.url)}
              />
            ))}
          </div>
        )}



      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Fechar"
              className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center"
            >
              <X size={18} />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={lightbox}
              alt=""
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-card"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function MasonryItem({
  img,
  index,
  onOpen,
}: {
  img: Client["images"][number];
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [span, setSpan] = useState(30);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const compute = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const styles = getComputedStyle(parent);
      const rowUnit = parseFloat(styles.gridAutoRows) || 8;
      const gap = parseFloat(styles.rowGap) || 0;
      const h = el.getBoundingClientRect().height;
      const s = Math.max(1, Math.ceil((h + gap) / (rowUnit + gap)));
      setSpan(s);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    const imgs = el.querySelectorAll("img");
    imgs.forEach((im) => {
      if (!(im as HTMLImageElement).complete) im.addEventListener("load", compute);
    });
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
      imgs.forEach((im) => im.removeEventListener("load", compute));
    };
  }, []);

  const colSpan = img.orientation === "landscape" ? "sm:col-span-2" : "";

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onClick={onOpen}
      style={{ gridRowEnd: `span ${span}` }}
      className={`group relative block w-full self-start overflow-hidden rounded-2xl border border-border/40 bg-muted/20 shadow-card transition-transform duration-500 hover:-translate-y-1 ${colSpan}`}
    >
      <img
        src={img.url}
        alt={img.alt}
        loading="lazy"
        className="w-full h-auto block group-hover:scale-[1.03] transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
}
