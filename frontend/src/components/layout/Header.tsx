
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronDown } from 'lucide-react';
import { UtilityBar } from './UtilityBar';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      
      {/* 1. UTILITY BAR (Desktop Only - EMS Standard) */}
      <UtilityBar />

      {/* 2. MAIN NAVIGATION */}
      <div className="container mx-auto flex h-[72px] max-w-7xl items-center justify-between pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8">
        
        <div className="flex items-center min-w-[450px]"> 
          <Link className="flex items-center" href="/">
            <Image 
              src="/logo_v2.png" 
              alt="CADService Produtos Eletrônicos" 
              width={500} 
              height={150} 
              className="h-[120px] w-auto object-contain scale-[2.0] origin-left -ml-2"
              priority
              quality={100}
            />
          </Link>
        </div>

        {/* DESKTOP NAV LINKS - TT Electronics Style */}
        <nav className="hidden md:flex flex-1 items-center justify-end space-x-8 mr-8">
          {[
            { name: 'Serviços', href: '/services', hasDropdown: true },
            { name: 'Portfólio', href: '/portfolio', hasDropdown: true },
            { name: 'Artigos', href: '/articles', hasDropdown: true },
            { name: 'Contato', href: '/contacts', hasDropdown: false }
          ].map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="group flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[15px] font-semibold text-[#1a1a1a] hover:text-[#00AEEF] transition-colors"
            >
              {link.name}
              {link.hasDropdown && (
                <ChevronDown className="w-3.5 h-3.5 text-[#666666] group-hover:text-[#00AEEF] transition-colors" />
              )}
            </Link>
          ))}
        </nav>

        {/* ACTIONS & MOBILE MENU */}
        <div className="flex items-center gap-4">
           {/* Mobile Menu Button */}
           <button className="md:hidden p-2 text-slate-600 hover:text-slate-900">
              <Menu className="h-6 w-6" />
           </button>
        </div>

      </div>
    </header>
  );
}

