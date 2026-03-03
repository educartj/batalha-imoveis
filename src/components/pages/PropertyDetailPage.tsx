import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { Imveis } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Home, Bed, Bath, Maximize, ArrowLeft } from 'lucide-react';

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Imveis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      const data = await BaseCrudService.getById<Imveis>('properties', id!);
      setProperty(data);
    } catch (error) {
      console.error('Error loading property:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full py-12 bg-white border-b border-foreground/10">
        <div className="max-w-[100rem] mx-auto px-20">
          <Link to="/imoveis">
            <Button
              variant="ghost"
              className="font-paragraph text-foreground/70 hover:text-primary -ml-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Imóveis
            </Button>
          </Link>
        </div>
      </div>

      <div className="min-h-[600px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner />
          </div>
        ) : !property ? (
          <div className="text-center py-32">
            <h2 className="font-heading text-4xl text-primary mb-4">Imóvel não encontrado</h2>
            <p className="font-paragraph text-lg text-foreground/60 mb-8">
              O imóvel que você está procurando não existe ou foi removido.
            </p>
            <Link to="/imoveis">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph font-semibold px-8 h-12"
              >
                Ver Todos os Imóveis
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Hero Image */}
            <section className="w-full bg-white">
              <div className="max-w-[100rem] mx-auto px-20 py-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-[600px] rounded-xl overflow-hidden"
                >
                  <Image
                    src={property.mainImage || 'https://static.wixstatic.com/media/72153f_af83c63f70b64a859f403e4636547a27~mv2.png?originWidth=1152&originHeight=576'}
                    alt={property.title || 'Imóvel'}
                    className="w-full h-full object-cover"
                    width={1200}
                  />
                  <div className="absolute top-8 right-8 bg-accent-gold text-primary px-6 py-3 rounded font-paragraph text-base font-semibold">
                    {property.status || 'Disponível'}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Property Details */}
            <section className="w-full py-20 bg-background">
              <div className="max-w-[100rem] mx-auto px-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <h1 className="font-heading text-5xl text-primary mb-6">
                        {property.title}
                      </h1>

                      <div className="flex items-center gap-3 text-foreground/60 mb-8 font-paragraph text-lg">
                        <MapPin className="w-5 h-5" />
                        <span>{property.address || property.locationRegion}</span>
                      </div>

                      <div className="flex items-center gap-8 mb-12 pb-12 border-b border-foreground/10">
                        {property.bedrooms && (
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center">
                              <Bed className="w-6 h-6 text-accent-gold" />
                            </div>
                            <div>
                              <div className="font-heading text-2xl text-primary">{property.bedrooms}</div>
                              <div className="font-paragraph text-sm text-foreground/60">Quartos</div>
                            </div>
                          </div>
                        )}

                        {property.bathrooms && (
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center">
                              <Bath className="w-6 h-6 text-accent-gold" />
                            </div>
                            <div>
                              <div className="font-heading text-2xl text-primary">{property.bathrooms}</div>
                              <div className="font-paragraph text-sm text-foreground/60">Banheiros</div>
                            </div>
                          </div>
                        )}

                        {property.area && (
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center">
                              <Maximize className="w-6 h-6 text-accent-gold" />
                            </div>
                            <div>
                              <div className="font-heading text-2xl text-primary">{property.area}m²</div>
                              <div className="font-paragraph text-sm text-foreground/60">Área</div>
                            </div>
                          </div>
                        )}

                        {property.propertyType && (
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center">
                              <Home className="w-6 h-6 text-accent-gold" />
                            </div>
                            <div>
                              <div className="font-heading text-2xl text-primary">{property.propertyType}</div>
                              <div className="font-paragraph text-sm text-foreground/60">Tipo</div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mb-12">
                        <h2 className="font-heading text-3xl text-primary mb-6">Descrição</h2>
                        <p className="font-paragraph text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                          {property.description || 'Descrição não disponível.'}
                        </p>
                      </div>

                      {property.locationRegion && (
                        <div className="bg-white rounded-xl p-8 border border-foreground/5">
                          <h2 className="font-heading text-3xl text-primary mb-4">Localização</h2>
                          <p className="font-paragraph text-lg text-foreground/70">
                            {property.locationRegion}
                          </p>
                          {property.address && (
                            <p className="font-paragraph text-base text-foreground/60 mt-2">
                              {property.address}
                            </p>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-1">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="sticky top-32"
                    >
                      <div className="bg-white rounded-xl p-8 border border-foreground/5 mb-8">
                        <div className="mb-8">
                          <div className="font-paragraph text-sm text-foreground/60 mb-2">Valor</div>
                          <div className="font-heading text-4xl text-primary">
                            {property.price ? `R$ ${property.price.toLocaleString('pt-BR')}` : 'Consulte-nos'}
                          </div>
                        </div>

                        <a
                          href="https://wa.me/5511999999999"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mb-4"
                        >
                          <Button
                            size="lg"
                            className="w-full bg-accent-gold hover:bg-accent-gold/90 text-primary font-paragraph font-semibold h-14 text-base"
                          >
                            Entrar em Contato
                          </Button>
                        </a>

                        <Link to="/equipe" className="block">
                          <Button
                            size="lg"
                            variant="outline"
                            className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-paragraph font-semibold h-14 text-base"
                          >
                            Falar com Corretor
                          </Button>
                        </Link>
                      </div>

                      <div className="bg-primary rounded-xl p-8 text-primary-foreground">
                        <h3 className="font-heading text-2xl mb-4">Precisa de Ajuda?</h3>
                        <p className="font-paragraph text-base text-primary-foreground/90 mb-6 leading-relaxed">
                          Nossa equipe está pronta para tirar todas as suas dúvidas e ajudá-lo 
                          a encontrar o imóvel perfeito.
                        </p>
                        <div className="space-y-3 font-paragraph text-sm">
                          <div>
                            <div className="text-primary-foreground/70 mb-1">Telefone</div>
                            <a href="tel:+551134567890" className="text-accent-gold hover:underline">
                              (11) 3456-7890
                            </a>
                          </div>
                          <div>
                            <div className="text-primary-foreground/70 mb-1">E-mail</div>
                            <a href="mailto:contato@batalhaimoveis.com.br" className="text-accent-gold hover:underline">
                              contato@batalhaimoveis.com.br
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
