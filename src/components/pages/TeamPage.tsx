import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { Team } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone } from 'lucide-react';

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const result = await BaseCrudService.getAll<Team>('team');
      setTeamMembers(result.items);
    } catch (error) {
      console.error('Error loading team:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary py-24">
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
                Nossa Equipe
              </span>
              <div className="h-px w-12 bg-accent-gold" />
            </div>

            <h1 className="font-heading text-6xl md:text-7xl text-primary-foreground mb-8">
              Conheça Nossos Especialistas
            </h1>

            <p className="font-paragraph text-xl text-primary-foreground/90 leading-relaxed">
              Profissionais experientes e dedicados, prontos para realizar seus sonhos imobiliários
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="w-full py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-20">
          <div className="min-h-[400px]">
            {isLoading ? null : teamMembers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-foreground/5"
                  >
                    <div className="relative h-96 overflow-hidden">
                      <Image
                        src={member.profilePhoto || 'https://static.wixstatic.com/media/72153f_c4f62a6595ec4e27a450d863063bcf3c~mv2.png?originWidth=384&originHeight=384'}
                        alt={member.brokerName || 'Corretor'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        width={400}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-8">
                      <h3 className="font-heading text-3xl text-primary mb-2">
                        {member.brokerName}
                      </h3>

                      {member.role && (
                        <div className="text-accent-gold font-paragraph text-sm font-semibold mb-4 uppercase tracking-wider">
                          {member.role}
                        </div>
                      )}

                      {member.bio && (
                        <p className="font-paragraph text-base text-foreground/70 leading-relaxed mb-6">
                          {member.bio}
                        </p>
                      )}

                      <div className="space-y-3 mb-6">
                        {member.contactInfo && (
                          <div className="flex items-center gap-3 font-paragraph text-sm text-foreground/70">
                            <Phone className="w-4 h-4 text-accent-gold" />
                            <a href={`tel:${member.contactInfo}`} className="hover:text-primary transition-colors">
                              {member.contactInfo}
                            </a>
                          </div>
                        )}
                      </div>

                      {member.whatsAppLink && (
                        <a
                          href={member.whatsAppLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            className="w-full bg-accent-gold hover:bg-accent-gold/90 text-primary font-paragraph font-semibold h-12"
                          >
                            Falar no WhatsApp
                          </Button>
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-foreground/60">
                  Informações da equipe em breve
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-32 bg-white">
        <div className="max-w-[100rem] mx-auto px-20">
          <div className="bg-primary rounded-2xl p-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-5xl text-primary-foreground mb-6">
                Pronto para Começar?
              </h2>
              <p className="font-paragraph text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
                Entre em contato com nossa equipe e descubra como podemos ajudá-lo 
                a encontrar o imóvel dos seus sonhos
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-accent-gold hover:bg-accent-gold/90 text-primary font-paragraph font-semibold px-10 py-6 text-base h-auto"
                  >
                    Falar no WhatsApp
                  </Button>
                </a>
                <a href="mailto:contato@batalhaimoveis.com.br">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-paragraph font-semibold px-10 py-6 text-base h-auto"
                  >
                    Enviar E-mail
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
