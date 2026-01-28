'use client';

import { Search } from 'lucide-react';

export function UtilityBar() {
  return (
    <div className="hidden md:block w-full bg-white border-b border-transparent"> {/* Border transparent for invisible separation */}
      <div className="container mx-auto max-w-7xl h-[50px] px-4 sm:px-6 lg:px-8 flex items-center justify-end gap-3">
        
        {/* SEARCH WIDGET - Styles matched to TT Electronics (Bootstrap-like) */}
        <div className="flex items-center h-[38px]"> {/* Increased to 38px standard height */}
          
          {/* Dropdown Area */}
          <div className="flex items-center px-3 bg-[#e9ecef] border border-slate-300 border-r-0 rounded-l-[3px] h-full cursor-pointer hover:bg-slate-200 transition-colors group min-w-[130px] justify-between">
            <span className="text-[13px] font-medium text-[#495057] truncate group-hover:text-slate-900">
              Keyword/Part #
            </span>
            <span className="ml-2 text-[10px] text-slate-600">▼</span>
          </div>
          
          {/* Input Area */}
          <input 
            type="text" 
            placeholder="Search Products" 
            className="h-full w-[280px] px-3 text-[14px] text-[#495057] placeholder:text-[#6c757d] border border-slate-300 border-x-0 focus:outline-none focus:bg-white focus:border-[#80bdff] focus:ring-1 focus:ring-[#80bdff]/50 transition-all z-10"
          />
          
          {/* Search Button */}
          <button className="h-full px-4 bg-[#00AEEF] hover:bg-[#0090C5] text-white border border-[#00AEEF] border-l-0 rounded-r-[3px] transition-colors flex items-center justify-center z-20">
            <Search className="w-4 h-4 text-white" strokeWidth={3} />
          </button>
        </div>

        {/* CROSS REF BUTTON */}
        <a 
          href="/cross-reference" 
          className="flex items-center justify-center bg-[#002B49] hover:bg-[#001A2D] text-white text-[12px] font-bold uppercase tracking-normal px-4 h-[38px] rounded-[3px] transition-all whitespace-nowrap shadow-none ml-1"
        >
          CROSS REF PART
        </a>

      </div>
    </div>
  );
}
