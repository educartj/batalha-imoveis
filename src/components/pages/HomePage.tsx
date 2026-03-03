// HPI 1.7-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView, MotionValue } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { Imveis } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Home, Award, TrendingUp, ArrowRight, CheckCircle2, Phone } from 'lucide-react';

// --- Utility Components for Design System ---

const SectionDivider = () => (
  <div className="w-full flex justify-center items-center py-12 opacity-20">
    <div className="h-px w-24 bg-primary" />
    <div className="mx-4 h-2 w-2 rounded-full bg-accent-gold" />
    <div className="h-px w-24 bg-primary" />
  </div>
);

const GoldBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent-gold/30 rounded-full bg-accent-gold/5 backdrop-blur-sm">
    <div className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
    <span className="text-accent-gold font-paragraph text-xs font-semibold tracking-widest uppercase">
      {children}
    </span>
  </div>
);

// --- Sub-Sections ---

const BatalhaImoveisSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-24 bg-gradient-to-r from-primary via-primary to-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-accent-gold rounded-full blur-3xl" />
        <div className="absolute right-0 top-1/4 w-80 h-80 bg-accent-gold/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-accent-gold/60" />
            <span className="font-paragraph text-sm uppercase tracking-widest text-accent-gold/80">Bem-vindo</span>
            <div className="h-px w-12 bg-accent-gold/60" />
          </div>

          <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight tracking-tight">
            BATALHA
            <br />
            <span className="text-accent-gold italic font-light">IMÓVEIS</span>
          </h1>

          <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-3xl mb-12 leading-relaxed">
            Especialistas em imóveis de alto padrão há mais de 30 anos. Conectando sonhos a endereços nobres no interior de São Paulo, Litoral Norte e Portugal.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/imoveis">
              <Button size="lg" className="bg-accent-gold text-primary hover:bg-white hover:text-primary transition-all duration-300 min-w-[200px] h-14 text-lg font-paragraph font-semibold">
                Explorar Portfólio
              </Button>
            </Link>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-primary backdrop-blur-sm transition-all duration-300 min-w-[200px] h-14 text-lg font-paragraph font-semibold">
                Fale Conosco
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] overflow-clip flex items-center justify-center">
      <motion.div 
        style={{ y, scale, opacity }} 
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://static.wixstatic.com/media/72153f_b04db1beaa3a4c9b90b1e20f27aeb03c~mv2.png?originWidth=1920&originHeight=1024"
          alt="Batalha Imóveis Luxury Estate"
          className="w-full h-full object-cover"
          width={1920}
        />
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-transparent to-background" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <GoldBadge>Desde 1994</GoldBadge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-6xl md:text-8xl lg:text-9xl text-white mb-8 leading-[0.9] tracking-tight drop-shadow-lg"
        >
          Tradição que <br />
          <span className="italic font-light text-accent-gold">Constrói Histórias</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-paragraph text-lg md:text-xl text-white/90 max-w-2xl mb-12 leading-relaxed"
        >
          Há 30 anos conectando sonhos a endereços nobres. Especialistas em imóveis de alto padrão no interior de São Paulo, Litoral Norte e Portugal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/imoveis">
            <Button size="lg" className="bg-accent-gold text-primary hover:bg-white hover:text-primary transition-all duration-300 min-w-[200px] h-14 text-lg font-paragraph">
              Explorar Acervo
            </Button>
          </Link>
          <Link to="/sobre">
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm transition-all duration-300 min-w-[200px] h-14 text-lg font-paragraph">
              Nossa Trajetória
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-xs uppercase tracking-widest font-paragraph">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
      </motion.div>
    </section>
  );
};

