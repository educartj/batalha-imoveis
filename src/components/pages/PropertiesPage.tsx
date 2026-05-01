import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BaseCrudService } from '@/integrations';
import { Imveis } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Search } from 'lucide-react';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Imveis[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Imveis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const LIMIT = 12;

  useEffect(() => {
    loadProperties();
  }, [skip]);

  useEffect(() => {
    filterProperties();
  }, [properties, searchTerm, selectedType, selectedStatus, selectedRegion]);

  const loadProperties = async () => {
    try {
      const result = await BaseCrudService.getAll<Imveis>('properties', [], { limit: LIMIT, skip });
      if (skip === 0) {
        setProperties(result.items);
      } else {
        setProperties(prev => [...prev, ...result.items]);
      }
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProperties = () => {
    let filtered = [...properties];

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.locationRegion?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((p) => p.propertyType === selectedType);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((p) => p.status === selectedStatus);
    }

    if (selectedRegion !== 'all') {
      filtered = filtered.filter((p) => p.locationRegion === selectedRegion);
    }

    setFilteredProperties(filtered);
  };

  const loadMore = () => {
    setSkip(prev => prev + LIMIT);
  };

  const uniqueTypes = Array.from(new Set(properties.map((p) => p.propertyType).filter(Boolean)));
  const uniqueStatuses = Array.from(new Set(properties.map((p) => p.status).filter(Boolean)));
  const uniqueRegions = Array.from(new Set(properties.map((p) => p.locationRegion).filter(Boolean)));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="w-full bg-primary py-24">
        <div className="max-w-[100rem] mx-auto py-0 px-[3px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto py-0 px-5"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-accent-gold" />
              <span className="text-accent-gold font-paragraph text-sm tracking-wider uppercase">
                Nosso Portfólio
              </span>
              <div className="h-px w-12 bg-accent-gold" />
            </div>

            <h1 className="font-heading text-6xl md:text-7xl text-primary-foreground mb-8">
              Encontre seu Imóvel Ideal
            </h1>

            <p className="font-paragraph text-xl text-primary-foreground/90 leading-relaxed">
              Explore nossa seleção exclusiva de imóveis para venda e locação
            </p>
          </motion.div>
        </div>
      </section>
      {/* Filters Section */}
      <section className="w-full bg-white py-12 border-b border-foreground/10">
        <div className="max-w-[100rem] mx-auto py-0 px-[30px]">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <Input
                type="text"
                placeholder="Buscar por título, endereço ou região..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 font-paragraph border-foreground/20"
              />
            </div>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="h-12 font-paragraph border-foreground/20">
                <SelectValue placeholder="Tipo de Imóvel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type!}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="h-12 font-paragraph border-foreground/20">
                <SelectValue placeholder="Finalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {uniqueStatuses.map((status) => (
                  <SelectItem key={status} value={status!}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Region Filter */}
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="h-12 font-paragraph border-foreground/20">
                <SelectValue placeholder="Região" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Regiões</SelectItem>
                {uniqueRegions.map((region) => (
                  <SelectItem key={region} value={region!}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
      {/* Properties Grid */}
      <section className="w-full py-20 bg-background">
        <div className="max-w-[100rem] mx-auto py-0 px-2.5">
          <div className="min-h-[600px]">
            {isLoading ? null : filteredProperties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {filteredProperties.map((property, index) => (
                    <motion.div
                      key={property._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                      <Link to={`/imoveis/${property._id}`}>
                        <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-foreground/5">
                          <div className="relative h-[300px] md:h-[400px] lg:h-[600px] overflow-hidden">
                            <Image
                              src={property.mainImage || 'https://static.wixstatic.com/media/72153f_a3990356e8534ff99a39e119595042db~mv2.png?originWidth=384&originHeight=448'}
                              alt={property.title || 'Imóvel'}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              width={600}
                              height={600}
                            />
                            <div className="absolute top-4 right-4 bg-accent-gold text-primary px-4 py-2 rounded font-paragraph text-sm font-semibold">
                              {property.status || 'Disponível'}
                            </div>
                          </div>

                          <div className="p-8">
                            <h3 className="font-heading text-2xl text-primary mb-3 group-hover:text-accent-gold transition-colors">
                              {property.title}
                            </h3>

                            <div className="flex items-center gap-2 text-foreground/60 mb-4 font-paragraph text-sm">
                              <MapPin className="w-4 h-4" />
                              <span>{property.locationRegion}</span>
                            </div>

                            <div className="flex items-center gap-6 mb-6 font-paragraph text-sm text-foreground/70">
                              {property.bedrooms && (
                                <span>{property.bedrooms} quartos</span>
                              )}
                              {property.bathrooms && (
                                <span>{property.bathrooms} banheiros</span>
                              )}
                              {property.area && (
                                <span>{property.area}m²</span>
                              )}
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-foreground/10">
                              <div className="font-heading text-3xl text-primary">
                                {property.price ? `R$ ${property.price.toLocaleString('pt-BR')}` : 'Consulte'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {hasNext && (
                  <div className="text-center mt-16">
                    <Button
                      onClick={loadMore}
                      size="lg"
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-paragraph font-semibold px-10 py-6 text-base h-auto"
                    >
                      Carregar Mais Imóveis
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-32">
                <p className="font-paragraph text-xl text-foreground/60 mb-4">
                  Nenhum imóvel encontrado com os filtros selecionados
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                    setSelectedStatus('all');
                    setSelectedRegion('all');
                  }}
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-paragraph"
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
