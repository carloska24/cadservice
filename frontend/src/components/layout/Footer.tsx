
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Youtube, 
  Instagram, 
  ShieldCheck, 
  Award,
  ArrowRight
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
      <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl py-16 md:py-24">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* COLUMN 1: IDENTITY & TRUST */}
          <div className="space-y-6">
            <div>
              <Link href="/" className="text-2xl font-bold text-white tracking-tight">
                CADService
              </Link>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Engenharia e Manufatura Eletrônica de Alta Complexidade. 
                Do protótipo à escala industrial.
              </p>
            </div>

            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-slate-900 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-slate-900 rounded-full hover:bg-red-600 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-slate-900 rounded-full hover:bg-pink-600 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>

            <div className="pt-6 border-t border-slate-900">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">Certificações</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-900 rounded border border-slate-800">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span className="text-xs font-bold text-slate-300">ISO 9001</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-900 rounded border border-slate-800">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  <span className="text-xs font-bold text-slate-300">IPC Member</span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: DEEP LINKS (SERVICES) */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Soluções</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/services/smt" className="hover:text-primary transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-slate-700 rounded-full mr-3 group-hover:bg-primary transition-colors"></span>
                  Montagem SMT
                </Link>
              </li>
              <li>
                <Link href="/services/box-build" className="hover:text-primary transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-slate-700 rounded-full mr-3 group-hover:bg-primary transition-colors"></span>
                  Integração Box Build
                </Link>
              </li>
              <li>
                <Link href="/services/npi" className="hover:text-primary transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-slate-700 rounded-full mr-3 group-hover:bg-primary transition-colors"></span>
                  NPI & Industrialização
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-slate-700 rounded-full mr-3 group-hover:bg-primary transition-colors"></span>
                  Serviços de Teste
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-slate-700 rounded-full mr-3 group-hover:bg-primary transition-colors"></span>
                  Cadeia de Suprimentos
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: COMPANY */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Institucional</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">Sobre Nós</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-primary transition-colors">Portfólio de Projetos</Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-primary transition-colors">Blog Técnico</Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition-colors">Trabalhe Conosco</Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-primary transition-colors">Fale Conosco</Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: CONTACT & CONVERSION */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Contato</h4>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  Av. Industrial, 1500 - Distrito Industrial<br/>
                  São Paulo - SP, 01000-000
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">+55 11 3000-0000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">comercial@cadservice.com.br</span>
              </div>
            </div>
            
            <Link 
              href="/budget"
              className="inline-flex items-center justify-center w-full h-12 bg-primary text-white font-bold rounded hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Solicitar Orçamento <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

        </div>

        {/* PROOF LINE */}
        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p className="text-center md:text-left">© 2026 CADService Systems. Todos os direitos reservados.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Política de Privacidade</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Termos de Uso</Link>
            <Link href="/sitemap" className="hover:text-slate-400 transition-colors">Mapa do Site</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
