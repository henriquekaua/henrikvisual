import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Check, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import danmorganDesktop from "@/assets/web/danmorgan-desktop.png";
import motion1 from "@/assets/motion1.mp4";
import motion2 from "@/assets/motion2.mp4";
import motion3 from "@/assets/motion3.mp4";
import motion4 from "@/assets/motion4.mp4";
import motion5 from "@/assets/motion5.mp4";
import motion6New from "@/assets/motion6_new.mp4";
import motion6Old from "@/assets/motion6.mp4";
import motion7 from "@/assets/motion7.mp4";
import video1 from "@/assets/video1.mp4";
import video2 from "@/assets/video2.mp4";
import video3 from "@/assets/video3.mp4";
import video4 from "@/assets/video4.mp4";
import acePilula2 from "@/assets/ace-pilula-2-story.mp4";
import rubinho from "@/assets/rubinho.webm";
import hokori1 from "@/assets/hokori/hokori1.jpg";
import buff1 from "@/assets/buff/buff1.jpg";
import pgEuropeu from "@/assets/pg-imports/europeu.jpg";
import thumbYasuo from "@/assets/thumbnails/thumb-yasuo.jpg";

type Category = "video" | "motion" | "design" | "web";

const categoryKeys: Category[] = ["motion", "video", "design", "web"];

type Item = { id: number; title: string; thumbnail: string; type: "video" | "image"; videoUrl?: string; clientSlug?: string; subtitle?: string; description?: string };


const portfolioItems: Record<Category, Item[]> = {
  video: [
    { id: 1, title: "Álbum Copa do Mundo 2026", subtitle: "Para Panini", description: "Vídeo promocional do álbum de figurinhas da Copa do Mundo FIFA 2026.", thumbnail: video1.url, type: "video", videoUrl: video1.url },
    { id: 22, title: "Dicas para Morar no Exterior", subtitle: "Para Remessa Online", description: "Rubinho Barrichello, em parceria com a Remessa Online, dá dicas para quem deseja morar fora do país.", thumbnail: rubinho.url, type: "video", videoUrl: rubinho.url },
    { id: 21, title: "Lançamento Ace", subtitle: "Para Ace", description: "Campanha de lançamento de roupas fitness, com cenas em movimento reforçando o estilo da marca.", thumbnail: acePilula2.url, type: "video", videoUrl: acePilula2.url },
    { id: 2, title: "Um Lar Para Chamar de Seu", subtitle: "Para Antares Imóveis", description: "Produção autoral simulando a divulgação de um imóvel, como exercício de estudo.", thumbnail: video2.url, type: "video", videoUrl: video2.url },
    { id: 3, title: "Trend Copa do Mundo 2026", subtitle: "Para Panini", description: "Cobertura de uma trend viral em torno da Copa do Mundo 2026.", thumbnail: video3.url, type: "video", videoUrl: video3.url },
    { id: 4, title: "Black November", subtitle: "Para Strong Body", description: "Campanha promocional da Black November 2025 da Strong Body.", thumbnail: video4.url, type: "video", videoUrl: video4.url },
  ],
  motion: [
    { id: 7, title: "Electric Wave", subtitle: "Para Strong Body", description: "Vídeo de lançamento do pré-treino Electric Wave.", thumbnail: motion1.url, type: "video", videoUrl: motion1.url },
    { id: 8, title: "Próximos Shows", subtitle: "Para Natanzinho Lima", description: "Divulgação da agenda de próximos shows do Natanzinho Lima.", thumbnail: motion2.url, type: "video", videoUrl: motion2.url },
    { id: 9, title: "Uso da Creatina", subtitle: "Para Strong Body", description: "Conteúdo educativo sobre o uso correto da creatina.", thumbnail: motion3.url, type: "video", videoUrl: motion3.url },
    { id: 10, title: "Dia Mundial do Livro", subtitle: "Para Panini", description: "Peça comemorativa em celebração ao Dia Mundial do Livro.", thumbnail: motion4.url, type: "video", videoUrl: motion4.url },
    { id: 11, title: "Direção de Arte, Além da Estética", subtitle: "Para Zafenate Design", description: "Explicando o real papel da direção de arte na construção de marcas.", thumbnail: motion5.url, type: "video", videoUrl: motion5.url },
    { id: 12, title: "20 Minutos é o Tempo Necessário", subtitle: "Para Nombrare", description: "Divulgação dos serviços de registro de marca.", thumbnail: motion6New.url, type: "video", videoUrl: motion6New.url },
    { id: 19, title: "Um Pouco Sobre Neymar Jr.", subtitle: "Para Henrik Visual", description: "Um recorte da trajetória do Neymar, produzido como exercício autoral.", thumbnail: motion7.url, type: "video", videoUrl: motion7.url },
    { id: 20, title: "Humberto & Ronaldo ao Vivo", subtitle: "Para Rodeio de Tabatinga 2025", description: "Chamada para o show de Humberto & Ronaldo no Rodeio de Tabatinga 2025.", thumbnail: motion6Old.url, type: "video", videoUrl: motion6Old.url },
  ],
  design: [
    { id: 13, title: "Hokori Sushi", thumbnail: hokori1.url, type: "image", clientSlug: "hokori-sushi" },
    { id: 15, title: "PG Imports", thumbnail: pgEuropeu.url, type: "image", clientSlug: "pg-imports" },
    { id: 16, title: "Buff Smurfs", thumbnail: buff1.url, type: "image", clientSlug: "buff-smurfs" },
    { id: 30, title: "Thumbnails", thumbnail: thumbYasuo.url, type: "image", clientSlug: "thumbnails" },
  ],
  web: [],
};

