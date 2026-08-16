import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Imveis } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { generateSlug } from '@/lib/slug';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Briefcase, Building, Building2, ChevronDown, DollarSign, Filter, Home, Landmark, MapPin, Store, Trees, Warehouse, X, Zap } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const GoldBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent-gold/30 rounded-full bg-accent-gold/5 backdrop-blur-sm">
    <div className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
    <span className="text-accent-gold font-paragraph text-xs font-semibold tracking-widest uppercase">
      {children}
    </span>
  </div>
);

// Main property types to show above the popover button
const MAIN_PROPERTY_TYPES = ['Apartamento', 'Casa', 'Terreno', 'Comercial', 'Chácara', 'Casa em condominios'];

// Property type to icon mapping
const propertyTypeIcons: Record<string, React.ReactNode> = {
  'Apartamento': <Building2 className="w-5 h-5" />,
  'Casa': <Home className="w-5 h-5" />,
  'Terreno': <MapPin className="w-5 h-5" />,
  'Comercial': <Store className="w-5 h-5" />,
  'Galpão': <Warehouse className="w-5 h-5" />,
  'Chácara': <Trees className="w-5 h-5" />,
  'Prédio': <Building className="w-5 h-5" />,
  'Lote': <MapPin className="w-5 h-5" />,
  'Sala Comercial': <Briefcase className="w-5 h-5" />,
  'Kitnet': <DollarSign className="w-5 h-5" />,
  'Studio': <Zap className="w-5 h-5" />,
  'Cobertura': <Landmark className="w-5 h-5" />,
};

interface FilterState {
  transactionType: 'comprar' | 'alugar' | null;
  priceRange: [number, number];
  types: string[];
  regions: string[];
  bedrooms: number[];
  bathrooms: number[];
}

