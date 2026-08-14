import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { Imveis } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function DiagnosticsPage() {
  const [properties, setProperties] = useState<Imveis[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const result = await BaseCrudService.getAll<Imveis>('properties', [], { limit: 1000 });
      setProperties(result.items);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const propertiesWithVideos = properties.filter(p => p.video);
  const propertiesWithGallery = properties.filter(p => p.galeriaDeFotos && p.galeriaDeFotos.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-[100rem] mx-auto px-6 py-12">
        <h1 className="font-heading text-5xl text-primary mb-8">Diagnóstico de Imóveis</h1>

        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg border border-foreground/10">
                <div className="font-paragraph text-sm text-foreground/60 mb-2">Total de Imóveis</div>
                <div className="font-heading text-4xl text-primary">{properties.length}</div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-foreground/10">
                <div className="font-paragraph text-sm text-foreground/60 mb-2">Com Vídeos</div>
                <div className="font-heading text-4xl text-accent-gold">{propertiesWithVideos.length}</div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-foreground/10">
                <div className="font-paragraph text-sm text-foreground/60 mb-2">Com Galeria</div>
                <div className="font-heading text-4xl text-secondary">{propertiesWithGallery.length}</div>
              </div>
            </div>

            {/* Properties with Videos */}
            <div className="mb-12">
              <h2 className="font-heading text-3xl text-primary mb-6">Imóveis com Vídeos ({propertiesWithVideos.length})</h2>
              {propertiesWithVideos.length > 0 ? (
                <div className="space-y-4">
                  {propertiesWithVideos.map((property) => (
                    <div key={property._id} className="bg-white p-6 rounded-lg border border-foreground/10">
                      <h3 className="font-heading text-xl text-primary mb-2">{property.title}</h3>
                      <p className="font-paragraph text-sm text-foreground/60 mb-2">ID: {property._id}</p>
                      <p className="font-paragraph text-sm text-foreground/60 mb-2">Vídeo URL:</p>
                      <p className="font-paragraph text-xs bg-foreground/5 p-3 rounded break-all mb-2">{property.video}</p>
                      <details className="text-sm">
                        <summary className="cursor-pointer text-primary font-semibold">Ver dados completos</summary>
                        <pre className="bg-foreground/5 p-3 rounded mt-2 text-xs overflow-auto">
                          {JSON.stringify(property, null, 2)}
                        </pre>
                      </details>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-foreground/5 p-6 rounded-lg text-center">
                  <p className="font-paragraph text-lg text-foreground/60">Nenhum imóvel com vídeo encontrado</p>
                </div>
              )}
            </div>

            {/* All Properties Summary */}
            <div className="mb-12">
              <h2 className="font-heading text-3xl text-primary mb-6">Resumo de Todos os Imóveis</h2>
              <div className="space-y-2">
                {properties.map((property) => (
                  <div key={property._id} className="bg-white p-4 rounded-lg border border-foreground/10 flex justify-between items-center">
                    <div>
                      <p className="font-heading text-lg text-primary">{property.title}</p>
                      <p className="font-paragraph text-sm text-foreground/60">ID: {property._id}</p>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span className={`px-3 py-1 rounded ${property.video ? 'bg-accent-gold text-primary' : 'bg-foreground/5 text-foreground/60'}`}>
                        Vídeo: {property.video ? '✓' : '✗'}
                      </span>
                      <span className={`px-3 py-1 rounded ${property.galeriaDeFotos && property.galeriaDeFotos.length > 0 ? 'bg-secondary text-white' : 'bg-foreground/5 text-foreground/60'}`}>
                        Galeria: {property.galeriaDeFotos?.length || 0}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