type WebProject = {
  id: number;
  title: string;
  client: string;
  badge: string;
  statusCode: string;
  statusLabel: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  mobilePreview?: string;
  url: string;
  scope: string;
  type: string;
  deliverables: Array<string | { label: string; sub?: string }>;
  stack: string[];
};

const webProjects: WebProject[] = [
  {
    id: 101,
    title: "D. An Morgan — Autora",
    client: "PARA D. AN MORGAN",
    badge: "LANDING PAGE",
    statusCode: "NO AR",
    statusLabel: "No ar",
    shortDescription:
      "Site institucional para autora de romance contemporâneo, com apresentação de obras, depoimentos de leitoras e integração com comunidade no WhatsApp.",
    fullDescription:
      "Site institucional desenvolvido para D. An Morgan, autora carioca de romance contemporâneo. O projeto apresenta a biografia da autora, catálogo de obras publicadas, depoimentos reais de leitoras e um canal direto de conexão com a comunidade de fãs através do WhatsApp, reforçando a proximidade entre autora e público.",
    thumbnail: danmorganDesktop.url,
    mobilePreview: danmorganDesktop.url,
    url: "https://autoradanmorgan.com/",
    scope: "Site completo, ponta a ponta",
    type: "Landing page / Autoral",
    deliverables: [
      "Design & UX",
      "Front-end",
      "Copywriting de seções",
      { label: "Deploy", sub: "Hospedagem + configuração de domínio" },
    ],
    stack: ["React", "Tailwind CSS", "Node.js"],
  },
];

const carouselRepeatCount = 8;

const playCarouselVideo = (video: HTMLVideoElement) => {
  video.muted = true;
  video.playsInline = true;

  if (video.dataset.carouselPlaying === "true" && !video.paused) return;

  video.dataset.carouselPlaying = "true";
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      delete video.dataset.carouselPlaying;
    });
  }
};

const pauseCarouselVideo = (video: HTMLVideoElement) => {
  if (!video.paused) video.pause();
  delete video.dataset.carouselPlaying;

  try {
    video.currentTime = 0;
  } catch {
    // Ignore browsers that reject currentTime changes before metadata is ready.
  }
};

const syncCarouselVideos = (root: HTMLDivElement) => {
  const rootRect = root.getBoundingClientRect();
  const videos = root.querySelectorAll<HTMLVideoElement>("video[data-carousel-video='true']");

  videos.forEach((video) => {
    const rect = video.getBoundingClientRect();
    const horizontalVisible = Math.max(0, Math.min(rootRect.right, rect.right) - Math.max(rootRect.left, rect.left));
    const verticalVisible = Math.max(0, Math.min(rootRect.bottom, rect.bottom) - Math.max(rootRect.top, rect.top));
    const isVisible = horizontalVisible >= rect.width * 0.35 && verticalVisible >= rect.height * 0.35;

    if (isVisible) {
      playCarouselVideo(video);
    } else {
      pauseCarouselVideo(video);
    }
  });
};