interface PropertyCardProps {
  property: Imveis;
  index: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, index }) => {
  const slug = generateSlug(property.title || '');

  // Extract gallery images - handle various formats
  const getGalleryImages = () => {
    if (!property.galeriaDeFotos) return [];

    // If it's an array
    if (Array.isArray(property.galeriaDeFotos)) {
      return property.galeriaDeFotos.slice(0, 3);
    }

    // If it has items property
    if (property.galeriaDeFotos.items && Array.isArray(property.galeriaDeFotos.items)) {
      return property.galeriaDeFotos.items.slice(0, 3);
    }

    return [];
  };

  const images = getGalleryImages();
  const mainImageUrl = property.mainImage || 'https://static.wixstatic.com/media/72153f_1fc5118b7aca44ca85812a98ffaa97cf~mv2.png?originWidth=576&originHeight=448';

  // Extract image URL from various formats
  const getImageUrl = (img: any): string => {
    if (typeof img === 'string') return img;
    if (img?.url) return img.url;
    if (img?.src) return img.src;
    if (img?.slug && typeof img.slug === 'string' && img.slug.startsWith('http')) return img.slug;
    return mainImageUrl;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/imoveis/${slug}`} className="block h-full">
        {/* Mini Gallery Section */}
        <div className="relative h-[280px] md:h-[320px] overflow-hidden bg-gray-100">
          {images.length > 0 ? (
            <div className="grid grid-cols-3 gap-1 h-full">
              {/* Main image - spans 2 columns */}
              <div className="col-span-2 relative overflow-hidden">
                <Image
                  src={mainImageUrl}
                  alt={property.title || 'Imóvel'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  width={400}
                  height={320}
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
              </div>

              {/* Side gallery images */}
              <div className="col-span-1 flex flex-col gap-1">
                {images.slice(0, 2).map((img, i) => (
                  <div key={i} className="flex-1 relative overflow-hidden">
                    <Image
                      src={getImageUrl(img)}
                      alt={`Galeria ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      width={150}
                      height={150}
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Image
              src={mainImageUrl}
              alt={property.title || 'Imóvel'}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              width={400}
              height={320}
            />
          )}

          {/* Status Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-white/95 backdrop-blur text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
              {property.status || 'Disponível'}
            </span>
          </div>

          {/* View All Photos Overlay */}
          {images.length > 0 && (
            <div className="absolute bottom-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-primary/90 backdrop-blur text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 whitespace-nowrap">
                Ver todas as fotos <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          )}
        </div>

        {/* Property Info */}
        <div className="p-4 md:p-5">
          <h3 className="font-heading text-lg md:text-xl text-primary group-hover:text-accent-gold transition-colors line-clamp-1 mb-2">
            {property.title}
          </h3>

          <p className="text-foreground/60 text-xs md:text-sm mb-3 flex items-center gap-1">
            📍 {property.locationRegion || 'Consulte a localização'}
          </p>

          {/* Property Features Grid */}
          <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-gray-100">
            {property.bedrooms && (
              <div className="text-center">
                <div className="text-sm font-heading text-primary">{property.bedrooms}</div>
                <div className="text-xs text-foreground/50">Quartos</div>
              </div>
            )}
            {property.bathrooms && (
              <div className="text-center">
                <div className="text-sm font-heading text-primary">{property.bathrooms}</div>
                <div className="text-xs text-foreground/50">Banheiros</div>
              </div>
            )}
            {property.area && (
              <div className="text-center">
                <div className="text-sm font-heading text-primary">{property.area}</div>
                <div className="text-xs text-foreground/50">m²</div>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="font-heading text-lg md:text-xl text-primary font-semibold">
              {property.price ? `R$ ${property.price.toLocaleString('pt-BR')}` : 'Sob Consulta'}
            </span>
            <div className="text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

interface FilterSectionProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  properties: Imveis[];
  isOpen: boolean;
  onClose: () => void;
}

// Applied Filters Panel Component
const AppliedFiltersPanel: React.FC<{
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}> = ({ filters, onFilterChange, isOpen, onClose }) => {
  const appliedCount = [
    filters.transactionType ? 1 : 0,
    filters.types.length,
    filters.regions.length,
    filters.bedrooms.length,
    filters.bathrooms.length,
  ].reduce((a, b) => a + b, 0);

  const removeFilter = (type: string, value?: any) => {
    if (type === 'transactionType') {
      onFilterChange({ ...filters, transactionType: null });
    } else if (type === 'type') {
      onFilterChange({
        ...filters,
        types: filters.types.filter(t => t !== value),
      });
    } else if (type === 'region') {
      onFilterChange({
        ...filters,
        regions: filters.regions.filter(r => r !== value),
      });
    } else if (type === 'bedroom') {
      onFilterChange({
        ...filters,
        bedrooms: filters.bedrooms.filter(b => b !== value),
      });
    } else if (type === 'bathroom') {
      onFilterChange({
        ...filters,
        bathrooms: filters.bathrooms.filter(b => b !== value),
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed md:absolute right-0 top-0 h-screen md:h-auto w-80 md:w-96 bg-white z-50 md:z-40 overflow-y-auto shadow-lg rounded-l-lg md:rounded-lg md:border md:border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-lg text-primary">Filtros Aplicados</h3>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {appliedCount === 0 ? (
                <p className="text-foreground/50 font-paragraph text-sm">Nenhum filtro aplicado</p>
              ) : (
                <div className="space-y-3">
                  {filters.transactionType && (
                    <div className="flex items-center justify-between bg-accent-gold/10 px-3 py-2 rounded-lg">
                      <span className="font-paragraph text-sm capitalize">
                        {filters.transactionType === 'comprar' ? 'Comprar' : 'Alugar'}
                      </span>
                      <button
                        onClick={() => removeFilter('transactionType')}
                        className="text-accent-gold hover:text-accent-gold/70 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {filters.types.map(type => (
                    <div key={type} className="flex items-center justify-between bg-accent-gold/10 px-3 py-2 rounded-lg">
                      <span className="font-paragraph text-sm">{type}</span>
                      <button
                        onClick={() => removeFilter('type', type)}
                        className="text-accent-gold hover:text-accent-gold/70 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {filters.regions.map(region => (
                    <div key={region} className="flex items-center justify-between bg-accent-gold/10 px-3 py-2 rounded-lg">
                      <span className="font-paragraph text-sm">{region}</span>
                      <button
                        onClick={() => removeFilter('region', region)}
                        className="text-accent-gold hover:text-accent-gold/70 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {filters.bedrooms.map(count => (
                    <div key={`bed-${count}`} className="flex items-center justify-between bg-accent-gold/10 px-3 py-2 rounded-lg">
                      <span className="font-paragraph text-sm">{count}+ Quartos</span>
                      <button
                        onClick={() => removeFilter('bedroom', count)}
                        className="text-accent-gold hover:text-accent-gold/70 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {filters.bathrooms.map(count => (
                    <div key={`bath-${count}`} className="flex items-center justify-between bg-accent-gold/10 px-3 py-2 rounded-lg">
                      <span className="font-paragraph text-sm">{count}+ Banheiros</span>
                      <button
                        onClick={() => removeFilter('bathroom', count)}
                        className="text-accent-gold hover:text-accent-gold/70 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Property Types Popover Component with Icon Buttons
const PropertyTypesPopover: React.FC<{
  types: string[];
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  isOpen: boolean;
  onClose: () => void;
}> = ({ types, selectedTypes, onTypeToggle, isOpen, onClose }) => {
  // Filter out main types to show only additional types in popover
  const additionalTypes = types.filter(type => !MAIN_PROPERTY_TYPES.includes(type));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-40 p-6"
          >
            <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              {additionalTypes.map(type => (
                <button
                  key={type}
                  onClick={() => onTypeToggle(type)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                    selectedTypes.includes(type)
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className={`${selectedTypes.includes(type) ? 'text-primary' : 'text-foreground/60'}`}>
                    {propertyTypeIcons[type] || <Building2 className="w-5 h-5" />}
                  </div>
                  <span className={`font-paragraph text-xs text-center leading-tight ${
                    selectedTypes.includes(type) ? 'text-primary font-semibold' : 'text-foreground/70'
                  }`}>
                    {type}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const FilterSidebar: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
  properties,
  isOpen,
  onClose,
}) => {
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    price: true,
    region: true,
    bedrooms: false,
    bathrooms: false,
  });
  const [typesPopoverOpen, setTypesPopoverOpen] = useState(false);
  const [appliedFiltersOpen, setAppliedFiltersOpen] = useState(false);

  const uniqueTypes = Array.from(new Set(properties.map(p => p.propertyType).filter(Boolean)));
  const uniqueRegions = Array.from(new Set(properties.map(p => p.locationRegion).filter(Boolean)));
  const maxPrice = Math.max(...properties.map(p => p.price || 0));
  const minPrice = Math.min(...properties.map(p => p.price || 0).filter(p => p > 0));

  const appliedFiltersCount = [
    filters.transactionType ? 1 : 0,
    filters.types.length,
    filters.regions.length,
    filters.bedrooms.length,
    filters.bathrooms.length,
  ].reduce((a, b) => a + b, 0);

  const toggleFilter = (filterName: string) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onFilterChange({
      ...filters,
      priceRange: [filters.priceRange[0], value]
    });
  };

  const handleTypeToggle = (type: string) => {
    onFilterChange({
      ...filters,
      types: filters.types.includes(type)
        ? filters.types.filter(t => t !== type)
        : [...filters.types, type]
    });
  };

  const handleRegionToggle = (region: string) => {
    onFilterChange({
      ...filters,
      regions: filters.regions.includes(region)
        ? filters.regions.filter(r => r !== region)
        : [...filters.regions, region]
    });
  };

  const handleBedroomToggle = (count: number) => {
    onFilterChange({
      ...filters,
      bedrooms: filters.bedrooms.includes(count)
        ? filters.bedrooms.filter(b => b !== count)
        : [...filters.bedrooms, count]
    });
  };

  const handleBathroomToggle = (count: number) => {
    onFilterChange({
      ...filters,
      bathrooms: filters.bathrooms.includes(count)
        ? filters.bathrooms.filter(b => b !== count)
        : [...filters.bathrooms, count]
    });
  };

  const handleReset = () => {
    onFilterChange({
      transactionType: null,
      priceRange: [0, maxPrice],
      types: [],
      regions: [],
      bedrooms: [],
      bathrooms: [],
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: isOpen ? 0 : -300, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed md:relative md:translate-x-0 left-0 top-0 h-screen md:h-auto w-72 md:w-64 bg-white z-50 md:z-0 overflow-y-auto md:overflow-visible shadow-lg md:shadow-none rounded-r-lg md:rounded-none"
      >
        <div className="p-6 md:p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 md:mb-4">
            <h3 className="font-heading text-xl md:text-lg text-primary">Filtros</h3>
            <button
              onClick={onClose}
              className="md:hidden p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full text-xs text-accent-gold hover:text-accent-gold/80 font-semibold mb-6 md:mb-4 transition-colors"
          >
            Limpar Filtros
          </button>

          {/* Transaction Type - Toggle Buttons */}
          <div className="mb-6 md:mb-4">
            <span className="font-heading text-sm md:text-xs uppercase text-primary font-semibold block mb-3 md:mb-2">Tipo de Transação</span>
            <div className="flex gap-2">
              <button
                onClick={() => onFilterChange({
                  ...filters,
                  transactionType: filters.transactionType === 'comprar' ? null : 'comprar'
                })}
                className={`flex-1 py-2 px-3 rounded-lg font-paragraph text-sm transition-all ${
                  filters.transactionType === 'comprar'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-foreground hover:bg-gray-200'
                }`}
              >
                Comprar
              </button>
              <button
                onClick={() => onFilterChange({
                  ...filters,
                  transactionType: filters.transactionType === 'alugar' ? null : 'alugar'
                })}
                className={`flex-1 py-2 px-3 rounded-lg font-paragraph text-sm transition-all ${
                  filters.transactionType === 'alugar'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-foreground hover:bg-gray-200'
                }`}
              >
                Alugar
              </button>
            </div>
          </div>

          {/* Price Filter */}
          <div className="mb-6 md:mb-4">
            <button
              onClick={() => toggleFilter('price')}
              className="flex items-center justify-between w-full mb-3 md:mb-2"
            >
              <span className="font-heading text-sm md:text-xs uppercase text-primary font-semibold">Preço</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${expandedFilters.price ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedFilters.price && (
              <div className="space-y-3 md:space-y-2">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={filters.priceRange[1]}
                  onChange={handlePriceChange}
                  className="w-full"
                />
                <div className="text-xs text-foreground/60">
                  Até R$ {filters.priceRange[1].toLocaleString('pt-BR')}
                </div>
              </div>
            )}
          </div>

          {/* Type Filter - Main Types as Buttons + Popover for Others */}
          <div className="mb-6 md:mb-4">
            <span className="font-heading text-sm md:text-xs uppercase text-primary font-semibold block mb-3 md:mb-2">Tipo de Imóvel</span>

            {/* Main Property Types Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {MAIN_PROPERTY_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => handleTypeToggle(type)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                    filters.types.includes(type)
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className={`${filters.types.includes(type) ? 'text-primary' : 'text-foreground/60'}`}>
                    {propertyTypeIcons[type] || <Building2 className="w-5 h-5" />}
                  </div>
                  <span className={`font-paragraph text-xs text-center leading-tight ${
                    filters.types.includes(type) ? 'text-primary font-semibold' : 'text-foreground/70'
                  }`}>
                    {type}
                  </span>
                </button>
              ))}
            </div>

            {/* See All Types Button with Popover */}
            <div className="relative">
              <button
                onClick={() => setTypesPopoverOpen(!typesPopoverOpen)}
                className="w-full flex items-center justify-between py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <span className="font-paragraph text-sm text-foreground">
                  {filters.types.length > MAIN_PROPERTY_TYPES.length ? `${filters.types.length} tipo(s)` : 'Ver todos os tipos'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${typesPopoverOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <PropertyTypesPopover
                types={uniqueTypes}
                selectedTypes={filters.types}
                onTypeToggle={handleTypeToggle}
                isOpen={typesPopoverOpen}
                onClose={() => setTypesPopoverOpen(false)}
              />
            </div>
          </div>

          {/* Region Filter */}
          <div className="mb-6 md:mb-4">
            <button
              onClick={() => toggleFilter('region')}
              className="flex items-center justify-between w-full mb-3 md:mb-2"
            >
              <span className="font-heading text-sm md:text-xs uppercase text-primary font-semibold">Região</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${expandedFilters.region ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedFilters.region && (
              <div className="space-y-2 md:space-y-1">
                {uniqueRegions.map(region => (
                  <label key={region} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.regions.includes(region)}
                      onChange={() => handleRegionToggle(region)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm md:text-xs text-foreground/70">{region}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Bedrooms Filter */}
          <div className="mb-6 md:mb-4">
            <button
              onClick={() => toggleFilter('bedrooms')}
              className="flex items-center justify-between w-full mb-3 md:mb-2"
            >
              <span className="font-heading text-sm md:text-xs uppercase text-primary font-semibold">Quartos</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${expandedFilters.bedrooms ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedFilters.bedrooms && (
              <div className="space-y-2 md:space-y-1">
                {[1, 2, 3, 4, 5].map(count => (
                  <label key={count} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.bedrooms.includes(count)}
                      onChange={() => handleBedroomToggle(count)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm md:text-xs text-foreground/70">{count}+ Quartos</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Bathrooms Filter */}
          <div className="mb-6 md:mb-4">
            <button
              onClick={() => toggleFilter('bathrooms')}
              className="flex items-center justify-between w-full mb-3 md:mb-2"
            >
              <span className="font-heading text-sm md:text-xs uppercase text-primary font-semibold">Banheiros</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${expandedFilters.bathrooms ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedFilters.bathrooms && (
              <div className="space-y-2 md:space-y-1">
                {[1, 2, 3, 4].map(count => (
                  <label key={count} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.bathrooms.includes(count)}
                      onChange={() => handleBathroomToggle(count)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm md:text-xs text-foreground/70">{count}+ Banheiros</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Applied Filters Panel */}
      <AppliedFiltersPanel
        filters={filters}
        onFilterChange={onFilterChange}
        isOpen={appliedFiltersOpen}
        onClose={() => setAppliedFiltersOpen(false)}
      />

      {/* Applied Filters Counter Button - Desktop */}
      {appliedFiltersCount > 0 && (
        <button
          onClick={() => setAppliedFiltersOpen(!appliedFiltersOpen)}
          className="hidden md:flex absolute top-0 right-0 items-center gap-2 px-4 py-2 bg-accent-gold/10 hover:bg-accent-gold/20 rounded-lg transition-colors border border-accent-gold/30"
        >
          <Filter className="w-4 h-4 text-accent-gold" />
          <span className="font-paragraph text-sm font-semibold text-accent-gold">{appliedFiltersCount} aplicados</span>
        </button>
      )}
    </>
  );
};

export default function FeaturedPropertiesSection() {
  const [properties, setProperties] = useState<Imveis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFiltersOpen, setAppliedFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    transactionType: null,
    priceRange: [0, 10000000],
    types: [],
    regions: [],
    bedrooms: [],
    bathrooms: [],
  });

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const result = await BaseCrudService.getAll<Imveis>('properties', [], { limit: 50 });
      setProperties(result.items);
      if (result.items.length > 0) {
        const maxPrice = Math.max(...result.items.map(p => p.price || 0));
        setFilters(prev => ({
          ...prev,
          priceRange: [0, maxPrice]
        }));
      }
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const appliedFiltersCount = [
    filters.transactionType ? 1 : 0,
    filters.types.length,
    filters.regions.length,
    filters.bedrooms.length,
    filters.bathrooms.length,
  ].reduce((a, b) => a + b, 0);

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const price = property.price || 0;
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;

      if (filters.types.length > 0 && !filters.types.includes(property.propertyType || '')) return false;
      if (filters.regions.length > 0 && !filters.regions.includes(property.locationRegion || '')) return false;

      if (filters.bedrooms.length > 0) {
        const hasMatchingBedrooms = filters.bedrooms.some(count => (property.bedrooms || 0) >= count);
        if (!hasMatchingBedrooms) return false;
      }

      if (filters.bathrooms.length > 0) {
        const hasMatchingBathrooms = filters.bathrooms.some(count => (property.bathrooms || 0) >= count);
        if (!hasMatchingBathrooms) return false;
      }

      return true;
    });
  }, [properties, filters]);

  return (
    <section id="imoveis-destaque" className="w-full py-20 md:py-32 bg-gray-50">
      <div className="max-w-[120rem] mx-auto px-4 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <GoldBadge>Coleção Exclusiva</GoldBadge>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary mt-4 md:mt-6 mb-3 md:mb-4">
              Oportunidades em Destaque
            </h2>
            <p className="font-paragraph text-base md:text-lg text-foreground/60">
              Uma seleção curada dos imóveis mais distintos do nosso portfólio.
            </p>
          </div>
          <Link to="/imoveis">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-all h-12 px-6 md:px-8 font-paragraph whitespace-nowrap">
              Ver Todo o Portfólio
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex gap-6 md:gap-8 relative">
          {/* Filter Toggle Button - Mobile */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden fixed bottom-6 right-6 z-40 bg-accent-gold text-primary p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Toggle filters"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>

          {/* Applied Filters Counter Button - Mobile */}
          {appliedFiltersCount > 0 && (
            <button
              onClick={() => setAppliedFiltersOpen(!appliedFiltersOpen)}
              className="md:hidden fixed bottom-24 right-6 z-40 flex items-center gap-2 px-3 py-2 bg-accent-gold text-primary rounded-full shadow-lg hover:shadow-xl transition-shadow font-paragraph text-sm font-semibold"
            >
              <Filter className="w-4 h-4" />
              {appliedFiltersCount}
            </button>
          )}

          {/* Sidebar */}
          <div className="hidden md:block md:w-64 flex-shrink-0 relative">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              properties={properties}
              isOpen={true}
              onClose={() => { }}
            />
          </div>

          {/* Mobile Sidebar */}
          <div className="md:hidden">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              properties={properties}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
            <AppliedFiltersPanel
              filters={filters}
              onFilterChange={setFilters}
              isOpen={appliedFiltersOpen}
              onClose={() => setAppliedFiltersOpen(false)}
            />
          </div>

          {/* Properties Grid */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-[400px] bg-gray-200 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProperties.map((property, index) => (
                  <PropertyCard key={property._id} property={property} index={index} />
                ))}
              </div>
            ) : (
              <div className="w-full h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-foreground/50 font-paragraph text-center">
                  Nenhum imóvel encontrado com os filtros selecionados.
                </p>
              </div>
            )}

            {/* Results Count */}
            {!isLoading && (
              <div className="mt-8 md:mt-12 text-center">
                <p className="text-foreground/60 font-paragraph text-sm md:text-base">
                  Mostrando {filteredProperties.length} de {properties.length} imóveis
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
