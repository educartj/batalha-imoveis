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
import { MapPin, Home, Bed, Bath, Maximize, ArrowLeft, X, Play } from 'lucide-react';

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Imveis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [mediaFilter, setMediaFilter] = useState<'all' | 'photos' | 'videos'>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Helper function to detect if media is a video
  const isVideoMedia = (mediaUrl: string): boolean => {
    if (!mediaUrl) return false;
    const videoExtensions = /\.(mp4|webm|ogg|mov|avi|mkv|m4v|flv|wmv|3gp)$/i;
    const videoMimeTypes = /video\//i;
    return videoExtensions.test(mediaUrl) || videoMimeTypes.test(mediaUrl);
  };

  // Get media URL from various formats
  const getMediaUrl = (media: any): string => {
    if (!media) return '';
    if (typeof media === 'string') return media;
    // Handle Wix media gallery format
    if (media?.url) return media.url;
    if (media?.src) return media.src;
    if (media?.image) return media.image;
    if (media?.videoUrl) return media.videoUrl;
    if (media?.videoSrc) return media.videoSrc;
    return '';
  };

  // Get filtered media items
  const getFilteredMedia = () => {
    if (!property?.galeriaDeFotos) return [];
    return property.galeriaDeFotos.filter((media: any) => {
      const mediaUrl = getMediaUrl(media);
      const isVideo = isVideoMedia(mediaUrl);
      
      if (mediaFilter === 'photos') return !isVideo;
      if (mediaFilter === 'videos') return isVideo;
      return true;
    });
  };

  const filteredMedia = getFilteredMedia();

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
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
              <div className="max-w-[100rem] mx-auto py-12 px-2.5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-[400px] md:h-[600px] rounded-xl overflow-hidden"
                >
                  <Image
                    src={property.mainImage || 'https://static.wixstatic.com/media/72153f_af83c63f70b64a859f403e4636547a27~mv2.png?originWidth=1152&originHeight=576'}
                    alt={property.title || 'Imóvel'}
                    className="w-full h-full object-cover"
                    width={1200}
                    height={600}
                  />
                  <div className="absolute top-8 right-8 bg-accent-gold text-primary px-6 py-3 rounded font-paragraph text-base font-semibold">
                    {property.status || 'Disponível'}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Property Details */}
            <section className="w-full py-20 bg-background">
              <div className="max-w-[100rem] mx-auto py-0 px-[30px]">
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

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 pb-12 border-b border-foreground/10">
                        {property.bedrooms && (
                          <div className="flex items-center gap-3 justify-start">
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

                      {/* Gallery Section */}
                      {property.galeriaDeFotos && property.galeriaDeFotos.length > 0 && (
                        <div className="mb-12">
                          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                            <h2 className="font-heading text-3xl text-primary">Galeria de Fotos e Vídeos</h2>
                            
                            {/* Filter Buttons */}
                            <div className="flex gap-3">
                              <button
                                onClick={() => setMediaFilter('all')}
                                className={`px-4 py-2 rounded-lg font-paragraph font-semibold transition-colors ${
                                  mediaFilter === 'all'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-foreground/5 text-foreground hover:bg-foreground/10'
                                }`}
                              >
                                Todos
                              </button>
                              <button
                                onClick={() => setMediaFilter('photos')}
                                className={`px-4 py-2 rounded-lg font-paragraph font-semibold transition-colors ${
                                  mediaFilter === 'photos'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-foreground/5 text-foreground hover:bg-foreground/10'
                                }`}
                              >
                                Fotos
                              </button>
                              <button
                                onClick={() => setMediaFilter('videos')}
                                className={`px-4 py-2 rounded-lg font-paragraph font-semibold transition-colors ${
                                  mediaFilter === 'videos'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-foreground/5 text-foreground hover:bg-foreground/10'
                                }`}
                              >
                                Vídeos
                              </button>
                            </div>
                          </div>
                          
                          {/* Main Gallery - Horizontal Scroll */}
                          {filteredMedia.length > 0 ? (
                            <div className="relative">
                              {/* Scroll Container */}
                              <div
                                ref={scrollContainerRef}
                                className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
                                style={{ scrollBehavior: 'smooth' }}
                              >
                                {filteredMedia.map((media: any, displayIndex: number) => {
                                  const mediaUrl = getMediaUrl(media);
                                  
                                  // Detect if it's a video based on file extension or type
                                  const isVideo = isVideoMedia(mediaUrl);
                                  
                                  // Find the actual index in the original gallery for lightbox navigation
                                  const actualIndex = property.galeriaDeFotos.findIndex((m: any) => {
                                    const mUrl = getMediaUrl(m);
                                    return mUrl === mediaUrl;
                                  });
                                  
                                  return (
                                    <motion.div
                                      key={displayIndex}
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.4, delay: displayIndex * 0.05 }}
                                      className="relative h-[280px] min-w-[380px] md:h-[350px] md:min-w-[480px] rounded-lg overflow-hidden cursor-pointer group flex-shrink-0"
                                      onClick={() => setSelectedImageIndex(actualIndex)}
                                    >
                                      {isVideo ? (
                                        <>
                                          <video
                                            src={mediaUrl}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                          />
                                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                              <div className="w-16 h-16 bg-accent-gold rounded-full flex items-center justify-center shadow-lg">
                                                <Play className="w-8 h-8 text-primary fill-primary" />
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <Image
                                            src={mediaUrl || 'https://static.wixstatic.com/media/72153f_af83c63f70b64a859f403e4636547a27~mv2.png?originWidth=1152&originHeight=576'}
                                            alt={`Galeria ${displayIndex + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            width={600}
                                            height={600}
                                          />
                                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                              <div className="w-16 h-16 bg-accent-gold rounded-full flex items-center justify-center shadow-lg">
                                                <span className="text-primary font-semibold text-2xl">+</span>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </motion.div>
                                  );
                                })}
                              </div>

                              {/* Navigation Arrows */}
                              <button
                                onClick={scrollLeft}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 md:-translate-x-8 z-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-3 md:p-4 transition-all duration-300 shadow-lg hover:shadow-xl"
                              >
                                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                              </button>
                              <button
                                onClick={scrollRight}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 md:translate-x-8 z-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-3 md:p-4 transition-all duration-300 shadow-lg hover:shadow-xl"
                              >
                                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                              </button>
                            </div>
                          ) : (
                            <div className="text-center py-12 bg-foreground/5 rounded-lg">
                              <p className="font-paragraph text-lg text-foreground/60">
                                Nenhum {mediaFilter === 'videos' ? 'vídeo' : mediaFilter === 'photos' ? 'foto' : 'mídia'} disponível
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Lightbox Modal */}
                      {selectedImageIndex !== null && property.galeriaDeFotos && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4"
                          onClick={() => setSelectedImageIndex(null)}
                        >
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-2xl sm:max-w-4xl max-h-[85vh] sm:max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {(() => {
                              const selectedMedia = property.galeriaDeFotos[selectedImageIndex];
                              const mediaUrl = getMediaUrl(selectedMedia);
                              const isVideo = isVideoMedia(mediaUrl);
                              
                              return isVideo ? (
                                <video
                                  src={mediaUrl}
                                  controls
                                  autoPlay
                                  className="w-full h-full object-contain rounded-lg"
                                />
                              ) : (
                                <Image
                                  src={mediaUrl || 'https://static.wixstatic.com/media/72153f_af83c63f70b64a859f403e4636547a27~mv2.png?originWidth=1152&originHeight=576'}
                                  alt={`Galeria ${selectedImageIndex + 1}`}
                                  className="w-full h-full object-contain rounded-lg"
                                  width={1000}
                                  height={600}
                                />
                              );
                            })()}
                            
                            {/* Close Button */}
                            <button
                              onClick={() => setSelectedImageIndex(null)}
                              className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-accent-gold hover:bg-accent-gold/90 text-primary rounded-full p-1.5 sm:p-2 transition-colors"
                            >
                              <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>

                            {/* Navigation */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2 items-center bg-black/50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full">
                              <button
                                onClick={() => setSelectedImageIndex((prev) => 
                                  prev === 0 ? property.galeriaDeFotos.length - 1 : prev! - 1
                                )}
                                className="text-accent-gold hover:text-accent-gold/80 font-semibold text-xs sm:text-sm px-1.5 sm:px-3 py-0.5 sm:py-1"
                              >
                                ← Anterior
                              </button>
                              <span className="text-primary-foreground text-xs sm:text-sm font-paragraph">
                                {selectedImageIndex + 1} / {property.galeriaDeFotos.length}
                              </span>
                              <button
                                onClick={() => setSelectedImageIndex((prev) => 
                                  prev === property.galeriaDeFotos.length - 1 ? 0 : prev! + 1
                                )}
                                className="text-accent-gold hover:text-accent-gold/80 font-semibold text-xs sm:text-sm px-1.5 sm:px-3 py-0.5 sm:py-1"
                              >
                                Próxima →
                              </button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}

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