const PortfolioSection = () => {
  const { t } = useI18n();
  const categories: { key: Category; label: string }[] = categoryKeys.map((key) => ({
    key,
    label: t(`portfolio.cat.${key}`),
  }));
  const [activeCategory, setActiveCategory] = useState<Category>("motion");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedWeb, setSelectedWeb] = useState<WebProject | null>(null);
  const [visible, setVisible] = useState(4);
  const [speed, setSpeed] = useState(60);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const videosInView = useInView(ref, { once: true, margin: "800px 0px" });

  const trackContainerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const pauseMarquee = () => {
    if (marqueeRef.current) marqueeRef.current.style.animationPlayState = "paused";
  };
  const resumeMarquee = () => {
    if (marqueeRef.current) marqueeRef.current.style.animationPlayState = "running";
  };

  useEffect(() => {
    const update = () => {
      setVisible(window.innerWidth < 768 ? 1 : 4);
      if (trackContainerRef.current) {
        setContainerWidth(trackContainerRef.current.offsetWidth);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeCategory]);

  const currentItems = portfolioItems[activeCategory];
  const isCarousel = activeCategory === "video" || activeCategory === "motion";
  const isLandscape = false;

  const [offset, setOffset] = useState(0);
  const [transitionOn, setTransitionOn] = useState(true);

  const visibleCount = isLandscape ? Math.max(1, Math.min(3, visible)) : visible;
  const cardWidth = visibleCount > 0 ? containerWidth / visibleCount : 0;
  const totalWidth = cardWidth * currentItems.length;

  useEffect(() => {
    if (!isCarousel || !trackContainerRef.current) return;

    const root = trackContainerRef.current;
    const videos = Array.from(root.querySelectorAll<HTMLVideoElement>("video[data-carousel-video='true']"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            playCarouselVideo(video);
          } else {
            pauseCarouselVideo(video);
          }
        });
      },
      { root, threshold: 0.35 }
    );

    videos.forEach((video) => observer.observe(video));
    const frame = requestAnimationFrame(() => syncCarouselVideos(root));

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      videos.forEach(pauseCarouselVideo);
    };
  }, [activeCategory, containerWidth, isCarousel, videosInView]);

  useEffect(() => {
    if (!isCarousel || !trackContainerRef.current) return;

    const root = trackContainerRef.current;
    const frame = requestAnimationFrame(() => syncCarouselVideos(root));

    return () => cancelAnimationFrame(frame);
  }, [activeCategory, isCarousel, offset]);

  const normalizeOffset = (value: number) => {
    if (totalWidth === 0) return value;

    let normalized = value;
    while (normalized <= -totalWidth) normalized += totalWidth;
    while (normalized > 0) normalized -= totalWidth;

    return Math.abs(normalized) < 0.5 || Math.abs(normalized + totalWidth) < 0.5 ? 0 : normalized;
  };

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setTransitionOn(false);
    setOffset(0);
    requestAnimationFrame(() => setTransitionOn(true));
  };

  const jumpTo = (value: number, then: (v: number) => number) => {
    // instantly reposition without transition, then animate from new base
    pauseMarquee();
    setTransitionOn(false);
    setOffset(value);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionOn(true);
        setOffset(then(value));
        resumeMarquee();
      });
    });
  };

  const next = () => {
    if (cardWidth === 0 || totalWidth === 0) return;
    setTransitionOn(true);
    setOffset((o) => o - cardWidth);
  };

  const prev = () => {
    if (cardWidth === 0 || totalWidth === 0) return;
    // if we would move into positive space (past the start), first jump to the
    // equivalent position at the end of the duplicated track, then animate.
    if (offset + cardWidth > 0) {
      jumpTo(offset - totalWidth, (v) => v + cardWidth);
    } else {
      setTransitionOn(true);
      setOffset((o) => o + cardWidth);
    }
  };

  const handleTransitionEnd = () => {
    if (totalWidth === 0) return;

    const normalized = normalizeOffset(offset);
    if (Math.abs(normalized - offset) > 0.5) {
      pauseMarquee();
      setTransitionOn(false);
      setOffset(normalized);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionOn(true);
          resumeMarquee();
          if (trackContainerRef.current) syncCarouselVideos(trackContainerRef.current);
        });
      });
    } else if (trackContainerRef.current) {
      syncCarouselVideos(trackContainerRef.current);
    }
  };

  return (
    <section id="portfolio" className="py-8 md:py-10 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-3">
            {t("portfolio.kicker")}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            {t("portfolio.title.a")} <span className="text-gradient">{t("portfolio.title.highlight")}</span>
          </h2>
        </motion.div>

        {/* Category tabs */}
        <div className="grid grid-cols-2 gap-2 mb-12 max-w-md mx-auto md:flex md:flex-wrap md:justify-center md:gap-3 md:max-w-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              className={`px-2 py-2.5 md:px-6 rounded-full text-[11px] md:text-sm font-heading font-semibold leading-tight text-center md:whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {activeCategory === "web" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {webProjects.map((p) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedWeb(p)}
                className="group text-left rounded-2xl overflow-hidden border border-border/40 bg-card/40 backdrop-blur-sm shadow-card hover:-translate-y-1 transition-all duration-300 hover:border-primary/40 hover:shadow-glow"
              >
                <BrowserMockup src={p.thumbnail} url={p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")} />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                    <span className="text-[10px] font-heading font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border border-primary/40 text-primary">
                      {t(`pw.${p.id}.badge`, p.badge)}
                    </span>
                    <span className="text-[10px] font-heading font-semibold tracking-[0.2em] uppercase text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      {t("portfolio.online")}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold leading-tight">{t(`pw.${p.id}.title`, p.title)}</h3>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: "#733AB0" }}>
                    {t(`pw.${p.id}.client`, p.client)}
                  </p>
                  <p
                    className="mt-3 text-sm text-muted-foreground/90 leading-relaxed overflow-hidden"
                    style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
                  >
                    {t(`pw.${p.id}.short`, p.shortDescription)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-heading font-semibold px-2 py-1 rounded-md bg-primary/10 border border-primary/20 text-foreground/90"
                      >
                        {tag}
                      </span>
                    ))}
                    {p.stack.length > 3 && (
                      <span className="text-[10px] font-heading font-semibold px-2 py-1 rounded-md bg-muted/40 text-muted-foreground">
                        +{p.stack.length - 3}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-[11px] text-primary font-heading font-semibold tracking-wide">
                    {t("portfolio.clickForMore")}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        ) : isCarousel ? (
          <div className="relative mx-auto max-w-[1600px] md:px-4" style={{ zoom: 0.85 }}>
            <div ref={trackContainerRef} className="overflow-hidden marquee-mask">
              <div
                onTransitionEnd={handleTransitionEnd}
                style={{
                  transform: `translate3d(${offset}px, 0, 0)`,
                  transition: transitionOn ? "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                }}
              >
                <div
                  key={activeCategory}
                  ref={marqueeRef}
                  className="flex marquee-track"
                  style={{
                    animationDuration: `${speed * (carouselRepeatCount / 2)}s`,
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {Array.from({ length: carouselRepeatCount }, () => currentItems).flat().map((item, i) => (
                    <div
                      key={`${item.id}-${i}`}
                      className="shrink-0 px-3"
                      style={{ width: `${containerWidth / visibleCount}px` }}
                    >
                      <div
                        onClick={() => setSelectedItem(item)}
                        className="group cursor-pointer"
                      >
                        <div className={`relative rounded-xl overflow-hidden shadow-card bg-black ${isLandscape ? "aspect-video" : "aspect-[9/16]"}`}>
                          {item.videoUrl && /\.(mp4|webm)$/i.test(item.videoUrl) ? (
                            <video
                              src={videosInView ? item.videoUrl : undefined}
                              data-carousel-video="true"
                              muted
                              loop
                              playsInline
                              preload={videosInView && i < visibleCount ? "auto" : "metadata"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          )}
                          <div className="pointer-events-none absolute bottom-2 left-2 opacity-80">
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium text-white bg-black/50 backdrop-blur-md border border-white/10">
                              {t("portfolio.soundHint")}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 px-1 w-full min-w-0 overflow-hidden">
                          <p className="font-heading text-[15px] font-semibold text-foreground leading-tight break-words">
                            {t(`pi.${item.id}.title`, item.title)}
                          </p>
                          {item.subtitle && (
                            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] break-words" style={{ color: "#733AB0" }}>
                              {t(`pi.${item.id}.subtitle`, item.subtitle)}
                            </p>
                          )}
                          {item.description && (
                            <p
                              className="mt-2 text-[13px] text-muted-foreground/90 leading-relaxed overflow-hidden break-words"
                              style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
                            >
                              {t(`pi.${item.id}.desc`, item.description)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prev}
                aria-label={t("portfolio.prev")}
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:shadow-glow transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                aria-label={t("portfolio.next")}
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:shadow-glow transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <AnimatePresence mode="popLayout">
              {currentItems.map((item) => {
                const inner = (
                  <div className="relative rounded-xl overflow-hidden aspect-square shadow-card">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent flex items-end p-4">
                      <div>
                        <p className="font-heading text-sm font-semibold text-foreground">{t(`pi.${item.id}.title`, item.title)}</p>
                        <p className="text-xs text-muted-foreground mt-1">{t("portfolio.clickToSeeMore")}</p>
                      </div>
                    </div>
                  </div>
                );
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group cursor-pointer"
                  >
                    {item.clientSlug ? (
                      <Link to="/clientes/$slug" params={{ slug: item.clientSlug }}>
                        {inner}
                      </Link>
                    ) : (
                      <div onClick={() => setSelectedItem(item)}>{inner}</div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full ${selectedItem.videoUrl && /\.(mp4|webm)$/i.test(selectedItem.videoUrl) ? "max-w-sm" : "max-w-4xl"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                aria-label={t("portfolio.close")}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full glass flex items-center justify-center hover:shadow-glow transition-all"
              >
                <X size={18} />
              </button>
              <div className="rounded-2xl overflow-hidden shadow-card">
                {selectedItem.videoUrl ? (
                  /\.(mp4|webm)$/i.test(selectedItem.videoUrl) ? (
                    <video src={selectedItem.videoUrl} autoPlay controls controlsList="nodownload noremoteplayback noplaybackrate" disablePictureInPicture onContextMenu={(e) => e.preventDefault()} loop playsInline className="w-full aspect-[9/16] object-contain bg-black" />
                  ) : (
                    <iframe
                      src={selectedItem.videoUrl
                        .replace("youtube.com/shorts/", "youtube.com/embed/")
                        .replace("youtu.be/", "youtube.com/embed/") + "?autoplay=1"}
                      title={t(`pi.${selectedItem.id}.title`, selectedItem.title)}
                      className="w-full aspect-video"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  )
                ) : (
                  <img src={selectedItem.thumbnail} alt={t(`pi.${selectedItem.id}.title`, selectedItem.title)} loading="lazy" className="w-full aspect-video object-cover" />
                )}
              </div>
              <p className="mt-4 font-heading text-lg font-semibold text-center">{t(`pi.${selectedItem.id}.title`, selectedItem.title)}</p>
              <p className="text-muted-foreground text-sm text-center mt-1">{t("portfolio.clickOutside")}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedWeb && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto"
            onClick={() => setSelectedWeb(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedWeb(null)}
                aria-label={t("portfolio.close")}
                className="absolute -top-3 -right-3 md:-top-4 md:-right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center hover:shadow-glow transition-all"
              >
                <X size={18} />
              </button>

              <div className="rounded-2xl overflow-hidden border border-border/40 bg-card/60 backdrop-blur-md shadow-card">
                <div className="relative bg-gradient-to-br from-primary/10 via-background/40 to-background p-4 md:p-8">
                  <BrowserMockup src={selectedWeb.thumbnail} url={selectedWeb.url.replace(/^https?:\/\//, "").replace(/\/$/, "")} />
                  {selectedWeb.mobilePreview && (
                    <div className="hidden md:block absolute right-6 bottom-2 w-32 rounded-[18px] border-4 border-foreground/80 bg-black shadow-2xl overflow-hidden aspect-[9/19]">
                      <img src={selectedWeb.mobilePreview} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
                    </div>
                  )}
                </div>

                <div className="p-5 md:p-8">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="text-[10px] font-heading font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border border-primary/40 text-primary">
                      {t(`pw.${selectedWeb.id}.badge`, selectedWeb.badge)}
                    </span>
                    <span className="text-[10px] font-heading font-semibold tracking-[0.2em] uppercase text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      {t("portfolio.onlineLabel")}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl md:text-3xl font-bold">{t(`pw.${selectedWeb.id}.title`, selectedWeb.title)}</h3>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: "#733AB0" }}>
                    {t(`pw.${selectedWeb.id}.client`, selectedWeb.client)}
                  </p>
                  <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {t(`pw.${selectedWeb.id}.full`, selectedWeb.fullDescription)}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="rounded-xl border border-border/40 bg-background/40 p-5">
                      <p className="font-heading text-xs tracking-[0.2em] uppercase text-primary mb-4">{t("portfolio.web.techSheet")}</p>
                      <dl className="space-y-3 text-sm">
                        <div className="flex justify-between gap-4">
                          <dt className="text-muted-foreground">{t("portfolio.web.scope")}</dt>
                          <dd className="text-right text-foreground">{t(`pw.${selectedWeb.id}.scope`, selectedWeb.scope)}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-muted-foreground">{t("portfolio.web.client")}</dt>
                          <dd className="text-right text-foreground">{t(`pw.${selectedWeb.id}.title`, selectedWeb.title).split(" — ")[0]}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-muted-foreground">{t("portfolio.web.type")}</dt>
                          <dd className="text-right text-foreground">{t(`pw.${selectedWeb.id}.type`, selectedWeb.type)}</dd>
                        </div>
                        <div className="flex justify-between gap-4 items-center">
                          <dt className="text-muted-foreground">{t("portfolio.web.status")}</dt>
                          <dd className="text-right text-foreground flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                            {t("portfolio.onlineLabel")}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-muted-foreground">{t("portfolio.web.link")}</dt>
                          <dd className="text-right">
                            <a
                              href={selectedWeb.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 inline-flex items-center gap-1"
                            >
                              {selectedWeb.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                              <ExternalLink size={12} />
                            </a>
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="rounded-xl border border-border/40 bg-background/40 p-5">
                      <p className="font-heading text-xs tracking-[0.2em] uppercase text-primary mb-4">{t("portfolio.web.delivery")}</p>
                      <ul className="space-y-2.5 text-sm">
                        {selectedWeb.deliverables.map((d, idx) => {
                          const rawLabel = typeof d === "string" ? d : d.label;
                          const rawSub = typeof d === "string" ? undefined : d.sub;
                          const label = t(`pw.${selectedWeb.id}.d${idx + 1}`, rawLabel);
                          const sub = rawSub ? t(`pw.${selectedWeb.id}.d${idx + 1}.sub`, rawSub) : undefined;
                          return (
                            <li key={rawLabel} className="flex items-start gap-2.5">
                              <span className="w-5 h-5 mt-0.5 rounded-full bg-emerald-400/15 border border-emerald-400/40 flex items-center justify-center shrink-0">
                                <Check size={12} className="text-emerald-400" />
                              </span>
                              <span className="text-foreground/90">
                                {label}
                                {sub && (
                                  <span className="block text-xs text-muted-foreground mt-0.5">{sub}</span>
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>

                      <p className="font-heading text-xs tracking-[0.2em] uppercase text-primary mt-6 mb-3">{t("portfolio.web.stack")}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedWeb.stack.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-heading font-semibold px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-foreground/90"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a
                    href={selectedWeb.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-heading font-semibold text-sm shadow-glow hover:opacity-90 transition-all"
                  >
                    {t("portfolio.web.access")} <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const BrowserMockup = ({ src, url }: { src: string; url: string }) => (
  <div className="rounded-xl overflow-hidden border border-border/40 bg-black shadow-card">
    <div className="flex items-center gap-2 px-3 py-2 bg-muted/40 border-b border-border/40">
      <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
      <div className="ml-3 flex-1 px-3 py-1 rounded-md bg-background/60 text-[10px] text-muted-foreground font-mono truncate">
        {url}
      </div>
    </div>
    <div className="aspect-[16/10] overflow-hidden bg-black">
      <img src={src} alt={url} loading="lazy" className="w-full h-full object-cover object-top" />
    </div>
  </div>
);

export default PortfolioSection;
