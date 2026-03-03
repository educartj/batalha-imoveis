import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <header className="w-full bg-white border-b border-foreground/10 sticky top-0 z-50 text-5xl">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary/90 transform -skew-y-3 origin-top-left"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-gold/10 via-transparent to-primary/10 opacity-60 transform -skew-y-3 origin-top-left text-8xl"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 items-center gap-y-8 md:gap-y-0 py-6 md:py-8 lg:py-10 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-primary/90 to-secondary/80 backdrop-blur-sm rounded-full shadow-2xl border border-accent-gold/50 overflow-hidden group hover:shadow-3xl transition-all duration-700 ease-in-out text-4xl"> <div className="absolute inset-0 bg-accent-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none rounded-full text-4xl"></div> <Link to="/" className="flex-shrink-0 justify-self-start relative z-10 col-span-1 text-4xl"> </Link> <nav className="hidden md:flex flex-grow justify-center col-span-3 gap-x-4 lg:gap-x-8 relative z-10 text-4xl"> {navLinks.map((link) => ( <Link
          key={link.path}
          to={link.path}
          className={`font-paragraph text-lg transition-all duration-500 relative group text-white/80 hover:text-accent-gold ${isActive(link.path) ? 'text-accent-gold font-semibold scale-105' : ''}`}
          className="text-4xl"> {link.label} <span
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent-gold transition-all duration-500 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}
          className="text-4xl" /> </Link> ))} </nav> <div className="hidden md:flex flex-shrink-0 justify-self-end relative z-10 col-span-1 text-4xl"> <div className="relative group overflow-hidden rounded-full shadow-xl transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-accent-gold to-primary/80 p-1 text-4xl"> <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="relative z-10 w-full h-full flex items-center justify-center text-4xl"> <Button className="w-full h-full bg-primary text-accent-gold font-heading font-bold px-6 py-3 rounded-full border-2 border-transparent group-hover:border-accent-gold transition-all duration-500 ease-in-out transform group-hover:bg-transparent group-hover:text-white text-4xl"> WhatsApp </Button> </a> <div className="absolute inset-0 bg-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out rounded-full text-4xl"></div> </div> </div> <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-3 text-white bg-accent-gold/30 rounded-full hover:bg-accent-gold/50 transition-colors duration-300 shadow-lg absolute top-1/2 -translate-y-1/2 right-6 z-20 text-4xl" aria-label="Toggle menu"> {isMenuOpen ? <X className="w-7 h-7 text-4xl" /> : <Menu className="w-7 h-7 text-4xl" />} </button> </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-8 mt-4 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-foreground/10">
            <div className="flex flex-col gap-6 px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-paragraph text-lg transition-colors ${
                    isActive(link.path)
                      ? 'text-primary font-semibold'
                      : 'text-foreground/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4"
              >
                <Button
                  className="w-full bg-accent-gold hover:bg-accent-gold/90 text-primary font-paragraph font-semibold h-12"
                >
                  WhatsApp
                </Button>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
