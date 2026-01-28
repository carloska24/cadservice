'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export function UtilityBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'keyword' | 'partnumber'>('keyword');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // Redirect to articles page with search query
    // In the future this could go to a dedicated search results page
    const encodedQuery = encodeURIComponent(searchQuery.trim());
    router.push(`/articles?search=${encodedQuery}&type=${searchType}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="hidden md:block w-full bg-white border-b border-transparent pt-2">
      <div className="container mx-auto max-w-7xl h-[50px] px-4 sm:px-6 lg:px-8 flex items-center justify-end gap-3">
        
        {/* SEARCH WIDGET */}
        <div className="flex items-center h-[38px] relative">
          
          {/* Dropdown Area */}
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center px-3 bg-[#e9ecef] border border-slate-300 border-r-0 rounded-l-[3px] h-full cursor-pointer hover:bg-slate-200 transition-colors group min-w-[145px] justify-between"
          >
            <span className="text-[13px] font-medium text-[#495057] truncate group-hover:text-slate-900">
              {searchType === 'keyword' ? 'Palavra-chave' : 'Número da Peça'}
            </span>
            <span className="ml-2 text-[10px] text-slate-600">▼</span>
          </div>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-slate-300 rounded shadow-lg z-50 min-w-[145px]">
              <button 
                onClick={() => { setSearchType('keyword'); setIsDropdownOpen(false); }}
                className={`w-full px-3 py-2 text-left text-[13px] hover:bg-slate-100 ${searchType === 'keyword' ? 'bg-slate-50 font-medium' : ''}`}
              >
                Palavra-chave
              </button>
              <button 
                onClick={() => { setSearchType('partnumber'); setIsDropdownOpen(false); }}
                className={`w-full px-3 py-2 text-left text-[13px] hover:bg-slate-100 ${searchType === 'partnumber' ? 'bg-slate-50 font-medium' : ''}`}
              >
                Número da Peça
              </button>
            </div>
          )}
          
          {/* Input Area */}
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pesquisar produtos" 
            className="h-full w-[280px] px-3 text-[14px] text-[#495057] placeholder:text-[#6c757d] border border-slate-300 border-x-0 focus:outline-none focus:bg-white focus:border-[#80bdff] focus:ring-1 focus:ring-[#80bdff]/50 transition-all z-10"
          />
          
          {/* Search Button */}
          <button 
            onClick={handleSearch}
            className="h-full px-4 bg-[#00AEEF] hover:bg-[#0090C5] text-white border border-[#00AEEF] border-l-0 rounded-r-[3px] transition-colors flex items-center justify-center z-20 cursor-pointer"
          >
            <Search className="w-4 h-4 text-white" strokeWidth={3} />
          </button>
        </div>

        {/* CROSS REF BUTTON */}
        <a 
          href="/cross-reference" 
          className="flex items-center justify-center bg-[#002B49] hover:bg-[#001A2D] text-white text-[12px] font-bold uppercase tracking-normal px-4 h-[38px] rounded-[3px] transition-all whitespace-nowrap shadow-none ml-1"
        >
          PARTE DE REFERÊNCIA CRUZADA
        </a>

      </div>
    </div>
  );
}
