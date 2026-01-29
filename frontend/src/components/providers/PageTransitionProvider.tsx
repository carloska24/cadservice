'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProviderProps {
  children: ReactNode;
}

const variants = {
  hidden: { 
    opacity: 0, 
    y: 0 
  },
  enter: { 
    opacity: 1, 
    y: 0 
  },
  exit: { 
    opacity: 0, 
    y: 0 
  },
};

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ 
          type: 'tween', 
          ease: 'easeInOut', 
          duration: 0.25 
        }}
        className="w-full flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
