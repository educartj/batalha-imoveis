import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { Imveis } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Copy, Check } from 'lucide-react';

export default function DiagnosticsPage() {
  const [properties, setProperties] = useState<Imveis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      console.log('🔍 Iniciando busca de imóveis...');
      const result = await BaseCrudService.getAll<Imveis>('properties', [], { limit: 1000 });
      console.log('✅ Resultado da busca:', result);
      console.log('📊 Total de imóveis:', result.items.length);
      console.log('📋 Imóveis completos:', result.items);
      setProperties(result.items);
      setError(null);
    } catch (error) {
      console.error('❌ Erro ao carregar imóveis:', error);
      setError(`Erro ao carregar imóveis: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const propertiesWithVideos = properties.filter(p => p.video && p.video.trim() !== '');
  const propertiesWithGallery = properties.filter(p => p.galeriaDeFotos && Array.isArray(p.galeriaDeFotos) && p.galeriaDeFotos.length > 0);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-[100rem] mx-auto px-6 py-12">
        <h1 className="font-heading text-5xl text-primary mb-2">Diagnóstico de Imóveis</h1>
        <p className="font-paragraph text-lg text-foreground/60 mb-8">Teste de busca e validação de dados do CMS</p>

        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive p-6 rounded-lg mb-8">
            <p className="font-paragraph font-semibold mb-2">Erro detectado:</p>
            <p className="font-paragraph text-sm">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
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
              <div className="bg-white p-6 rounded-lg border border-foreground/10">
                <div className="font-paragraph text-sm text-foreground/60 mb-2">Sem Mídia</div>
                <div className="font-heading text-4xl text-foreground/40">
                  {properties.length - propertiesWithVideos.length - propertiesWithGallery.length}
                </div>
              </div>
            </div>

            {/* Properties with Videos */}
            <div className="mb-12">
              <h2 className="font-heading text-3xl text-primary mb-6">Imóveis com Vídeos ({propertiesWithVideos.length})</h2>
              {propertiesWithVideos.length > 0 ? (
                <div className="space-y-4">
                  {propertiesWithVideos.map((property) => (
                    <div key={property._id} className="bg-white p-6 rounded-lg border border-foreground/10">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-heading text-xl text-primary mb-2">{property.title}</h3>
                          <p className="font-paragraph text-sm text-foreground/60">ID: {property._id}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(property._id, `id-${property._id}`)}
                          className="p-2 hover:bg-foreground/5 rounded transition-colors"
                          title="Copiar ID"
                        >
                          {copiedId === `id-${property._id}` ? (
                            <Check className="w-4 h-4 text-accent-gold" />
                          ) : (
                            <Copy className="w-4 h-4 text-foreground/40" />
                          )}
                        </button>
                      </div>

                      <div className="mb-4">
                        <p className="font-paragraph text-sm text-foreground/60 mb-2">Vídeo URL:</p>
                        <div className="flex items-center gap-2">
                          <p className="font-paragraph text-xs bg-foreground/5 p-3 rounded break-all flex-1">{property.video}</p>
                          <button
                            onClick={() => copyToClipboard(property.video || '', `video-${property._id}`)}
                            className="p-2 hover:bg-foreground/5 rounded transition-colors flex-shrink-0"
                            title="Copiar URL"
                          >
                            {copiedId === `video-${property._id}` ? (
                              <Check className="w-4 h-4 text-accent-gold" />
                            ) : (
                              <Copy className="w-4 h-4 text-foreground/40" />
                            )}
                          </button>
                        </div>
                      </div>

                      {property.video && (
                        <div className="mb-4 p-4 bg-foreground/5 rounded">
                          <p className="font-paragraph text-xs text-foreground/60 mb-2">Pré-visualização do vídeo:</p>
                          <video
                            src={property.video}
                            controls
                            className="w-full max-h-[300px] rounded bg-black"
                            onError={(e) => {
                              console.error('❌ Erro ao carregar vídeo:', property.video);
                              console.error('Detalhes do erro:', e);
                            }}
                            onLoadedMetadata={() => {
                              console.log('✅ Vídeo carregado com sucesso:', property.video);
                            }}
                          />
                        </div>
                      )}

                      <details className="text-sm">
                        <summary className="cursor-pointer text-primary font-semibold hover:text-accent-gold">Ver dados completos</summary>
                        <pre className="bg-foreground/5 p-3 rounded mt-2 text-xs overflow-auto max-h-[400px]">
                          {JSON.stringify(property, null, 2)}
                        </pre>
                      </details>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-foreground/5 p-6 rounded-lg text-center">
                  <p className="font-paragraph text-lg text-foreground/60">⚠️ Nenhum imóvel com vídeo encontrado</p>
                  <p className="font-paragraph text-sm text-foreground/40 mt-2">Verifique se o campo "video" está preenchido no CMS</p>
                </div>
              )}
            </div>

            {/* All Properties Summary */}
            <div className="mb-12">
              <h2 className="font-heading text-3xl text-primary mb-6">Resumo de Todos os Imóveis ({properties.length})</h2>
              {properties.length > 0 ? (
                <div className="space-y-2">
                  {properties.map((property) => (
                    <div key={property._id} className="bg-white p-4 rounded-lg border border-foreground/10">
                      <div className="flex justify-between items-center flex-wrap gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-heading text-lg text-primary truncate">{property.title || 'Sem título'}</p>
                          <p className="font-paragraph text-sm text-foreground/60 truncate">ID: {property._id}</p>
                          <p className="font-paragraph text-xs text-foreground/40 mt-1">
                            Região: {property.locationRegion || 'N/A'} | Tipo: {property.propertyType || 'N/A'}
                          </p>
                        </div>
                        <div className="flex gap-2 text-sm flex-wrap justify-end">
                          <span className={`px-3 py-1 rounded whitespace-nowrap ${property.video ? 'bg-accent-gold text-primary font-semibold' : 'bg-foreground/5 text-foreground/60'}`}>
                            Vídeo: {property.video ? '✓' : '✗'}
                          </span>
                          <span className={`px-3 py-1 rounded whitespace-nowrap ${property.galeriaDeFotos && Array.isArray(property.galeriaDeFotos) && property.galeriaDeFotos.length > 0 ? 'bg-secondary text-white font-semibold' : 'bg-foreground/5 text-foreground/60'}`}>
                            Galeria: {Array.isArray(property.galeriaDeFotos) ? property.galeriaDeFotos.length : 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-foreground/5 p-6 rounded-lg text-center">
                  <p className="font-paragraph text-lg text-foreground/60">Nenhum imóvel encontrado na coleção</p>
                </div>
              )}
            </div>

            {/* Debug Info */}
            <div className="mb-12">
              <h2 className="font-heading text-3xl text-primary mb-6">Informações de Debug</h2>
              <div className="bg-white p-6 rounded-lg border border-foreground/10">
                <details className="text-sm">
                  <summary className="cursor-pointer text-primary font-semibold hover:text-accent-gold mb-4">Ver JSON completo de todos os imóveis</summary>
                  <pre className="bg-foreground/5 p-4 rounded mt-4 text-xs overflow-auto max-h-[600px]">
                    {JSON.stringify(properties, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
