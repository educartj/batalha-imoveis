import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Award, Users, TrendingUp, Shield, Heart, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary py-32">
        <div className="max-w-[100rem] mx-auto px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-accent-gold" />
              <span className="text-accent-gold font-paragraph text-sm tracking-wider uppercase">
                Nossa História
              </span>
              <div className="h-px w-12 bg-accent-gold" />
            </div>

            <h1 className="font-heading text-6xl md:text-7xl text-primary-foreground mb-8">
              30 Anos de Tradição e Excelência
            </h1>

            <p className="font-paragraph text-xl text-primary-foreground/90 leading-relaxed">
              Desde 1994, a Batalha Imóveis tem sido sinônimo de confiança, profissionalismo 
              e dedicação no mercado imobiliário. Nossa jornada é marcada por milhares de 
              histórias de sucesso e famílias realizadas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="w-full py-32 bg-white">
        <div className="max-w-[100rem] mx-auto px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-[600px] rounded-xl overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/72153f_b9e3f39c6e2a4ff6af22ca23b9914c5e~mv2.png?originWidth=576&originHeight=576"
                  alt="História da Batalha Imóveis"
                  className="w-full h-full object-cover"
                  width={600}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-5xl text-primary mb-8">
                Uma Trajetória de Sucesso
              </h2>

              <div className="space-y-6 font-paragraph text-lg text-foreground/80 leading-relaxed">
                <p>
                  Fundada em 1994 no coração do interior paulista, a Batalha Imóveis nasceu 
                  do sonho de transformar o mercado imobiliário regional, trazendo 
                  profissionalismo, ética e dedicação incomparáveis.
                </p>

                <p>
                  Ao longo de três décadas, expandimos nossa atuação para o litoral norte 
                  de São Paulo, conquistando presença marcante em São Sebastião, Ilhabela 
                  e Caraguatatuba, regiões conhecidas por suas belezas naturais e alto 
                  potencial imobiliário.
                </p>

                <p>
                  Mais recentemente, estabelecemos parcerias estratégicas em Portugal, 
                  oferecendo aos nossos clientes oportunidades de investimento internacional 
                  com a mesma qualidade e confiança que nos tornaram referência no Brasil.
                </p>

                <p>
                  Nossa história é construída dia após dia, com cada cliente satisfeito, 
                  cada negócio bem-sucedido e cada sonho realizado. Somos mais do que uma 
                  imobiliária: somos parceiros na construção do seu futuro.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-20">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-accent-gold" />
              <span className="text-accent-gold font-paragraph text-sm tracking-wider uppercase">
                Nossos Valores
              </span>
              <div className="h-px w-12 bg-accent-gold" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl md:text-6xl text-primary"
            >
              O Que Nos Move
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-10 border border-foreground/5"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-accent-gold" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-4">Confiança</h3>
              <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                Construímos relacionamentos duradouros baseados em transparência, ética 
                e compromisso com a verdade em cada negociação.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl p-10 border border-foreground/5"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-accent-gold" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-4">Dedicação</h3>
              <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                Cada cliente é único e merece atenção personalizada. Dedicamos tempo e 
                energia para entender e realizar seus sonhos imobiliários.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-10 border border-foreground/5"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-accent-gold" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-4">Excelência</h3>
              <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                Buscamos constantemente a perfeição em nossos serviços, mantendo os mais 
                altos padrões de qualidade e profissionalismo.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl p-10 border border-foreground/5"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-accent-gold" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-4">Tradição</h3>
              <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                Três décadas de experiência nos ensinaram o valor da tradição familiar 
                e do conhecimento transmitido através das gerações.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-10 border border-foreground/5"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-accent-gold" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-4">Inovação</h3>
              <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                Respeitamos a tradição, mas abraçamos a inovação, utilizando as melhores 
                tecnologias e práticas do mercado imobiliário moderno.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-xl p-10 border border-foreground/5"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-accent-gold" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-4">Resultados</h3>
              <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                Nosso compromisso é entregar resultados concretos, superando expectativas 
                e garantindo a satisfação total de nossos clientes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="w-full py-32 bg-white">
        <div className="max-w-[100rem] mx-auto px-20">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-accent-gold" />
              <span className="text-accent-gold font-paragraph text-sm tracking-wider uppercase">
                Presença Regional
              </span>
              <div className="h-px w-12 bg-accent-gold" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl md:text-6xl text-primary mb-6"
            >
              Onde Estamos
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto"
            >
              Nossa atuação estratégica em três regiões distintas nos permite oferecer 
              as melhores oportunidades do mercado imobiliário
            </motion.p>
          </div>

          <div className="space-y-24">
            {/* Interior de SP */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            >
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/72153f_b50e33ec6ce042b5a0281adce28ef662~mv2.png?originWidth=576&originHeight=384"
                  alt="Interior de São Paulo"
                  className="w-full h-full object-cover"
                  width={600}
                />
              </div>
              <div>
                <h3 className="font-heading text-4xl text-primary mb-6">
                  Interior de São Paulo
                </h3>
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed mb-6">
                  Nossa região de origem e onde construímos nossa reputação. Com profundo 
                  conhecimento do mercado local, oferecemos imóveis residenciais e comerciais 
                  que atendem desde famílias em busca do primeiro lar até investidores 
                  experientes.
                </p>
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                  Conhecemos cada bairro, cada rua, cada oportunidade. Nossa expertise local 
                  é incomparável e garante as melhores negociações para nossos clientes.
                </p>
              </div>
            </motion.div>

            {/* Litoral Norte */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            >
              <div className="order-2 md:order-1">
                <h3 className="font-heading text-4xl text-primary mb-6">
                  Litoral Norte de São Paulo
                </h3>
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed mb-6">
                  São Sebastião, Ilhabela e Caraguatatuba representam o paraíso litorâneo 
                  paulista. Especializamo-nos em imóveis de veraneio, investimentos turísticos 
                  e propriedades de alto padrão à beira-mar.
                </p>
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                  Seja para lazer, investimento ou moradia permanente, temos as melhores 
                  opções em uma das regiões mais valorizadas do litoral brasileiro.
                </p>
              </div>
              <div className="relative h-96 rounded-xl overflow-hidden order-1 md:order-2">
                <Image
                  src="https://static.wixstatic.com/media/72153f_680cffcce95c427a9768232d43d7794f~mv2.png?originWidth=576&originHeight=384"
                  alt="Litoral Norte"
                  className="w-full h-full object-cover"
                  width={600}
                />
              </div>
            </motion.div>

            {/* Portugal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            >
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/72153f_6295012275ad4c67814661c6aa3bc8df~mv2.png?originWidth=576&originHeight=384"
                  alt="Portugal"
                  className="w-full h-full object-cover"
                  width={600}
                />
              </div>
              <div>
                <h3 className="font-heading text-4xl text-primary mb-6">
                  Portugal
                </h3>
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed mb-6">
                  Através de parcerias estratégicas com imobiliárias portuguesas de renome, 
                  oferecemos oportunidades exclusivas de investimento internacional. Portugal 
                  tem se destacado como destino preferencial para brasileiros.
                </p>
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                  Facilitamos todo o processo de aquisição, desde a busca do imóvel ideal 
                  até a conclusão da compra, sempre com o suporte e a confiança que nos 
                  caracterizam.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