const MarqueeSection = () => {
  return (
    <div className="w-full bg-primary py-6 overflow-hidden border-y border-white/10">
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex gap-16 items-center"
        >
          {[...Array(8)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-3xl md:text-4xl font-heading text-white/20 italic">Excelência</span>
              <span className="w-2 h-2 rounded-full bg-accent-gold/40" />
              <span className="text-3xl md:text-4xl font-heading text-white/20">Tradição</span>
              <span className="w-2 h-2 rounded-full bg-accent-gold/40" />
              <span className="text-3xl md:text-4xl font-heading text-white/20 italic">Confiança</span>
              <span className="w-2 h-2 rounded-full bg-accent-gold/40" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const IntroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-gold/5 -skew-x-12 translate-x-20" />
      
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-primary/30" />
                <span className="font-paragraph text-sm uppercase tracking-widest text-primary/60">Sobre a Batalha Imóveis</span>
              </div>
              <h2 className="font-heading text-5xl md:text-6xl text-primary mb-8 leading-tight">
                30 Anos Definindo o <br />
                <span className="text-accent-gold italic">Padrão de Qualidade</span>
              </h2>
              <p className="font-paragraph text-lg text-foreground/70 mb-6 leading-relaxed">
                Fundada com o propósito de elevar o mercado imobiliário, a Batalha Imóveis construiu um legado baseado na transparência e na busca incansável pela excelência.
              </p>
              <p className="font-paragraph text-lg text-foreground/70 mb-10 leading-relaxed">
                Não vendemos apenas metros quadrados; curamos experiências de vida e oportunidades de investimento que atravessam gerações.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="flex flex-col">
                  <span className="font-heading text-4xl text-primary mb-1">30+</span>
                  <span className="font-paragraph text-sm text-foreground/60">Anos de História</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-4xl text-primary mb-1">2k+</span>
                  <span className="font-paragraph text-sm text-foreground/60">Sonhos Realizados</span>
                </div>
              </div>

              <Link to="/sobre">
                <Button variant="link" className="p-0 text-primary font-semibold text-lg hover:text-accent-gold transition-colors group">
                  Conheça nossa história <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="aspect-[4/5] w-full overflow-hidden rounded-sm">
                <Image
                  src="https://static.wixstatic.com/media/72153f_9004774ff26044eeb2611f3f9b6529df~mv2.png?originWidth=768&originHeight=960"
                  alt="Interior elegante"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  width={800}
                />
              </div>
            </motion.div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -left-10 w-2/3 h-2/3 border border-primary/10 z-0" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-gold/10 rounded-full blur-3xl z-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

const PropertyCard = ({ property, index }: { property: Imveis; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-white w-full"
    >
      <Link to={`/imoveis/${property._id}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={property.mainImage || 'https://static.wixstatic.com/media/72153f_1fc5118b7aca44ca85812a98ffaa97cf~mv2.png?originWidth=576&originHeight=448'}
            alt={property.title || 'Imóvel Batalha'}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            width={600}
          />
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
          
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">
              {property.status || 'Disponível'}
            </span>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/80 to-transparent">
            <span className="text-white font-paragraph text-sm font-medium flex items-center gap-2">
              Ver Detalhes <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        <div className="pt-6 pb-2 pr-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-heading text-2xl text-primary group-hover:text-accent-gold transition-colors line-clamp-1">
              {property.title}
            </h3>
          </div>
          
          <p className="text-foreground/60 text-sm mb-4 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {property.locationRegion || 'Consulte a localização'}
          </p>

          <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <Home className="w-4 h-4 text-accent-gold" />
              <span>{property.area ? `${property.area}m²` : '-'}</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="font-heading text-xl text-primary font-semibold">
              {property.price ? `R$ ${property.price.toLocaleString('pt-BR')}` : 'Sob Consulta'}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ServiceAreaCard = ({ title, desc, image, delay }: { title: string, desc: string, image: string, delay: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative h-[500px] w-full overflow-hidden cursor-pointer"
    >
      <Image
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        width={600}
      />
      <div className="absolute inset-0 bg-primary/60 group-hover:bg-primary/30 transition-colors duration-500" />
      
      <div className="absolute inset-0 p-8 flex flex-col justify-end items-start">
        <div className="h-1 w-12 bg-accent-gold mb-6 transition-all duration-300 group-hover:w-24" />
        <h3 className="font-heading text-3xl md:text-4xl text-white mb-3 translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
          {title}
        </h3>
        <p className="font-paragraph text-white/80 max-w-xs opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

// --- Main Component ---

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Imveis[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProperties();
  }, []);

  const loadFeaturedProperties = async () => {
    try {
      const result = await BaseCrudService.getAll<Imveis>('properties', [], { limit: 6 }); // Increased limit for better grid
      setFeaturedProperties(result.items);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-accent-gold/30 selection:text-primary">
      <Header />

      <main>
        <BatalhaImoveisSection />
        
        <HeroSection />
        
        <MarqueeSection />
        
        <IntroSection />

        {/* Featured Properties Section */}
        <section id="imoveis-destaque" className="w-full py-32 bg-gray-50">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <GoldBadge>Coleção Exclusiva</GoldBadge>
                <h2 className="font-heading text-5xl md:text-6xl text-primary mt-6 mb-4">
                  Oportunidades em Destaque
                </h2>
                <p className="font-paragraph text-lg text-foreground/60">
                  Uma seleção curada dos imóveis mais distintos do nosso portfólio.
                </p>
              </div>
              <Link to="/imoveis">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-all h-12 px-8 font-paragraph">
                  Ver Todo o Portfólio
                </Button>
              </Link>
            </div>

            <div className="min-h-[400px]">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-[400px] bg-gray-200 animate-pulse rounded-sm" />
                  ))}
                </div>
              ) : featuredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  {featuredProperties.map((property, index) => (
                    <PropertyCard key={property._id} property={property} index={index} />
                  ))}
                </div>
              ) : (
                <div className="w-full h-64 flex items-center justify-center border border-dashed border-gray-300">
                  <p className="text-foreground/50 font-paragraph">Nenhum imóvel em destaque no momento.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Service Areas - Parallax / Sticky Concept */}
        <section className="w-full py-32 bg-primary text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-accent-gold rounded-full blur-[120px]" />
          </div>

          <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="text-center mb-20">
              <h2 className="font-heading text-5xl md:text-6xl mb-6">Territórios de Atuação</h2>
              <div className="w-24 h-1 bg-accent-gold mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10 border border-white/10 bg-primary-foreground/5 backdrop-blur-sm">
              <ServiceAreaCard 
                title="Interior de SP" 
                desc="Onde nossa história começou. Imóveis residenciais e comerciais nas melhores localizações."
                image="https://static.wixstatic.com/media/72153f_d16c630ae3774f67ab8b816435e123c9~mv2.png?originWidth=576&originHeight=448"
                delay={0}
              />
              <ServiceAreaCard 
                title="Litoral Norte" 
                desc="Refúgios exclusivos em São Sebastião, Ilhabela e Caraguatatuba."
                image="https://static.wixstatic.com/media/72153f_d2dffb6c2a4d44689357842a854911e2~mv2.png?originWidth=576&originHeight=448"
                delay={0.2}
              />
              <ServiceAreaCard 
                title="Portugal" 
                desc="Assessoria completa para investimentos internacionais e Golden Visa."
                image="https://static.wixstatic.com/media/72153f_7dececda6afb45459eb6e9153f01f42e~mv2.png?originWidth=576&originHeight=448"
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="w-full py-20 bg-accent-gold/10 border-b border-accent-gold/20">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { icon: Award, val: "30+", label: "Anos de Mercado" },
                { icon: Home, val: "2000+", label: "Imóveis Vendidos" },
                { icon: MapPin, val: "3", label: "Regiões Ativas" },
                { icon: TrendingUp, val: "98%", label: "Satisfação" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <stat.icon className="w-8 h-8 text-accent-gold mb-4" />
                  <span className="font-heading text-4xl md:text-5xl text-primary mb-2">{stat.val}</span>
                  <span className="font-paragraph text-sm uppercase tracking-wider text-foreground/60">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-32 bg-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-5xl md:text-7xl text-primary mb-8 leading-tight">
                Vamos encontrar o seu <br />
                <span className="text-accent-gold">próximo endereço?</span>
              </h2>
              <p className="font-paragraph text-xl text-foreground/60 mb-12 max-w-2xl mx-auto">
                Nossa equipe de corretores especialistas está pronta para oferecer uma consultoria personalizada.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-paragraph h-14 px-8 text-lg w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
                    <Phone className="w-5 h-5 mr-2" /> Conversar no WhatsApp
                  </Button>
                </a>
                <Link to="/equipe">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-paragraph h-14 px-8 text-lg w-full sm:w-auto">
                    Conhecer a Equipe
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute left-0 bottom-0 w-64 h-64 border-l-2 border-b-2 border-accent-gold/20 m-10" />
          <div className="absolute right-0 top-0 w-64 h-64 border-r-2 border-t-2 border-accent-gold/20 m-10" />
        </section>
      </main>

      <Footer />
    </div>
  );
}