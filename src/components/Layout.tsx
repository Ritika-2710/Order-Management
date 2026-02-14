import React from 'react';
import { ShoppingBag, Utensils } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, cartCount, onCartClick, onLogoClick }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={onLogoClick}
          >
            <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white">
              <Utensils size={18} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-500">
              CraveBites
            </span>
          </div>
          
          <button 
            onClick={onCartClick}
            className="relative p-2 text-gray-600 hover:text-brand-600 transition-colors"
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} CraveBites. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};