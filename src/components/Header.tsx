import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/sobre', label: 'Sobre Nós' },
    { path: '/imoveis', label: 'Imóveis' },
    { path: '/equipe', label: 'Equipe' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="w-full bg-gradient-to-r from-primary to-secondary sticky top-0 z-50 shadow-lg">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 hover:opacity-90 transition-opacity duration-300">
          <Image
            src="https://static.wixstatic.com/media/72153f_439151974d2b4de3a50f9191702c8cf9~mv2.png"
            width={140}
            className="h-auto"
            originWidth={192}
            originHeight={128} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 flex-grow justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-paragraph text-base transition-all duration-300 relative group ${
                isActive(link.path)
                  ? 'text-accent-gold font-semibold'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-accent-gold transition-all duration-300 ${
                  isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* WhatsApp Button - Desktop */}
        <div className="hidden md:flex flex-shrink-0">
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-accent-gold hover:bg-accent-gold/90 text-primary font-paragraph font-semibold px-6 py-2 h-auto rounded-full transition-all duration-300 hover:shadow-lg">
              WhatsApp
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-primary/95 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-[100rem] mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-paragraph text-base transition-colors py-2 ${
                  isActive(link.path)
                    ? 'text-accent-gold font-semibold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2"
            >
              <Button className="w-full bg-accent-gold hover:bg-accent-gold/90 text-primary font-paragraph font-semibold h-10 rounded-full">
                WhatsApp
              </Button>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
