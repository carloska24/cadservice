'use client';

import { cn } from '@/lib/utils';

export interface Category {
  id: string;
  label: string;
  color: string;
  count?: number;
}

export const ARTICLE_CATEGORIES: Category[] = [
  { id: 'all', label: 'Todos', color: 'slate' },
  { id: 'smt', label: 'SMT/PCBA', color: 'blue' },
  { id: 'npi', label: 'NPI', color: 'indigo' },
  { id: 'ipc-qa', label: 'IPC/QA', color: 'green' },
  { id: 'supply-chain', label: 'Supply Chain', color: 'amber' },
  { id: 'box-build', label: 'Box Build', color: 'slate' },
  { id: 'tendencias', label: 'Tendências', color: 'purple' },
  { id: 'engenharia', label: 'Engenharia', color: 'red' },
];

const colorMap: Record<string, { bg: string; text: string; border: string; activeBg: string; activeText: string }> = {
  slate: { 
    bg: 'bg-slate-100', 
    text: 'text-slate-700', 
    border: 'border-slate-200',
    activeBg: 'bg-slate-900',
    activeText: 'text-white'
  },
  blue: { 
    bg: 'bg-blue-50', 
    text: 'text-blue-700', 
    border: 'border-blue-200',
    activeBg: 'bg-blue-600',
    activeText: 'text-white'
  },
  indigo: { 
    bg: 'bg-indigo-50', 
    text: 'text-indigo-700', 
    border: 'border-indigo-200',
    activeBg: 'bg-indigo-600',
    activeText: 'text-white'
  },
  green: { 
    bg: 'bg-green-50', 
    text: 'text-green-700', 
    border: 'border-green-200',
    activeBg: 'bg-green-600',
    activeText: 'text-white'
  },
  amber: { 
    bg: 'bg-amber-50', 
    text: 'text-amber-700', 
    border: 'border-amber-200',
    activeBg: 'bg-amber-600',
    activeText: 'text-white'
  },
  purple: { 
    bg: 'bg-purple-50', 
    text: 'text-purple-700', 
    border: 'border-purple-200',
    activeBg: 'bg-purple-600',
    activeText: 'text-white'
  },
  red: { 
    bg: 'bg-red-50', 
    text: 'text-red-700', 
    border: 'border-red-200',
    activeBg: 'bg-red-600',
    activeText: 'text-white'
  },
};

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="py-6 border-b border-slate-200 bg-white sticky top-0 z-30">
      <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl">
        <div className="flex flex-wrap gap-2">
          {ARTICLE_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            const colors = colorMap[category.color] || colorMap.slate;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all border',
                  isActive 
                    ? `${colors.activeBg} ${colors.activeText} border-transparent shadow-sm`
                    : `${colors.bg} ${colors.text} ${colors.border} hover:shadow-sm`
                )}
              >
                {category.label}
                {category.count !== undefined && (
                  <span className={cn(
                    'ml-2 px-1.5 py-0.5 rounded-full text-xs',
                    isActive ? 'bg-white/20' : 'bg-black/5'
                  )}>
                    {category.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
